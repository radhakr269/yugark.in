import { useState, useEffect, useMemo, FormEvent } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Send, CheckCircle2, Sparkles, AlertCircle, Clock, Tag, Edit3, ArrowRight } from 'lucide-react';
import { ContactFormData } from '../types';
import { submitLead } from '../lib/api';
import { addEnquiry } from '../lib/enquiryStore';
import { WhatsAppIcon } from './WhatsAppButton';
import { 
  ALL_PRICING_SERVICES, 
  DURATION_DETAILS, 
  BillingDuration, 
  calculatePricingState,
  getSelectionFromSession,
  ServiceItem 
} from '../lib/pricingSelection';

interface ContactFormProps {
  defaultService?: string;
  defaultBundle?: string;
  pageSource?: string;
  formSource?: string;
}

export default function ContactForm({
  defaultService = '',
  defaultBundle = '',
  pageSource = 'Contact Page',
  formSource = 'Project Inquiry Form'
}: ContactFormProps) {
  const [searchParams] = useSearchParams();

  // Extract query parameters from Pricing calculator navigation
  const paramServices = searchParams.get('services');
  const paramServiceIds = searchParams.get('serviceIds');
  const paramDuration = searchParams.get('duration') as BillingDuration | null;
  const paramSubtotal = searchParams.get('subtotal');
  const paramDiscount = searchParams.get('discount');
  const paramAmount = searchParams.get('amount');
  const paramPlan = searchParams.get('plan');
  const paramService = searchParams.get('service');

  // Check if we have incoming selection data ONLY via explicit query params from Pricing
  const pricingData = useMemo(() => {
    // 1. Check URL parameters
    if (paramServiceIds || paramServices) {
      const ids = paramServiceIds ? paramServiceIds.split(',').filter(Boolean) : [];
      const duration: BillingDuration = (paramDuration && ['one-time', '1month', '6months', '1year'].includes(paramDuration))
        ? paramDuration
        : (paramDuration === 'none' ? 'one-time' : 'one-time');
      
      const calc = calculatePricingState(ids, duration);
      return {
        hasPricingSelection: ids.length > 0,
        selectedIds: ids,
        selectedServices: calc.selectedServices,
        selectedServicesDetails: calc.selectedServicesDetails,
        duration,
        durationInfo: calc.durationInfo,
        subtotal: calc.subtotal,
        discountAmount: calc.discountAmount,
        finalAmount: calc.finalAmount,
        servicesNamesList: paramServices || calc.servicesNamesList
      };
    }

    return {
      hasPricingSelection: false,
      selectedIds: [],
      selectedServices: [] as ServiceItem[],
      selectedServicesDetails: [],
      duration: 'one-time' as BillingDuration,
      durationInfo: DURATION_DETAILS['one-time'],
      subtotal: 0,
      discountAmount: 0,
      finalAmount: 0,
      servicesNamesList: ''
    };
  }, [paramServices, paramServiceIds, paramDuration, paramSubtotal, paramDiscount, paramAmount]);

  // Derive initial Service and Bundle
  const initialSelectedService = useMemo(() => {
    if (pricingData.hasPricingSelection && pricingData.selectedServices.length > 0) {
      if (pricingData.selectedServices.length === 1) {
        const single = pricingData.selectedServices[0];
        if (single.category === 'website') return single.name;
        if (single.category === 'social') return 'Social Media & Reels Growth';
        if (single.category === 'ads') return single.name;
      }
      return 'Custom Multi-Service Package';
    }
    if (paramService) return paramService;
    return defaultService || '';
  }, [pricingData, paramService, defaultService]);

  const DEFAULT_BUNDLE_PLACEHOLDER = '-- Select a Package / Bundle (Optional) --';

  const initialSelectedBundle = useMemo(() => {
    if (pricingData.hasPricingSelection && pricingData.selectedServices.length > 0) {
      if (pricingData.selectedServices.length === 1) {
        const s = pricingData.selectedServices[0];
        const suffix = s.billingType === 'monthly' ? '/mo' : '';
        return `${s.name} (Estimated: ₹${pricingData.finalAmount.toLocaleString('en-IN')}${suffix})`;
      }
      return `Custom Bundle (${pricingData.selectedServices.length} Services - Estimated: ₹${pricingData.finalAmount.toLocaleString('en-IN')})`;
    }
    if (paramPlan) {
      return `${paramPlan} Plan`;
    }
    return defaultBundle || DEFAULT_BUNDLE_PLACEHOLDER;
  }, [pricingData, paramPlan, defaultBundle]);

  const initialRequirement = () => {
    if (pricingData.hasPricingSelection && pricingData.selectedServices.length > 0) {
      const servicesDetailLines = pricingData.selectedServicesDetails.map(item => {
        if (item.billingType === 'monthly') {
          return `• ${item.name}: ₹${item.unitPrice.toLocaleString('en-IN')}/mo × ${item.months} month(s) = ₹${item.subtotal.toLocaleString('en-IN')}`;
        }
        return `• ${item.name}: ₹${item.unitPrice.toLocaleString('en-IN')} (One-Time)`;
      }).join('\n');

      const durationLine = pricingData.duration === 'one-time'
        ? '• Commitment Duration: ONE-TIME (No duration discount)'
        : `• Commitment Duration: ${pricingData.durationInfo.label} (${pricingData.durationInfo.discountPct}% OFF)`;
      
      const discountLine = pricingData.discountAmount > 0 
        ? `• Duration Discount: -₹${pricingData.discountAmount.toLocaleString('en-IN')} (${pricingData.durationInfo.discountPct}% OFF)\n`
        : '';

      return `Custom Package from Calculator:\n${servicesDetailLines}\n${durationLine}\n• Base Subtotal: ₹${pricingData.subtotal.toLocaleString('en-IN')}\n${discountLine}• Estimated Total: ₹${pricingData.finalAmount.toLocaleString('en-IN')}\n\n[Please add any specific business requirements or targets here]`;
    }
    if (paramPlan) {
      return `Interested in ${paramPlan} Plan (${paramDuration || 'monthly'})`;
    }
    if (paramService) {
      return `Inquiry regarding ${paramService}`;
    }
    return '';
  };

  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    businessName: '',
    businessCategory: 'Restaurant & Café',
    otherCategory: '',
    selectedService: initialSelectedService,
    selectedBundle: initialSelectedBundle,
    projectRequirement: initialRequirement(),
    remarks: '',
    pageSource,
    formSource,
    website_url_hp: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEnquiryId, setSubmittedEnquiryId] = useState<string>('');
  const [serverError, setServerError] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sync state if pricingData changes
  useEffect(() => {
    if (pricingData.hasPricingSelection && pricingData.selectedServices.length > 0) {
      setFormData(prev => ({
        ...prev,
        selectedService: initialSelectedService,
        selectedBundle: initialSelectedBundle,
        projectRequirement: prev.projectRequirement || initialRequirement()
      }));
    }
  }, [pricingData, initialSelectedService, initialSelectedBundle]);

  const businessCategories = [
    'Restaurant & Café',
    'Gym & Fitness',
    'Real Estate',
    'Healthcare & Clinic',
    'Coaching & Education',
    'E-commerce & Retail',
    'Salon & Beauty',
    'Hotel & Hospitality',
    'Corporate & B2B',
    'Local Business / Other'
  ];

  const serviceOptions = [
    '-- Select a Service (Optional) --',
    'Custom Multi-Service Package',
    'Website Development',
    'Frontend Website',
    'Full Frontend + Backend Website',
    'Social Media & Reels Growth',
    'STARTER Plan',
    'GROWTH Plan',
    'PRO Plan',
    'Paid Advertising (Meta & Google Ads)',
    'Meta Ads Management',
    'Google Ads Management',
    'Short Advertisement Video',
    'Long-Form Brand Video',
    'Other / Custom Project'
  ];

  const bundleOptions = useMemo(() => {
    const list: string[] = [DEFAULT_BUNDLE_PLACEHOLDER];

    // If pre-selected custom package from pricing calculator
    if (pricingData.hasPricingSelection && initialSelectedBundle && initialSelectedBundle !== DEFAULT_BUNDLE_PLACEHOLDER) {
      list.push(initialSelectedBundle);
    }

    // Centralized options from ALL_PRICING_SERVICES
    ALL_PRICING_SERVICES.forEach((s) => {
      const label = s.billingType === 'monthly'
        ? `${s.name} (₹${s.basePrice.toLocaleString('en-IN')}/mo)`
        : `${s.name} (₹${s.basePrice.toLocaleString('en-IN')})`;
      list.push(label);
    });

    list.push('Custom Project / Consultation');

    return Array.from(new Set(list));
  }, [pricingData, initialSelectedBundle]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone / WhatsApp number is required';
    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
    if (!formData.projectRequirement.trim()) newErrors.projectRequirement = 'Please describe your requirement or goal';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;

    setIsLoading(true);

    try {
      const response = await submitLead({
        ...formData,
        pageSource: typeof window !== 'undefined' ? `${window.location.pathname} (${pageSource})` : pageSource,
        formSource
      });

      if (response.success && response.leadId) {
        setSubmittedEnquiryId(response.leadId);
        try {
          addEnquiry({
            ...formData,
            pageSource,
            formSource
          });
        } catch {
          // ignore
        }
        setIsLoading(false);
        setIsSubmitted(true);
      } else {
        if (response.errors) {
          setErrors(response.errors);
        }
        setServerError(response.error || 'Failed to submit enquiry. Please try again.');
        setIsLoading(false);
      }
    } catch (err: any) {
      console.error('Submission error', err);
      const record = addEnquiry(formData);
      setSubmittedEnquiryId(record.id);
      setIsLoading(false);
      setIsSubmitted(true);
    }
  };

  const generateWhatsAppMessage = () => {
    const text = `Hi Radha Krishna Sir, I submitted project inquiry #${submittedEnquiryId || 'NEW'} on YUGARK Digital Studio.%0A%0A*Name:* ${formData.fullName}%0A*Business:* ${formData.businessName} (${formData.businessCategory})%0A*Package:* ${formData.selectedBundle}%0A*Requirements:* ${formData.projectRequirement}%0A%0APlease let me know the next steps!`;
    return `https://wa.me/919125205132?text=${text}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-7 sm:p-10 lg:p-12 rounded-3xl bg-[#09090D] border border-[#D4B06A]/30 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(212,176,106,0.15)] gold-border-glow relative overflow-hidden">
      
      {/* Top Metallic Accent Bar */}
      <div className="absolute top-0 left-8 right-8 h-[1.5px] bg-gradient-to-r from-transparent via-[#F0D28F] to-transparent" />

      {isSubmitted ? (
        <div className="text-center py-16 space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-[#D4B06A]/20 border border-[#D4B06A] flex items-center justify-center text-[#F0D28F] animate-bounce shadow-[0_0_30px_rgba(212,176,106,0.3)]">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="inline-block px-3 py-1 rounded-full bg-[#121212] border border-[#D4B06A]/30 text-xs text-[#D4B06A] uppercase tracking-wider font-semibold">
            Inquiry Ref: {submittedEnquiryId}
          </span>

          <h3 className="font-serif text-3xl sm:text-4xl text-white font-medium">
            Project Inquiry Received
          </h3>

          <p className="text-neutral-300 max-w-xl mx-auto text-base leading-relaxed font-sans font-light">
            Thank you, <span className="text-[#F0D28F] font-semibold">{formData.fullName}</span>. Founder <span className="text-white font-medium">Mr. Radha Krishna</span> and the YUGARK team will review your requirements for <span className="text-white font-medium">{formData.businessName}</span> and contact you within 24 hours.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={generateWhatsAppMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1ebd59] text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Message on WhatsApp Now</span>
            </a>

            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  fullName: '',
                  email: '',
                  phone: '',
                  businessName: '',
                  businessCategory: 'Restaurant & Café',
                  otherCategory: '',
                  selectedService: defaultService,
                  selectedBundle: defaultBundle,
                  projectRequirement: '',
                  remarks: ''
                });
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#141414] border border-white/10 text-neutral-300 hover:text-white hover:border-[#D4B06A] font-semibold text-xs uppercase tracking-wider transition-all"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Header Title Block */}
          <div className="space-y-2 border-b border-neutral-800 pb-6">
            <div className="flex items-center gap-2 text-[#D4B06A] text-xs font-semibold uppercase tracking-[0.25em]">
              <Sparkles className="w-3.5 h-3.5 text-[#F0D28F]" />
              <span>START YOUR PROJECT INQUIRY</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-medium">
              Tell us about your business goals.
            </h2>
            <p className="text-xs text-neutral-400 font-sans">
              Founder Mr. Radha Krishna personally reviews every project inquiry to propose the most effective growth strategy.
            </p>
          </div>

          {/* ========================================================================= */}
          {/* PRE-SELECTED CUSTOM PACKAGE SUMMARY BADGE / CARD */}
          {/* ========================================================================= */}
          {pricingData.hasPricingSelection && pricingData.selectedServices.length > 0 && (
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#14120C] to-[#0A0A0F] border-2 border-[#D4B06A]/70 shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(212,176,106,0.2)] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D4B06A]/20 pb-3">
                <div className="flex items-center gap-2 text-[#D4B06A] text-xs font-bold uppercase tracking-wider">
                  <Tag className="w-4 h-4 text-[#F0D28F]" />
                  <span>PRE-SELECTED CUSTOM PACKAGE (AUTO-LOADED FROM CALCULATOR)</span>
                </div>
                <Link
                  to="/pricing#calculator"
                  className="text-[11px] text-[#D4B06A] hover:text-[#F0D28F] flex items-center gap-1 font-semibold underline"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Modify Selection in Pricing</span>
                </Link>
              </div>

              {/* Selected Services Tags */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold uppercase text-neutral-400">
                  Included Services ({pricingData.selectedServices.length}):
                </div>
                <div className="flex flex-wrap gap-2">
                  {pricingData.selectedServices.map(svc => (
                    <span 
                      key={svc.id}
                      className="px-3 py-1 rounded-lg bg-[#18160E] border border-[#D4B06A]/40 text-[#F0D28F] text-xs font-medium flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4B06A]" />
                      <span>{svc.name}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Summary Financials Row */}
              <div className="pt-3 border-t border-[#D4B06A]/20 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="block text-[10px] text-neutral-400 uppercase">Commitment:</span>
                  <span className="font-bold text-white">{pricingData.durationInfo.label}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-neutral-400 uppercase">Base Subtotal:</span>
                  <span className="font-medium text-neutral-300">₹{pricingData.subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-[#F0D28F] uppercase">Discount ({pricingData.durationInfo.discountPct}%):</span>
                  <span className="font-bold text-[#F0D28F]">-₹{pricingData.discountAmount.toLocaleString('en-IN')}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-[#D4B06A] uppercase font-bold">Estimated Total:</span>
                  <span className="font-serif font-bold text-base text-white gold-gradient-text">
                    ₹{pricingData.finalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Hidden Honeypot Field for anti-bot spam protection */}
          <div className="hidden absolute -left-[9999px]" aria-hidden="true">
            <input
              type="text"
              name="website_url_hp"
              value={formData.website_url_hp || ''}
              onChange={(e) => setFormData({ ...formData, website_url_hp: e.target.value })}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {serverError && (
            <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/80 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{serverError}</span>
            </div>
          )}

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-300 mb-2 font-medium">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Vikram Sharma"
                className={`w-full px-4 py-3.5 bg-[#121212] border rounded-xl text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors ${
                  errors.fullName ? 'border-red-500' : 'border-neutral-800 focus:border-[#D4B06A]'
                }`}
              />
              {errors.fullName && <p className="text-xs text-red-400 mt-1">{errors.fullName}</p>}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-300 mb-2 font-medium">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="business@company.in"
                className={`w-full px-4 py-3.5 bg-[#121212] border rounded-xl text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors ${
                  errors.email ? 'border-red-500' : 'border-neutral-800 focus:border-[#D4B06A]'
                }`}
              />
              {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-300 mb-2 font-medium">
                Phone / WhatsApp Number *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 92359 00875"
                className={`w-full px-4 py-3.5 bg-[#121212] border rounded-xl text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors ${
                  errors.phone ? 'border-red-500' : 'border-neutral-800 focus:border-[#D4B06A]'
                }`}
              />
              {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
            </div>

            {/* Business Name */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-300 mb-2 font-medium">
                Business / Brand Name *
              </label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                placeholder="e.g. SpiceCraft Bistro"
                className={`w-full px-4 py-3.5 bg-[#121212] border rounded-xl text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors ${
                  errors.businessName ? 'border-red-500' : 'border-neutral-800 focus:border-[#D4B06A]'
                }`}
              />
              {errors.businessName && <p className="text-xs text-red-400 mt-1">{errors.businessName}</p>}
            </div>

            {/* Business Category */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-300 mb-2 font-medium">
                Business Category
              </label>
              <select
                value={formData.businessCategory}
                onChange={(e) => setFormData({ ...formData, businessCategory: e.target.value })}
                className="w-full px-4 py-3.5 bg-[#121212] border border-neutral-800 focus:border-[#D4B06A] rounded-xl text-sm text-white focus:outline-none transition-colors"
              >
                {businessCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Selected Service / Primary Focus */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-300 mb-2 font-medium">
                Primary Service Required
              </label>
              <select
                value={formData.selectedService}
                onChange={(e) => setFormData({ ...formData, selectedService: e.target.value })}
                className="w-full px-4 py-3.5 bg-[#121212] border border-neutral-800 focus:border-[#D4B06A] rounded-xl text-sm text-white focus:outline-none transition-colors"
              >
                {serviceOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Selected Package / Service Bundle Dropdown */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-300 mb-2 font-medium">
              Selected Service / Package Bundle
            </label>
            <select
              value={formData.selectedBundle}
              onChange={(e) => setFormData({ ...formData, selectedBundle: e.target.value })}
              className="w-full px-4 py-3.5 bg-[#121212] border border-neutral-800 focus:border-[#D4B06A] rounded-xl text-sm text-white focus:outline-none transition-colors font-medium text-[#F0D28F]"
            >
              {bundleOptions.map((b, idx) => (
                <option key={idx} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Other Category Specification if selected */}
          {formData.businessCategory.includes('Other') && (
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-300 mb-2 font-medium">
                Please specify your business type
              </label>
              <input
                type="text"
                value={formData.otherCategory || ''}
                onChange={(e) => setFormData({ ...formData, otherCategory: e.target.value })}
                placeholder="e.g. Architecture firm, Solar equipment, Event management..."
                className="w-full px-4 py-3.5 bg-[#121212] border border-neutral-800 focus:border-[#D4B06A] rounded-xl text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors"
              />
            </div>
          )}

          {/* Project Requirement */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-300 mb-2 font-medium">
              Project Requirements & Goals *
            </label>
            <textarea
              rows={4}
              value={formData.projectRequirement}
              onChange={(e) => setFormData({ ...formData, projectRequirement: e.target.value })}
              placeholder="Tell us what you want to achieve (e.g. need a 5-page responsive website, 4 reels for Instagram launch, WhatsApp order integration, target launch in 2 weeks)..."
              className={`w-full px-4 py-3.5 bg-[#121212] border rounded-xl text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors ${
                errors.projectRequirement ? 'border-red-500' : 'border-neutral-800 focus:border-[#D4B06A]'
              }`}
            />
            {errors.projectRequirement && <p className="text-xs text-red-400 mt-1">{errors.projectRequirement}</p>}
          </div>

          {/* Additional Remarks */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-300 mb-2 font-medium">
              Additional Remarks / Preferred Call Time (Optional)
            </label>
            <input
              type="text"
              value={formData.remarks || ''}
              onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
              placeholder="e.g. Best time to call: 4 PM - 7 PM. Already have domain name registered."
              className="w-full px-4 py-3.5 bg-[#121212] border border-neutral-800 focus:border-[#D4B06A] rounded-xl text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-[0_10px_30px_rgba(212,176,106,0.35)]"
            >
              {isLoading ? (
                <span className="inline-block w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry to YUGARK Digital Studio</span>
                </>
              )}
            </button>
            <p className="text-center text-[11px] text-neutral-400 mt-3">
              Direct review by Founder Mr. Radha Krishna. Guaranteed confidential and responded within 24 hours.
            </p>
          </div>

        </form>
      )}

    </div>
  );
}
