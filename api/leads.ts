import type { IncomingMessage, ServerResponse } from 'http';
import {
  validateLeadSubmission,
  checkRateLimit,
  checkDuplicateSubmission,
  recordSubmission,
  hashIdentifier
} from '../server/validation';
import { insertLead, updateLeadNotificationStatus } from '../server/db';
import { sendLeadNotificationEmail } from '../server/email';

// Helper to parse JSON body across Vercel and Node environments
async function parseBody(req: any): Promise<any> {
  if (req.body) {
    if (typeof req.body === 'string') {
      try {
        return JSON.parse(req.body);
      } catch {
        return {};
      }
    }
    return req.body;
  }

  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk: any) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
    req.on('error', () => {
      resolve({});
    });
  });
}

export default async function handler(req: any, res: any) {
  // Set CORS and JSON Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'ok',
      endpoint: '/api/leads',
      message: 'YUGARK Digital Studio Lead API is ready for submissions.'
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: `Method ${req.method} Not Allowed. Use POST to submit an enquiry.`
    });
  }

  try {
    const rawIp =
      req.headers['x-forwarded-for'] ||
      req.headers['x-real-ip'] ||
      req.socket?.remoteAddress ||
      '127.0.0.1';
    const clientIp = Array.isArray(rawIp) ? rawIp[0] : String(rawIp).split(',')[0].trim();
    const userAgent = String(req.headers['user-agent'] || '');
    const ipHash = hashIdentifier(clientIp);

    // 1. Rate Limiting Check
    const rateCheck = checkRateLimit(clientIp, 12, 15 * 60 * 1000);
    if (!rateCheck.allowed) {
      console.warn(`[RATE LIMIT EXCEEDED] IP: ${clientIp}`);
      return res.status(429).json({
        success: false,
        error: `Too many submissions from this connection. Please wait ${rateCheck.retryAfter || 60} seconds before trying again.`
      });
    }

    // 2. Body Parsing & Server-Side Validation
    const body = await parseBody(req);
    console.log('[API /api/leads] Processing submission for:', {
      fullName: body.fullName || body.full_name,
      email: body.email,
      business: body.businessName || body.business_company_name
    });

    const validation = validateLeadSubmission(body);

    // Anti-bot honeypot check
    if (validation.isSpam) {
      console.warn('[SPAM BOT TRAP] Honeypot triggered, saving quietly.');
      const spamLead = await insertLead({
        fullName: body.fullName || 'Bot Submission',
        email: body.email || 'bot@honeypot.local',
        phone: body.phone || '0000000000',
        businessName: body.businessName || 'Spam Bot Trigger',
        projectRequirement: body.projectRequirement || 'Spam bot trigger',
        pageSource: body.pageSource || 'Bot Honeypot',
        ipHash,
        userAgent,
        isSpam: true
      });

      return res.status(200).json({
        success: true,
        leadId: spamLead.id,
        message: 'Your enquiry has been received.'
      });
    }

    if (!validation.isValid || !validation.sanitized) {
      console.warn('[API /api/leads VALIDATION FAILED]', validation.errors);
      return res.status(400).json({
        success: false,
        error: 'Validation failed. Please verify the required fields.',
        errors: validation.errors
      });
    }

    const sanitized = validation.sanitized;

    // 3. Duplicate Submission Protection (60-second window)
    const duplicateCheck = checkDuplicateSubmission(sanitized);
    if (duplicateCheck.isDuplicate && duplicateCheck.existingLeadId) {
      console.log(`[DUPLICATE SUBMISSION] Returning existing reference: ${duplicateCheck.existingLeadId}`);
      return res.status(200).json({
        success: true,
        leadId: duplicateCheck.existingLeadId,
        message: 'Your enquiry was already received. Thank you!'
      });
    }

    // 4. Insert Lead into Supabase (Durable database storage)
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

    console.log(`[API /api/leads SUCCESS] Lead recorded: ID=${lead.id}, Name=${lead.full_name}, Email=${lead.email}`);
    recordSubmission(sanitized, lead.id);

    // 5. Optional Email Notification (only if RESEND_API_KEY is configured)
    if (process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.startsWith('MY_')) {
      sendLeadNotificationEmail(lead)
        .then(async (emailRes) => {
          if (emailRes.success) {
            console.log(`[EMAIL DISPATCHED] Lead ${lead.id} notification sent.`);
            await updateLeadNotificationStatus(lead.id, 'EMAIL_SENT');
          } else {
            console.warn(`[EMAIL NOTICE] Lead ${lead.id} email status:`, emailRes.error);
            await updateLeadNotificationStatus(lead.id, 'EMAIL_FAILED');
          }
        })
        .catch(async (err) => {
          console.error(`[EMAIL DISPATCH EXCEPTION] Lead ${lead.id}:`, err);
          await updateLeadNotificationStatus(lead.id, 'EMAIL_FAILED');
        });
    } else {
      // Mark as SKIPPED silently when Resend key is not configured
      updateLeadNotificationStatus(lead.id, 'SKIPPED').catch(() => {});
    }

    // 6. Return 201 Created Response
    return res.status(201).json({
      success: true,
      leadId: lead.id,
      message: 'Your enquiry has been received successfully. Founder Mr. Radha Krishna and the studio team will contact you shortly.',
      lead: {
        id: lead.id,
        fullName: lead.full_name,
        businessName: lead.business_company_name,
        createdAt: lead.created_at
      }
    });
  } catch (err: any) {
    console.error('[API /api/leads FATAL EXCEPTION]', err);
    return res.status(500).json({
      success: false,
      error: 'Something went wrong while processing your enquiry. Please try again or reach out on WhatsApp directly.'
    });
  }
}
