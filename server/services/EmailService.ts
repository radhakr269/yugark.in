import { Resend } from 'resend';
import type { LeadRecord } from '../types';
import { detectServiceConfig } from '../config/serviceConfig';

let resendClient: Resend | null = null;

function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey || apiKey.startsWith('MY_') || apiKey.length < 5) {
    return null;
  }

  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }

  return resendClient;
}

export function getAdminEmail(): string {
  return process.env.ADMIN_EMAIL?.trim() || 'business@yugark.in';
}

function getFromAddress(): string {
  return (
    process.env.EMAIL_FROM?.trim() ||
    'YUGARK Digital Studio <business@yugark.in>'
  );
}

export interface EmailDispatchResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Sends a package-specific confirmation email to the lead.
 */
export async function sendLeadConfirmationEmail(lead: LeadRecord): Promise<EmailDispatchResult> {
  const resend = getResend();
  const fromAddress = getFromAddress();
  const serviceConfig = detectServiceConfig(lead.service || lead.selected_bundle);

  const formattedDate = new Date(lead.created_at).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium'
  });

  const appUrl = (process.env.APP_URL || 'https://www.yugark.in').replace(/\/$/, '');
  const ctaUrl = `${appUrl}${serviceConfig.ctaUrl}`;

  const subject = serviceConfig.emailSubject.replace('[NAME]', lead.full_name);

  const textContent = `
Hi ${lead.full_name},

Thank you for contacting YUGARK Digital Studio.

We received your enquiry for:
${serviceConfig.serviceName}

Our team and Founder Mr. Radha Krishna will review your requirement and get back to you shortly.

=========================================
YOUR ENQUIRY DETAILS:
- Lead Ref:   ${lead.id}
- Package:    ${serviceConfig.serviceName}
- Name:       ${lead.full_name}
- Business:   ${lead.business_company_name} (${lead.category || 'General'})
- Contact:    ${lead.whatsapp_number}
- Budget:     ${lead.budget || 'Custom'}
- Timeline:   ${lead.timeline || 'Flexible'}
- Requirement:${lead.project_requirement}
=========================================

WHAT HAPPENS NEXT:
1. Requirement Review: Our lead architect reviews your submission within 4-12 hours.
2. Custom Action Plan: We prepare tailored deliverables matching your industry goals.
3. Discovery Call: We connect via your preferred contact method (${lead.preferred_contact_method || 'WhatsApp'}).

${serviceConfig.ctaText}: ${ctaUrl}
Direct WhatsApp Support: https://wa.me/919125205132

Regards,
YUGARK Digital Studio
Founder: Mr. Radha Krishna
Website: https://www.yugark.in
`;

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${subject}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #050505;
      color: #e5e5e5;
      margin: 0;
      padding: 24px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #0c0c0c;
      border: 1px solid #d4b06a40;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6);
    }
    .header {
      background: linear-gradient(135deg, #18150e, #0c0c0c);
      padding: 32px 24px;
      border-bottom: 1px solid #d4b06a30;
      text-align: center;
    }
    .logo {
      color: #d4b06a;
      font-size: 24px;
      font-weight: 800;
      letter-spacing: 3px;
      text-transform: uppercase;
      margin: 0 0 6px 0;
    }
    .badge {
      display: inline-block;
      padding: 5px 14px;
      background-color: rgba(212, 176, 106, 0.15);
      border: 1px solid #d4b06a;
      color: #f0d28f;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-top: 8px;
    }
    .content {
      padding: 32px 24px;
      font-size: 14px;
      line-height: 1.65;
    }
    .greeting {
      font-size: 18px;
      color: #ffffff;
      font-weight: 600;
      margin-bottom: 12px;
    }
    .package-card {
      background: linear-gradient(145deg, #141414, #101010);
      border: 1px solid #d4b06a50;
      border-radius: 12px;
      padding: 20px;
      margin: 20px 0;
    }
    .package-title {
      font-size: 16px;
      color: #f0d28f;
      font-weight: 700;
      margin: 0 0 8px 0;
    }
    .package-desc {
      font-size: 13px;
      color: #b0b0b0;
      margin: 0 0 14px 0;
      line-height: 1.5;
    }
    .deliverable-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .deliverable-list li {
      position: relative;
      padding-left: 20px;
      margin-bottom: 8px;
      font-size: 12.5px;
      color: #e0e0e0;
    }
    .deliverable-list li::before {
      content: "✦";
      position: absolute;
      left: 0;
      color: #d4b06a;
      font-size: 11px;
    }
    .section-title {
      font-size: 12px;
      color: #d4b06a;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      font-weight: 700;
      margin-top: 24px;
      margin-bottom: 10px;
      border-bottom: 1px solid #222;
      padding-bottom: 4px;
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 12px;
    }
    .data-table td {
      padding: 8px 0;
      vertical-align: top;
      border-bottom: 1px solid #181818;
    }
    .data-table .label {
      color: #888;
      width: 120px;
      font-size: 13px;
    }
    .data-table .value {
      color: #ffffff;
      font-size: 13px;
      font-weight: 600;
    }
    .cta-btn {
      display: inline-block;
      padding: 14px 32px;
      background: linear-gradient(135deg, #d4b06a, #c9a35e);
      color: #000000 !important;
      text-decoration: none;
      font-weight: 700;
      font-size: 13px;
      border-radius: 8px;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      margin: 20px 0 10px 0;
      text-align: center;
      box-shadow: 0 4px 15px rgba(212, 176, 106, 0.3);
    }
    .founder-signature {
      margin-top: 28px;
      padding-top: 20px;
      border-top: 1px solid #222;
      font-size: 13px;
      color: #aaa;
    }
    .founder-name {
      color: #f0d28f;
      font-weight: 700;
      font-size: 14px;
    }
    .footer {
      padding: 24px;
      text-align: center;
      font-size: 11px;
      color: #666;
      background-color: #070707;
      border-top: 1px solid #161616;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="logo">YUGARK DIGITAL STUDIO</h1>
      <div class="badge">Project Enquiry Confirmed</div>
      <p style="color:#888;font-size:12px;margin:8px 0 0 0;">Reference ID: <strong style="color:#f0d28f;">${lead.id}</strong></p>
    </div>

    <div class="content">
      <div class="greeting">Hi ${lead.full_name},</div>
      <p>Thank you for contacting <strong>YUGARK Digital Studio</strong>. We have successfully received your project enquiry and our executive team will review your requirements.</p>

      <div class="package-card">
        <div class="package-title">${serviceConfig.serviceName}</div>
        <p class="package-desc">${serviceConfig.tagline}</p>
        <div class="section-title" style="margin-top:0;border:none;">Included Capabilities:</div>
        <ul class="deliverable-list">
          ${serviceConfig.emailDeliverables.map(d => `<li>${d}</li>`).join('')}
        </ul>
      </div>

      <div class="section-title">Your Submitted Scope</div>
      <table class="data-table">
        <tr>
          <td class="label">Business</td>
          <td class="value">${lead.business_company_name} (${lead.category || 'General'})</td>
        </tr>
        <tr>
          <td class="label">Requirement</td>
          <td class="value">${lead.project_requirement}</td>
        </tr>
        ${lead.budget ? `<tr><td class="label">Budget</td><td class="value" style="color:#f0d28f;">${lead.budget}</td></tr>` : ''}
        ${lead.timeline ? `<tr><td class="label">Timeline</td><td class="value">${lead.timeline}</td></tr>` : ''}
        <tr>
          <td class="label">Preferred Contact</td>
          <td class="value">${lead.preferred_contact_method || 'WhatsApp'}</td>
        </tr>
        <tr>
          <td class="label">Submitted At</td>
          <td class="value">${formattedDate}</td>
        </tr>
      </table>

      <div style="text-align:center;margin-top:28px;">
        <a href="${ctaUrl}" class="cta-btn">${serviceConfig.ctaText} &rarr;</a>
        <br />
        <a href="https://wa.me/919125205132" style="color:#25d366;font-size:12px;text-decoration:none;display:inline-block;margin-top:10px;">
          💬 Chat with Founder on WhatsApp (+91 91252 05132)
        </a>
      </div>

      <div class="founder-signature">
        Warm regards,<br />
        <span class="founder-name">Mr. Radha Krishna</span><br />
        Founder & Chief Strategist<br />
        YUGARK Digital Studio &bull; Lucknow, India
      </div>
    </div>

    <div class="footer">
      &copy; ${new Date().getFullYear()} YUGARK Digital Studio. All rights reserved.<br />
      If you did not request this communication, you can ignore this email.
    </div>
  </div>
</body>
</html>
`;

  if (!resend) {
    console.warn(`[EMAIL NOTICE] RESEND_API_KEY is not configured. Email to lead ${lead.email} skipped.`);
    return {
      success: false,
      error: 'RESEND_API_KEY is not configured on server'
    };
  }

  try {
    const result = await resend.emails.send({
      from: fromAddress,
      to: [lead.email],
      subject,
      text: textContent,
      html: htmlContent
    });

    if (result.error) {
      console.error('[LEAD CONFIRMATION EMAIL ERROR]', result.error);
      return {
        success: false,
        error: result.error.message || 'Resend error'
      };
    }

    console.log(`[LEAD CONFIRMATION EMAIL SENT] To ${lead.email} (${result.data?.id})`);
    return {
      success: true,
      messageId: result.data?.id
    };
  } catch (err: any) {
    console.error('[LEAD EMAIL EXCEPTION]', err);
    return {
      success: false,
      error: err?.message || 'Email delivery exception'
    };
  }
}

/**
 * Sends an internal notification email to the studio team.
 */
export async function sendInternalTeamNotificationEmail(lead: LeadRecord): Promise<EmailDispatchResult> {
  const adminEmail = getAdminEmail();
  const resend = getResend();
  const fromAddress = getFromAddress();
  const serviceConfig = detectServiceConfig(lead.service || lead.selected_bundle);

  const formattedDate = new Date(lead.created_at).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium'
  });

  const appUrl = (process.env.APP_URL || 'https://www.yugark.in').replace(/\/$/, '');
  const adminUrl = `${appUrl}/admin`;

  const subject = `🔥 NEW LEAD: ${lead.id} — ${lead.full_name} [${serviceConfig.serviceName}] (${lead.business_company_name})`;

  const whatsappDigits = String(lead.whatsapp_number || '').replace(/[^0-9]/g, '');

  const textContent = `
NEW YUGARK DIGITAL STUDIO LEAD RECEIVED

=========================================
Lead ID:     ${lead.id}
Package:     ${serviceConfig.serviceName} (${serviceConfig.category})
Submitted:   ${formattedDate}
Source:      ${lead.page_source || 'Website'} (${lead.form_source || 'Contact Form'})
=========================================

CLIENT CONTACT:
- Full Name:    ${lead.full_name}
- Email:        ${lead.email}
- WhatsApp:     ${lead.whatsapp_number}
- Business:     ${lead.business_company_name}
- Category:     ${lead.category || 'Other'} ${lead.other_category ? `(${lead.other_category})` : ''}
- Preferred:    ${lead.preferred_contact_method || 'WhatsApp'}

PROJECT SCOPE:
- Package:      ${serviceConfig.serviceName}
- Budget:       ${lead.budget || 'Standard / Unspecified'}
- Timeline:     ${lead.timeline || 'Immediate / Flexible'}
- Requirement:  ${lead.project_requirement}
- Remarks:      ${lead.remarks || 'None'}

CONSENTS:
- Email:        ${lead.consent_email ? 'Granted (Yes)' : 'Not granted'}
- WhatsApp:     ${lead.consent_whatsapp ? 'Granted (Yes)' : 'Not granted'}
- SMS:          ${lead.consent_sms ? 'Granted (Yes)' : 'Not granted'}

=========================================
QUICK ACTIONS:
Open Admin Portal: ${adminUrl}
Direct WhatsApp:   https://wa.me/${whatsappDigits}
Call Directly:     tel:${lead.whatsapp_number}
=========================================
`;

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color:#050505; color:#e5e5e5; margin:0; padding:20px; }
    .container { max-width:600px; margin:0 auto; background:#0a0a0a; border:1px solid #d4b06a40; border-radius:14px; overflow:hidden; }
    .header { background:linear-gradient(135deg, #18150c, #0a0a0a); padding:24px; border-bottom:1px solid #d4b06a30; text-align:center; }
    .logo { color:#d4b06a; font-size:20px; font-weight:700; letter-spacing:2px; text-transform:uppercase; margin:0; }
    .badge { display:inline-block; padding:4px 12px; background:#d4b06a20; border:1px solid #d4b06a; color:#f0d28f; border-radius:20px; font-size:11px; font-weight:700; margin-top:8px; }
    .content { padding:24px; font-size:13.5px; line-height:1.6; }
    .data-table { width:100%; border-collapse:collapse; margin-bottom:14px; }
    .data-table td { padding:8px 0; border-bottom:1px solid #161616; vertical-align:top; }
    .data-table .label { color:#888; width:130px; font-size:12.5px; }
    .data-table .value { color:#fff; font-weight:600; font-size:13.5px; }
    .box { background:#121212; border:1px solid #262626; border-radius:8px; padding:12px; margin:10px 0; color:#d4d4d4; white-space:pre-wrap; font-size:12.5px; }
    .cta-btn { display:inline-block; padding:12px 28px; background:linear-gradient(135deg, #d4b06a, #c9a35e); color:#000 !important; text-decoration:none; font-weight:700; font-size:12.5px; border-radius:8px; text-transform:uppercase; margin:16px 0 6px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="logo">YUGARK DIGITAL STUDIO</h1>
      <div class="badge">🔥 New Client Enquiry Generated</div>
      <p style="color:#999;font-size:12px;margin:6px 0 0 0;">Lead Ref: <strong style="color:#f0d28f;">${lead.id}</strong></p>
    </div>
    <div class="content">
      <table class="data-table">
        <tr><td class="label">Full Name</td><td class="value">${lead.full_name}</td></tr>
        <tr><td class="label">Email</td><td class="value"><a href="mailto:${lead.email}" style="color:#d4b06a;">${lead.email}</a></td></tr>
        <tr><td class="label">WhatsApp / Phone</td><td class="value"><a href="https://wa.me/${whatsappDigits}" style="color:#25d366;">${lead.whatsapp_number}</a></td></tr>
        <tr><td class="label">Company / Brand</td><td class="value">${lead.business_company_name}</td></tr>
        <tr><td class="label">Industry Category</td><td class="value">${lead.category || 'Other'} ${lead.other_category ? `(${lead.other_category})` : ''}</td></tr>
        <tr><td class="label">Identified Package</td><td class="value" style="color:#f0d28f;">${serviceConfig.serviceName}</td></tr>
        ${lead.budget ? `<tr><td class="label">Budget</td><td class="value" style="color:#4ade80;">${lead.budget}</td></tr>` : ''}
        ${lead.timeline ? `<tr><td class="label">Timeline</td><td class="value">${lead.timeline}</td></tr>` : ''}
        <tr><td class="label">Preferred Contact</td><td class="value">${lead.preferred_contact_method || 'WhatsApp'}</td></tr>
        <tr><td class="label">Page Source</td><td class="value">${lead.page_source || 'Website'} (${lead.form_source || 'Form'})</td></tr>
        <tr><td class="label">Submitted At</td><td class="value">${formattedDate}</td></tr>
      </table>

      <div style="font-weight:700;color:#d4b06a;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-top:14px;">Project Requirement</div>
      <div class="box">${lead.project_requirement}</div>

      ${lead.remarks ? `
        <div style="font-weight:700;color:#d4b06a;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-top:14px;">Additional Remarks</div>
        <div class="box">${lead.remarks}</div>
      ` : ''}

      <div style="text-align:center;margin-top:20px;">
        <a href="${adminUrl}" class="cta-btn">View in Admin Dashboard &rarr;</a>
        <br />
        <a href="https://wa.me/${whatsappDigits}" style="color:#25d366;font-size:12px;text-decoration:none;display:inline-block;margin-top:10px;">
          💬 Open WhatsApp Chat with Client
        </a>
      </div>
    </div>
  </div>
</body>
</html>
`;

  if (!resend) {
    console.warn(`[INTERNAL NOTIFICATION EMAIL] RESEND_API_KEY not configured. Alert to ${adminEmail} skipped.`);
    return {
      success: false,
      error: 'RESEND_API_KEY is not configured on server'
    };
  }

  try {
    const result = await resend.emails.send({
      from: fromAddress,
      to: [adminEmail],
      replyTo: lead.email,
      subject,
      text: textContent,
      html: htmlContent
    });

    if (result.error) {
      console.error('[INTERNAL NOTIFICATION EMAIL ERROR]', result.error);
      return {
        success: false,
        error: result.error.message || 'Resend error'
      };
    }

    return {
      success: true,
      messageId: result.data?.id
    };
  } catch (err: any) {
    console.error('[INTERNAL EMAIL EXCEPTION]', err);
    return {
      success: false,
      error: err?.message || 'Email delivery exception'
    };
  }
}
