import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Utensils,
  Dumbbell,
  Building,
  HeartPulse,
  GraduationCap,
  ShoppingBag,
  Sparkles,
  Hotel,
  Wrench,
  Briefcase,
  Monitor,
  Smartphone,
  Tablet,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Layers,
  Zap,
  Globe,
  Share2,
  TrendingUp,
  SlidersHorizontal,
  ExternalLink,
  X,
  Code2,
  ShieldCheck,
  Clock,
  Sparkle,
  Film,
  Video,
  Target,
  BarChart3,
  Award,
  ChevronDown
} from 'lucide-react';
import SEO from '../components/SEO';
import { BUSINESS_TEMPLATES } from '../data';
import { BusinessTemplate } from '../types';
import { WHATSAPP_NUMBER, WhatsAppIcon } from '../components/WhatsAppButton';

const iconMap: Record<string, any> = {
  Utensils,
  Dumbbell,
  Building,
  HeartPulse,
  GraduationCap,
  ShoppingBag,
  Sparkles,
  Hotel,
  Wrench,
  Briefcase,
};

type ServiceCategory = 'WEBSITE' | 'SOCIAL MEDIA' | 'AI CREATIVE' | 'GROWTH STRATEGY';

interface FeatureCardData {
  id: string;
  title: string;
  shortDesc: string;
  icon: any;
  badge: string;
  details: {
    overview: string;
    deliverables: string[];
    performanceMetric: string;
  };
}

export default function TemplateDetail() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  // Find template or fallback to first
  const currentTemplate = useMemo<BusinessTemplate>(() => {
    if (!id) return BUSINESS_TEMPLATES[0];
    const found = BUSINESS_TEMPLATES.find((t) => t.id.toLowerCase() === id.toLowerCase());
    return found || BUSINESS_TEMPLATES[0];
  }, [id]);

  // Viewport mode: desktop, tablet, mobile
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Interactive 4 Categories
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('WEBSITE');

  // Active expanded 3D Card
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  // Active expanded Service Card
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);

  // Active preview interactive hotspot
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  // Toggle card 3D expansion
  const toggleCardExpansion = (cardId: string) => {
    setExpandedCardId((prev) => (prev === cardId ? null : cardId));
  };

  const toggleServiceExpansion = (serviceId: string) => {
    setExpandedServiceId((prev) => (prev === serviceId ? null : serviceId));
  };

  const IconComponent = iconMap[currentTemplate.iconName] || Globe;

  const orderWhatsAppUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi Radha Krishna Sir, I am interested in ordering the ${currentTemplate.industry} Website Template (${currentTemplate.demoName || 'Demo'}) for the Grand Opening launch price of ₹12,999. Please guide me through onboarding.`
  )}`;

  const consultWhatsAppUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi Radha Krishna Sir, I have a few custom questions regarding the ${currentTemplate.industry} Template before getting started.`
  )}`;

  // Architectural feature cards
  const architecturalFeatures: FeatureCardData[] = useMemo(() => [
    {
      id: 'feature-1',
      title: 'Conversion-Engineered UX Layout',
      shortDesc: 'Designed to turn casual visitors into direct WhatsApp inquiries and paying clients.',
      icon: Target,
      badge: 'CONVERSION',
      details: {
        overview: `Engineered specifically for the ${currentTemplate.industry} vertical. Every visual section follows high-status conversion psychology with frictionless calls to action.`,
        deliverables: [
          'High-status hero with instant value proposition',
          'Interactive rate card & service matrix',
          'Customer social proof and trust credentials',
          'Sticky 1-click WhatsApp & Call floaters',
        ],
        performanceMetric: 'Expected ~3.8x higher inquiry rate vs standard website layouts',
      },
    },
    {
      id: 'feature-2',
      title: 'Direct WhatsApp & Lead Routing',
      shortDesc: 'Instant mobile communication routing directly to your business phone without gatekeepers.',
      icon: Zap,
      badge: 'INTEGRATION',
      details: {
        overview: 'Zero customer drop-off. Pre-fills intelligent consultation messages so clients can inquire in a single tap on iOS and Android.',
        deliverables: [
          'Pre-populated WhatsApp click-to-chat links',
          'Custom consultation enquiry form',
          'Instant notification routing',
          'Direct Google Maps location & opening hours',
        ],
        performanceMetric: '< 100ms response trigger with zero third-party form delays',
      },
    },
    {
      id: 'feature-3',
      title: 'Sub-Second Speed & Core Web Vitals',
      shortDesc: 'Optimized React 18 & Tailwind architecture with 95+ Google PageSpeed score.',
      icon: Code2,
      badge: 'PERFORMANCE',
      details: {
        overview: 'Zero bloated page builders like WordPress or Elementor. Hand-coded with clean modern code for lightning-fast loading on all 4G/5G mobile networks.',
        deliverables: [
          'Next-gen image formatting (WebP/AVIF)',
          'Pure CSS utility styling with zero runtime bloat',
          'Automatic tree-shaking & minimal JS bundle',
          'Fully static CDN edge deployment ready',
        ],
        performanceMetric: 'Sub-800ms Time-to-Interactive on mobile devices',
      },
    },
    {
      id: 'feature-4',
      title: 'Industry Blueprint Deliverables',
      shortDesc: 'Includes all specialized pages, rate cards, and components for your exact niche.',
      icon: Layers,
      badge: 'DELIVERABLES',
      details: {
        overview: `Comprehensive turnkey package including ${currentTemplate.pagesIncluded || '5 customized pages'} built around ${currentTemplate.demoName}.`,
        deliverables: currentTemplate.websiteIncludes.concat([
          'Mobile navigation menu with rapid touch target',
          'Custom favicon and brand logo integration',
        ]),
        performanceMetric: 'Complete turnkey launch ready in ~7 days',
      },
    },
    {
      id: 'feature-5',
      title: 'Mobile-First Touch Ergonomics',
      shortDesc: 'Crafted for thumb-friendly navigation and flawless display on iPhones and Androids.',
      icon: Smartphone,
      badge: 'RESPONSIVE',
      details: {
        overview: 'Over 85% of local business traffic comes from mobile phones. This template is designed from the viewport up for seamless touch interaction.',
        deliverables: [
          '44px minimum touch targets across all buttons',
          'Smooth kinetic swipe gesture support',
          'Zero horizontal scroll overflow',
          'Adaptive typography scaling across all screen sizes',
        ],
        performanceMetric: '100% Mobile Usability Pass on Google Search Console',
      },
    },
    {
      id: 'feature-6',
      title: 'Technical SEO & Local Schema',
      shortDesc: 'Search-ready metadata, OpenGraph cards, and LocalBusiness Schema markup.',
      icon: Globe,
      badge: 'SEO READY',
      details: {
        overview: 'Structured data engineered to help your business rank at the top of Google Search and Google Maps for relevant local industry keywords.',
        deliverables: [
          'JSON-LD LocalBusiness Schema markup',
          'Canonical URLs, robots.txt & XML sitemap setup',
          'High-CTR OpenGraph social preview cards',
          'Optimized H1-H3 typographic hierarchy',
        ],
        performanceMetric: 'Index-ready architecture for Google & Bing web crawlers',
      },
    },
  ], [currentTemplate]);

  // Service details categorized into the 4 MANDATORY categories
  const categoryServices = useMemo(() => {
    return {
      WEBSITE: {
        headline: 'Website Engineering & UI/UX Architecture',
        subheadline: 'High-performance digital platform tailored to elevate your business credibility and capture inquiries.',
        accentColor: '#D4B06A',
        services: [
          {
            id: 'web-uiux',
            title: 'Custom UI/UX & Visual Design',
            desc: 'Bespoke design system featuring high-contrast luxury typography, refined negative space, and custom color accents for your brand.',
            highlights: ['Custom color palette & typography pairing', 'Micro-interactions & smooth page transitions', 'High-end imagery curation'],
            specs: 'Figma / CSS Tokens • 100% Brand Tailored'
          },
          {
            id: 'web-dev',
            title: 'High-Performance Web Architecture',
            desc: 'Coded with React, Vite, and Tailwind CSS. Clean, maintainable code with sub-second page loads and zero plugin bloat.',
            highlights: ['Sub-second CDN edge loading', 'Clean semantic HTML5 structure', 'Zero WordPress maintenance or security vulnerabilities'],
            specs: 'React 18 + Vite + Tailwind CSS'
          },
          {
            id: 'web-conversion',
            title: 'Conversion-Focused Funnels',
            desc: 'Every section is structured to guide visitors effortlessly toward booking an appointment, requesting a quote, or contacting on WhatsApp.',
            highlights: ['Frictionless WhatsApp 1-tap booking', 'Interactive rate card & package comparisons', 'Customer trust certifications'],
            specs: 'WhatsApp Click-to-Chat + Custom Forms'
          },
          {
            id: 'web-responsive',
            title: 'Multi-Device Adaptive Layout',
            desc: 'Pixel-perfect rendering across ultra-wide desktop monitors, laptops, iPads, and modern smartphones.',
            highlights: ['Fluid typography and touch ergonomics', 'Fast mobile menu navigation', 'Zero layout jumping or viewport clipping'],
            specs: '100% Mobile & Tablet Optimized'
          }
        ]
      },
      'SOCIAL MEDIA': {
        headline: 'Social Media Strategy & Visual Authority',
        subheadline: 'Turn social platforms into organic client acquisition funnels that consistently reinforce your brand authority.',
        accentColor: '#E2C17A',
        services: [
          {
            id: 'soc-strategy',
            title: 'Niche Content Strategy & Planning',
            desc: `Tailored content pillars built for the ${currentTemplate.industry} market. Monthly calendar structured to highlight authority and services.`,
            highlights: ['30-Day monthly content calendar', 'Strategic content pillars (Proof, Education, Offers)', 'Targeted hashtag & keyword clusters'],
            specs: 'Monthly Content Roadmap & Calendars'
          },
          {
            id: 'soc-reels',
            title: 'High-Retention Reels & Shorts',
            desc: 'Dynamic 15–30s short-form promotional videos scripted to grab attention in the first 3 seconds and drive profile visits.',
            highlights: currentTemplate.videoContent,
            specs: '9:16 Vertical Video • Scripting + Motion Graphics'
          },
          {
            id: 'soc-creatives',
            title: 'Branded Graphic Posts & Carousels',
            desc: 'Custom designed high-resolution social posts, announcement banners, and educational swipe carousels.',
            highlights: currentTemplate.socialContent,
            specs: '1:1 and 4:5 High-Resolution Master Creatives'
          },
          {
            id: 'soc-consistency',
            title: 'Visual Consistency & Profile Optimization',
            desc: 'Transform your Instagram, Facebook, and Google profiles into authoritative storefronts with optimized bio copy and highlight covers.',
            highlights: ['High-converting Bio copy & call-to-action', 'Custom story highlight icon set', 'Unified brand tone and visual language'],
            specs: 'Complete Social Brand Audit & Alignment'
          }
        ]
      },
      'AI CREATIVE': {
        headline: 'AI Creative Direction & Visual Systems',
        subheadline: 'Cutting-edge AI-assisted workflows producing cinematic visuals, commercial product staging, and video assets.',
        accentColor: '#C9A35E',
        services: [
          {
            id: 'ai-concepts',
            title: 'AI-Assisted Creative Direction',
            desc: 'Cinematic visual concepts, photorealistic scene staging, and custom artistic assets tailored for your exact niche.',
            highlights: ['Hyper-realistic ambiance & product rendering', 'Fast creative concept iteration', 'Proprietary studio visual styling'],
            specs: 'High-Res Generative Artwork & Art Direction'
          },
          {
            id: 'ai-video-workflows',
            title: 'AI Video Storyboarding & Motion Systems',
            desc: 'High-impact kinetic typography, dynamic video hooks, and voiceover enhancement to produce studio-grade promotional reels.',
            highlights: ['High-impact 3-second hook scripts', 'Studio-quality voiceover synthesis & mastering', 'Automated captioning with dynamic motion text'],
            specs: 'Commercial Grade Audio & Video Pipelines'
          },
          {
            id: 'ai-campaign-systems',
            title: 'Campaign Creative Systems',
            desc: 'Rapid multi-variant creative assets generated for seasonal offers, festive launches, and promotional campaigns.',
            highlights: ['Multi-format asset scaling (16:9, 1:1, 9:16)', 'A/B testing visual variants for ad creatives', 'Cohesive multi-platform look and feel'],
            specs: 'Turnkey Campaign Asset Packages'
          },
          {
            id: 'ai-visual-assets',
            title: 'Custom Brand Visual Assets',
            desc: 'Bespoke iconography, 3D graphic accents, and illustrated elements designed to make your website and social presence stand out.',
            highlights: ['Zero generic stock graphics', 'Exclusive visual style aligned to your brand', 'Exported in scalable SVG and WebP'],
            specs: 'Unique Studio Vector & Visual Assets'
          }
        ]
      },
      'GROWTH STRATEGY': {
        headline: 'Growth Strategy, SEO & Lead Generation',
        subheadline: 'Data-driven marketing funnels, local search dominance, and customer acquisition playbooks.',
        accentColor: '#F0D28F',
        services: [
          {
            id: 'growth-leadgen',
            title: 'Hyper-Local Lead Generation Funnels',
            desc: currentTemplate.growthFocus,
            highlights: ['Targeted local audience mapping', '1-Click WhatsApp consultation funnels', 'Offer packaging and conversion triggers'],
            specs: 'Hyper-Local Lead Architecture'
          },
          {
            id: 'growth-seo',
            title: 'Google Maps & Local Search SEO',
            desc: 'Rank for high-intent customer searches in your geographic region with optimized Google Business Profile guidance and website schema.',
            highlights: ['Google Business Profile ranking strategy', 'Local citation & keyword mapping', 'High-CTR search meta titles and descriptions'],
            specs: 'Technical SEO + Local Map Optimization'
          },
          {
            id: 'growth-cro',
            title: 'Conversion Rate Optimization (CRO)',
            desc: 'Systematic analysis of visitor flow, call-to-action placement, and copy to maximize the percentage of visitors who become paying clients.',
            highlights: ['Clear single-purpose call-to-actions', 'Trust badges and social proof placement', 'Mobile friction reduction audit'],
            specs: 'Continuous Conversion Audits & Enhancements'
          },
          {
            id: 'growth-routing',
            title: 'WhatsApp & CRM Lead Automation',
            desc: 'Direct leads straight to your WhatsApp with automated inquiry templates so no prospect goes unanswered.',
            highlights: ['Instant lead capture with zero delays', 'Pre-formatted message templates for swift replies', 'Seamless handoff to sales/reception'],
            specs: 'Direct WhatsApp API & Cloud Integration'
          }
        ]
      }
    };
  }, [currentTemplate]);

  return (
    <>
      <SEO
        title={`${currentTemplate.industry} Website Template (${currentTemplate.demoName || 'Demo'}) | YUGARK Digital Studio`}
        description={`Explore our turnkey ${currentTemplate.industry} Website Template. Engineered with React 18, WhatsApp lead flow, and sub-second speed. Launch in ~7 days for ₹12,999.`}
      />

      <main className="min-h-screen bg-[#050505] text-[#EAEAEA] pt-24 pb-28 relative overflow-hidden">
        {/* Ambient Atmospheric Glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-[#D4B06A]/6 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute top-[40%] right-0 w-[500px] h-[500px] bg-[#8B5CF6]/5 rounded-full blur-[160px] pointer-events-none" />

        {/* 1. TOP QUICK SWITCHER / TEMPLATE DOCK */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="p-3 sm:p-4 rounded-2xl bg-[#090909]/80 backdrop-blur-xl border border-neutral-800/80 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
              <Link
                to="/#templates"
                className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5 rotate-180 text-[#D4B06A]" />
                <span>All Templates</span>
              </Link>
              <div className="h-4 w-[1px] bg-neutral-800 hidden md:block" />
              <span className="text-xs font-semibold text-[#D4B06A] uppercase tracking-wider">
                Select Industry Architecture:
              </span>
            </div>

            {/* Horizontal Scrollable Industry Switcher Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
              {BUSINESS_TEMPLATES.map((tpl) => {
                const isSelected = tpl.id === currentTemplate.id;
                const TplIcon = iconMap[tpl.iconName] || Globe;
                return (
                  <button
                    key={tpl.id}
                    onClick={() => navigate(`/templates/${tpl.id}`)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 cursor-pointer shrink-0 ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#D4B06A] to-[#C9A35E] text-black font-bold shadow-[0_0_15px_rgba(212,176,106,0.3)] scale-[1.03]'
                        : 'bg-[#121212]/90 text-neutral-400 border border-neutral-800 hover:text-white hover:border-[#D4B06A]/40 hover:bg-[#181818]'
                    }`}
                  >
                    <TplIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-black' : 'text-[#D4B06A]'}`} />
                    <span>{tpl.industry}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* 2. DEDICATED TEMPLATE HERO & CINEMATIC PREVIEW FRAME */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 space-y-12">
          {/* Creative Layered Header Frame */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="creative-frame p-6 sm:p-10 relative overflow-hidden"
          >
            {/* Top Gold Corner Accents */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#D4B06A] rounded-tl-2xl pointer-events-none" />
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#D4B06A]/40 rounded-tr-md pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#D4B06A]/40 rounded-bl-md pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#D4B06A] rounded-br-2xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Template Identity & Pitch */}
              <div className="lg:col-span-7 space-y-5 text-left">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full bg-[#D4B06A]/15 text-[#D4B06A] border border-[#D4B06A]/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#F0D28F]" />
                    <span>{currentTemplate.industry} Architecture</span>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>7-Day Turnkey Delivery</span>
                  </span>
                </div>

                <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-normal leading-[1.15]">
                  {currentTemplate.demoName || `${currentTemplate.industry} Suite`}
                </h1>

                <p className="text-base sm:text-lg text-neutral-300 font-sans font-light leading-relaxed max-w-2xl">
                  {currentTemplate.tagline} Custom-coded with modern React, instant WhatsApp conversion routing, and zero maintenance overhead.
                </p>

                {/* Pricing & Key Package Matrix */}
                <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-neutral-300">
                  <div className="p-3.5 rounded-xl bg-[#121212]/90 border border-[#D4B06A]/35 backdrop-blur-sm">
                    <span className="block text-[10px] text-neutral-400 uppercase font-medium">Grand Opening Price</span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-xl font-bold text-white font-serif">₹12,999</span>
                      <span className="text-xs line-through text-neutral-500">₹14,999</span>
                      <span className="text-[10px] text-emerald-400 font-bold px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-800">
                        SAVE ₹2,000
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#121212]/90 border border-neutral-800 backdrop-blur-sm">
                    <span className="block text-[10px] text-neutral-400 uppercase font-medium">Scope of Inclusions</span>
                    <span className="text-sm font-semibold text-white mt-0.5 block">
                      {currentTemplate.pagesIncluded || '5 Pages + WhatsApp Chat'}
                    </span>
                  </div>
                </div>

                {/* Primary CTA Buttons */}
                <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <a
                    href={orderWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#25D366] to-[#1EBE5D] hover:brightness-110 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>Order This Template (₹12,999)</span>
                  </a>

                  <Link
                    to={`/contact?template=${currentTemplate.id}`}
                    className="px-5 py-3.5 rounded-xl bg-[#141414]/90 border border-neutral-700 hover:border-[#D4B06A]/50 hover:bg-[#1C1C1C] text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all"
                  >
                    <span>Request Custom Modifications</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D4B06A]" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Key Technical Specs Box */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-6 rounded-2xl bg-[#0E0E0E]/90 border border-neutral-800 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                    <span className="text-xs uppercase font-bold text-[#D4B06A] tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Studio Quality Guarantee</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#D4B06A]/10 text-[#D4B06A] font-bold">
                      100% HAND-CODED
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs text-neutral-300">
                    {[
                      'Complete branding adaptation with your logo & colors',
                      'High-converting copy tailored to your local services',
                      'Interactive rate cards, menus & booking forms',
                      'Direct WhatsApp routing without middleman fees',
                      'Free launch guidance on your domain name'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#D4B06A] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
                    <span>Founder Strategic Oversight:</span>
                    <span className="font-semibold text-white">Mr. Radha Krishna</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 3. INTERACTIVE RESPONSIVE VIEWPORT STAGE */}
          <div className="space-y-4">
            {/* Viewport Switcher Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 px-4 sm:px-6 py-3 rounded-xl bg-[#0C0C0C] border border-neutral-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  Live Viewport Simulator:
                </span>
                <span className="text-xs text-[#D4B06A] font-mono font-medium hidden sm:inline">
                  {viewportMode === 'desktop' && '1920 × 1080 (Cinematic Desktop)'}
                  {viewportMode === 'tablet' && '1024 × 768 (Tablet Pro)'}
                  {viewportMode === 'mobile' && '390 × 844 (Mobile Retina Frame)'}
                </span>
              </div>

              {/* Viewport Control Buttons */}
              <div className="flex items-center gap-1 bg-[#141414] p-1 rounded-lg border border-neutral-800">
                <button
                  onClick={() => setViewportMode('desktop')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                    viewportMode === 'desktop'
                      ? 'bg-gradient-to-r from-[#D4B06A] to-[#C9A35E] text-black font-bold shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Desktop</span>
                </button>

                <button
                  onClick={() => setViewportMode('tablet')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                    viewportMode === 'tablet'
                      ? 'bg-gradient-to-r from-[#D4B06A] to-[#C9A35E] text-black font-bold shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Tablet className="w-3.5 h-3.5" />
                  <span>Tablet</span>
                </button>

                <button
                  onClick={() => setViewportMode('mobile')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                    viewportMode === 'mobile'
                      ? 'bg-gradient-to-r from-[#D4B06A] to-[#C9A35E] text-black font-bold shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile</span>
                </button>
              </div>
            </div>

            {/* Viewport Canvas Frame */}
            <div className="p-4 sm:p-8 rounded-3xl bg-[#080808]/90 border border-neutral-800 shadow-2xl flex justify-center items-center overflow-hidden min-h-[460px]">
              <div
                className={`transition-all duration-500 ease-out w-full ${
                  viewportMode === 'desktop'
                    ? 'max-w-5xl'
                    : viewportMode === 'tablet'
                    ? 'max-w-2xl'
                    : 'max-w-sm'
                }`}
              >
                {/* Simulated Browser Bar */}
                <div className="rounded-t-xl bg-[#151515] border border-neutral-700/80 px-4 py-2.5 flex items-center justify-between gap-3 shadow-md">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>

                  <div className="flex-1 max-w-md bg-[#0A0A0A] border border-neutral-800 rounded-md px-3 py-1 text-[11px] text-neutral-400 font-mono flex items-center justify-center truncate">
                    <span className="text-[#D4B06A] mr-1">https://</span>
                    <span>demo-{currentTemplate.id}.yugark.studio</span>
                  </div>

                  <div className="flex items-center gap-2 text-neutral-400 text-xs">
                    <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 text-[10px] font-bold border border-emerald-800">
                      LIVE DEMO
                    </span>
                  </div>
                </div>

                {/* Simulated Webpage Content Area */}
                <div className="relative rounded-b-xl border-x border-b border-neutral-700/80 bg-[#0E0E0E] overflow-hidden shadow-2xl">
                  {/* Hero Banner Preview */}
                  <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
                    <img
                      src={currentTemplate.previewImage}
                      alt={currentTemplate.demoName}
                      className="w-full h-full object-cover brightness-75 scale-105 hover:scale-100 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-[#0E0E0E]/40 to-transparent" />

                    {/* Overlay Content */}
                    <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between">
                      {/* Top Bar inside demo */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-xs font-bold text-white">
                          <IconComponent className="w-3.5 h-3.5 text-[#D4B06A]" />
                          <span>{currentTemplate.demoName}</span>
                        </div>

                        <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#D4B06A]/90 text-black font-bold uppercase tracking-wider">
                          Ready in 7 Days
                        </span>
                      </div>

                      {/* Bottom Pitch inside demo */}
                      <div className="space-y-2 max-w-lg">
                        <span className="text-[11px] text-[#F0D28F] font-bold uppercase tracking-wider">
                          PREMIER {currentTemplate.industry.toUpperCase()} EXPERIENCE
                        </span>
                        <h3 className="font-serif text-xl sm:text-3xl text-white font-medium drop-shadow-md">
                          {currentTemplate.tagline}
                        </h3>
                        <div className="pt-1 flex flex-wrap gap-2">
                          {currentTemplate.websiteIncludes.slice(0, 3).map((item, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-white/10 text-neutral-200"
                            >
                              ✓ {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Simulated interactive action strip */}
                  <div className="p-4 bg-[#090909] border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-neutral-300">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Direct WhatsApp Lead Flow Enabled</span>
                    </div>

                    <a
                      href={orderWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-1.5 rounded-lg bg-[#25D366] text-black font-bold text-xs flex items-center gap-1.5 shadow hover:brightness-110 active:scale-95 transition-all"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5" />
                      <span>Book Demo Call</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. KEY ARCHITECTURAL BLUEPRINTS (CLICK -> 3D POP / FLIP-UP INTERACTION) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 space-y-10">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="font-sans text-[11px] uppercase tracking-[0.25em] font-bold text-[#D4B06A] inline-block px-3 py-1 rounded-full bg-[#D4B06A]/10 border border-[#D4B06A]/20">
              CLICK TO EXPAND • 3D ARCHITECTURAL BREAKDOWN
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal">
              Engineered Inclusions & Mechanics.
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 font-sans font-light">
              Click any card below to experience the 3D expansion and inspect the detailed deliverables, conversion mechanics, and performance specifications.
            </p>
          </div>

          {/* 3D Interactive Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-container">
            {architecturalFeatures.map((feat, idx) => {
              const isExpanded = expandedCardId === feat.id;
              const FeatIcon = feat.icon;

              return (
                <motion.div
                  key={feat.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  onClick={() => toggleCardExpansion(feat.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleCardExpansion(feat.id);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-expanded={isExpanded}
                  aria-label={`${feat.title} - Click for 3D technical breakdown`}
                  className={`relative rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden p-6 sm:p-7 flex flex-col justify-between ${
                    isExpanded
                      ? 'bg-[#111111] border-2 border-[#D4B06A] shadow-[0_20px_50px_rgba(212,176,106,0.25),0_0_30px_rgba(212,176,106,0.15)] scale-[1.02] -translate-y-2 z-20'
                      : 'bg-[#0A0A0A]/85 backdrop-blur-xl border border-neutral-800 hover:border-[#D4B06A]/50 hover:shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(212,176,106,0.1)] hover:-translate-y-1.5'
                  }`}
                  style={{
                    borderRadius: '1.25rem 0.5rem 1.25rem 0.5rem',
                  }}
                >
                  {/* Decorative Corner Highlight */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#D4B06A]/15 via-transparent to-transparent pointer-events-none" />

                  <div className="space-y-4">
                    {/* Top Badge & Icon */}
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-[#141414] border border-[#D4B06A]/30 flex items-center justify-center text-[#D4B06A] shadow-inner">
                        <FeatIcon className="w-5 h-5" />
                      </div>

                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#D4B06A]/10 text-[#D4B06A] border border-[#D4B06A]/20 uppercase tracking-wider">
                        {feat.badge}
                      </span>
                    </div>

                    {/* Card Title & Summary */}
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl text-white font-medium group-hover:text-[#F0D28F] transition-colors">
                        {feat.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-300 mt-2 leading-relaxed">
                        {feat.shortDesc}
                      </p>
                    </div>

                    {/* Expanded 3D Information Panel */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="pt-4 border-t border-[#D4B06A]/30 space-y-3.5 text-xs text-neutral-200"
                        >
                          <p className="leading-relaxed text-neutral-300 font-sans">
                            {feat.details.overview}
                          </p>

                          <div className="space-y-1.5 pt-1">
                            <span className="text-[10px] uppercase font-bold text-[#D4B06A] tracking-wider block">
                              Key Deliverables:
                            </span>
                            {feat.details.deliverables.map((item, i) => (
                              <div key={i} className="flex items-start gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#D4B06A] shrink-0 mt-0.5" />
                                <span className="text-neutral-300">{item}</span>
                              </div>
                            ))}
                          </div>

                          <div className="p-2.5 rounded-lg bg-black/60 border border-[#D4B06A]/20 text-[11px] text-[#F0D28F] font-mono">
                            ⚡ {feat.details.performanceMetric}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Card Bottom: Click to Expand / Collapse Trigger */}
                  <div className="pt-4 mt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs text-[#D4B06A] font-semibold">
                    <span>{isExpanded ? 'Click to close specifications' : 'Click for deep 3D breakdown'}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180 text-white' : ''
                      }`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* 5. INTERACTIVE 4-CATEGORY SERVICE SYSTEM (WEBSITE | SOCIAL MEDIA | AI CREATIVE | GROWTH STRATEGY) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="font-sans text-[11px] uppercase tracking-[0.25em] font-bold text-[#D4B06A] inline-block px-3 py-1 rounded-full bg-[#D4B06A]/10 border border-[#D4B06A]/20">
              SERVICE SCOPE & CATEGORY WORKFLOWS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal">
              Full-Spectrum Growth Capabilities.
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 font-sans font-light">
              Select any category below to inspect our tailored service modules, deliverables, and production frameworks designed for this template.
            </p>
          </div>

          {/* Interactive 4-Category Control Tabs */}
          <div className="flex items-center justify-center">
            <div className="p-1.5 rounded-2xl bg-[#090909]/90 border border-neutral-800 shadow-2xl flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              {(['WEBSITE', 'SOCIAL MEDIA', 'AI CREATIVE', 'GROWTH STRATEGY'] as ServiceCategory[]).map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setExpandedServiceId(null);
                    }}
                    className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#D4B06A] via-[#F0D28F] to-[#C9A35E] text-black shadow-[0_0_20px_rgba(212,176,106,0.4)] scale-[1.02]'
                        : 'text-neutral-400 hover:text-white bg-[#121212]/80 hover:bg-[#1A1A1A] border border-neutral-800'
                    }`}
                  >
                    {cat === 'WEBSITE' && <Globe className="w-4 h-4" />}
                    {cat === 'SOCIAL MEDIA' && <Share2 className="w-4 h-4" />}
                    {cat === 'AI CREATIVE' && <Sparkles className="w-4 h-4" />}
                    {cat === 'GROWTH STRATEGY' && <TrendingUp className="w-4 h-4" />}
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Animated Category Content Viewport */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="space-y-8"
            >
              {/* Category Subheader Banner */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0B0B0B]/90 border border-neutral-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#D4B06A] tracking-wider">
                    {selectedCategory} MODULE
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium">
                    {categoryServices[selectedCategory].headline}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl font-light">
                    {categoryServices[selectedCategory].subheadline}
                  </p>
                </div>

                <div className="shrink-0">
                  <a
                    href={consultWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-[#141414] border border-[#D4B06A]/40 hover:border-[#D4B06A] text-[#D4B06A] hover:text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5" />
                    <span>Inquire for {selectedCategory}</span>
                  </a>
                </div>
              </div>

              {/* 4 Interactive Service Cards in Selected Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categoryServices[selectedCategory].services.map((srv, sIdx) => {
                  const isSrvExpanded = expandedServiceId === srv.id;

                  return (
                    <motion.div
                      key={srv.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: sIdx * 0.05 }}
                      onClick={() => toggleServiceExpansion(srv.id)}
                      tabIndex={0}
                      role="button"
                      aria-expanded={isSrvExpanded}
                      className={`p-6 sm:p-7 rounded-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                        isSrvExpanded
                          ? 'bg-[#111111] border-2 border-[#D4B06A] shadow-[0_15px_40px_rgba(212,176,106,0.2)] scale-[1.01]'
                          : 'bg-[#090909]/85 backdrop-blur-md border border-neutral-800 hover:border-[#D4B06A]/40 hover:bg-[#121212]'
                      }`}
                      style={{
                        borderRadius: '1.25rem 0.5rem 1.25rem 0.5rem',
                      }}
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#141414] text-[#D4B06A] border border-[#D4B06A]/20">
                            {srv.specs}
                          </span>
                          <span className="text-xs text-neutral-400">Step 0{sIdx + 1}</span>
                        </div>

                        <div>
                          <h4 className="font-serif text-xl sm:text-2xl text-white font-medium">
                            {srv.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-neutral-300 mt-2 leading-relaxed">
                            {srv.desc}
                          </p>
                        </div>

                        {/* Deliverables checklist */}
                        <div className="pt-3 border-t border-neutral-800/80 space-y-1.5 text-xs text-neutral-300">
                          {srv.highlights.map((hl, hIdx) => (
                            <div key={hIdx} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#D4B06A] shrink-0 mt-0.5" />
                              <span>{hl}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 mt-4 border-t border-neutral-800/60 flex items-center justify-between text-[11px] text-[#D4B06A] font-semibold">
                        <span>{isSrvExpanded ? 'Hide implementation details' : 'Click for workflow details'}</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-300 ${
                            isSrvExpanded ? 'rotate-180 text-white' : ''
                          }`}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* 6. TECHNICAL SPECIFICATIONS & TURNKEY QUALITY MATRIX */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#090909]/90 border border-neutral-800 shadow-2xl relative overflow-hidden space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4B06A]">
                TECHNICAL SPECIFICATIONS & DELIVERY STANDARDS
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl text-white font-normal">
                Engineered for Global Production Standards.
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-neutral-800">
              <div className="p-4 rounded-xl bg-[#121212] border border-neutral-800/80 space-y-2">
                <span className="text-[10px] text-neutral-400 uppercase font-mono">Frontend Core</span>
                <p className="text-sm font-bold text-white">React 18 + Vite + TypeScript</p>
                <p className="text-xs text-neutral-400">Zero legacy jQuery or heavy runtime bloat.</p>
              </div>

              <div className="p-4 rounded-xl bg-[#121212] border border-neutral-800/80 space-y-2">
                <span className="text-[10px] text-neutral-400 uppercase font-mono">Styling Engine</span>
                <p className="text-sm font-bold text-white">Tailwind CSS 3.4+</p>
                <p className="text-xs text-neutral-400">GPU-accelerated transforms & micro-animations.</p>
              </div>

              <div className="p-4 rounded-xl bg-[#121212] border border-neutral-800/80 space-y-2">
                <span className="text-[10px] text-neutral-400 uppercase font-mono">Lead Integration</span>
                <p className="text-sm font-bold text-white">Direct WhatsApp API & Cloud CRM</p>
                <p className="text-xs text-neutral-400">Instant routing with zero middleman commissions.</p>
              </div>

              <div className="p-4 rounded-xl bg-[#121212] border border-neutral-800/80 space-y-2">
                <span className="text-[10px] text-neutral-400 uppercase font-mono">Turnaround Guarantee</span>
                <p className="text-sm font-bold text-white">~7 Working Days</p>
                <p className="text-xs text-neutral-400">Rapid deployment with full QA testing.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. DEDICATED TEMPLATE CTA & ORDER CONTAINER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-[#111111] via-[#0A0A0A] to-[#070707] border-2 border-[#D4B06A]/40 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(212,176,106,0.12)] text-center space-y-8 relative overflow-hidden">
            {/* Top gold accent glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-[#F0D28F] to-transparent" />

            <div className="space-y-4 max-w-3xl mx-auto">
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#D4B06A] px-3.5 py-1.5 rounded-full bg-[#D4B06A]/10 border border-[#D4B06A]/20 inline-block">
                GRAND OPENING OFFER • LIMITED AVAILABILITY
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-white font-medium leading-tight">
                Launch Your {currentTemplate.industry} Platform in 7 Days.
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 font-sans font-light leading-relaxed">
                Receive the complete {currentTemplate.demoName} architecture customized with your branding, photos, services, and direct WhatsApp lead generation for just ₹12,999.
              </p>
            </div>

            {/* Price Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-[#141414] border border-[#D4B06A]/40 shadow-inner">
              <span className="text-sm text-neutral-400">All-Inclusive Package:</span>
              <span className="text-2xl font-bold text-white font-serif">₹12,999</span>
              <span className="text-xs line-through text-neutral-500">₹14,999</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
              <a
                href={orderWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#25D366] to-[#1EBE5D] hover:brightness-110 text-black font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Order on WhatsApp (₹12,999)</span>
              </a>

              <Link
                to={`/contact?template=${currentTemplate.id}`}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#161616] border border-neutral-700 hover:border-[#D4B06A]/60 text-white font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#1E1E1E] active:scale-95 transition-all"
              >
                <span>Request Custom Brief</span>
                <ArrowRight className="w-4 h-4 text-[#D4B06A]" />
              </Link>
            </div>

            <p className="text-xs text-neutral-500 font-sans">
              Direct founder review by Mr. Radha Krishna • WhatsApp: +91 {WHATSAPP_NUMBER}
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
