import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { 
  Check, 
  Sparkles, 
  HelpCircle, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Megaphone, 
  AlertCircle, 
  Globe, 
  RotateCcw,
  Calculator,
  ChevronRight,
  Clock,
  Video
} from 'lucide-react';
import CTASection from '../components/CTASection';
import WhatsAppButton, { WhatsAppIcon } from '../components/WhatsAppButton';
import { 
  ALL_PRICING_SERVICES, 
  DURATION_DETAILS, 
  BillingDuration, 
  MONTHLY_PLAN_IDS,
  calculatePricingState,
  saveSelectionToSession,
  getSelectionFromSession
} from '../lib/pricingSelection';

export default function Pricing() {
  const navigate = useNavigate();
  const calculatorRef = useRef<HTMLDivElement>(null);
  const socialSectionRef = useRef<HTMLElement>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Initialize selection: default to empty array [] (NO auto-selected service or plan)
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>(() => {
    const saved = getSelectionFromSession();
    if (saved && Array.isArray(saved.selectedIds)) {
      return saved.selectedIds;
    }
    return [];
  });

  // Default duration is strictly 'one-time'
  const [duration, setDuration] = useState<BillingDuration>(() => {
    const saved = getSelectionFromSession();
    if (saved && saved.duration && ['one-time', '1month', '6months', '1year'].includes(saved.duration)) {
      return saved.duration;
    }
    return 'one-time';
  });

  // Keep session in sync
  useEffect(() => {
    saveSelectionToSession({
      selectedIds: selectedServiceIds,
      duration
    });
  }, [selectedServiceIds, duration]);

  // Pricing calculation
  const calculation = useMemo(() => {
    return calculatePricingState(selectedServiceIds, duration);
  }, [selectedServiceIds, duration]);

  // Clear validation error when user fulfills requirements
  useEffect(() => {
    if (calculation.canProceed) {
      setValidationError(null);
    }
  }, [calculation.canProceed]);

  // User can select exactly one applicable monthly plan (Starter, Growth, or Pro)
  const toggleService = (id: string) => {
    setSelectedServiceIds(prev => {
      if (MONTHLY_PLAN_IDS.includes(id)) {
        if (prev.includes(id)) {
          // Deselect plan
          return prev.filter(item => item !== id);
        } else {
          // Replace previous monthly plan with the newly chosen one
          const withoutOtherPlans = prev.filter(item => !MONTHLY_PLAN_IDS.includes(item));
          return [...withoutOtherPlans, id];
        }
      } else {
        // Website, ads, or other services: toggle normally
        return prev.includes(id) 
          ? prev.filter(item => item !== id) 
          : [...prev, id];
      }
    });
  };

  const selectPlanDirectly = (planId: string) => {
    setSelectedServiceIds(prev => {
      const withoutOtherPlans = prev.filter(item => !MONTHLY_PLAN_IDS.includes(item));
      return [...withoutOtherPlans, planId];
    });
    setValidationError(null);
  };

  const selectAll = () => {
    // Select both websites, all ads, and the recommended growth plan
    const nonPlanIds = ALL_PRICING_SERVICES.filter(s => !MONTHLY_PLAN_IDS.includes(s.id)).map(s => s.id);
    setSelectedServiceIds([...nonPlanIds, 'growth-plan']);
  };

  const clearAll = () => {
    setSelectedServiceIds([]);
    setDuration('one-time');
    setValidationError(null);
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.removeItem('yugark_pricing_selection_v2');
      } catch {
        // ignore
      }
    }
  };

  const scrollToCalculator = () => {
    if (calculatorRef.current) {
      calculatorRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToSocialPlans = () => {
    if (socialSectionRef.current) {
      socialSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleProceedToContact = () => {
    if (selectedServiceIds.length === 0) {
      setValidationError('Please select at least one service before proceeding.');
      scrollToCalculator();
      return;
    }

    if (calculation.isPlanRequiredButMissing) {
      setValidationError('Please select a monthly plan (Starter, Growth, or Pro) to continue with this commitment duration.');
      scrollToCalculator();
      return;
    }

    setValidationError(null);
    saveSelectionToSession({
      selectedIds: selectedServiceIds,
      duration
    });

    const query = new URLSearchParams({
      services: calculation.servicesNamesList,
      serviceIds: selectedServiceIds.join(','),
      duration: duration,
      subtotal: calculation.subtotal.toString(),
      discount: calculation.discountAmount.toString(),
      amount: calculation.finalAmount.toString()
    }).toString();

    navigate(`/contact?${query}`);
  };

  const whatsappInquiryText = useMemo(() => {
    if (calculation.selectedServices.length === 0) {
      return `Hi Radha Krishna Sir, I would like to inquire about digital growth services at YUGARK Digital Studio.`;
    }
    const servicesList = calculation.selectedServicesDetails
      .map(s => {
        if (s.billingType === 'monthly') {
          return `• ${s.name}: ₹${s.unitPrice.toLocaleString('en-IN')}/mo × ${s.months} month(s) = ₹${s.subtotal.toLocaleString('en-IN')}`;
        }
        return `• ${s.name}: ₹${s.unitPrice.toLocaleString('en-IN')} (One-Time)`;
      })
      .join('\n');

    const durationLine = duration === 'one-time'
      ? `• Commitment: ONE-TIME (No duration discount)`
      : `• Commitment: ${calculation.durationInfo.label} (${calculation.discountPct}% Discount)`;

    const discountLine = calculation.discountAmount > 0 
      ? `• Duration Discount: -${calculation.formattedDiscount}\n` 
      : '';

    return `Hi Radha Krishna Sir, I would like to book the following custom package on YUGARK:\n\n${servicesList}\n\n${durationLine}\n• Base Subtotal: ${calculation.formattedSubtotal}\n${discountLine}• Final Estimated Payable: ${calculation.formattedFinalAmount}\n\nPlease let me know the next steps!`;
  }, [calculation, duration]);

  // Group services
  const websiteServices = ALL_PRICING_SERVICES.filter(s => s.category === 'website');
  const socialServices = ALL_PRICING_SERVICES.filter(s => s.category === 'social');
  const adsServices = ALL_PRICING_SERVICES.filter(s => s.category === 'ads');

  const faqs = [
    {
      q: 'How does the commitment duration discount work?',
      a: 'When you select 1 Month (10% OFF), 6 Months (15% OFF), or 1 Year (25% OFF) alongside a monthly plan (Starter, Growth, or Pro), your recurring plan is calculated for that duration (e.g., 6 or 12 months) and the discount is applied across your entire custom package in real-time.'
    },
    {
      q: 'What if I only want a website without a monthly retainer?',
      a: 'Simply leave the duration on "ONE-TIME". You can select either the Frontend Website (₹9,999 Launch Offer) or Full Frontend + Backend Website (₹14,999 Launch Offer) and proceed directly with zero recurring commitment.'
    },
    {
      q: 'Can I combine a website with social media management or paid ads?',
      a: 'Yes! You can bundle any website solution with any social media plan (Starter, Growth, Pro) or Ads management. All selected services will be consolidated into a transparent itemized quote.'
    },
    {
      q: 'How does the Paid Advertising management fee work?',
      a: 'The ₹15,000/month management fee covers campaign architecture, audience targeting, ad copy creation, daily monitoring, and continuous optimization. Ad spend is separate and paid directly to Meta or Google.'
    },
    {
      q: 'What happens when I click "Proceed with Selected Package"?',
      a: 'Your exact package selection, commitment term, subtotal, discount, and calculated total are automatically carried into the Contact Form so you never have to re-enter your details. Founder Mr. Radha Krishna will review your project personally.'
    },
    {
      q: 'What payment methods do you accept in India?',
      a: 'We accept all major Indian payment channels: UPI (Google Pay, PhonePe, Paytm, BHIM), IMPS/NEFT Net Banking, and Debit/Credit cards.'
    }
  ];

  return (
    <>
      <SEO 
        title="Interactive Pricing & Custom Package Calculator | YUGARK Digital Studio" 
        description="Select and customize your digital growth package with instant price calculation. Websites from ₹9,999, Social Media from ₹9,999/mo, and Performance Ads with 10%, 15%, or 25% commitment discounts." 
      />

      <main className="pt-24 sm:pt-32 pb-24 bg-[#050505] text-[#EAEAEA] min-h-screen relative selection:bg-[#D4B06A]/30 selection:text-[#F0D28F]">
        
        {/* Ambient Top Subtle Spotlights */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-[#D4B06A]/10 via-[#D4B06A]/[0.02] to-transparent blur-[120px] pointer-events-none -z-10" />

        {/* HEADER SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-12 text-center space-y-4 sm:space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-3 sm:space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#121008] border border-[#D4B06A]/40 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#F0D28F] shadow-[0_0_25px_rgba(212,176,106,0.15)]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4B06A]" />
              <span>CUSTOM PACKAGE BUILDER & PRICING ENGINE</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              Select Services & Calculate Your Price.
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-neutral-300 font-sans font-light max-w-2xl mx-auto leading-relaxed">
              Build your customized digital growth stack. Click any service card to select or unselect. Your live estimate, subtotal, and commitment discounts update automatically.
            </p>
          </motion.div>

          {/* DURATION SELECTOR WITH DISCOUNTS */}
          <div className="pt-2 sm:pt-4 flex flex-col items-center justify-center space-y-3 sm:space-y-4">
            <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-neutral-400 font-semibold flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-center">
              <span>Choose Commitment Duration</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4B06A] hidden sm:inline-block" />
              <span className="text-[#F0D28F]">
                {duration === 'one-time' 
                  ? 'Standard one-time pricing (No plan required)' 
                  : (calculation.hasSelectedPlan
                      ? `${calculation.discountPct}% Duration Discount Active (${calculation.selectedPlan?.name})`
                      : `Select Starter, Growth, or Pro plan to activate ${DURATION_DETAILS[duration].discountPct}% OFF`
                    )}
              </span>
            </div>

            {/* Responsive Duration Pill Group */}
            <div className="grid grid-cols-2 sm:inline-flex sm:flex-row items-center p-1 sm:p-1.5 rounded-2xl bg-[#0C0C10] border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.8)] gap-1 sm:gap-2 w-full sm:w-auto max-w-md sm:max-w-none">
              {(['one-time', '1month', '6months', '1year'] as const).map((durKey) => {
                const opt = DURATION_DETAILS[durKey];
                const isActive = duration === durKey;
                return (
                  <button
                    key={durKey}
                    type="button"
                    onClick={() => setDuration(durKey)}
                    className={`px-3 py-2.5 sm:px-5 sm:py-3 rounded-xl text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2.5 whitespace-nowrap ${
                      isActive
                        ? 'gold-gradient-bg text-black shadow-[0_4px_20px_rgba(212,176,106,0.35)] scale-[1.01]'
                        : 'text-neutral-300 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <span>{opt.label}</span>
                    <span className={`px-1.5 py-0.5 sm:px-2 rounded-full text-[9px] sm:text-[10px] font-extrabold uppercase transition-all ${
                      isActive 
                        ? 'bg-black/20 text-black' 
                        : 'bg-[#D4B06A]/15 text-[#F0D28F] border border-[#D4B06A]/30'
                    }`}>
                      {durKey === 'one-time' ? '0% OFF' : opt.badge}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Action bar for mass select / clear & jump */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[11px] sm:text-xs text-neutral-400 pt-1">
              <button
                type="button"
                onClick={selectAll}
                className="hover:text-[#F0D28F] underline cursor-pointer transition-colors"
              >
                Select All ({ALL_PRICING_SERVICES.length})
              </button>
              <span className="text-neutral-600">•</span>
              <button
                type="button"
                onClick={clearAll}
                className="hover:text-red-400 underline cursor-pointer transition-colors"
              >
                Clear Selection
              </button>
              <span className="text-neutral-600">•</span>
              <button
                type="button"
                onClick={scrollToCalculator}
                className="text-[#D4B06A] font-semibold hover:text-[#F0D28F] flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Live Calculator ({selectedServiceIds.length} selected)</span>
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 1: WEBSITE DEVELOPMENT SOLUTIONS */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1.5 sm:gap-2 mb-5 sm:mb-8 border-b border-neutral-800/80 pb-3 sm:pb-4">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#D4B06A]/15 border border-[#D4B06A]/30 flex items-center justify-center text-[#F0D28F] shadow-[0_0_15px_rgba(212,176,106,0.15)] shrink-0">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <div className="text-[9px] sm:text-[10px] font-mono tracking-widest text-[#D4B06A] uppercase font-bold">
                  CATEGORY 01 • ONE-TIME DEVELOPMENT
                </div>
                <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-wide">
                  Website Development Solutions
                </h2>
              </div>
            </div>
            <p className="text-[11px] sm:text-xs text-neutral-400 max-w-md text-left sm:text-right">
              High-converting, mobile-first websites with custom typography and lead capture forms.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-stretch">
            {websiteServices.map((service) => {
              const isSelected = selectedServiceIds.includes(service.id);
              const discountedPrice = calculation.discountPct > 0 
                ? Math.round(service.basePrice * (1 - calculation.discountPct / 100))
                : service.basePrice;

              return (
                <motion.div
                  key={service.id}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => toggleService(service.id)}
                  className={`cursor-pointer group relative p-5 sm:p-7 lg:p-8 rounded-2xl sm:rounded-3xl backdrop-blur-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                    isSelected
                      ? 'bg-gradient-to-b from-[#14120C] to-[#0A0A0F] border-[#D4B06A] shadow-[0_15px_40px_rgba(0,0,0,0.95),0_0_30px_rgba(212,176,106,0.2)] ring-1 ring-[#D4B06A]/50'
                      : 'bg-[#09090D]/90 border-white/10 hover:border-[#D4B06A]/40 hover:bg-[#0E0E14]'
                  }`}
                >
                  {/* Top Metallic Glare Line */}
                  <div className={`absolute top-0 left-6 right-6 h-[1.5px] transition-opacity duration-300 ${
                    isSelected ? 'bg-gradient-to-r from-transparent via-[#F0D28F] to-transparent opacity-100' : 'bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-40 group-hover:opacity-80'
                  }`} />

                  {/* Selection Status Badge */}
                  {isSelected && (
                    <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 flex items-center gap-1 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#D4B06A]/20 border border-[#D4B06A] text-[#F0D28F] text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                      <Check className="w-3 h-3 stroke-[3]" />
                      <span>SELECTED</span>
                    </div>
                  )}

                  <div className="space-y-4 sm:space-y-5">
                    {/* Header */}
                    <div className="pr-12 sm:pr-16">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-widest text-[#D4B06A] uppercase">
                          {service.categoryLabel}
                        </span>
                        {service.badge && (
                          <span className="px-1.5 py-0.5 sm:px-2 rounded text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider bg-[#D4B06A]/15 text-[#F0D28F] border border-[#D4B06A]/30">
                            {service.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl text-white font-bold tracking-tight group-hover:text-[#F0D28F] transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-neutral-300 mt-1 sm:mt-2 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Pricing Display */}
                    <div className="pt-3 sm:pt-4 border-t border-neutral-800/80 space-y-1">
                      <div className="flex items-baseline gap-2 sm:gap-2.5 flex-wrap">
                        <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold gold-gradient-text">
                          ₹{discountedPrice.toLocaleString('en-IN')}
                        </span>
                        {service.originalPrice && (
                          <span className="text-xs sm:text-sm text-neutral-500 line-through">
                            ₹{service.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                        <span className="text-[9px] sm:text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#D4B06A]/15 text-[#F0D28F] border border-[#D4B06A]/30">
                          {calculation.discountPct > 0 ? `LAUNCH OFFER + ${calculation.discountPct}% OFF` : 'LAUNCH OFFER'}
                        </span>
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-neutral-400">
                        One-time development • <span className="text-[#D4B06A]">
                          {calculation.discountPct > 0 
                            ? `Current Launch Offer + ${calculation.durationInfo.label} discount` 
                            : 'Current Launch Offer'}
                        </span>
                      </div>
                    </div>

                    {/* Deliverables checklist */}
                    <div className="pt-3 sm:pt-4 border-t border-neutral-800/80 space-y-2">
                      <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                        Included Deliverables:
                      </div>
                      <ul className="space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs text-neutral-200">
                        {service.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start space-x-2">
                            <Check className="w-3.5 h-3.5 text-[#D4B06A] shrink-0 mt-0.5" />
                            <span className="leading-tight">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Select Button */}
                  <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-neutral-800/60">
                    <button
                      type="button"
                      className={`w-full py-2.5 sm:py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 ${
                        isSelected
                          ? 'gold-gradient-bg text-black shadow-lg font-extrabold scale-[1.01]'
                          : 'bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 hover:border-[#D4B06A]/40'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Selected in Package</span>
                        </>
                      ) : (
                        <span>+ Click to Select Website</span>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: SOCIAL MEDIA & CONTENT PACKAGES */}
        {/* ========================================================================= */}
        <section 
          id="monthly-plans" 
          ref={socialSectionRef} 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 scroll-mt-28"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1.5 sm:gap-2 mb-4 sm:mb-8 border-b border-neutral-800/80 pb-3 sm:pb-4">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#D4B06A]/15 border border-[#D4B06A]/30 flex items-center justify-center text-[#F0D28F] shadow-[0_0_15px_rgba(212,176,106,0.15)] shrink-0">
                <Video className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <div className="text-[9px] sm:text-[10px] font-mono tracking-widest text-[#D4B06A] uppercase font-bold">
                  CATEGORY 02 • MONTHLY RETAINER
                </div>
                <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-wide">
                  Social Media & Content Growth Plans
                </h2>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <span className="inline-block text-[10px] sm:text-[11px] font-bold text-[#F0D28F] bg-[#D4B06A]/15 border border-[#D4B06A]/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-0.5 sm:mb-1">
                Select 1 Monthly Plan
              </span>
              <p className="text-[11px] sm:text-xs text-neutral-400 max-w-md">
                High-retention short reels, brand graphics, content calendar & organic growth.
              </p>
            </div>
          </div>

          {/* Mobile Swipe Cue */}
          <div className="sm:hidden flex items-center justify-between text-[10px] text-neutral-400 mb-2 px-1">
            <span className="text-[#D4B06A] font-semibold">← Swipe cards to compare plans →</span>
            <div className="flex items-center gap-1">
              {socialServices.map((s) => (
                <span 
                  key={s.id} 
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    selectedServiceIds.includes(s.id) ? 'bg-[#D4B06A] w-3' : 'bg-neutral-700'
                  }`} 
                />
              ))}
            </div>
          </div>

          {/* Responsive Side-by-Side Mobile Comparison Track / Desktop 3-col Grid */}
          <div className="flex sm:grid sm:grid-cols-3 overflow-x-auto sm:overflow-visible snap-x snap-mandatory gap-3 sm:gap-6 lg:gap-8 pb-3 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none items-stretch">
            {socialServices.map((service) => {
              const isSelected = selectedServiceIds.includes(service.id);
              const months = (duration === '6months' || duration === '1year') ? (duration === '1year' ? 12 : 6) : 1;
              const discountedMonthlyRate = calculation.discountPct > 0 
                ? Math.round(service.basePrice * (1 - calculation.discountPct / 100))
                : service.basePrice;
              const planSubtotal = service.basePrice * months;
              const planDiscount = calculation.discountPct > 0 ? Math.round(planSubtotal * (calculation.discountPct / 100)) : 0;
              const planFinalTotal = planSubtotal - planDiscount;

              return (
                <motion.div
                  key={service.id}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => toggleService(service.id)}
                  className={`cursor-pointer group relative p-4 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl backdrop-blur-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shrink-0 w-[82vw] max-w-[310px] sm:w-auto sm:max-w-none snap-center ${
                    isSelected
                      ? 'bg-gradient-to-b from-[#14120C] to-[#0A0A0F] border-[#D4B06A] shadow-[0_15px_40px_rgba(0,0,0,0.95),0_0_30px_rgba(212,176,106,0.2)] ring-1 ring-[#D4B06A]/50 sm:-translate-y-1'
                      : service.isPopular
                      ? 'bg-[#0A0A10]/95 border-white/20 hover:border-[#D4B06A]/60 hover:bg-[#0E0E16]'
                      : 'bg-[#09090D]/90 border-white/10 hover:border-[#D4B06A]/40 hover:bg-[#0E0E14]'
                  }`}
                >
                  {/* Top Metallic Glare */}
                  <div className={`absolute top-0 left-6 right-6 h-[1.5px] transition-opacity duration-300 ${
                    isSelected ? 'bg-gradient-to-r from-transparent via-[#F0D28F] to-transparent opacity-100' : 'bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-40 group-hover:opacity-80'
                  }`} />

                  {/* Popular Floating Badge */}
                  {service.isPopular && !isSelected && (
                    <div className="absolute top-2.5 sm:-top-3 right-3 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#D4B06A] via-[#F0D28F] to-[#C9A35E] text-black text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest shadow-md z-20">
                      ⭐ MOST POPULAR
                    </div>
                  )}

                  {/* Selection Status Badge */}
                  {isSelected && (
                    <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 flex items-center gap-1 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#D4B06A]/20 border border-[#D4B06A] text-[#F0D28F] text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                      <Check className="w-3 h-3 stroke-[3]" />
                      <span>SELECTED</span>
                    </div>
                  )}

                  <div className="space-y-3.5 sm:space-y-4">
                    {/* Title & Tagline */}
                    <div className="pr-8 sm:pr-12">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-widest text-[#D4B06A] uppercase">
                          MONTHLY PLAN
                        </span>
                        {service.badge && (
                          <span className="px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-extrabold uppercase tracking-wider bg-[#D4B06A]/15 text-[#F0D28F] border border-[#D4B06A]/30">
                            {service.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="font-serif text-lg sm:text-2xl text-white font-bold tracking-tight group-hover:text-[#F0D28F] transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-neutral-300 mt-1 leading-relaxed line-clamp-2 sm:line-clamp-none">
                        {service.description}
                      </p>
                    </div>

                    {/* Pricing Block */}
                    <div className="pt-3 border-t border-neutral-800/80 space-y-1">
                      <div className="flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
                        <span className="font-serif text-2xl sm:text-3xl font-bold gold-gradient-text">
                          ₹{discountedMonthlyRate.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[11px] sm:text-xs text-neutral-400 font-sans">/mo</span>
                        {calculation.discountPct > 0 && (
                          <span className="text-[11px] sm:text-xs text-neutral-500 line-through ml-1">
                            ₹{service.basePrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                      
                      {/* Commitment Calculation Note */}
                      <div className="text-[10px] sm:text-[11px] text-neutral-400 leading-tight">
                        {(duration === '6months' || duration === '1year') ? (
                          <>
                            <span className="text-[#F0D28F] font-semibold">{duration === '1year' ? '12-Month Term' : '6-Month Term'}:</span> ₹{service.basePrice.toLocaleString('en-IN')} × {months} = ₹{planSubtotal.toLocaleString('en-IN')} 
                            <span className="text-[#D4B06A] font-bold block sm:inline sm:ml-1">
                              (-{calculation.discountPct}% = ₹{planFinalTotal.toLocaleString('en-IN')})
                            </span>
                          </>
                        ) : duration === '1month' ? (
                          <>Billed 1 month with <span className="text-[#D4B06A] font-medium">10% commitment discount</span></>
                        ) : (
                          <>Monthly retainer • <span className="text-[#D4B06A]">Standard monthly plan</span></>
                        )}
                      </div>
                    </div>

                    {/* Deliverables */}
                    <div className="pt-3 border-t border-neutral-800/80 space-y-2">
                      <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                        Deliverables:
                      </div>
                      <ul className="space-y-1.5 text-[11px] sm:text-xs text-neutral-200">
                        {service.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start space-x-2">
                            <Check className="w-3.5 h-3.5 text-[#D4B06A] shrink-0 mt-0.5" />
                            <span className="leading-tight">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Select Button */}
                  <div className="pt-4 mt-4 sm:pt-5 sm:mt-5 border-t border-neutral-800/60">
                    <button
                      type="button"
                      className={`w-full py-2.5 sm:py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 ${
                        isSelected
                          ? 'gold-gradient-bg text-black shadow-lg font-extrabold scale-[1.01]'
                          : 'bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 hover:border-[#D4B06A]/40'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Selected in Package</span>
                        </>
                      ) : (
                        <span>+ Select {service.name.replace(' Plan', '')}</span>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: PAID ADVERTISING MANAGEMENT */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1.5 sm:gap-2 mb-5 sm:mb-8 border-b border-neutral-800/80 pb-3 sm:pb-4">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#D4B06A]/15 border border-[#D4B06A]/30 flex items-center justify-center text-[#F0D28F] shadow-[0_0_15px_rgba(212,176,106,0.15)] shrink-0">
                <Megaphone className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <div className="text-[9px] sm:text-[10px] font-mono tracking-widest text-[#D4B06A] uppercase font-bold">
                  CATEGORY 03 • PAID ADS MANAGEMENT
                </div>
                <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-wide">
                  Paid Advertising Management
                </h2>
              </div>
            </div>
            <p className="text-[11px] sm:text-xs text-neutral-400 max-w-md text-left sm:text-right">
              Performance campaigns built for qualified leads, direct sales, and high ROAS.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-stretch mb-5">
            {adsServices.map((service) => {
              const isSelected = selectedServiceIds.includes(service.id);
              const months = (duration === '6months' || duration === '1year') ? (duration === '1year' ? 12 : 6) : 1;
              const discountedMonthlyPrice = calculation.discountPct > 0 
                ? Math.round(service.basePrice * (1 - calculation.discountPct / 100))
                : service.basePrice;
              const adsSubtotal = service.basePrice * months;
              const adsDiscount = calculation.discountPct > 0 ? Math.round(adsSubtotal * (calculation.discountPct / 100)) : 0;
              const adsFinal = adsSubtotal - adsDiscount;

              return (
                <motion.div
                  key={service.id}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => toggleService(service.id)}
                  className={`cursor-pointer group relative p-5 sm:p-7 lg:p-8 rounded-2xl sm:rounded-3xl backdrop-blur-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                    isSelected
                      ? 'bg-gradient-to-b from-[#14120C] to-[#0A0A0F] border-[#D4B06A] shadow-[0_15px_40px_rgba(0,0,0,0.95),0_0_30px_rgba(212,176,106,0.2)] ring-1 ring-[#D4B06A]/50'
                      : 'bg-[#09090D]/90 border-white/10 hover:border-[#D4B06A]/40 hover:bg-[#0E0E14]'
                  }`}
                >
                  <div className={`absolute top-0 left-6 right-6 h-[1.5px] transition-opacity duration-300 ${
                    isSelected ? 'bg-gradient-to-r from-transparent via-[#F0D28F] to-transparent opacity-100' : 'bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-40 group-hover:opacity-80'
                  }`} />

                  {isSelected && (
                    <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 flex items-center gap-1 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#D4B06A]/20 border border-[#D4B06A] text-[#F0D28F] text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                      <Check className="w-3 h-3 stroke-[3]" />
                      <span>SELECTED</span>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="pr-12 sm:pr-16">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-widest text-[#D4B06A] uppercase">
                          PAID ADS
                        </span>
                        {service.badge && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider bg-[#D4B06A]/15 text-[#F0D28F] border border-[#D4B06A]/30">
                            {service.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl text-white font-bold tracking-tight group-hover:text-[#F0D28F] transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-neutral-300 mt-1.5 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Pricing Display */}
                    <div className="pt-3 sm:pt-4 border-t border-neutral-800/80 space-y-1">
                      <div className="flex items-baseline gap-2 sm:gap-2.5 flex-wrap">
                        <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold gold-gradient-text">
                          ₹{discountedMonthlyPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-neutral-400 font-sans">/mo</span>
                        {calculation.discountPct > 0 && (
                          <span className="text-xs sm:text-sm text-neutral-500 line-through ml-1">
                            ₹{service.basePrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-neutral-400">
                        {(duration === '6months' || duration === '1year') ? (
                          <>Management Fee: ₹{service.basePrice.toLocaleString('en-IN')} × {months} mos = ₹{adsSubtotal.toLocaleString('en-IN')} {calculation.discountPct > 0 && `(-${calculation.discountPct}% = ₹${adsFinal.toLocaleString('en-IN')})`}</>
                        ) : (
                          <>Management Fee • <span className="text-[#D4B06A]">Standard monthly rate</span></>
                        )}
                      </div>
                    </div>

                    {/* Included Deliverables */}
                    <div className="pt-3 sm:pt-4 border-t border-neutral-800/80 space-y-2">
                      <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                        Campaign Management Scope:
                      </div>
                      <ul className="space-y-1.5 text-[11px] sm:text-xs text-neutral-200">
                        {service.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start space-x-2">
                            <Check className="w-3.5 h-3.5 text-[#D4B06A] shrink-0 mt-0.5" />
                            <span className="leading-tight">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-neutral-800/60">
                    <button
                      type="button"
                      className={`w-full py-2.5 sm:py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 ${
                        isSelected
                          ? 'gold-gradient-bg text-black shadow-lg font-extrabold scale-[1.01]'
                          : 'bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 hover:border-[#D4B06A]/40'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Selected in Package</span>
                        </>
                      ) : (
                        <span>+ Click to Select Ads</span>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Ad Spend Disclosure Box */}
          <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#121008] border border-[#D4B06A]/40 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 text-center sm:text-left">
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4B06A] shrink-0" />
            <div className="text-[11px] sm:text-xs text-neutral-300">
              <strong className="text-[#F0D28F] font-bold uppercase tracking-wider">AD SPEND NOT INCLUDED: </strong>
              The management fee covers our creative setup, targeting, and daily optimization. The actual advertising budget is paid directly to Meta or Google by the client.
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* LIVE TOTAL PRICE CALCULATOR ENGINE */}
        {/* ========================================================================= */}
        <section 
          id="calculator" 
          ref={calculatorRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20 scroll-mt-28"
        >
          <div className="relative p-5 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#101016] via-[#09090E] to-[#060608] border-2 border-[#D4B06A]/70 shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_60px_rgba(212,176,106,0.25)] overflow-hidden">
            {/* Top Metallic Glow Accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F0D28F] to-transparent" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
              
              {/* Left Column: Breakdown of Selected Services */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3 sm:pb-4">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#D4B06A] text-black flex items-center justify-center font-bold shadow-[0_0_20px_rgba(212,176,106,0.4)] shrink-0">
                      <Calculator className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg sm:text-2xl lg:text-3xl text-white font-bold">
                        Live Package Calculator
                      </h3>
                      <p className="text-[11px] sm:text-xs text-neutral-400">
                        Real-time recalculation based on your custom service selection
                      </p>
                    </div>
                  </div>

                  {calculation.selectedServices.length > 0 && (
                    <button
                      type="button"
                      onClick={clearAll}
                      className="text-xs text-neutral-400 hover:text-red-400 flex items-center gap-1 cursor-pointer transition-colors px-2 py-1 rounded-lg hover:bg-red-950/30 border border-transparent hover:border-red-800/40"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset</span>
                    </button>
                  )}
                </div>

                {/* Selected Services Itemized List */}
                <div className="space-y-2.5 sm:space-y-3">
                  <div className="flex items-center justify-between text-[11px] sm:text-xs uppercase font-bold tracking-wider text-neutral-400">
                    <span>Selected Services ({calculation.selectedServices.length}):</span>
                    <span className="text-[#D4B06A] lowercase font-normal text-[10px] sm:text-[11px]">click (×) to remove</span>
                  </div>

                  {calculation.selectedServices.length === 0 ? (
                    <div className="p-6 sm:p-8 rounded-2xl bg-black/50 border border-dashed border-neutral-800 text-center space-y-2.5">
                      <p className="text-neutral-400 text-xs sm:text-sm">
                        No services selected yet. Click on any Website, Social Media, or Ads card above to build your custom package.
                      </p>
                      <p className="text-[#D4B06A] text-xs">
                        Current Total: <strong className="text-white text-base">₹0</strong> (0 Services Selected)
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2 sm:space-y-2.5 max-h-80 overflow-y-auto pr-1">
                      <AnimatePresence initial={false}>
                        {calculation.selectedServicesDetails.map(item => {
                          return (
                            <motion.div 
                              key={item.id}
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                              className="p-3 sm:p-3.5 rounded-xl bg-black/60 border border-white/10 hover:border-[#D4B06A]/40 flex items-center justify-between gap-2.5 text-xs transition-all"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <span className="w-2 h-2 rounded-full bg-[#D4B06A] shrink-0" />
                                <div className="min-w-0">
                                  <div className="font-semibold text-white truncate text-xs sm:text-sm">{item.name}</div>
                                  <div className="text-[10px] text-neutral-400 truncate">
                                    {item.categoryLabel} • {item.billingType === 'monthly' ? `₹${item.unitPrice.toLocaleString('en-IN')}/mo × ${item.months} month(s)` : 'One-time development'}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2.5 shrink-0">
                                <div className="text-right">
                                  {item.discountAmount > 0 ? (
                                    <>
                                      <span className="text-neutral-500 line-through text-[10px] block">
                                        ₹{item.subtotal.toLocaleString('en-IN')}
                                      </span>
                                      <span className="font-bold text-[#F0D28F] text-xs sm:text-sm">
                                        ₹{item.finalPrice.toLocaleString('en-IN')}
                                      </span>
                                    </>
                                  ) : (
                                    <span className="font-bold text-[#F0D28F] text-xs sm:text-sm">
                                      ₹{item.subtotal.toLocaleString('en-IN')}
                                    </span>
                                  )}
                                </div>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleService(item.id);
                                  }}
                                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-neutral-900 hover:bg-red-950/60 border border-neutral-800 hover:border-red-700/60 text-neutral-400 hover:text-red-400 flex items-center justify-center transition-all cursor-pointer text-sm font-bold"
                                  title={`Remove ${item.name}`}
                                  aria-label={`Remove ${item.name}`}
                                >
                                  ×
                                </button>
                              </div>
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    </div>
                  )}
                </div>

                {/* Duration Tag & Information */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-[#0D0D12] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#D4B06A] shrink-0" />
                    <span className="text-neutral-300">Commitment Duration:</span>
                    <span className="font-bold text-[#F0D28F]">
                      {duration === 'one-time' ? 'ONE-TIME (Standard / No Retainer)' : calculation.durationInfo.label}
                    </span>
                  </div>
                  <span className={`px-2.5 py-0.5 sm:py-1 rounded-full font-bold text-[10px] sm:text-[11px] border ${
                    calculation.discountPct > 0 
                      ? 'bg-[#D4B06A]/15 text-[#F0D28F] border-[#D4B06A]/30' 
                      : (calculation.isPlanRequiredButMissing 
                          ? 'bg-amber-500/15 text-amber-300 border-amber-500/40' 
                          : 'bg-white/[0.05] text-neutral-400 border-white/10')
                  }`}>
                    {calculation.discountPct > 0 
                      ? `${calculation.discountPct}% Discount Applied (${calculation.selectedPlan?.name})` 
                      : (calculation.isPlanRequiredButMissing
                          ? `⚠️ Select Plan for ${DURATION_DETAILS[duration].discountPct}% OFF`
                          : '0% Duration Discount (Standard Rate)')}
                  </span>
                </div>

                {/* Plan Requirement Warning & Quick Pick when commitment is chosen without plan */}
                {calculation.isPlanRequiredButMissing && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 sm:p-4 rounded-2xl bg-amber-950/30 border border-amber-500/50 space-y-2.5"
                  >
                    <div className="flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-amber-300 uppercase tracking-wide">
                          Monthly Plan Required for {calculation.durationInfo.label} Commitment
                        </div>
                        <p className="text-[11px] text-neutral-300 leading-relaxed">
                          To activate your <strong className="text-[#F0D28F]">{DURATION_DETAILS[duration].discountPct}% commitment discount</strong>, please select one monthly plan below, or switch back to <strong>ONE-TIME</strong>:
                        </p>
                      </div>
                    </div>

                    {/* Quick Selection Buttons */}
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => selectPlanDirectly('starter-plan')}
                        className="px-2.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-amber-500/40 hover:border-amber-400 text-white text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer"
                      >
                        + Starter (₹9,999/mo)
                      </button>
                      <button
                        type="button"
                        onClick={() => selectPlanDirectly('growth-plan')}
                        className="px-2.5 py-1.5 rounded-lg gold-gradient-bg text-black text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer shadow-md"
                      >
                        + Growth (₹14,999/mo) ⭐
                      </button>
                      <button
                        type="button"
                        onClick={() => selectPlanDirectly('pro-plan')}
                        className="px-2.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-amber-500/40 hover:border-amber-400 text-white text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer"
                      >
                        + Pro (₹19,999/mo)
                      </button>
                      <button
                        type="button"
                        onClick={() => setDuration('one-time')}
                        className="px-2 py-1 rounded-lg text-neutral-400 hover:text-white text-[10px] sm:text-[11px] underline cursor-pointer"
                      >
                        Use ONE-TIME
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Right Column: Pricing Summary & Final Amount Card */}
              <div className="lg:col-span-5 p-5 sm:p-7 lg:p-8 rounded-2xl bg-[#0B0B10] border-2 border-[#D4B06A]/50 space-y-4 sm:space-y-6 shadow-2xl relative">
                
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5 sm:pb-3">
                  <span className="text-xs uppercase font-bold tracking-wider text-neutral-300">
                    Investment Summary
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-[#D4B06A] font-medium">
                    INR (₹) All Inclusive
                  </span>
                </div>

                <div className="space-y-3 text-xs sm:text-sm">
                  
                  {/* Subtotal */}
                  <div className="flex justify-between items-center text-neutral-300">
                    <span>Base Subtotal ({calculation.selectedServices.length} service{calculation.selectedServices.length === 1 ? '' : 's'}):</span>
                    <span className="font-semibold text-white">{calculation.formattedSubtotal}</span>
                  </div>

                  {/* Applied Discount */}
                  <div className="flex justify-between items-center text-[#F0D28F]">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4B06A]" />
                      <span>Duration Discount ({calculation.discountPct}% OFF):</span>
                    </span>
                    <span className="font-bold">
                      {calculation.discountPct > 0 ? `-${calculation.formattedDiscount}` : '₹0'}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="h-[1px] bg-neutral-800 pt-1" />

                  {/* Final Amount */}
                  <div className="pt-1 sm:pt-2 space-y-1">
                    <div className="text-[10px] sm:text-[11px] uppercase tracking-widest font-bold text-neutral-400">
                      Final Estimated Payable:
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold gold-gradient-text">
                        {calculation.formattedFinalAmount}
                      </span>
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-neutral-400 leading-relaxed pt-1">
                      {duration === 'one-time'
                        ? 'Standard rates applied without commitment discount. Choose 1 Month, 6 Months, or 1 Year with a monthly plan for up to 25% OFF.'
                        : (calculation.hasSelectedPlan
                            ? `Calculated for ${calculation.durationInfo.label} term (${calculation.monthsMultiplier > 1 ? `${calculation.monthsMultiplier} months plan subtotal` : '1 month'}) with ${calculation.discountPct}% duration discount.`
                            : `Select a monthly plan above to activate your ${DURATION_DETAILS[duration].discountPct}% commitment discount.`
                          )}
                    </p>
                  </div>
                </div>

                {/* Validation Error Banner if present */}
                {(validationError || calculation.validationMessage) && (
                  <div className="p-3 rounded-xl bg-red-950/40 border border-red-800/60 text-red-200 text-xs flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{validationError || calculation.validationMessage}</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-2.5 pt-1">
                  <button
                    type="button"
                    onClick={handleProceedToContact}
                    disabled={!calculation.canProceed}
                    className={`w-full py-3.5 sm:py-4 rounded-xl font-bold text-xs uppercase tracking-wider block text-center transition-all ${
                      calculation.canProceed
                        ? 'gold-gradient-bg text-black hover:brightness-110 shadow-[0_8px_30px_rgba(212,176,106,0.35)] cursor-pointer scale-[1.01]'
                        : 'bg-neutral-900 border border-neutral-800 text-neutral-500 cursor-not-allowed opacity-80'
                    }`}
                  >
                    {calculation.isPlanRequiredButMissing
                      ? '⚠️ SELECT A MONTHLY PLAN TO PROCEED'
                      : (calculation.selectedServices.length === 0
                          ? 'SELECT SERVICES TO PROCEED'
                          : 'PROCEED WITH SELECTED PACKAGE →'
                        )}
                  </button>

                  <a
                    href={`https://wa.me/919125205132?text=${encodeURIComponent(whatsappInquiryText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl border border-[#25D366]/50 text-[#25D366] hover:bg-[#25D366] hover:text-black font-semibold text-xs tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>Inquire / Confirm on WhatsApp</span>
                  </a>
                </div>

                <div className="text-center text-[10px] text-neutral-500">
                  ✓ Selection automatically transfers to your Contact inquiry form.
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Guarantees Bar */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
          <div className="p-5 sm:p-6 rounded-2xl bg-[#0B0B10] border border-neutral-800 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center sm:text-left shadow-lg">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4B06A] shrink-0 mx-auto sm:mx-0" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase">Fast & Agile Turnaround</h4>
                <p className="text-[10px] sm:text-[11px] text-neutral-400">Clear delivery milestones and scheduled rollouts.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4B06A] shrink-0 mx-auto sm:mx-0" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase">Transparent Reporting</h4>
                <p className="text-[10px] sm:text-[11px] text-neutral-400">Direct analytics breakdown & performance tracking.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#25D366] shrink-0 mx-auto sm:mx-0" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase">Direct Leadership Access</h4>
                <p className="text-[10px] sm:text-[11px] text-neutral-400">Direct coordination with Founder Mr. Radha Krishna.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 sm:py-20 bg-[#070709] border-t border-neutral-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
            <div className="text-center space-y-2 sm:space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#D4B06A] font-semibold">
                PRICING & SELECTION FAQS
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-white">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="p-4 sm:p-6 rounded-2xl bg-[#0B0B10] border border-neutral-800/80 space-y-1.5 sm:space-y-2">
                  <h3 className="font-serif text-sm sm:text-base lg:text-lg text-white font-medium flex items-center space-x-2">
                    <HelpCircle className="w-4 h-4 text-[#D4B06A] shrink-0" />
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 pl-6 leading-relaxed font-sans font-light">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Floating Quick-Summary Bar when user selects services */}
        <AnimatePresence>
          {calculation.selectedServices.length > 0 && (
            <motion.aside 
              aria-label="Selected package summary and checkout"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-4 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-md z-40"
            >
              <div className="p-3 sm:p-3.5 rounded-2xl bg-[#0E0E14]/95 backdrop-blur-xl border border-[#D4B06A] shadow-[0_15px_40px_rgba(0,0,0,0.95),0_0_30px_rgba(212,176,106,0.3)] flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[10px] uppercase font-bold text-[#D4B06A] tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>{calculation.selectedServices.length} Selected</span>
                  </div>
                  <div className="font-serif font-bold text-white text-base sm:text-lg leading-tight flex items-baseline gap-1.5 truncate">
                    <span>{calculation.formattedFinalAmount}</span>
                    <span className="text-[11px] text-neutral-400 font-sans font-normal truncate">
                      {duration === 'one-time' 
                        ? '(One-Time Rate)' 
                        : (calculation.hasSelectedPlan 
                            ? `(${calculation.discountPct}% OFF)` 
                            : `(Plan Required)`)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={scrollToCalculator}
                    className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-neutral-300 hover:text-white border border-white/10"
                    title="View Breakdown"
                  >
                    Breakdown
                  </button>

                  {calculation.isPlanRequiredButMissing ? (
                    <button
                      type="button"
                      onClick={scrollToSocialPlans}
                      className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-1 cursor-pointer transition-all"
                    >
                      <span>Pick Plan</span>
                      <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleProceedToContact}
                      className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-md flex items-center gap-1 cursor-pointer transition-all"
                    >
                      <span>Proceed</span>
                      <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                    </button>
                  )}
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        <CTASection />
        <WhatsAppButton 
          className={calculation.selectedServices.length > 0 ? "bottom-20 sm:bottom-24 right-4 sm:right-6" : "bottom-6 right-6"}
        />
      </main>
    </>
  );
}
