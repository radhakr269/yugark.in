import { useState } from 'react';
import SEO from '../components/SEO';
import { ALL_PRICING_SERVICES, ServiceItem } from '../lib/pricingSelection';
import { BUSINESS_TEMPLATES } from '../data';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  Share2, 
  Megaphone, 
  Video, 
  Sparkles, 
  Tag, 
  Clock, 
  MessageCircle, 
  Layers, 
  Compass, 
  Check, 
  ExternalLink,
  Target,
  Film,
  Zap,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import CTASection from '../components/CTASection';
import WhatsAppButton, { WHATSAPP_LINK, WHATSAPP_NUMBER, WhatsAppIcon } from '../components/WhatsAppButton';

// Icon and route mapping per service
interface ServiceMetadata {
  icon: any;
  detailRoute: string;
  categoryNumber: string;
  deliveryEstimate?: string;
  benefits: string[];
}

const SERVICE_META_MAP: Record<string, ServiceMetadata> = {
  'frontend-web': {
    icon: Globe,
    detailRoute: '/services/website-development',
    categoryNumber: '01',
    deliveryEstimate: '~7 Days Delivery',
    benefits: [
      'Elevates business status & client trust instantly',
      'Mobile-first architecture with 95+ speed score',
      'Direct WhatsApp click-to-chat & lead capture'
    ]
  },
  'fullstack-web': {
    icon: Layers,
    detailRoute: '/services/website-development',
    categoryNumber: '01',
    deliveryEstimate: '~12-14 Days Delivery',
    benefits: [
      'Custom database & automated CRM lead routing',
      'Secure admin authentication & lead export (CSV)',
      'Automated email & WhatsApp instant alerts'
    ]
  },
  'starter-plan': {
    icon: Share2,
    detailRoute: '/services/social-media-management',
    categoryNumber: '02',
    deliveryEstimate: 'Ongoing Monthly Cadence',
    benefits: [
      'Maintains active brand presence on Instagram & Meta',
      'Save 30+ hours on monthly content creation',
      'High-retention video reels with subtitles'
    ]
  },
  'growth-plan': {
    icon: TrendingUp,
    detailRoute: '/services/social-media-management',
    categoryNumber: '02',
    deliveryEstimate: 'Ongoing Monthly Cadence',
    benefits: [
      'Weekly viral reel drops & high-retention storytelling',
      'Strategic hashtag architecture & SEO optimization',
      'Direct conversion funnels into WhatsApp leads'
    ]
  },
  'pro-plan': {
    icon: Sparkles,
    detailRoute: '/services/social-media-management',
    categoryNumber: '02',
    deliveryEstimate: 'Ongoing Monthly Cadence',
    benefits: [
      'Full-scale media production & aggressive brand expansion',
      'Priority turnaround & dedicated content team',
      'Bi-weekly performance & lead conversion reviews'
    ]
  },
  'meta-ads': {
    icon: Target,
    detailRoute: '/services/social-media-advertising',
    categoryNumber: '03',
    deliveryEstimate: 'Fast 3-Day Funnel Launch',
    benefits: [
      'Targeted local & national audience segmentation',
      'High-converting ad creatives & persuasive copywriting',
      'Direct WhatsApp inquiry & appointment booking funnels'
    ]
  },
  'google-ads': {
    icon: Megaphone,
    detailRoute: '/services/social-media-advertising',
    categoryNumber: '03',
    deliveryEstimate: 'Fast 3-Day Setup & Launch',
    benefits: [
      'Capture high-intent ready-to-buy search queries',
      'Performance Max & local map pack lead funnels',
      'Strict negative keyword negative-spend defense'
    ]
  },
  'short-video': {
    icon: Video,
    detailRoute: '/services/ai-content-video',
    categoryNumber: '04',
    deliveryEstimate: '~7 Days Turnaround',
    benefits: [
      'Engineered for maximum 3-second hook retention',
      'Dynamic sound design, kinetic typography & graphics',
      'Ready to run as Meta ad or organic Instagram Reel'
    ]
  },
  'long-video': {
    icon: Film,
    detailRoute: '/services/ai-content-video',
    categoryNumber: '04',
    deliveryEstimate: '~15 Days Turnaround',
    benefits: [
      'Establishes deep founder authority & brand story',
      'Evergreen asset for website, YouTube & sales pitches',
      'Studio-grade color grading, audio master & pacing'
    ]
  }
};

export default function Services() {
  const [activeTab, setActiveTab] = useState<'all' | 'website' | 'social' | 'ads' | 'video' | 'custom' | 'templates'>('all');

  // Filter groups
  const webServices = ALL_PRICING_SERVICES.filter(s => s.category === 'website');
  const socialServices = ALL_PRICING_SERVICES.filter(s => s.category === 'social');
  const adsServices = ALL_PRICING_SERVICES.filter(s => s.category === 'ads');
  const videoServices = ALL_PRICING_SERVICES.filter(s => s.category === 'video');

  const scrollToSection = (id: string) => {
    setActiveTab('all');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <SEO 
        title="Services & Solutions — YUGARK Digital Studio" 
        description="Explore YUGARK Digital Studio's synchronized services: Custom Website Development (from ₹9,999), Social Media Growth (from ₹9,999/mo), Meta & Google Ads (₹15,000/mo), and Video Production."
      />

      <main className="pt-32 pb-24 bg-[#050505] relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#D4B06A]/5 blur-[120px] rounded-full pointer-events-none" />

        {/* Hero Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 text-center space-y-5 sm:space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#D4B06A]/10 border border-[#D4B06A]/25 text-[#D4B06A] text-xs uppercase tracking-widest font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>YUGARK Digital Capabilities</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.15]">
            High-Performance Digital Services <br className="hidden sm:inline" />
            <span className="gold-text-gradient font-normal italic">Engineered for Real Growth.</span>
          </h1>

          <p className="text-sm sm:text-lg text-neutral-300 font-sans font-light max-w-3xl mx-auto leading-relaxed">
            Synchronized with our transparent pricing. Choose custom modern websites, high-retention video production, targeted paid advertising, or ongoing social media growth.
          </p>

          {/* Quick Jump & Filter Pills */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'website', label: '01 Website Dev' },
              { id: 'social', label: '02 Social & Content' },
              { id: 'ads', label: '03 Paid Ads' },
              { id: 'video', label: '04 Video Production' },
              { id: 'custom', label: '05 Custom Projects' },
              { id: 'templates', label: 'Industry Blueprints' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#D4B06A] text-black shadow-lg scale-105'
                    : 'bg-[#101010] text-neutral-400 hover:text-white border border-neutral-800 hover:border-[#D4B06A]/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {/* Content Body */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24 relative z-10">

          {/* SECTION 01 — WEBSITE DEVELOPMENT */}
          {(activeTab === 'all' || activeTab === 'website') && (
            <section id="website-dev" className="space-y-6 sm:space-y-8 scroll-mt-28">
              {/* Category Header */}
              <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-[#0F0F0F] via-[#141414] to-[#0A0A0A] border border-[#D4B06A]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-[#D4B06A] text-xs uppercase tracking-widest font-bold">
                    <Globe className="w-4 h-4" />
                    <span>CATEGORY 01</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-white">Website Development</h2>
                  <p className="text-xs sm:text-sm text-neutral-300 font-light">
                    Modern high-converting websites and dynamic full-stack applications with lightning speed and WhatsApp lead routing.
                  </p>
                </div>
                <Link
                  to="/pricing"
                  className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-[#D4B06A] hover:text-[#F0D28F] self-start sm:self-auto shrink-0 transition-colors"
                >
                  <span>Compare in Calculator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Service Cards Grid (Compact 2-Column Responsive) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {webServices.map((service) => (
                  <ServiceCardItem key={service.id} service={service} />
                ))}
              </div>
            </section>
          )}

          {/* SECTION 02 — SOCIAL MEDIA & CONTENT */}
          {(activeTab === 'all' || activeTab === 'social') && (
            <section id="social-media" className="space-y-6 sm:space-y-8 scroll-mt-28">
              {/* Category Header */}
              <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-[#0F0F0F] via-[#141414] to-[#0A0A0A] border border-[#D4B06A]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-[#D4B06A] text-xs uppercase tracking-widest font-bold">
                    <Share2 className="w-4 h-4" />
                    <span>CATEGORY 02</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-white">Social Media & Content Growth</h2>
                  <p className="text-xs sm:text-sm text-neutral-300 font-light">
                    Scripted viral video reels, high-aesthetic carousel posts, and monthly strategy retainers that turn followers into clients.
                  </p>
                </div>
                <Link
                  to="/pricing"
                  className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-[#D4B06A] hover:text-[#F0D28F] self-start sm:self-auto shrink-0 transition-colors"
                >
                  <span>Duration Discounts in Calculator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Service Cards Grid (3 Columns on Desktop, Compact on Mobile) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {socialServices.map((service) => (
                  <ServiceCardItem key={service.id} service={service} />
                ))}
              </div>
            </section>
          )}

          {/* SECTION 03 — PAID ADVERTISING */}
          {(activeTab === 'all' || activeTab === 'ads') && (
            <section id="paid-ads" className="space-y-6 sm:space-y-8 scroll-mt-28">
              {/* Category Header */}
              <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-[#0F0F0F] via-[#141414] to-[#0A0A0A] border border-[#D4B06A]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-[#D4B06A] text-xs uppercase tracking-widest font-bold">
                    <Target className="w-4 h-4" />
                    <span>CATEGORY 03</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-white">Paid Advertising Management</h2>
                  <p className="text-xs sm:text-sm text-neutral-300 font-light">
                    Targeted customer acquisition funnels across Meta (Instagram/Facebook) and high-intent Google Search networks.
                  </p>
                </div>
                <Link
                  to="/services/social-media-advertising"
                  className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-[#D4B06A] hover:text-[#F0D28F] self-start sm:self-auto shrink-0 transition-colors"
                >
                  <span>Ad Strategy Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Service Cards Grid (Compact 2-Column Responsive) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {adsServices.map((service) => (
                  <ServiceCardItem key={service.id} service={service} />
                ))}
              </div>
            </section>
          )}

          {/* SECTION 04 — VIDEO SERVICES */}
          {(activeTab === 'all' || activeTab === 'video') && (
            <section id="video-services" className="space-y-6 sm:space-y-8 scroll-mt-28">
              {/* Category Header */}
              <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-[#0F0F0F] via-[#141414] to-[#0A0A0A] border border-[#D4B06A]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-[#D4B06A] text-xs uppercase tracking-widest font-bold">
                    <Video className="w-4 h-4" />
                    <span>CATEGORY 04</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-white">Video Production & Ad Reels</h2>
                  <p className="text-xs sm:text-sm text-neutral-300 font-light">
                    Hook-driven vertical ad reels for Instagram/Shorts and cinematic long-form brand story films for YouTube & websites.
                  </p>
                </div>
                <Link
                  to="/services/ai-content-video"
                  className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-[#D4B06A] hover:text-[#F0D28F] self-start sm:self-auto shrink-0 transition-colors"
                >
                  <span>Video Production Overview</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Service Cards Grid (Compact 2-Column Responsive) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {videoServices.map((service) => (
                  <ServiceCardItem key={service.id} service={service} />
                ))}
              </div>
            </section>
          )}

          {/* SECTION 05 — CUSTOM PROJECTS */}
          {(activeTab === 'all' || activeTab === 'custom') && (
            <section id="custom-projects" className="space-y-6 sm:space-y-8 scroll-mt-28">
              {/* Category Header */}
              <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-[#0F0F0F] via-[#141414] to-[#0A0A0A] border border-[#D4B06A]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-[#D4B06A] text-xs uppercase tracking-widest font-bold">
                    <Sparkles className="w-4 h-4" />
                    <span>CATEGORY 05</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-white">Custom Projects & Consultation</h2>
                  <p className="text-xs sm:text-sm text-neutral-300 font-light">
                    Bespoke digital architecture, enterprise integrations, multi-location rollouts, and executive growth consulting.
                  </p>
                </div>
              </div>

              {/* Single High-Aesthetic Card */}
              <div className="p-5 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-[#0A0A0A] border border-[#D4B06A]/35 hover:border-[#D4B06A]/70 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center shadow-2xl gold-border-glow">
                <div className="lg:col-span-8 space-y-4 sm:space-y-5">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span className="px-3 py-1 rounded-lg bg-[#D4B06A]/10 border border-[#D4B06A]/30 text-[#D4B06A] text-xs font-bold uppercase tracking-wider">
                      BESPOKE ARCHITECTURE
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-medium">
                      Direct Founder Review
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-4xl text-white leading-tight">
                    Custom Project / Consultation
                  </h3>

                  <p className="text-neutral-300 text-xs sm:text-base leading-relaxed font-sans font-light">
                    Have a unique digital platform requirement, custom software integration, or high-volume multi-channel campaign? We develop tailored project roadmaps designed specifically for your business goals.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs text-neutral-200">
                    {[
                      '1-on-1 Strategy Session with Mr. Radha Krishna',
                      'Custom Technical Architecture & UI Blueprint',
                      'Transparent Milestone-Based Delivery Plan',
                      'Direct WhatsApp & Video Consultation Channel'
                    ].map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-[#D4B06A] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-4 p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-[#111111] border border-white/10 space-y-4 text-center">
                  <div className="space-y-1">
                    <span className="text-[11px] uppercase tracking-wider text-[#D4B06A] font-semibold">Pricing Structure</span>
                    <div className="font-serif text-2xl sm:text-3xl font-bold text-white">
                      Custom Quote
                    </div>
                    <p className="text-xs text-neutral-400">Free initial project feasibility consultation</p>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <Link
                      to="/contact?service=Custom+Project+%2F+Consultation"
                      className="w-full py-3 px-4 rounded-xl gold-gradient-bg text-black font-semibold text-xs uppercase tracking-wider block hover:brightness-110 transition-all shadow-md"
                    >
                      Book Free Consultation
                    </Link>

                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Radha%20Krishna%20Sir,%20I%20would%20like%20to%20discuss%20a%20Custom%20Project%20%2F%20Consultation%20with%20YUGARK.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-black font-semibold text-xs tracking-wider flex items-center justify-center gap-2 transition-all"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      <span>Inquire on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* SECTION: INDUSTRY BLUEPRINTS */}
          {(activeTab === 'all' || activeTab === 'templates') && (
            <section id="templates" className="space-y-6 sm:space-y-8 scroll-mt-28">
              <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-[#0F0F0F] via-[#141414] to-[#0A0A0A] border border-[#D4B06A]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-[#D4B06A] text-xs uppercase tracking-widest font-bold">
                    <Compass className="w-4 h-4" />
                    <span>INDUSTRY FRAMEWORKS</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-white">Custom Blueprints by Industry</h2>
                  <p className="text-xs sm:text-sm text-neutral-300 font-light">
                    Pre-configured web architecture, video hooks, and WhatsApp conversion workflows optimized for your sector.
                  </p>
                </div>
                <Link
                  to="/templates"
                  className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-[#D4B06A] hover:text-[#F0D28F] self-start sm:self-auto shrink-0 transition-colors"
                >
                  <span>Browse All Live Demos</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
                {BUSINESS_TEMPLATES.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 sm:p-6 rounded-xl sm:rounded-2xl bg-[#0A0A0A] border border-neutral-800 hover:border-[#D4B06A]/40 transition-all space-y-3 sm:space-y-4 flex flex-col justify-between group"
                  >
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#D4B06A] px-2 py-0.5 sm:px-2.5 sm:py-1 bg-[#D4B06A]/10 border border-[#D4B06A]/20 rounded-lg">
                          {item.industry}
                        </span>
                      </div>

                      <h3 className="font-serif text-xs sm:text-lg text-white group-hover:text-[#F0D28F] transition-colors leading-snug">
                        {item.tagline}
                      </h3>

                      <p className="text-[10px] sm:text-xs text-neutral-300 leading-relaxed font-sans font-light line-clamp-2 sm:line-clamp-none">
                        <strong className="text-white font-medium">Focus:</strong> {item.growthFocus}
                      </p>

                      <div className="space-y-1 pt-2 border-t border-neutral-900 hidden sm:block">
                        <ul className="space-y-1 text-xs text-neutral-300">
                          {item.websiteIncludes.slice(0, 3).map((d, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-1.5 truncate">
                              <span className="text-[#D4B06A]">✓</span>
                              <span className="truncate text-neutral-300">{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-2 sm:pt-3 border-t border-neutral-800 flex items-center justify-between">
                      <Link
                        to={`/templates/${item.id}`}
                        className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold text-[#D4B06A] hover:underline"
                      >
                        <span>View Template</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>

                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Radha%20Krishna%20Sir,%20I%20am%20interested%20in%20the%20${encodeURIComponent(item.industry)}%20Blueprint.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-[#128C7E]/20 text-[#25D366] hover:bg-[#25D366] hover:text-black transition-colors"
                        title="Ask on WhatsApp"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>

        {/* Global CTA Section */}
        <div className="mt-20 sm:mt-28">
          <CTASection />
        </div>

        <WhatsAppButton />
      </main>
    </>
  );
}

/**
 * Highly interactive, compact service card component
 */
function ServiceCardItem({ service }: { service: ServiceItem }) {
  const meta = SERVICE_META_MAP[service.id] || {
    icon: Globe,
    detailRoute: '/services',
    categoryNumber: service.categoryNumber,
    deliveryEstimate: '~7 Days Delivery',
    benefits: ['Delivered with direct founder oversight']
  };

  const IconComponent = meta.icon;
  const isMonthly = service.billingType === 'monthly';
  const formattedPrice = `₹${service.basePrice.toLocaleString('en-IN')}${isMonthly ? '/mo' : ''}`;

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="p-4 sm:p-6 lg:p-7 rounded-2xl bg-[#0A0A0A] border border-white/10 hover:border-[#D4B06A]/50 transition-all duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden"
    >
      {/* Subtle top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4B06A]/30 to-transparent group-hover:via-[#D4B06A] transition-all duration-500" />

      <div className="space-y-4">
        {/* Badges and Icon Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 sm:p-2.5 rounded-xl bg-[#141414] border border-[#D4B06A]/25 text-[#F0D28F] group-hover:bg-[#D4B06A] group-hover:text-black transition-colors duration-300">
              <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#D4B06A] block">
                {service.categoryLabel}
              </span>
              <h3 className="font-serif text-base sm:text-xl text-white font-medium group-hover:text-[#F0D28F] transition-colors leading-tight">
                {service.name}
              </h3>
            </div>
          </div>

          {service.badge && (
            <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-[#D4B06A]/10 border border-[#D4B06A]/30 text-[#D4B06A] text-[10px] sm:text-xs font-bold tracking-wider uppercase shrink-0">
              {service.badge}
            </span>
          )}
        </div>

        {/* Pricing Block */}
        <div className="p-3 sm:p-3.5 rounded-xl bg-[#111111] border border-white/5 flex items-baseline justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium">
              {isMonthly ? 'Monthly Retainer' : 'Transparent Investment'}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
                {formattedPrice}
              </span>
              {service.originalPrice && (
                <span className="text-xs text-neutral-500 line-through">
                  ₹{service.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>

          {meta.deliveryEstimate && (
            <span className="text-[10px] sm:text-xs text-neutral-400 flex items-center gap-1 font-sans">
              <Clock className="w-3 h-3 text-[#D4B06A]" />
              <span>{meta.deliveryEstimate}</span>
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-neutral-300 font-sans font-light leading-relaxed">
          {service.description}
        </p>

        {/* Deliverables checklist */}
        <div className="space-y-2 pt-1 border-t border-neutral-900">
          <span className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-[#D4B06A] block">
            What's Included:
          </span>
          <ul className="space-y-1.5 text-xs text-neutral-300">
            {service.features.slice(0, 4).map((feat, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D4B06A] shrink-0 mt-0.5" />
                <span className="text-[11px] sm:text-xs leading-snug">{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action CTA buttons */}
      <div className="pt-4 mt-4 border-t border-neutral-900/80 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          {/* Primary View Details Link */}
          <Link
            to={meta.detailRoute}
            className="py-2.5 px-2 sm:px-3 rounded-xl bg-[#141414] border border-white/10 hover:border-[#D4B06A]/60 text-neutral-200 hover:text-white font-medium text-[10px] sm:text-xs uppercase tracking-wider flex items-center justify-center gap-1 text-center transition-all"
          >
            <span>View Service</span>
            <ArrowRight className="w-3 h-3" />
          </Link>

          {/* Calculator Direct Selection */}
          <Link
            to={`/pricing?service=${service.id}`}
            className="py-2.5 px-2 sm:px-3 rounded-xl gold-gradient-bg text-black font-bold text-[10px] sm:text-xs uppercase tracking-wider flex items-center justify-center gap-1 text-center hover:brightness-110 transition-all shadow-sm"
          >
            <span>Calculate</span>
            <Tag className="w-3 h-3" />
          </Link>
        </div>

        {/* WhatsApp Direct Chat */}
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Radha%20Krishna%20Sir,%20I%20have%20an%20inquiry%20about%20${encodeURIComponent(service.name)}%20(${formattedPrice}).%20Please%20guide%20me.`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2 px-3 rounded-lg border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366] hover:text-black font-semibold text-[10px] sm:text-xs tracking-wider flex items-center justify-center gap-1.5 transition-all"
        >
          <WhatsAppIcon className="w-3.5 h-3.5" />
          <span>Ask on WhatsApp</span>
        </a>
      </div>
    </motion.div>
  );
}
