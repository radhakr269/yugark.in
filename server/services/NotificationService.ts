import type { LeadRecord } from '../types';
import { sendInternalTeamNotificationEmail } from './EmailService';
import { detectServiceConfig } from '../config/serviceConfig';

export interface NotificationDispatchResult {
  success: boolean;
  status: 'SENT' | 'FAILED' | 'SKIPPED';
  error?: string;
  channelsSent: string[];
}

/**
 * Dispatches an internal alert across all configured studio notification channels.
 */
export async function sendInternalStudioNotification(lead: LeadRecord): Promise<NotificationDispatchResult> {
  const channelsSent: string[] = [];
  let hasSuccess = false;
  let primaryError: string | undefined;

  const serviceConfig = detectServiceConfig(lead.service || lead.selected_bundle);
  const appUrl = (process.env.APP_URL || 'https://www.yugark.in').replace(/\/$/, '');
  const adminUrl = `${appUrl}/admin`;

  // 1. Primary Channel: Admin Email Notification
  try {
    const emailRes = await sendInternalTeamNotificationEmail(lead);
    if (emailRes.success) {
      channelsSent.push('email');
      hasSuccess = true;
    } else if (emailRes.error) {
      primaryError = emailRes.error;
    }
  } catch (err: any) {
    primaryError = err?.message;
  }

  // 2. Optional Channel: Telegram Bot Alert
  const telegramToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const telegramChatId = process.env.TELEGRAM_CHAT_ID?.trim();

  if (telegramToken && telegramChatId && !telegramToken.startsWith('MY_')) {
    try {
      const tgText = `🔥 *NEW YUGARK LEAD*\n\n` +
        `*ID:* \`${lead.id}\`\n` +
        `*Client:* ${lead.full_name}\n` +
        `*Business:* ${lead.business_company_name} (${lead.category || 'General'})\n` +
        `*Phone:* [${lead.whatsapp_number}](https://wa.me/${String(lead.whatsapp_number).replace(/[^0-9]/g, '')})\n` +
        `*Email:* ${lead.email}\n` +
        `*Package:* *${serviceConfig.serviceName}*\n` +
        `*Budget:* ${lead.budget || 'Custom'}\n` +
        `*Timeline:* ${lead.timeline || 'Flexible'}\n\n` +
        `*Requirement:*\n_${lead.project_requirement}_\n\n` +
        `🔗 [Open Admin Portal](${adminUrl})`;

      const tgRes = await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: tgText,
          parse_mode: 'Markdown',
          disable_web_page_preview: true
        })
      });

      if (tgRes.ok) {
        channelsSent.push('telegram');
        hasSuccess = true;
      }
    } catch (tgErr) {
      console.warn('[TELEGRAM ALERT EXCEPTION]', tgErr);
    }
  }

  // 3. Optional Channel: Slack / Discord Webhook
  const slackWebhook = process.env.SLACK_WEBHOOK_URL?.trim();
  const discordWebhook = process.env.DISCORD_WEBHOOK_URL?.trim();
  const webhookUrl = slackWebhook || discordWebhook;

  if (webhookUrl && !webhookUrl.startsWith('MY_')) {
    try {
      const webhookPayload = {
        text: `🔥 *New YUGARK Lead: ${lead.full_name}* (${lead.business_company_name})\n` +
          `*Package:* ${serviceConfig.serviceName}\n` +
          `*Phone:* ${lead.whatsapp_number} | *Email:* ${lead.email}\n` +
          `*Requirement:* ${lead.project_requirement}\n` +
          `*Admin Portal:* <${adminUrl}|View Lead>`
      };

      const whRes = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(webhookPayload)
      });

      if (whRes.ok) {
        channelsSent.push('webhook');
        hasSuccess = true;
      }
    } catch (whErr) {
      console.warn('[WEBHOOK ALERT EXCEPTION]', whErr);
    }
  }

  if (hasSuccess) {
    return {
      success: true,
      status: 'SENT',
      channelsSent
    };
  }

  return {
    success: false,
    status: 'FAILED',
    error: primaryError || 'No notification providers could be reached',
    channelsSent
  };
}
