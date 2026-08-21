import type { LeadRecord, ChannelDeliveryStatus } from '../types.js';
import { sendLeadConfirmationEmail } from './EmailService.js';
import { sendInteraktWhatsAppMessage } from './InteraktService.js';
import { sendInternalStudioNotification } from './NotificationService.js';
import { updateLeadCommunicationChannels, getLeadById } from '../db.js';
import { detectServiceConfig } from '../config/serviceConfig.js';

export interface DispatchSummary {
  leadId: string;
  serviceName: string;
  emailStatus: ChannelDeliveryStatus;
  whatsappStatus: ChannelDeliveryStatus;
  smsStatus: ChannelDeliveryStatus;
  internalNotificationStatus: ChannelDeliveryStatus;
  errors: {
    email?: string;
    whatsapp?: string;
    sms?: string;
    internalNotification?: string;
  };
}

/**
 * Dispatches package-specific automated communications concurrently (Resend + Interakt).
 * Non-blocking: failures in one channel do NOT cancel or crash other channels.
 * SMS is skipped as per production directives.
 */
export async function dispatchLeadAutomations(lead: LeadRecord): Promise<DispatchSummary> {
  const serviceConfig = detectServiceConfig(lead.service || lead.selected_bundle);
  console.log(`[AUTOMATION DISPATCH] Initiating Resend + Interakt flow for Lead ${lead.id} [${serviceConfig.serviceName}]`);

  const summary: DispatchSummary = {
    leadId: lead.id,
    serviceName: serviceConfig.serviceName,
    emailStatus: 'PENDING',
    whatsappStatus: 'PENDING',
    smsStatus: 'SKIPPED',
    internalNotificationStatus: 'PENDING',
    errors: {}
  };

  const now = new Date().toISOString();

  // 1. Dispatch in parallel: Resend (Email) + Interakt (WhatsApp) + Internal Alert
  const [emailResult, whatsappResult, internalResult] = await Promise.allSettled([
    // Channel 1: Resend Confirmation Email
    sendLeadConfirmationEmail(lead),

    // Channel 2: Interakt WhatsApp Template Message
    sendInteraktWhatsAppMessage(lead),

    // Channel 3: Internal Studio Team Notification (Admin Email / Alert)
    sendInternalStudioNotification(lead)
  ]);

  // Handle Email (Resend) result
  let emailSentAt: string | undefined;
  let emailError: string | undefined;
  if (emailResult.status === 'fulfilled') {
    if (emailResult.value.success) {
      summary.emailStatus = 'SENT';
      emailSentAt = now;
    } else {
      summary.emailStatus = 'FAILED';
      summary.errors.email = emailResult.value.error;
      emailError = emailResult.value.error;
    }
  } else {
    summary.emailStatus = 'FAILED';
    summary.errors.email = emailResult.reason?.message || 'Resend email dispatch exception';
    emailError = summary.errors.email;
  }

  // Handle WhatsApp (Interakt) result
  let whatsappSentAt: string | undefined;
  let whatsappMsgId: string | undefined;
  let whatsappError: string | undefined;
  if (whatsappResult.status === 'fulfilled') {
    summary.whatsappStatus = whatsappResult.value.status;
    if (whatsappResult.value.status === 'SENT') {
      whatsappSentAt = now;
      whatsappMsgId = whatsappResult.value.messageId;
    } else if (whatsappResult.value.status === 'FAILED') {
      summary.errors.whatsapp = whatsappResult.value.error;
      whatsappError = whatsappResult.value.error;
    }
  } else {
    summary.whatsappStatus = 'FAILED';
    summary.errors.whatsapp = whatsappResult.reason?.message || 'Interakt WhatsApp dispatch exception';
    whatsappError = summary.errors.whatsapp;
  }

  // Handle Internal Notification result
  let internalSentAt: string | undefined;
  let internalError: string | undefined;
  if (internalResult.status === 'fulfilled') {
    summary.internalNotificationStatus = internalResult.value.status;
    if (internalResult.value.status === 'SENT') {
      internalSentAt = now;
    } else if (internalResult.value.status === 'FAILED') {
      summary.errors.internalNotification = internalResult.value.error;
      internalError = internalResult.value.error;
    }
  } else {
    summary.internalNotificationStatus = 'FAILED';
    summary.errors.internalNotification = internalResult.reason?.message || 'Internal notification exception';
    internalError = summary.errors.internalNotification;
  }

  // 2. Persist communication results to Database
  try {
    await updateLeadCommunicationChannels(lead.id, {
      email_status: summary.emailStatus,
      email_sent_at: emailSentAt,
      email_error: emailError,
      whatsapp_status: summary.whatsappStatus,
      whatsapp_sent_at: whatsappSentAt,
      whatsapp_message_id: whatsappMsgId,
      whatsapp_error: whatsappError,
      sms_status: 'SKIPPED',
      internal_notification_status: summary.internalNotificationStatus,
      internal_notification_sent_at: internalSentAt,
      internal_notification_error: internalError,
      notification_status: summary.emailStatus === 'SENT' ? 'EMAIL_SENT' : 'EMAIL_FAILED',
      follow_up_status: 'T+0_ACK_DISPATCHED'
    });

    console.log(`[AUTOMATION DISPATCH COMPLETE] Lead ${lead.id} recorded with channels: Email(Resend)=${summary.emailStatus}, WhatsApp(Interakt)=${summary.whatsappStatus}, SMS=SKIPPED, Admin=${summary.internalNotificationStatus}`);
  } catch (dbErr) {
    console.error(`[AUTOMATION STATUS PERSIST ERROR] Lead ${lead.id}:`, dbErr);
  }

  return summary;
}

/**
 * Retries a specific communication channel for an existing lead (Invoked from Admin panel).
 */
export async function retryLeadChannel(leadId: string, channel: 'email' | 'whatsapp' | 'sms' | 'internal_notification' | 'all'): Promise<{
  success: boolean;
  message: string;
  lead?: LeadRecord | null;
}> {
  const lead = await getLeadById(leadId);
  if (!lead) {
    return { success: false, message: `Lead ${leadId} not found` };
  }

  const now = new Date().toISOString();

  if (channel === 'all') {
    await dispatchLeadAutomations(lead);
    const updated = await getLeadById(leadId);
    return { success: true, message: 'All automations re-dispatched', lead: updated };
  }

  if (channel === 'email') {
    const res = await sendLeadConfirmationEmail(lead);
    await updateLeadCommunicationChannels(leadId, {
      email_status: res.success ? 'SENT' : 'FAILED',
      email_sent_at: res.success ? now : undefined,
      email_error: res.error,
      notification_status: res.success ? 'EMAIL_SENT' : 'EMAIL_FAILED'
    });
    const updated = await getLeadById(leadId);
    return {
      success: res.success,
      message: res.success ? 'Lead confirmation email delivered via Resend' : `Email failed: ${res.error}`,
      lead: updated
    };
  }

  if (channel === 'whatsapp') {
    const res = await sendInteraktWhatsAppMessage(lead);
    await updateLeadCommunicationChannels(leadId, {
      whatsapp_status: res.status,
      whatsapp_sent_at: res.status === 'SENT' ? now : undefined,
      whatsapp_message_id: res.messageId,
      whatsapp_error: res.error
    });
    const updated = await getLeadById(leadId);
    return {
      success: res.success,
      message: res.success ? 'WhatsApp message delivered via Interakt' : `WhatsApp failed: ${res.error}`,
      lead: updated
    };
  }

  if (channel === 'sms') {
    return {
      success: false,
      message: 'SMS channel is inactive in current production configuration.'
    };
  }

  if (channel === 'internal_notification') {
    const res = await sendInternalStudioNotification(lead);
    await updateLeadCommunicationChannels(leadId, {
      internal_notification_status: res.status,
      internal_notification_sent_at: res.status === 'SENT' ? now : undefined,
      internal_notification_error: res.error
    });
    const updated = await getLeadById(leadId);
    return {
      success: res.success,
      message: res.success ? 'Internal notification sent' : `Notification failed: ${res.error}`,
      lead: updated
    };
  }

  return { success: false, message: 'Invalid channel specified' };
}
