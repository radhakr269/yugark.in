import { Resend } from 'resend';
import type { LeadRecord } from './types';

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
    'YUGARK Studio <business@yugark.in>'
  );
}

export async function sendLeadNotificationEmail(
  lead: LeadRecord
): Promise<{ success: boolean; error?: string }> {
  const adminEmail = getAdminEmail();
  const resend = getResend();
  const fromAddress = getFromAddress();

  const formattedDate = new Date(lead.created_at).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium'
  });

  const appUrl =
    process.env.APP_URL?.trim() || 'https://www.yugark.in';

  const adminUrl = `${appUrl.replace(/\/$/, '')}/admin`;

  const subject =
    `New YUGARK Lead — ${lead.id} — ${lead.full_name} (${lead.business_company_name})`;

  const whatsappDigits =
    String(lead.whatsapp_number || '').replace(/[^0-9]/g, '');

  const textContent = `
NEW YUGARK DIGITAL STUDIO ENQUIRY

=========================================
Lead ID:     ${lead.id}
Date & Time: ${formattedDate}
Source:      ${lead.page_source || 'Website'} (${lead.form_source || 'Lead Form'})
=========================================

CLIENT DETAILS:
- Name:        ${lead.full_name}
- Email:       ${lead.email}
- WhatsApp:    ${lead.whatsapp_number}
- Business:    ${lead.business_company_name}
- Category:    ${lead.category || 'Other'} ${lead.other_category ? `(${lead.other_category})` : ''}

PROJECT SCOPE:
- Package:     ${lead.selected_bundle || 'Not specified'}
- Service:     ${lead.service || lead.selected_bundle || 'Not specified'}
- Requirement: ${lead.project_requirement}
- Remarks:     ${lead.remarks || 'None'}

=========================================
Open Admin Dashboard: ${adminUrl}
Direct WhatsApp: https://wa.me/${whatsappDigits}
=========================================
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
      background-color: #0a0a0a;
      border: 1px solid #d4b06a40;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }

    .header {
      background: linear-gradient(135deg, #14120c, #0a0a0a);
      padding: 28px 24px;
      border-bottom: 1px solid #d4b06a30;
      text-align: center;
    }

    .logo {
      color: #d4b06a;
      font-size: 22px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin: 0;
    }

    .badge {
      display: inline-block;
      padding: 4px 12px;
      background-color: #d4b06a20;
      border: 1px solid #d4b06a;
      color: #f0d28f;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 600;
      margin-top: 10px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .content {
      padding: 28px 24px;
      font-size: 14px;
      line-height: 1.6;
    }

    .section-title {
      font-size: 12px;
      color: #d4b06a;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      font-weight: 700;
      margin-top: 20px;
      margin-bottom: 8px;
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
      border-bottom: 1px solid #161616;
    }

    .data-table .label {
      color: #888;
      width: 130px;
      font-size: 13px;
      font-weight: 500;
    }

    .data-table .value {
      color: #fff;
      font-size: 14px;
      font-weight: 600;
    }

    .box {
      background-color: #121212;
      border: 1px solid #262626;
      border-radius: 8px;
      padding: 14px;
      margin: 12px 0;
      color: #d4d4d4;
      white-space: pre-wrap;
      font-size: 13px;
    }

    .cta-btn {
      display: inline-block;
      padding: 12px 28px;
      background: linear-gradient(135deg, #d4b06a, #c9a35e);
      color: #000 !important;
      text-decoration: none;
      font-weight: 700;
      font-size: 13px;
      border-radius: 8px;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin: 18px 0 6px 0;
      text-align: center;
    }

    .footer {
      padding: 20px 24px;
      text-align: center;
      font-size: 11px;
      color: #666;
      background-color: #070707;
      border-top: 1px solid #1a1a1a;
    }
  </style>
</head>

<body>
  <div class="container">

    <div class="header">
      <h1 class="logo">YUGARK DIGITAL STUDIO</h1>

      <div class="badge">
        New Client Lead Generated
      </div>

      <p style="color:#999;font-size:12px;margin:8px 0 0 0;">
        Reference ID:
        <strong style="color:#f0d28f;">
          ${lead.id}
        </strong>
      </p>
    </div>

    <div class="content">

      <div class="section-title">
        Client Information
      </div>

      <table class="data-table">

        <tr>
          <td class="label">Full Name</td>
          <td class="value">${lead.full_name}</td>
        </tr>

        <tr>
          <td class="label">Email</td>
          <td class="value">
            <a
              href="mailto:${lead.email}"
              style="color:#d4b06a;text-decoration:none;"
            >
              ${lead.email}
            </a>
          </td>
        </tr>

        <tr>
          <td class="label">WhatsApp</td>
          <td class="value">
            <a
              href="https://wa.me/${whatsappDigits}"
              style="color:#25d366;text-decoration:none;"
            >
              ${lead.whatsapp_number}
            </a>
          </td>
        </tr>

        <tr>
          <td class="label">Company / Brand</td>
          <td class="value">
            ${lead.business_company_name}
          </td>
        </tr>

        <tr>
          <td class="label">Industry / Category</td>
          <td class="value">
            ${lead.category || 'Other'}
            ${lead.other_category ? `(${lead.other_category})` : ''}
          </td>
        </tr>

      </table>

      <div class="section-title">
        Package & Requirements
      </div>

      <table class="data-table">

        <tr>
          <td class="label">Selected Bundle</td>
          <td
            class="value"
            style="color:#f0d28f;"
          >
            ${lead.selected_bundle || 'Not specified'}
          </td>
        </tr>

        <tr>
          <td class="label">Service</td>
          <td class="value">
            ${lead.service || lead.selected_bundle || 'Not specified'}
          </td>
        </tr>

        <tr>
          <td class="label">Page Source</td>
          <td class="value">
            ${lead.page_source || 'Website'}
            (${lead.form_source || 'Lead Form'})
          </td>
        </tr>

        <tr>
          <td class="label">Submission Time</td>
          <td class="value">
            ${formattedDate}
          </td>
        </tr>

      </table>

      <div class="section-title">
        Project Scope & Details
      </div>

      <div class="box">
        ${lead.project_requirement}
      </div>

      ${
        lead.remarks
          ? `
        <div class="section-title">
          Additional Remarks
        </div>

        <div class="box">
          ${lead.remarks}
        </div>
      `
          : ''
      }

      <div
        style="
          text-align:center;
          margin-top:24px;
        "
      >
        <a
          href="${adminUrl}"
          class="cta-btn"
        >
          View in Admin Dashboard &rarr;
        </a>
      </div>

    </div>

    <div class="footer">
      This notification was automatically sent by
      YUGARK Digital Studio lead management system.
      <br />
      Official Studio Admin: ${adminEmail}
    </div>

  </div>
</body>
</html>
`;

  if (!resend) {
    console.warn(
      `[EMAIL NOTICE] RESEND_API_KEY is not configured. Email not sent to ${adminEmail} for lead ${lead.id}.`
    );

    return {
      success: false,
      error: 'RESEND_API_KEY is not configured'
    };
  }

  console.log('[EMAIL CONFIG]', {
    leadId: lead.id,
    adminEmail,
    fromAddress,
    resendConfigured: true
  });

  try {
    const result = await resend.emails.send({
      from: fromAddress,
      to: [adminEmail],
      replyTo: lead.email,
      subject,
      text: textContent,
      html: htmlContent
    });

    console.log('[RESEND RESPONSE]', {
      leadId: lead.id,
      data: result.data || null,
      error: result.error || null
    });

    if (result.error) {
      console.error(
        '[EMAIL ERROR] Resend failed:',
        result.error
      );

      return {
        success: false,
        error:
          result.error.message ||
          'Resend failed to send email'
      };
    }

    if (!result.data?.id) {
      console.error(
        '[EMAIL ERROR] Resend returned no email ID.'
      );

      return {
        success: false,
        error: 'Resend returned no email ID'
      };
    }

    console.log(
      `[EMAIL SUCCESS] Lead ${lead.id} notification sent to ${adminEmail}. Resend ID: ${result.data.id}`
    );

    return {
      success: true
    };
  } catch (err: any) {
    console.error(
      '[EMAIL EXCEPTION] Failed sending lead notification email:',
      err
    );

    return {
      success: false,
      error:
        err?.message ||
        'Unknown email error'
    };
  }
}
