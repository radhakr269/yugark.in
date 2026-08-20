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
  updateLeadNotificationStatus
} from './db';
import { sendLeadNotificationEmail } from './email';
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
    service: 'YUGARK Digital Studio API'
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
    const rateCheck = checkRateLimit(clientIp, 12, 15 * 60 * 1000);
    if (!rateCheck.allowed) {
      res.status(429).json({
        success: false,
        error: `Too many submissions from this connection. Please try again in ${rateCheck.retryAfter} seconds.`
      });
      return;
    }

    // 2. Server-side Validation
    const validation = validateLeadSubmission(req.body);

    // Honeypot spam trap
    if (validation.isSpam) {
      // Record quietly as spam in DB without notifying admin or erroring
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

    // 4. Insert Lead into Database (Primary durable record)
    const lead = await insertLead({
      fullName: sanitized.fullName,
      email: sanitized.email,
      phone: sanitized.phone,
      businessName: sanitized.businessName,
      businessCategory: sanitized.businessCategory,
      otherCategory: sanitized.otherCategory,
      selectedService: sanitized.selectedService,
      selectedBundle: sanitized.selectedBundle,
      projectRequirement: sanitized.projectRequirement,
      remarks: sanitized.remarks,
      pageSource: sanitized.pageSource,
      formSource: sanitized.formSource,
      ipHash,
      userAgent
    });

    // Record for duplicate detection
    recordSubmission(sanitized, lead.id);

    // 5. Send Transactional Email Notification to Admin (Non-blocking resilience)
    // If email fails, the lead is safely retained in the database with status EMAIL_FAILED.
    sendLeadNotificationEmail(lead)
      .then(async (emailRes) => {
        if (emailRes.success) {
          await updateLeadNotificationStatus(lead.id, 'EMAIL_SENT');
        } else {
          console.error(`[EMAIL RETRY LOG] Lead ${lead.id} email notification failed:`, emailRes.error);
          await updateLeadNotificationStatus(lead.id, 'EMAIL_FAILED');
        }
      })
      .catch(async (err) => {
        console.error(`[EMAIL ASYNC ERROR] Lead ${lead.id}:`, err);
        await updateLeadNotificationStatus(lead.id, 'EMAIL_FAILED');
      });

    // 6. Return Success Response with Generated Reference ID
    res.status(201).json({
      success: true,
      leadId: lead.id,
      message: 'Your enquiry has been received successfully. Our executive team will contact you shortly.',
      lead: {
        id: lead.id,
        fullName: lead.full_name,
        businessName: lead.business_company_name,
        createdAt: lead.created_at
      }
    });
  } catch (err: any) {
    console.error('[API LEADS EXCEPTION]', err);
    res.status(500).json({
      success: false,
      error: 'Something went wrong while submitting your enquiry. Please try again or reach out on WhatsApp.'
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
  } catch (err) {
    console.error('[ADMIN STATS ERROR]', err);
    res.status(500).json({ error: 'Failed to compute administrative statistics.' });
  }
});

// ==========================================
// ADMIN DASHBOARD: List / Search Leads
// ==========================================
app.get('/api/admin/leads', requireAdminAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, status, priority, category, page, limit, sortBy, sortOrder } = req.query;

    const result = await getLeads({
      search: search ? String(search) : undefined,
      status: status ? String(status) : undefined,
      priority: priority ? String(priority) : undefined,
      category: category ? String(category) : undefined,
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 20,
      sortBy: (sortBy as any) || 'created_at',
      sortOrder: sortOrder === 'asc' ? 'asc' : 'desc'
    });

    res.json({
      success: true,
      ...result
    });
  } catch (err) {
    console.error('[ADMIN GET LEADS ERROR]', err);
    res.status(500).json({ error: 'Failed to fetch leads records.' });
  }
});

// ==========================================
// ADMIN DASHBOARD: Export Excel (.xlsx)
// ==========================================
app.get('/api/admin/export', requireAdminAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const excelBuffer = await exportLeadsToExcelBuffer();
    const filename = `YUGARK_Leads_${new Date().toISOString().slice(0, 10)}.xlsx`;
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(excelBuffer);
  } catch (err) {
    console.error('[ADMIN EXCEL EXPORT ERROR]', err);
    res.status(500).json({ error: 'Failed to generate Excel export.' });
  }
});

// ==========================================
// ADMIN DASHBOARD: Single Lead Details
// ==========================================
app.get('/api/admin/leads/:id', requireAdminAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const lead = await getLeadById(id);

    if (!lead) {
      res.status(404).json({ error: 'Lead not found.' });
      return;
    }

    res.json({ success: true, lead });
  } catch (err) {
    console.error('[ADMIN GET LEAD BY ID ERROR]', err);
    res.status(500).json({ error: 'Failed to retrieve lead details.' });
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

    const validStatuses: LeadStatus[] = ['NEW', 'CONTACTED', 'IN_PROGRESS', 'QUALIFIED', 'CONVERTED', 'CLOSED', 'SPAM'];
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
