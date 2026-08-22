import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, 
  Globe, 
  BarChart3, 
  Bot, 
  Megaphone, 
  PenTool, 
  Layers, 
  Video, 
  Sparkles, 
  Image, 
  Youtube, 
  Film,
  TrendingUp,
  Layout,
  Share2,
  Tv
} from 'lucide-react';
import { motion } from 'motion/react';
import { PillarWebVisual, PillarCreativeVisual, PillarGrowthVisual } from './PillarsVisuals';

// =========================================================================
// 1. THREE PILLARS OF DIGITAL GROWTH (MATCHING REFERENCE IMAGE SECTION 2)
// =========================================================================

export function ThreePillarsSection() {
  const pillars = [
    {
      id: 'web',
      pillarNumber: 'PILLAR 01',
      title: 'Website & Digital Experience',
      tagline: 'High-performance digital foundations engineered for conversion & trust.',
      icon: Layers,
      accentColor: '#D4B06A',
      badgeClass: 'bg-[#D4B06A]/10 text-[#F0D28F] border-[#D4B06A]/30',
      glowBorder: 'border-[#D4B06A]/35 hover:border-[#D4B06A]/80 shadow-[0_0_30px_rgba(212,176,106,0.12)]',
      topShimmer: 'via-[#D4B06A]/60',
      visual: <PillarWebVisual />,
      services: [
        'Custom Website Engineering',
        'UI/UX & Interactive Design',
        'High-Converting Landing Pages',
        'E-commerce & WhatsApp Catalogs'
      ],
      exploreLink: '/services/website-development'
    },
    {
      id: 'creative',
      pillarNumber: 'PILLAR 02',
      title: 'Content & Creative',
      tagline: 'High-retention video reels, graphics & multi-channel storytelling.',
      icon: Video,
      accentColor: '#A855F7',
      badgeClass: 'bg-violet-500/10 text-violet-300 border-violet-500/30',
      glowBorder: 'border-violet-500/35 hover:border-violet-500/80 shadow-[0_0_30px_rgba(168,85,247,0.12)]',
      topShimmer: 'via-violet-400/60',
      visual: <PillarCreativeVisual />,
      services: [
        'Promotional Short Videos & Reels',
        'Long-Form Brand & Explainer Videos',
        'Branded Social Posts & Carousels',
        'AI Creative Visual Production'
      ],
      exploreLink: '/services/ai-content-video'
    },
    {
      id: 'growth',
      pillarNumber: 'PILLAR 03',
      title: 'Growth & Automation',
      tagline: 'Targeted acquisition, search visibility & automated lead management.',
      icon: Sparkles,
      accentColor: '#38BDF8',
      badgeClass: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
      glowBorder: 'border-cyan-500/35 hover:border-cyan-500/80 shadow-[0_0_30px_rgba(56,189,248,0.12)]',
      topShimmer: 'via-cyan-400/60',
      visual: <PillarGrowthVisual />,
      services: [
        'Meta & Instagram Paid Advertising',
        'Technical & Local Search SEO',
        'Content Strategy & Editorial Plans',
        'CRM & Instant WhatsApp Lead Routing'
      ],
      exploreLink: '/services/social-media-advertising'
    }
  ];

  return (
    <section className="py-20 sm:py-24 bg-[#050505] relative overflow-hidden bg-perspective-grid">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-violet-600/6 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#D4B06A]/6 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121216]/90 border border-[#D4B06A]/30 shadow-[0_0_15px_rgba(212,176,106,0.1)]">
            <span className="text-xs text-[#F0D28F]">⬡</span>
            <span className="font-sans text-[11px] uppercase tracking-[0.25em] font-bold text-[#F0D28F]">
              CORE STUDIO CAPABILITIES
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] font-bold">
            Three pillars of digital <span className="bg-gradient-to-r from-[#D4B06A] via-[#F0D28F] to-[#C9A35E] bg-clip-text text-transparent">growth.</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 font-sans font-light max-w-2xl mx-auto leading-relaxed">
            A simplified, unified structure designed to elevate your brand authority and drive compounding business revenue.
          </p>
        </div>

        {/* 3 Large Service Pillar Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {pillars.map((pillar) => {
            const PillarIcon = pillar.icon;

            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`group relative p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#09090E]/90 backdrop-blur-2xl border ${pillar.glowBorder} transition-all duration-300 flex flex-col justify-between hover:-translate-y-2 shadow-[0_25px_60px_rgba(0,0,0,0.95)]`}
              >
                {/* Top Edge Metallic Accent */}
                <div className={`absolute top-0 left-8 right-8 h-[1.5px] bg-gradient-to-r from-transparent ${pillar.topShimmer} to-transparent opacity-80`} />
                
                <div className="space-y-4 sm:space-y-6">
                  {/* 3D Visual Stage at Card Top */}
                  <div className="w-full">
                    {pillar.visual}
                  </div>

                  {/* Pillar Badge & Icon */}
                  <div className="flex items-center justify-between pt-1 sm:pt-2">
                    <span className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border ${pillar.badgeClass}`}>
                      {pillar.pillarNumber}
                    </span>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#14141A] border border-white/10 flex items-center justify-center text-neutral-300 group-hover:border-[#D4B06A] group-hover:text-[#F0D28F] group-hover:scale-105 transition-all duration-300 shadow-inner">
                      <PillarIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="font-serif text-2xl sm:text-[26px] text-white font-bold mb-2.5 group-hover:text-[#F0D28F] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-neutral-300 font-sans font-light leading-relaxed">
                      {pillar.tagline}
                    </p>
                  </div>

                  {/* 4 Feature Bullets */}
                  <div className="space-y-2.5 pt-4 border-t border-white/5">
                    {pillar.services.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-xs text-neutral-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4B06A] shadow-[0_0_6px_#D4B06A]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action CTA */}
                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                  <Link
                    to={pillar.exploreLink}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#D4B06A] group-hover:text-[#F0D28F] transition-colors"
                  >
                    <span>EXPLORE SERVICES</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// =========================================================================
// 2. OUR PREMIUM SERVICES (MATCHING REFERENCE IMAGE SECTION 4)
// =========================================================================

export function PremiumServicesSection() {
  // 10 Compact Futuristic Service Cards from Reference Image Specification
  const premiumServices = [
    {
      id: 'website-development',
      title: 'Custom Website Development',
      desc: 'Conversion-focused websites that build trust & drive leads.',
      icon: Layout,
      color: '#D4B06A',
      borderClass: 'border-[#D4B06A]/35 hover:border-[#D4B06A]/80 shadow-[0_0_20px_rgba(212,176,106,0.1)]',
      iconBoxClass: 'bg-[#D4B06A]/10 text-[#F0D28F] border-[#D4B06A]/30',
      link: '/services/website-development'
    },
    {
      id: 'individual-post',
      title: 'Individual Social Media Post',
      desc: 'High-quality graphics that build brand authority.',
      icon: Image,
      color: '#A855F7',
      borderClass: 'border-violet-500/35 hover:border-violet-500/80 shadow-[0_0_20px_rgba(168,85,247,0.1)]',
      iconBoxClass: 'bg-violet-500/10 text-violet-300 border-violet-500/30',
      link: '/services/individual-post'
    },
    {
      id: 'social-media-management',
      title: 'Social Media Management',
      desc: 'Monthly planning, content & growth management.',
      icon: Share2,
      color: '#38BDF8',
      borderClass: 'border-cyan-500/35 hover:border-cyan-500/80 shadow-[0_0_20px_rgba(56,189,248,0.1)]',
      iconBoxClass: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
      link: '/services/social-media-management'
    },
    {
      id: 'monthly-reels',
      title: 'Monthly Reels Package',
      desc: 'Short-form videos that engage and convert.',
      icon: Video,
      color: '#F43F5E',
      borderClass: 'border-rose-500/35 hover:border-rose-500/80 shadow-[0_0_20px_rgba(244,63,94,0.1)]',
      iconBoxClass: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
      link: '/services/monthly-reels'
    },
    {
      id: 'youtube-content',
      title: 'YouTube Content Creation',
      desc: 'Long-form videos that educate & build authority.',
      icon: Youtube,
      color: '#FB923C',
      borderClass: 'border-orange-500/35 hover:border-orange-500/80 shadow-[0_0_20px_rgba(251,146,60,0.1)]',
      iconBoxClass: 'bg-orange-500/10 text-orange-300 border-orange-500/30',
      link: '/services/youtube-content'
    },
    {
      id: 'monthly-posts',
      title: 'Monthly Posts Package',
      desc: 'Branded posts & carousels that keep you visible.',
      icon: Layers,
      color: '#D4B06A',
      borderClass: 'border-[#D4B06A]/35 hover:border-[#D4B06A]/80 shadow-[0_0_20px_rgba(212,176,106,0.1)]',
      iconBoxClass: 'bg-[#D4B06A]/10 text-[#F0D28F] border-[#D4B06A]/30',
      link: '/services/monthly-posts'
    },
    {
      id: 'social-media-advertising',
      title: 'Social Media Ads (Meta Ads)',
      desc: 'High-converting ads that generate real results.',
      icon: Megaphone,
      color: '#EF4444',
      borderClass: 'border-red-500/35 hover:border-red-500/80 shadow-[0_0_20px_rgba(239,68,68,0.1)]',
      iconBoxClass: 'bg-red-500/10 text-red-300 border-red-500/30',
      link: '/services/social-media-advertising'
    },
    {
      id: 'ai-creative-strategy',
      title: 'AI Creative Strategy',
      desc: 'AI-powered content strategy for explosive growth.',
      icon: Bot,
      color: '#2DD4BF',
      borderClass: 'border-teal-500/35 hover:border-teal-500/80 shadow-[0_0_20px_rgba(45,212,191,0.1)]',
      iconBoxClass: 'bg-teal-500/10 text-teal-300 border-teal-500/30',
      link: '/services/ai-content-video'
    },
    {
      id: 'content-strategy',
      title: 'Content Strategy & Editorial Planning',
      desc: 'Strategic content plans that drive growth.',
      icon: PenTool,
      color: '#D4B06A',
      borderClass: 'border-[#D4B06A]/35 hover:border-[#D4B06A]/80 shadow-[0_0_20px_rgba(212,176,106,0.1)]',
      iconBoxClass: 'bg-[#D4B06A]/10 text-[#F0D28F] border-[#D4B06A]/30',
      link: '/services/content-strategy'
    },
    {
      id: 'digital-growth-strategy',
      title: 'Digital Growth Strategy',
      desc: 'End-to-end strategy to scale your business.',
      icon: TrendingUp,
      color: '#38BDF8',
      borderClass: 'border-cyan-500/35 hover:border-cyan-500/80 shadow-[0_0_20px_rgba(56,189,248,0.1)]',
      iconBoxClass: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
      link: '/services/digital-growth-strategy'
    }
  ];

  return (
    <section className="py-20 sm:py-24 bg-[#050505] relative overflow-hidden bg-perspective-grid">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-violet-600/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#D4B06A]/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121216] border border-[#D4B06A]/30">
            <span className="text-xs text-[#F0D28F]">⬡</span>
            <span className="font-sans text-[11px] uppercase tracking-[0.25em] font-bold text-[#F0D28F]">
              OUR PREMIUM SERVICES
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-bold tracking-tight">
            End-to-end digital solutions to build, grow and scale your brand.
          </h2>
        </div>

        {/* Compact Futuristic Neon Cards Grid (2-column on mobile / responsive grid) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2.5 sm:gap-5">
          {premiumServices.map((service, index) => {
            const ServiceIcon = service.icon;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.03 }}
                className={`group relative p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-[#09090E]/85 backdrop-blur-xl border ${service.borderClass} transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:bg-[#0F0F16]`}
              >
                <div>
                  {/* Icon & Arrow Header */}
                  <div className="flex items-center justify-between mb-2 sm:mb-3.5">
                    <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl border flex items-center justify-center ${service.iconBoxClass} group-hover:scale-105 transition-transform`}>
                      <ServiceIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <Link
                      to={service.link}
                      className="text-neutral-500 group-hover:text-[#F0D28F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all p-0.5 sm:p-1"
                      aria-label={`View ${service.title}`}
                    >
                      <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </Link>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xs sm:text-base font-bold text-white mb-1 sm:mb-1.5 group-hover:text-[#F0D28F] transition-colors leading-snug">
                    {service.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-[10px] sm:text-xs text-neutral-400 font-light leading-relaxed line-clamp-2 sm:line-clamp-none">
                    {service.desc}
                  </p>
                </div>

                {/* Bottom subtle indicator line */}
                <div className="pt-2 sm:pt-3 mt-2 sm:mt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold text-neutral-500 group-hover:text-neutral-300 transition-colors">
                    Details
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#D4B06A] transition-colors" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Default export for backward compatibility
export default function ServicesGrid() {
  return (
    <>
      <ThreePillarsSection />
      <PremiumServicesSection />
    </>
  );
}


