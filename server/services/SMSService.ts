import type { LeadRecord } from '../types';
import { detectServiceConfig } from '../config/serviceConfig';
import { formatPhoneNumberE164 } from './WhatsAppService';

export interface SMSDispatchResult {
  success: boolean;
  status: 'SENT' | 'FAILED' | 'SKIPPED';
  messageId?: string;
  error?: string;
  provider?: 'twilio' | 'custom_gateway' | 'none';
}

/**
 * Sends a concise, package-specific SMS if configured and user consent exists.
 */
export async function sendLeadSMS(lead: LeadRecord): Promise<SMSDispatchResult> {
  // 1. Consent Verification Check
  if (lead.consent_sms !== true) {
    console.log(`[SMS SKIPPED] Lead ${lead.id} did not opt-in to SMS communication.`);
    return {
      success: false,
      status: 'SKIPPED',
      error: 'User did not opt-in to SMS communication'
    };
  }

  const rawPhone = lead.phone || lead.whatsapp_number;
  const recipientPhone = formatPhoneNumberE164(rawPhone);

  if (!recipientPhone || recipientPhone.length < 9) {
    return {
      success: false,
      status: 'FAILED',
      error: `Invalid phone number for SMS: "${rawPhone}"`
    };
  }

  const serviceConfig = detectServiceConfig(lead.service || lead.selected_bundle);
  const messageBody = serviceConfig.smsMessage({ name: lead.full_name });

  // Check Provider 1: Twilio SMS
  const twilioSid = process.env.TWILIO_ACCOUNT_SID?.trim();
  const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN?.trim();
  const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER?.trim();

  if (twilioSid && twilioAuthToken && twilioPhoneNumber && !twilioSid.startsWith('MY_')) {
    try {
      console.log(`[TWILIO SMS DISPATCH] Sending to +${recipientPhone} for lead ${lead.id}...`);

      const params = new URLSearchParams();
      params.append('From', twilioPhoneNumber);
      params.append('To', `+${recipientPhone}`);
      params.append('Body', messageBody);

      const authHeader = `Basic ${Buffer.from(`${twilioSid}:${twilioAuthToken}`).toString('base64')}`;

      const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`, {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString()
      });

      const data: any = await response.json();

      if (!response.ok || data.error_code) {
        const errMsg = data.message || `Twilio SMS error (${data.error_code || response.status})`;
        console.error('[TWILIO SMS ERROR]', data);
        return {
          success: false,
          status: 'FAILED',
          error: errMsg,
          provider: 'twilio'
        };
      }

      const messageId = data.sid || `twilio_sms_${Date.now()}`;
      console.log(`[TWILIO SMS SUCCESS] Lead ${lead.id} SMS sent. SID: ${messageId}`);

      return {
        success: true,
        status: 'SENT',
        messageId,
        provider: 'twilio'
      };
    } catch (err: any) {
      console.error('[TWILIO SMS EXCEPTION]', err);
      return {
        success: false,
        status: 'FAILED',
        error: err?.message || 'Twilio SMS connection exception',
        provider: 'twilio'
      };
    }
  }

  // Check Provider 2: Custom Generic SMS Gateway / Webhook
  const smsGatewayUrl = process.env.SMS_GATEWAY_URL?.trim();
  const smsGatewayKey = process.env.SMS_GATEWAY_KEY?.trim();

  if (smsGatewayUrl && !smsGatewayUrl.startsWith('MY_')) {
    try {
      const response = await fetch(smsGatewayUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(smsGatewayKey ? { 'Authorization': `Bearer ${smsGatewayKey}` } : {})
        },
        body: JSON.stringify({
          to: recipientPhone,
          message: messageBody,
          leadId: lead.id,
          name: lead.full_name
        })
      });

      if (response.ok) {
        return {
          success: true,
          status: 'SENT',
          messageId: `gateway_${Date.now()}`,
          provider: 'custom_gateway'
        };
      }

      return {
        success: false,
        status: 'FAILED',
        error: `SMS Gateway returned HTTP ${response.status}`,
        provider: 'custom_gateway'
      };
    } catch (err: any) {
      return {
        success: false,
        status: 'FAILED',
        error: err?.message || 'Custom SMS Gateway connection exception',
        provider: 'custom_gateway'
      };
    }
  }

  // If no SMS provider credentials are configured
  console.warn(`[SMS NOTICE] SMS provider not configured (TWILIO_PHONE_NUMBER or SMS_GATEWAY_URL required).`);
  return {
    success: false,
    status: 'FAILED',
    error: 'SMS provider not configured in environment variables (Set TWILIO_PHONE_NUMBER or SMS_GATEWAY_URL)',
    provider: 'none'
  };
}
