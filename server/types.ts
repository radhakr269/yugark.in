export type LeadStatus = 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'QUALIFIED' | 'CONVERTED' | 'CLOSED' | 'SPAM';
export type LeadPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type NotificationStatus = 'PENDING' | 'EMAIL_SENT' | 'EMAIL_FAILED' | 'SKIPPED';

export interface LeadRecord {
  id: string; // e.g. "YG-2026-000001"
  created_at: string;
  updated_at: string;
  full_name: string;
  email: string;
  whatsapp_number: string;
  business_company_name: string;
  category: string;
  other_category?: string;
  selected_bundle: string;
  service?: string;
  other_service?: string;
  project_requirement: string;
  remarks?: string;
  page_source: string;
  form_source: string;
  status: LeadStatus;
  priority: LeadPriority;
  admin_notes: string;
  notification_status: NotificationStatus;
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
  remarks?: string;
  pageSource?: string;
  formSource?: string;
  website_url_hp?: string; // Honeypot field
}

export interface AdminStats {
  total: number;
  newLeads: number;
  contacted: number;
  inProgress: number;
  qualified: number;
  converted: number;
  closed: number;
  spam: number;
  todayCount: number;
  weekCount: number;
  monthCount: number;
}
