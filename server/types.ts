export type LeadStatus = 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'QUALIFIED' | 'PROPOSAL_SENT' | 'WON' | 'LOST' | 'CONVERTED' | 'CLOSED' | 'SPAM';
export type LeadPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type ChannelDeliveryStatus = 'PENDING' | 'SENT' | 'FAILED' | 'SKIPPED';
export type NotificationStatus = 'PENDING' | 'EMAIL_SENT' | 'EMAIL_FAILED' | 'SKIPPED';

export interface LeadRecord {
  id: string; // e.g. "YG-2026-MEJ8X2AB-7F3A91C2"
  created_at: string;
  updated_at: string;
  full_name: string;
  email: string;
  whatsapp_number: string;
  phone?: string;
  business_company_name: string;
  category: string;
  other_category?: string;
  selected_bundle: string;
  service?: string;
  service_id?: string;
  service_name?: string;
  other_service?: string;
  project_requirement: string;
  remarks?: string;
  budget?: string;
  timeline?: string;
  preferred_contact_method?: string;
  page_source: string;
  form_source: string;
  status: LeadStatus;
  priority: LeadPriority;
  admin_notes: string;
  
  // Consent flags
  consent_email?: boolean;
  consent_whatsapp?: boolean;
  consent_sms?: boolean;

  // Multi-channel communication tracking
  email_status: ChannelDeliveryStatus;
  email_sent_at?: string | null;
  email_error?: string | null;

  whatsapp_status: ChannelDeliveryStatus;
  whatsapp_sent_at?: string | null;
  whatsapp_message_id?: string | null;
  whatsapp_error?: string | null;

  sms_status: ChannelDeliveryStatus;
  sms_sent_at?: string | null;
  sms_message_id?: string | null;
  sms_error?: string | null;

  internal_notification_status: ChannelDeliveryStatus;
  internal_notification_sent_at?: string | null;
  internal_notification_error?: string | null;

  // Follow-up sequence status
  follow_up_status?: string;

  // Legacy field support
  notification_status?: NotificationStatus;
  contacted_at?: string | null;
  converted_at?: string | null;
  ip_hash_or_safe_request_identifier?: string;
  user_agent_if_appropriate?: string;
}

export interface CreateLeadPayload {
  fullName: string;
  email: string;
  phone: string; // WhatsApp number
  businessName: string;
  businessCategory?: string;
  otherCategory?: string;
  selectedService?: string;
  selectedBundle?: string;
  projectRequirement: string;
  budget?: string;
  timeline?: string;
  preferredContactMethod?: string;
  remarks?: string;
  pageSource?: string;
  formSource?: string;
  consentEmail?: boolean;
  consentWhatsApp?: boolean;
  consentSMS?: boolean;
  website_url_hp?: string; // Honeypot field
}

export interface AdminStats {
  total: number;
  newLeads: number;
  contacted: number;
  inProgress: number;
  qualified: number;
  proposalSent: number;
  won: number;
  lost: number;
  converted: number;
  closed: number;
  spam: number;
  todayCount: number;
  weekCount: number;
  monthCount: number;
  emailDeliveredCount: number;
  whatsappDeliveredCount: number;
  smsDeliveredCount: number;
  failedAutomationsCount: number;
}
