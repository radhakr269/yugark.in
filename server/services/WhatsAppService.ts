import type { LeadRecord } from '../types.js';
import { sendInteraktWhatsAppMessage, parsePhoneNumberForInterakt, InteraktDispatchResult } from './InteraktService.js';

export interface WhatsAppDispatchResult {
  success: boolean;
  status: 'SENT' | 'FAILED' | 'SKIPPED';
  messageId?: string;
  templateId?: string;
  error?: string;
  provider?: 'interakt' | 'none';
}

export function formatPhoneNumberE164(phoneStr?: string): string {
  if (!phoneStr) return '';
  const parsed = parsePhoneNumberForInterakt(phoneStr);
  return parsed.fullPhoneNumber.replace('+', '');
}

/**
 * Dispatches a package-specific WhatsApp message through official Interakt API.
 */
export async function sendLeadWhatsAppMessage(lead: LeadRecord): Promise<WhatsAppDispatchResult> {
  const result: InteraktDispatchResult = await sendInteraktWhatsAppMessage(lead);

  return {
    success: result.success,
    status: result.status,
    messageId: result.messageId,
    templateId: result.templateName,
    error: result.error,
    provider: 'interakt'
  };
}
