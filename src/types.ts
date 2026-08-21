export type ServiceModelType = 'one-time' | 'monthly';

export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  iconName: string;
  modelType: ServiceModelType; // 'one-time' vs 'monthly'
  priceDisplay?: string;
  deliveryTime?: string;
  features: string[];
  link: string;
  category: 'web' | 'video' | 'social' | 'content' | 'ads' | 'growth' | 'ai';
  fullDescription?: string;
  deliverables?: string[];
  benefits?: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  summary: string;
  heroImage: string;
  challenge: string;
  solution: string;
  results: {
    label: string;
    value: string;
  }[];
  technology: string[];
  category: string;
  isConcept?: boolean;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface PricingPackage {
  id: string;
  name: string;
  tagline: string;
  badge?: string;
  popularBadge?: string;
  regularPrice: number;
  launchPrice: number;
  type: 'one-time' | 'monthly';
  deliveryTime: string;
  features: string[];
  monthlyComponents?: string[];
  ctaText: string;
  isPopular?: boolean;
}

export interface IndividualServiceItem {
  id: string;
  title: string;
  price: number;
  unit: string;
  category?: string;
  deliveryTime: string;
  description: string;
  features: string[];
}

export interface BusinessTemplate {
  id: string;
  industry: string;
  demoName?: string;
  tagline: string;
  iconName: string;
  previewImage?: string;
  themeColor?: string;
  liveBadge?: string;
  pagesIncluded?: string;
  websiteIncludes: string[];
  videoContent: string[];
  socialContent: string[];
  growthFocus: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  isPopular?: boolean;
  features: string[];
  notIncluded?: string[];
  ctaText: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'Websites' | 'Social Media' | 'AI' | 'Growth' | 'SEO' | 'Content';
  author: string;
  date: string;
  readTime: string;
  coverImage: string;
}

export type LeadStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'IN_PROGRESS'
  | 'QUALIFIED'
  | 'PROPOSAL_SENT'
  | 'WON'
  | 'LOST'
  | 'CONVERTED'
  | 'CLOSED'
  | 'SPAM';

export type LeadPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type NotificationStatus = 'PENDING' | 'EMAIL_SENT' | 'EMAIL_FAILED' | 'SKIPPED';
export type ChannelDeliveryStatus = 'PENDING' | 'SENT' | 'FAILED' | 'SKIPPED' | 'OPTED_OUT';

export interface FollowUpStep {
  stepId: string;
  stageName: string;
  triggerDelay: string;
  channel: 'EMAIL' | 'WHATSAPP' | 'SMS' | 'PHONE_CALL';
  purpose: string;
  subjectOrHeadline: string;
  contentPreview: string;
}

export interface ServiceConfigItem {
  serviceId: string;
  serviceName: string;
  category: string;
  tagline: string;
  emailSubject: string;
  emailHeadline: string;
  whatsappTemplateId?: string;
  ctaText: string;
  ctaUrl: string;
  deliverables?: string[];
  followUpStepsCount?: number;
  followUpSequence?: FollowUpStep[];
}

export interface EnquiryRecord {
  id: string;
  createdAt: string;
  created_at?: string;
  updated_at?: string;
  fullName: string;
  full_name?: string;
  email: string;
  phone: string;
  whatsapp_number?: string;
  businessName: string;
  business_company_name?: string;
  businessCategory: string;
  category?: string;
  otherCategory?: string;
  other_category?: string;
  selectedService: string;
  service?: string;
  service_id?: string;
  service_name?: string;
  selectedBundle: string;
  selected_bundle?: string;
  projectRequirement: string;
  project_requirement?: string;
  budget?: string;
  timeline?: string;
  preferred_contact_method?: string;
  remarks?: string;
  status: LeadStatus;
  priority?: LeadPriority;
  notes?: string;
  admin_notes?: string;
  page_source?: string;
  form_source?: string;
  consent_email?: boolean;
  consent_whatsapp?: boolean;
  consent_sms?: boolean;
  email_status?: ChannelDeliveryStatus;
  email_sent_at?: string | null;
  email_error?: string | null;
  whatsapp_status?: ChannelDeliveryStatus;
  whatsapp_sent_at?: string | null;
  whatsapp_message_id?: string | null;
  whatsapp_error?: string | null;
  sms_status?: ChannelDeliveryStatus;
  sms_sent_at?: string | null;
  sms_message_id?: string | null;
  sms_error?: string | null;
  internal_notification_status?: ChannelDeliveryStatus;
  internal_notification_sent_at?: string | null;
  internal_notification_error?: string | null;
  notification_status?: NotificationStatus;
  follow_up_status?: string;
  contacted_at?: string | null;
  converted_at?: string | null;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  businessCategory: string;
  otherCategory?: string;
  selectedService: string;
  selectedBundle: string;
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
  website_url_hp?: string;
}
