import express, { Request, Response } from 'express';
import {
  validateLeadSubmission,
  checkRateLimit,
  checkDuplicateSubmission,
  recordSubmission,
  hashIdentifier
} from './validation';
import {
  insertLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
  getAdminStats,
  exportLeadsToExcelBuffer,
  exportLeadsToCSV,
  getDistinctFilterOptions
} from './db';
import {
  dispatchLeadAutomations,
  retryLeadChannel
} from './services/AutomationDispatcher';
import {
  SERVICE_CONFIG,
  detectServiceConfig
} from './config/serviceConfig';
import {
  verifyAdminCredentials,
  createAdminToken,
  requireAdminAuth
} from './auth';
import { LeadStatus, LeadPriority } from './types';

const app = express();

// Middlewares
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'YUGARK Digital Studio API & Automation Engine'
  });
});

// ==========================================
// PUBLIC ENDPOINT: Submit Lead / Project Enquiry
// ==========================================
app.post('/api/leads', async (req: Request, res: Response): Promise<void> => {
  try {
    const rawIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    const clientIp = Array.isArray(rawIp) ? rawIp[0] : String(rawIp).split(',')[0].trim();
    const userAgent = String(req.headers['user-agent'] || '');
    const ipHash = hashIdentifier(clientIp);

    // 1. Rate Limiting Check
    const rateCheck = checkRateLimit(clientIp, 15, 15 * 60 * 1000);
    if (!rateCheck.allowed) {
      res.status(429).json({
        success: false,
        error: `Too many submissions from this connection. Please try again in ${rateCheck.retryAfter} seconds.`
      });
      return;
    }

    // 2. Server-side Validation & Sanitization
    const validation = validateLeadSubmission(req.body);

    // Honeypot spam trap
    if (validation.isSpam) {
      const spamLead = await insertLead({
        fullName: req.body.fullName || 'Bot Submission',
        email: req.body.email || 'bot@honeypot.local',
        phone: req.body.phone || '0000000000',
        businessName: req.body.businessName || 'Spam Submission',
        projectRequirement: req.body.projectRequirement || 'Spam bot trigger',
        pageSource: req.body.pageSource || 'Spam Bot Trap',
        ipHash,
        userAgent,
        isSpam: true
      });
      res.status(200).json({
        success: true,
        leadId: spamLead.id,
        message: 'Your enquiry has been received.'
      });
      return;
    }

    if (!validation.isValid || !validation.sanitized) {
      res.status(400).json({
        success: false,
        error: 'Validation failed. Please verify the required fields.',
        errors: validation.errors
      });
      return;
    }

    const sanitized = validation.sanitized;

    // 3. Duplicate Submission Protection (60 seconds duplicate window)
    const duplicateCheck = checkDuplicateSubmission(sanitized);
    if (duplicateCheck.isDuplicate && duplicateCheck.existingLeadId) {
      res.status(200).json({
        success: true,
        leadId: duplicateCheck.existingLeadId,
        message: 'Your enquiry was already received. Thank you!'
      });
      return;
    }

    // 4. Detect Package / Service Configuration
    const detectedConfig = detectServiceConfig(sanitized.selectedBundle || sanitized.selectedService);

    // 5. Insert Lead into Database (Primary durable record)
    const lead = await insertLead({
      fullName: sanitized.fullName,
      email: sanitized.email,
      phone: sanitized.phone,
      businessName: sanitized.businessName,
      businessCategory: sanitized.businessCategory,
      otherCategory: sanitized.otherCategory,
      selectedService: detectedConfig.serviceName,
      selectedBundle: sanitized.selectedBundle || detectedConfig.serviceName,
      projectRequirement: sanitized.projectRequirement,
      budget: sanitized.budget,
      timeline: sanitized.timeline,
      preferredContactMethod: sanitized.preferredContactMethod,
      remarks: sanitized.remarks,
      pageSource: sanitized.pageSource,
      formSource: sanitized.formSource,
      consentEmail: sanitized.consentEmail,
      consentWhatsApp: sanitized.consentWhatsApp,
      consentSMS: sanitized.consentSMS,
      ipHash,
      userAgent
    });

    // Record for duplicate detection
    recordSubmission(sanitized, lead.id);

    // 6. Asynchronously trigger package-specific multichannel automation (Non-blocking resilience)
    // Runs Email, WhatsApp, SMS, and Studio notifications in parallel without blocking client response.
    dispatchLeadAutomations(lead).catch((err) => {
      console.error(`[AUTOMATION DISPATCH UNCAUGHT] Lead ${lead.id}:`, err);
    });

    // 7. Return Success Response with Generated Reference ID and Detected Package
    res.status(201).json({
      success: true,
      leadId: lead.id,
      package: {
        serviceId: detectedConfig.serviceId,
        serviceName: detectedConfig.serviceName,
        category: detectedConfig.category
      },
      message: 'Your enquiry has been received successfully. Confirmation email and WhatsApp message are being processed.',
      lead: {
        id: lead.id,
        fullName: lead.full_name,
        businessName: lead.business_company_name,
        packageName: detectedConfig.serviceName,
        createdAt: lead.created_at
      }
    });
  } catch (err: any) {
    console.error('[API LEADS EXCEPTION]', err);
    res.status(500).json({
      success: false,
      error: 'Something went wrong while submitting your enquiry. Please try again or reach out directly on WhatsApp.'
    });
  }
});

// ==========================================
// ADMIN AUTHENTICATION
// ==========================================
app.post('/api/admin/login', (req: Request, res: Response): void => {
  const { email, password, pin } = req.body || {};
  const pass = password || pin;

  const authResult = verifyAdminCredentials(email, pass);

  if (!authResult.valid || !authResult.email) {
    res.status(401).json({
      success: false,
      error: 'Invalid administrator credentials. Please check email and password/PIN.'
    });
    return;
  }

  const token = createAdminToken(authResult.email);

  res.json({
    success: true,
    token,
    admin: {
      email: authResult.email,
      role: 'admin'
    }
  });
});

app.get('/api/admin/me', requireAdminAuth, (req: Request, res: Response): void => {
  const session = (req as any).adminSession;
  res.json({
    authenticated: true,
    email: session.email,
    role: session.role
  });
});

app.post('/api/admin/logout', (req: Request, res: Response): void => {
  res.json({ success: true, message: 'Logged out successfully.' });
});

// ==========================================
// ADMIN DASHBOARD: Analytics & Stats
// ==========================================
app.get('/api/admin/stats', requireAdminAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const stats = await getAdminStats();
    res.json({ success: true, stats });
  } catch (err: any) {
    console.error('[ADMIN STATS ERROR]', err);
    res.status(500).json({ success: false, error: err?.message || 'Failed to compute administrative statistics.' });
  }
});

// ==========================================
// ADMIN DASHBOARD: Service Config & Templates List
// ==========================================
app.get('/api/admin/config/services', requireAdminAuth, (req: Request, res: Response): void => {
  const services = Object.values(SERVICE_CONFIG).map(s => ({
    serviceId: s.serviceId,
    serviceName: s.serviceName,
    category: s.category,
    tagline: s.tagline,
    emailSubject: s.emailSubject,
    emailHeadline: s.emailHeadline,
    whatsappTemplateId: s.whatsappTemplateId,
    ctaText: s.ctaText,
    ctaUrl: s.ctaUrl,
    followUpStepsCount: s.followUpSequence.length
  }));

  res.json({ success: true, services });
});

// ==========================================
// ADMIN DASHBOARD: Filter Options (Dynamic)
// ==========================================
app.get('/api/admin/filter-options', requireAdminAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const options = await getDistinctFilterOptions();
    res.json({ success: true, options });
  } catch (err: any) {
    console.error('[ADMIN FILTER OPTIONS ERROR]', err);
    res.status(500).json({ success: false, error: err?.message || 'Failed to fetch filter options.' });
  }
});

// ==========================================
// ADMIN DASHBOARD: List / Search Leads
// ==========================================
app.get('/api/admin/leads', requireAdminAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      search,
      client,
      status,
      priority,
      category,
      source,
      service,
      channelStatus,
      fromDate,
      toDate,
      page,
      limit,
      sortBy,
      sortOrder
    } = req.query;

    const result = await getLeads({
      search: search ? String(search) : undefined,
      client: client ? String(client) : undefined,
      status: status ? String(status) : undefined,
      priority: priority ? String(priority) : undefined,
      category: category ? String(category) : undefined,
      source: source ? String(source) : undefined,
      service: service ? String(service) : undefined,
      channelStatus: channelStatus ? String(channelStatus) : undefined,
      fromDate: fromDate ? String(fromDate) : undefined,
      toDate: toDate ? String(toDate) : undefined,
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 20,
      sortBy: (sortBy as any) || 'created_at',
      sortOrder: sortOrder === 'asc' ? 'asc' : 'desc'
    });

    res.json({
      success: true,
      ...result
    });
  } catch (err: any) {
    console.error('[ADMIN GET LEADS ERROR]', err);
    res.status(500).json({ success: false, error: err?.message || 'Failed to fetch leads records.' });
  }
});

// ==========================================
// ADMIN DASHBOARD: Export Excel (.xlsx)
// ==========================================
app.get('/api/admin/export', requireAdminAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      search,
      client,
      status,
      priority,
      category,
      source,
      service,
      fromDate,
      toDate,
      sortBy,
      sortOrder
    } = req.query;

    const excelBuffer = await exportLeadsToExcelBuffer({
      search: search ? String(search) : undefined,
      client: client ? String(client) : undefined,
      status: status ? String(status) : undefined,
      priority: priority ? String(priority) : undefined,
      category: category ? String(category) : undefined,
      source: source ? String(source) : undefined,
      service: service ? String(service) : undefined,
      fromDate: fromDate ? String(fromDate) : undefined,
      toDate: toDate ? String(toDate) : undefined,
      sortBy: (sortBy as any) || 'created_at',
      sortOrder: sortOrder === 'asc' ? 'asc' : 'desc'
    });
    const filename = `YUGARK_Leads_${new Date().toISOString().slice(0, 10)}.xlsx`;
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(excelBuffer);
  } catch (err: any) {
    console.error('[ADMIN EXCEL EXPORT ERROR]', err);
    const message = err?.message || 'Failed to generate Excel export.';
    const statusCode = message.includes('No matching live leads') ? 404 : 500;
    res.status(statusCode).json({ success: false, error: message });
  }
});

// ==========================================
// ADMIN DASHBOARD: Single Lead Details with Follow-up Sequence
// ==========================================
app.get('/api/admin/leads/:id', requireAdminAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const lead = await getLeadById(id);

    if (!lead) {
      res.status(404).json({ error: 'Lead not found.' });
      return;
    }

    const serviceConfig = detectServiceConfig(lead.service || lead.selected_bundle);

    res.json({
      success: true,
      lead,
      serviceConfig: {
        serviceId: serviceConfig.serviceId,
        serviceName: serviceConfig.serviceName,
        category: serviceConfig.category,
        tagline: serviceConfig.tagline,
        deliverables: serviceConfig.emailDeliverables,
        followUpSequence: serviceConfig.followUpSequence
      }
    });
  } catch (err) {
    console.error('[ADMIN GET LEAD BY ID ERROR]', err);
    res.status(500).json({ error: 'Failed to retrieve lead details.' });
  }
});

// ==========================================
// ADMIN DASHBOARD: Retry Communication Channel
// ==========================================
app.post('/api/admin/leads/:id/retry-communication', requireAdminAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { channel } = req.body || {};

    const validChannels = ['email', 'whatsapp', 'sms', 'internal_notification', 'all'];
    if (!channel || !validChannels.includes(channel)) {
      res.status(400).json({
        success: false,
        error: `Invalid channel. Must be one of: ${validChannels.join(', ')}`
      });
      return;
    }

    const result = await retryLeadChannel(id, channel as any);
    res.json(result);
  } catch (err: any) {
    console.error('[ADMIN RETRY COMMUNICATION ERROR]', err);
    res.status(500).json({ success: false, error: err?.message || 'Failed to retry communication.' });
  }
});

// ==========================================
// ADMIN DASHBOARD: Update Status / Priority / Notes
// ==========================================
const handlePatchLead = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = (req.params.id || req.body?.id || (req.query.id as string) || '').trim();
    if (!id) {
      res.status(400).json({ error: 'Missing lead ID to update.' });
      return;
    }

    const { status, priority, admin_notes } = req.body || {};

    const validStatuses: LeadStatus[] = ['NEW', 'CONTACTED', 'IN_PROGRESS', 'QUALIFIED', 'PROPOSAL_SENT', 'WON', 'LOST', 'CONVERTED', 'CLOSED', 'SPAM'];
    const validPriorities: LeadPriority[] = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];

    if (status && !validStatuses.includes(status)) {
      res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
      return;
    }

    if (priority && !validPriorities.includes(priority)) {
      res.status(400).json({ error: `Invalid priority. Must be one of: ${validPriorities.join(', ')}` });
      return;
    }

    const updated = await updateLead(id, {
      status,
      priority,
      admin_notes
    });

    if (!updated) {
      res.status(404).json({ error: 'Lead record not found or could not be updated.' });
      return;
    }

    res.json({ success: true, lead: updated });
  } catch (err) {
    console.error('[ADMIN PATCH LEAD ERROR]', err);
    res.status(500).json({ error: 'Failed to update lead record.' });
  }
};

app.patch('/api/admin/leads', requireAdminAuth, handlePatchLead);
app.patch('/api/admin/leads/:id', requireAdminAuth, handlePatchLead);

// ==========================================
// ADMIN DASHBOARD: Delete Lead
// ==========================================
const handleDeleteLead = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = (req.params.id || req.body?.id || (req.query.id as string) || '').trim();
    if (!id) {
      res.status(400).json({ error: 'Missing lead ID to delete.' });
      return;
    }

    const deleted = await deleteLead(id);

    if (!deleted) {
      res.status(404).json({ error: 'Lead not found or could not be removed.' });
      return;
    }

    res.json({ success: true, message: `Lead ${id} removed successfully.` });
  } catch (err) {
    console.error('[ADMIN DELETE LEAD ERROR]', err);
    res.status(500).json({ error: 'Failed to delete lead.' });
  }
};

app.delete('/api/admin/leads', requireAdminAuth, handleDeleteLead);
app.delete('/api/admin/leads/:id', requireAdminAuth, handleDeleteLead);

export default app;
