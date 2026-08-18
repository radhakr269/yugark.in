import {
  validateLeadSubmission,
  checkRateLimit,
  checkDuplicateSubmission,
  recordSubmission,
  hashIdentifier
} from '../server/validation.js';

import {
  insertLead,
  updateLeadNotificationStatus
} from '../server/db.js';

import {
  sendLeadNotificationEmail
} from '../server/email.js';

// Parse JSON body safely across Vercel / Node environments
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
        resolve(
          body
            ? JSON.parse(body)
            : {}
        );
      } catch {
        resolve({});
      }
    });

    req.on('error', () => {
      resolve({});
    });
  });
}

export default async function handler(
  req: any,
  res: any
) {
  // CORS / Response headers
  res.setHeader(
    'Access-Control-Allow-Origin',
    '*'
  );

  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,OPTIONS,POST'
  );

  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  res.setHeader(
    'Content-Type',
    'application/json'
  );

  // Preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Health check
  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'ok',
      endpoint: '/api/leads',
      message:
        'YUGARK Digital Studio Lead API is ready for submissions.'
    });
  }

  // Only POST is allowed for lead creation
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error:
        `Method ${req.method} Not Allowed. Use POST to submit an enquiry.`
    });
  }

  try {
    // -----------------------------------------
    // 1. Request information
    // -----------------------------------------

    const rawIp =
      req.headers['x-forwarded-for'] ||
      req.headers['x-real-ip'] ||
      req.socket?.remoteAddress ||
      '127.0.0.1';

    const clientIp =
      Array.isArray(rawIp)
        ? rawIp[0]
        : String(rawIp)
            .split(',')[0]
            .trim();

    const userAgent =
      String(
        req.headers['user-agent'] || ''
      );

    const ipHash =
      hashIdentifier(clientIp);

    // -----------------------------------------
    // 2. Rate limiting
    // -----------------------------------------

    const rateCheck =
      checkRateLimit(
        clientIp,
        12,
        15 * 60 * 1000
      );

    if (!rateCheck.allowed) {
      console.warn(
        `[RATE LIMIT EXCEEDED] IP: ${clientIp}`
      );

      return res.status(429).json({
        success: false,
        error:
          `Too many submissions from this connection. Please wait ${rateCheck.retryAfter || 60} seconds before trying again.`
      });
    }

    // -----------------------------------------
    // 3. Parse request
    // -----------------------------------------

    const body =
      await parseBody(req);

    console.log(
      '[API /api/leads] Processing submission for:',
      {
        fullName:
          body.fullName ||
          body.full_name,

        email:
          body.email,

        business:
          body.businessName ||
          body.business_company_name
      }
    );

    // -----------------------------------------
    // 4. Validate request
    // -----------------------------------------

    const validation =
      validateLeadSubmission(body);

    // -----------------------------------------
    // 5. Honeypot / Spam
    // -----------------------------------------

    if (validation.isSpam) {
      console.warn(
        '[SPAM BOT TRAP] Honeypot triggered, saving quietly.'
      );

      const spamLead =
        await insertLead({
          fullName:
            body.fullName ||
            'Bot Submission',

          email:
            body.email ||
            'bot@honeypot.local',

          phone:
            body.phone ||
            '0000000000',

          businessName:
            body.businessName ||
            'Spam Bot Trigger',

          projectRequirement:
            body.projectRequirement ||
            'Spam bot trigger',

          pageSource:
            body.pageSource ||
            'Bot Honeypot',

          ipHash,
          userAgent,
          isSpam: true
        });

      return res
        .status(200)
        .json({
          success: true,
          leadId: spamLead.id,
          message:
            'Your enquiry has been received.'
        });
    }

    // -----------------------------------------
    // 6. Validation errors
    // -----------------------------------------

    if (
      !validation.isValid ||
      !validation.sanitized
    ) {
      console.warn(
        '[API /api/leads VALIDATION FAILED]',
        validation.errors
      );

      return res
        .status(400)
        .json({
          success: false,
          error:
            'Validation failed. Please verify the required fields.',
          errors:
            validation.errors
        });
    }

    const sanitized =
      validation.sanitized;

    // -----------------------------------------
    // 7. Duplicate submission protection
    // -----------------------------------------

    const duplicateCheck =
      checkDuplicateSubmission(
        sanitized
      );

    if (
      duplicateCheck.isDuplicate &&
      duplicateCheck.existingLeadId
    ) {
      console.log(
        `[DUPLICATE SUBMISSION] Returning existing reference: ${duplicateCheck.existingLeadId}`
      );

      return res
        .status(200)
        .json({
          success: true,
          leadId:
            duplicateCheck.existingLeadId,
          message:
            'Your enquiry was already received. Thank you!'
        });
    }

    // -----------------------------------------
    // 8. Save lead to Supabase
    // -----------------------------------------

    const lead =
      await insertLead({
        fullName:
          sanitized.fullName,

        email:
          sanitized.email,

        phone:
          sanitized.phone,

        businessName:
          sanitized.businessName,

        businessCategory:
          sanitized.businessCategory,

        otherCategory:
          sanitized.otherCategory,

        selectedService:
          sanitized.selectedService,

        selectedBundle:
          sanitized.selectedBundle,

        projectRequirement:
          sanitized.projectRequirement,

        remarks:
          sanitized.remarks,

        pageSource:
          sanitized.pageSource,

        formSource:
          sanitized.formSource,

        ipHash,
        userAgent
      });

    console.log(
      `[API /api/leads SUCCESS] Lead recorded: ID=${lead.id}, Name=${lead.full_name}, Email=${lead.email}`
    );

    recordSubmission(
      sanitized,
      lead.id
    );

    // -----------------------------------------
    // 9. Email notification
    // -----------------------------------------
    //
    // IMPORTANT:
    // We WAIT for Resend before returning
    // the Vercel function response.
    //
    // Previously this was fire-and-forget
    // using .then(), so Vercel could finish
    // the invocation before Resend completed.
    // -----------------------------------------

    let notificationStatus:
      | 'EMAIL_SENT'
      | 'EMAIL_FAILED'
      | 'SKIPPED' =
      'SKIPPED';

    const resendApiKey =
      process.env.RESEND_API_KEY?.trim();

    if (
      resendApiKey &&
      !resendApiKey.startsWith('MY_')
    ) {
      console.log(
        `[EMAIL DISPATCH START] Sending notification for lead ${lead.id}.`
      );

      try {
        const emailResult =
          await sendLeadNotificationEmail(
            lead
          );

        if (emailResult.success) {
          notificationStatus =
            'EMAIL_SENT';

          console.log(
            `[EMAIL DISPATCHED] Lead ${lead.id} notification sent successfully.`
          );
        } else {
          notificationStatus =
            'EMAIL_FAILED';

          console.warn(
            `[EMAIL NOTICE] Lead ${lead.id} email failed:`,
            emailResult.error ||
              'Unknown email error'
          );
        }
      } catch (emailError: any) {
        notificationStatus =
          'EMAIL_FAILED';

        console.error(
          `[EMAIL DISPATCH EXCEPTION] Lead ${lead.id}:`,
          emailError
        );
      }
    } else {
      notificationStatus =
        'SKIPPED';

      console.warn(
        `[EMAIL SKIPPED] RESEND_API_KEY is not configured for lead ${lead.id}.`
      );
    }

    // -----------------------------------------
    // 10. Save email status to Supabase
    // -----------------------------------------

    try {
      await updateLeadNotificationStatus(
        lead.id,
        notificationStatus
      );

      console.log(
        `[EMAIL STATUS UPDATED] Lead ${lead.id}: ${notificationStatus}`
      );
    } catch (statusError) {
      console.error(
        `[EMAIL STATUS UPDATE ERROR] Lead ${lead.id}:`,
        statusError
      );
    }

    // -----------------------------------------
    // 11. Return response only AFTER
    // database + email attempt complete
    // -----------------------------------------

    return res
      .status(201)
      .json({
        success: true,

        leadId:
          lead.id,

        notificationStatus,

        message:
          'Your enquiry has been received successfully. Founder Mr. Radha Krishna and the studio team will contact you shortly.',

        lead: {
          id:
            lead.id,

          fullName:
            lead.full_name,

          businessName:
            lead.business_company_name,

          createdAt:
            lead.created_at
        }
      });

  } catch (err: any) {
    console.error(
      '[API /api/leads FATAL EXCEPTION]',
      err
    );

    return res
      .status(500)
      .json({
        success: false,
        error:
          'Something went wrong while processing your enquiry. Please try again or reach out on WhatsApp directly.'
      });
  }
}
