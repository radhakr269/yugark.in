export type BillingDuration = 'one-time' | '1month' | '6months' | '1year' | 'none';

export interface ServiceItem {
  id: string;
  category: 'website' | 'social' | 'ads' | 'video';
  categoryLabel: string;
  categoryNumber: string;
  name: string;
  badge?: string;
  isPopular?: boolean;
  originalPrice?: number; // In INR for strikethrough display
  basePrice: number; // in INR (Launch offer price or standard base price)
  billingType: 'one-time' | 'monthly';
  tagline: string;
  description: string;
  features: string[];
  recommendedFor?: string;
}

export const MONTHLY_PLAN_IDS = ['starter-plan', 'growth-plan', 'pro-plan'];

export const ALL_PRICING_SERVICES: ServiceItem[] = [
  // 1. Website Development Services
  {
    id: 'frontend-web',
    category: 'website',
    categoryLabel: 'Website Development',
    categoryNumber: '01',
    name: 'Frontend Website',
    badge: 'LAUNCH OFFER',
    originalPrice: 15999,
    basePrice: 9999,
    billingType: 'one-time',
    tagline: 'Modern, high-converting digital storefront',
    description: 'High-speed, responsive, custom-crafted modern website UI with interactive animations.',
    recommendedFor: 'Startups, restaurants, clinics, local businesses needing a fast, aesthetic digital presence.',
    features: [
      'Modern High-Converting UI/UX Design',
      'Mobile, Tablet & Desktop 100% Fully Responsive',
      'Contact & Lead Capture Form Integration',
      'SEO Basics, Fast Loading Speed & Metadata',
      'WhatsApp Direct Chat & Social Media Integration',
      'Clean Typography & Custom Brand Palette'
    ]
  },
  {
    id: 'fullstack-web',
    category: 'website',
    categoryLabel: 'Website Development',
    categoryNumber: '01',
    name: 'Full Frontend + Backend Website',
    badge: 'LAUNCH OFFER',
    originalPrice: 19999,
    basePrice: 14999,
    billingType: 'one-time',
    tagline: 'Dynamic web application with custom backend & CRM',
    description: 'Complete dynamic web application with custom backend APIs, database, and admin lead management.',
    recommendedFor: 'Growing brands, B2B companies, clinics, real estate firms needing automated lead capture & export.',
    features: [
      'Custom Frontend UI + Full Backend APIs',
      'Database Storage & Lead Management Panel',
      'Admin Authentication & Lead Export (Excel/CSV)',
      'Automated Email & WhatsApp Lead Notifications',
      'Enterprise Speed, Security & Search Optimization',
      'Form Validation, Anti-Bot Spam Protection & Analytics'
    ]
  },

  // 2. Social Media & Content Growth Plans
  {
    id: 'starter-plan',
    category: 'social',
    categoryLabel: 'Social Media & Content',
    categoryNumber: '02',
    name: 'STARTER Plan',
    badge: 'FOUNDATION',
    basePrice: 9999,
    billingType: 'monthly',
    tagline: 'Consistent presence for emerging local businesses',
    description: 'Essential social media presence and video reels for emerging brands.',
    recommendedFor: 'Cafés, salons, boutique shops wanting regular monthly posting & video reach.',
    features: [
      '2 Reels (Scripted & Professionally Edited)',
      '8 Social Media Posts (Graphics & Carousels)',
      'Captions & Strategic Hashtags',
      'Monthly Content Calendar',
      'Basic Instagram & Facebook Optimization',
      'WhatsApp Support',
      'Monthly Performance Summary'
    ]
  },
  {
    id: 'growth-plan',
    category: 'social',
    categoryLabel: 'Social Media & Content',
    categoryNumber: '02',
    name: 'GROWTH Plan',
    badge: '⭐ MOST POPULAR',
    isPopular: true,
    basePrice: 14999,
    billingType: 'monthly',
    tagline: 'Accelerate engagement and organic customer reach',
    description: 'High-growth content engine designed to rapidly scale audience engagement and leads.',
    recommendedFor: 'Growing brands, clinics, fitness centers, educators aiming for viral reach & inbound inquiries.',
    features: [
      '4 Reels (High-Retention Video Content)',
      '12 Social Media Posts (Creative Carousels & Brand Graphics)',
      'Captions & Targeted Hashtags',
      'Monthly Content Calendar',
      'Instagram & Facebook Optimization',
      'Content Strategy & Growth Planning',
      'WhatsApp Support',
      'Monthly Performance Report'
    ]
  },
  {
    id: 'pro-plan',
    category: 'social',
    categoryLabel: 'Social Media & Content',
    categoryNumber: '02',
    name: 'PRO Plan',
    badge: '🔥 FULL SCALE',
    basePrice: 19999,
    billingType: 'monthly',
    tagline: 'Complete media production & aggressive brand expansion',
    description: 'Complete premium media production and aggressive organic digital expansion.',
    recommendedFor: 'Established brands, multi-location businesses, real estate & luxury services demanding peak volume.',
    features: [
      '6 Reels (Cinematic / Viral Format Production)',
      '16 Social Media Posts (Complete Monthly Grid)',
      'Captions & Strategic Hashtag Architecture',
      'Complete Monthly Content Strategy',
      'Instagram & Facebook Optimization',
      'Content Calendar & Publishing Coordination',
      'WhatsApp Support',
      'Monthly Performance Report'
    ]
  },

  // 3. Paid Advertising Management
  {
    id: 'meta-ads',
    category: 'ads',
    categoryLabel: 'Paid Advertising',
    categoryNumber: '03',
    name: 'Meta Ads Management',
    badge: '🎯 HIGH ROI',
    basePrice: 15000,
    billingType: 'monthly',
    tagline: 'Targeted Instagram & Facebook lead generation funnels',
    description: 'End-to-end Facebook & Instagram advertising to acquire qualified leads and customers.',
    recommendedFor: 'Direct lead generation, booking appointments, WhatsApp campaign leads.',
    features: [
      'Campaign Architecture & Funnel Setup',
      'Custom Audience / Retargeting Setup',
      'High-Converting Ad Copy & Creative Consultation',
      'Daily Budget & Bid Monitoring',
      'Continuous A/B Testing & Optimization',
      'Monthly Performance Report (Ad spend paid directly to Meta)'
    ]
  },
  {
    id: 'google-ads',
    category: 'ads',
    categoryLabel: 'Paid Advertising',
    categoryNumber: '03',
    name: 'Google Ads Management',
    badge: '🚀 HIGH INTENT',
    basePrice: 15000,
    billingType: 'monthly',
    tagline: 'High-intent search & Performance Max campaigns',
    description: 'Capture high-intent search queries and dominate Google Search & Display networks.',
    recommendedFor: 'High-ticket services, urgent inquiries, local services, healthcare, B2B.',
    features: [
      'Search & Performance Max Campaign Setup',
      'In-Depth Keyword & Negative Keyword Research',
      'Persuasive Ad Copy & Extension Setup',
      'Conversion Tracking & Analytics Integration',
      'Bid Management & Quality Score Optimization',
      'Monthly Performance Report (Ad spend paid directly to Google)'
    ]
  },

  // 4. Standalone Video Services
  {
    id: 'short-video',
    category: 'video',
    categoryLabel: 'Video Production',
    categoryNumber: '04',
    name: 'Short Advertisement Video',
    badge: 'VIRAL HOOK',
    basePrice: 3000,
    billingType: 'one-time',
    tagline: 'High-converting 30-60s vertical video reel / ad',
    description: 'Hook-driven, scripted, and edited vertical video designed for Instagram Reels, YouTube Shorts, and Meta Ads.',
    recommendedFor: 'Product launches, service promotions, local businesses seeking viral attention.',
    features: [
      'Concept & Hook Scriptwriting',
      'High-Energy Dynamic Subtitles & Sound FX',
      'Motion Graphics & B-Roll Integration',
      'Exported in 9:16 Vertical HD Format',
      'Delivery in ~7 Days'
    ]
  },
  {
    id: 'long-video',
    category: 'video',
    categoryLabel: 'Video Production',
    categoryNumber: '04',
    name: 'Long-Form Brand Video',
    badge: 'BRAND STORY',
    basePrice: 5000,
    billingType: 'one-time',
    tagline: 'In-depth 3-10 min horizontal brand film or explainer',
    description: 'High-production brand documentary, product walkthrough, or founder interview video.',
    recommendedFor: 'YouTube channels, website landing page videos, corporate overview films.',
    features: [
      'Comprehensive Narrative Scripting',
      'Color Grading & Professional Audio Mastering',
      'Intro/Outro Motion Branding',
      'Exported in 4K/1080p 16:9 Format',
      'Delivery in ~15 Days'
    ]
  }
];

/**
 * Returns formatted labels for all current packages and services matching latest pricing
 */
export function getCentralizedPackageOptions(): string[] {
  return ALL_PRICING_SERVICES.map(s => {
    if (s.billingType === 'monthly') {
      return `${s.name} (₹${s.basePrice.toLocaleString('en-IN')}/mo)`;
    }
    return `${s.name} (₹${s.basePrice.toLocaleString('en-IN')})`;
  });
}

export interface DurationOption {
  id: BillingDuration;
  label: string;
  discountPct: number;
  badge: string;
  subtext: string;
  monthsMultiplier: number;
}

export const DURATION_DETAILS: Record<string, DurationOption> = {
  'one-time': {
    id: 'one-time',
    label: 'ONE-TIME',
    discountPct: 0,
    badge: '0% OFF',
    subtext: 'Standard one-time pricing (No duration discount)',
    monthsMultiplier: 1
  },
  'none': {
    id: 'one-time',
    label: 'ONE-TIME',
    discountPct: 0,
    badge: '0% OFF',
    subtext: 'Standard one-time pricing (No duration discount)',
    monthsMultiplier: 1
  },
  '1month': {
    id: '1month',
    label: '1 MONTH',
    discountPct: 10,
    badge: '10% OFF',
    subtext: '1 Month commitment with 10% discount (Requires Starter, Growth, or Pro plan)',
    monthsMultiplier: 1
  },
  '6months': {
    id: '6months',
    label: '6 MONTHS',
    discountPct: 15,
    badge: '15% OFF',
    subtext: 'Save 15% across commitment duration on 6-month term (Requires Starter, Growth, or Pro plan)',
    monthsMultiplier: 6
  },
  '1year': {
    id: '1year',
    label: '1 YEAR',
    discountPct: 25,
    badge: '25% OFF',
    subtext: 'Save 25% across commitment duration on 1-year term (Requires Starter, Growth, or Pro plan)',
    monthsMultiplier: 12
  }
};

export interface ItemizedServicePricing {
  id: string;
  name: string;
  category: 'website' | 'social' | 'ads' | 'video';
  categoryLabel: string;
  billingType: 'one-time' | 'monthly';
  unitPrice: number;
  months: number;
  subtotal: number;
  discountAmount: number;
  finalPrice: number;
  formattedUnitPrice: string;
  formattedSubtotal: string;
  formattedDiscount: string;
  formattedFinalPrice: string;
}

export interface PricingCalculationResult {
  selectedIds: string[];
  selectedServices: ServiceItem[];
  selectedServicesDetails: ItemizedServicePricing[];
  duration: BillingDuration;
  durationInfo: DurationOption;
  selectedPlan: ServiceItem | null;
  hasSelectedPlan: boolean;
  isPlanRequiredButMissing: boolean;
  canProceed: boolean;
  validationMessage: string | null;
  monthsMultiplier: number;
  subtotal: number;
  discountPct: number;
  discountAmount: number;
  finalAmount: number;
  formattedSubtotal: string;
  formattedDiscount: string;
  formattedFinalAmount: string;
  servicesNamesList: string;
  
  // Specific group item breakdowns
  planBreakdown: ItemizedServicePricing | null;
  websiteBreakdowns: ItemizedServicePricing[];
  adsBreakdowns: ItemizedServicePricing[];
}

export function calculatePricingState(
  selectedIds: string[],
  duration: BillingDuration = 'one-time'
): PricingCalculationResult {
  const selectedServices = ALL_PRICING_SERVICES.filter(s => selectedIds.includes(s.id));
  
  // Normalize duration
  const normalizedDuration: BillingDuration = (duration === 'none' || !duration || !DURATION_DETAILS[duration]) 
    ? 'one-time' 
    : duration;

  const durationInfo = DURATION_DETAILS[normalizedDuration] || DURATION_DETAILS['one-time'];
  const monthsMultiplier = durationInfo.monthsMultiplier;
  const selectedPlan = selectedServices.find(s => MONTHLY_PLAN_IDS.includes(s.id)) || null;
  const hasSelectedPlan = selectedPlan !== null;

  const isCommitmentDuration = normalizedDuration === '1month' || normalizedDuration === '6months' || normalizedDuration === '1year';
  const isPlanRequiredButMissing = isCommitmentDuration && !hasSelectedPlan;

  let discountPct = 0;
  let validationMessage: string | null = null;
  let canProceed = selectedServices.length > 0;

  if (isCommitmentDuration) {
    if (!hasSelectedPlan) {
      discountPct = 0;
      canProceed = false;
      validationMessage = 'Please select a monthly plan (Starter, Growth, or Pro) to continue with this commitment duration.';
    } else {
      discountPct = durationInfo.discountPct;
      canProceed = selectedServices.length > 0;
      validationMessage = null;
    }
  } else {
    // ONE-TIME: No plan required, 0% discount, proceed allowed if at least one service selected
    discountPct = 0;
    canProceed = selectedServices.length > 0;
    validationMessage = null;
  }

  // Calculate detailed itemized breakdown
  const selectedServicesDetails: ItemizedServicePricing[] = selectedServices.map(service => {
    const isMonthly = service.billingType === 'monthly';
    const months = isMonthly ? monthsMultiplier : 1;
    const serviceSubtotal = service.basePrice * months;
    const serviceDiscount = discountPct > 0 ? Math.round(serviceSubtotal * (discountPct / 100)) : 0;
    const serviceFinal = Math.max(0, serviceSubtotal - serviceDiscount);

    return {
      id: service.id,
      name: service.name,
      category: service.category,
      categoryLabel: service.categoryLabel,
      billingType: service.billingType,
      unitPrice: service.basePrice,
      months,
      subtotal: serviceSubtotal,
      discountAmount: serviceDiscount,
      finalPrice: serviceFinal,
      formattedUnitPrice: `₹${service.basePrice.toLocaleString('en-IN')}`,
      formattedSubtotal: `₹${serviceSubtotal.toLocaleString('en-IN')}`,
      formattedDiscount: `₹${serviceDiscount.toLocaleString('en-IN')}`,
      formattedFinalPrice: `₹${serviceFinal.toLocaleString('en-IN')}`
    };
  });

  const subtotal = selectedServicesDetails.reduce((sum, item) => sum + item.subtotal, 0);
  const discountAmount = discountPct > 0 ? Math.round(subtotal * (discountPct / 100)) : 0;
  const finalAmount = Math.max(0, subtotal - discountAmount);

  const planBreakdown = selectedServicesDetails.find(item => MONTHLY_PLAN_IDS.includes(item.id)) || null;
  const websiteBreakdowns = selectedServicesDetails.filter(item => item.category === 'website');
  const adsBreakdowns = selectedServicesDetails.filter(item => item.category === 'ads');

  return {
    selectedIds,
    selectedServices,
    selectedServicesDetails,
    duration: normalizedDuration,
    durationInfo,
    selectedPlan,
    hasSelectedPlan,
    isPlanRequiredButMissing,
    canProceed,
    validationMessage,
    monthsMultiplier,
    subtotal,
    discountPct,
    discountAmount,
    finalAmount,
    formattedSubtotal: `₹${subtotal.toLocaleString('en-IN')}`,
    formattedDiscount: `₹${discountAmount.toLocaleString('en-IN')}`,
    formattedFinalAmount: `₹${finalAmount.toLocaleString('en-IN')}`,
    servicesNamesList: selectedServices.map(s => s.name).join(', '),
    planBreakdown,
    websiteBreakdowns,
    adsBreakdowns
  };
}

const STORAGE_KEY = 'yugark_pricing_selection_v2';

export function saveSelectionToSession(data: {
  selectedIds: string[];
  duration: BillingDuration;
}) {
  if (typeof window !== 'undefined') {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore
    }
  }
}

export function getSelectionFromSession(): {
  selectedIds: string[];
  duration: BillingDuration;
} | null {
  if (typeof window !== 'undefined') {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.duration === 'none') {
          parsed.duration = 'one-time';
        }
        return parsed;
      }
    } catch {
      // ignore
    }
  }
  return null;
}
