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

export type LeadStatus = 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'QUALIFIED' | 'CONVERTED' | 'CLOSED' | 'SPAM';
export type LeadPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type NotificationStatus = 'PENDING' | 'EMAIL_SENT' | 'EMAIL_FAILED' | 'SKIPPED';

export interface EnquiryRecord {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  businessCategory: string;
  otherCategory?: string;
  selectedService: string;
  selectedBundle: string;
  projectRequirement: string;
  remarks?: string;
  status: LeadStatus | 'New' | 'Contacted' | 'In Discussion' | 'Converted' | 'Closed';
  priority?: LeadPriority;
  notes?: string;
  admin_notes?: string;
  page_source?: string;
  form_source?: string;
  notification_status?: NotificationStatus;
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
  remarks?: string;
  pageSource?: string;
  formSource?: string;
  website_url_hp?: string;
}


