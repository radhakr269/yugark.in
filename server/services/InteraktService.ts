import type { LeadRecord } from '../types.js';
import { detectServiceConfig } from '../config/serviceConfig.js';

export interface InteraktDispatchResult {
  success: boolean;
  status: 'SENT' | 'FAILED' | 'SKIPPED';
  messageId?: string;
  templateName?: string;
  error?: string;
  statusCode?: number;
  providerResponse?: any;
}

/**
 * Extracts country code and clean national phone number.
 * Defaults to India (+91) for standard 10-digit numbers.
 */
export function parsePhoneNumberForInterakt(phoneStr: string): {
  countryCode: string;
  phoneNumber: string;
  fullPhoneNumber: string;
  isValid: boolean;
} {
  const digits = String(phoneStr || '').replace(/[^0-9]/g, '');
  if (!digits || digits.length < 10) {
    return { countryCode: '+91', phoneNumber: digits, fullPhoneNumber: digits, isValid: false };
  }

  let countryCode = '+91';
  let phoneNumber = digits;

  if (digits.length === 10) {
    countryCode = '+91';
    phoneNumber = digits;
  } else if (digits.length === 11 && digits.startsWith('0')) {
    countryCode = '+91';
    phoneNumber = digits.slice(1);
  } else if (digits.length === 12 && digits.startsWith('91')) {
    countryCode = '+91';
    phoneNumber = digits.slice(2);
  } else if (digits.length > 10) {
    // International number, extract country code heuristically
    countryCode = `+${digits.slice(0, digits.length - 10)}`;
    phoneNumber = digits.slice(digits.length - 10);
  }

  const fullPhoneNumber = `${countryCode}${phoneNumber}`;
  const isValid = phoneNumber.length >= 10;

  return { countryCode, phoneNumber, fullPhoneNumber, isValid };
}

/**
 * Sends a package-specific WhatsApp template message via the official Interakt REST API.
 * Endpoint: https://api.interakt.ai/v1/public/message/
 */
export async function sendInteraktWhatsAppMessage(lead: LeadRecord): Promise<InteraktDispatchResult> {
  // 1. WhatsApp Consent Check
  if (lead.consent_whatsapp === false) {
    console.log(`[INTERAKT WHATSAPP SKIPPED] Lead ${lead.id} did not grant WhatsApp communication consent.`);
    return {
      success: false,
      status: 'SKIPPED',
      error: 'User did not grant WhatsApp communication consent'
    };
  }

  // 2. Validate and Parse Recipient Phone Number
  const rawPhone = lead.whatsapp_number || lead.phone || '';
  const parsed = parsePhoneNumberForInterakt(rawPhone);

  if (!parsed.isValid) {
    console.warn(`[INTERAKT WHATSAPP FAILED] Invalid phone number provided: "${rawPhone}"`);
    return {
      success: false,
      status: 'FAILED',
      error: `Invalid phone number format: "${rawPhone}". Requires at least a valid 10-digit number.`
    };
  }

  // 3. Resolve Interakt API Credentials from Environment
  const apiKey = (
    process.env.INTERAKT_API_KEY ||
    process.env.INTERAKT_SECRET_KEY ||
    ''
  ).trim();

  const baseUrl = (
    process.env.INTERAKT_BASE_URL ||
    'https://api.interakt.ai'
  ).replace(/\/$/, '');

  if (!apiKey || apiKey.startsWith('MY_') || apiKey.length < 4) {
    const errorMsg = 'INTERAKT_API_KEY is not configured on Vercel environment variables.';
    console.warn(`[INTERAKT WHATSAPP CONFIG WARNING] ${errorMsg}`);
    return {
      success: false,
      status: 'FAILED',
      error: errorMsg
    };
  }

  // 4. Detect Package and Retrieve Specific Interakt Template Config
  const serviceConfig = detectServiceConfig(lead.service || lead.selected_bundle);
  const templateName = serviceConfig.whatsappTemplateId || 'yugark_lead_ack_generic';

  // Body values mapping for {{1}}, {{2}}, {{3}}, {{4}}
  const bodyValues: string[] = [
    lead.full_name || 'Valued Client',
    lead.business_company_name || 'your business',
    serviceConfig.serviceName || 'Growth Service',
    lead.id || ''
  ];

  // Interakt Authorization header format: "Basic <YOUR_API_KEY>"
  const authHeader = apiKey.startsWith('Basic ') ? apiKey : `Basic ${apiKey}`;

  // 5. Optional: Track/Sync User in Interakt CRM prior to messaging
  try {
    fetch(`${baseUrl}/v1/public/track/users/`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        countryCode: parsed.countryCode,
        phoneNumber: parsed.phoneNumber,
        traits: {
          name: lead.full_name,
          email: lead.email,
          business_name: lead.business_company_name,
          service: serviceConfig.serviceName,
          budget: lead.budget || '',
          timeline: lead.timeline || '',
          lead_id: lead.id,
          page_source: lead.page_source || ''
        }
      })
    }).catch(err => {
      console.warn('[INTERAKT TRACK USER NON-BLOCKING EXCEPTION]', err?.message);
    });
  } catch {
    // Non-blocking tracking
  }

  // 6. Send Interakt WhatsApp Template Message
  const messagePayload = {
    countryCode: parsed.countryCode,
    phoneNumber: parsed.phoneNumber,
    fullPhoneNumber: parsed.fullPhoneNumber,
    type: 'Template',
    template: {
      name: templateName,
      languageCode: 'en',
      bodyValues: bodyValues
    },
    callbackData: lead.id
  };

  try {
    console.log(`[INTERAKT DISPATCH] Sending WhatsApp template "${templateName}" to ${parsed.fullPhoneNumber} for Lead ${lead.id}...`);

    const response = await fetch(`${baseUrl}/v1/public/message/`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(messagePayload)
    });

    let resData: any = null;
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      resData = await response.json().catch(() => null);
    } else {
      const text = await response.text().catch(() => '');
      resData = { raw: text };
    }

    if (!response.ok) {
      const errMsg =
        resData?.message ||
        resData?.error ||
        resData?.errors?.[0]?.message ||
        `Interakt API responded with HTTP status ${response.status}: ${response.statusText}`;

      console.error(`[INTERAKT API ERROR] Status ${response.status}:`, resData);

      return {
        success: false,
        status: 'FAILED',
        error: errMsg,
        statusCode: response.status,
        templateName,
        providerResponse: resData
      };
    }

    const messageId =
      resData?.id ||
      resData?.data?.id ||
      resData?.messageId ||
      `interakt_${Date.now()}`;

    console.log(`[INTERAKT SUCCESS] WhatsApp dispatched for Lead ${lead.id}. Message ID: ${messageId}`);

    return {
      success: true,
      status: 'SENT',
      messageId,
      templateName,
      statusCode: response.status,
      providerResponse: resData
    };
  } catch (err: any) {
    const errorMsg = `Interakt network exception: ${err?.message || 'Connection failed'}`;
    console.error(`[INTERAKT EXCEPTION] Lead ${lead.id}:`, err);

    return {
      success: false,
      status: 'FAILED',
      error: errorMsg,
      templateName
    };
  }
}
