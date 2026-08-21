import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES_DATA } from '../data';
import { ArrowUpRight, Globe, BarChart3, Bot, Megaphone, PenTool, Compass, Layers, Video, Sparkles, Image, Youtube, Film } from 'lucide-react';
import { motion } from 'motion/react';
import { PillarWebVisual, PillarCreativeVisual, PillarGrowthVisual } from './PillarsVisuals';

const iconMap: Record<string, any> = {
  Globe,
  BarChart3,
  Bot,
  Megaphone,
  PenTool,
  Compass,
  Video,
  Sparkles,
  Image,
  Youtube,
  Film
};

export default function ServicesGrid() {
  const [selectedPillar, setSelectedPillar] = useState<'all' | 'web' | 'creative' | 'growth'>('all');

  const pillars = [
    {
      id: 'web',
      pillarNumber: 'PILLAR 01',
      title: 'Website & Digital Experience',
      tagline: 'High-performance digital foundations engineered for conversion & trust.',
      icon: Layers,
      accentColor: '#D4B06A',
      badgeClass: 'bg-[#D4B06A]/10 text-[#F0D28F] border-[#D4B06A]/30',
      glowBorder: 'border-[#D4B06A]/30 hover:border-[#D4B06A]/70',
      visual: <PillarWebVisual />,
      services: [
        'Custom Website Engineering',
        'UI/UX & Interactive Design',
        'High-Converting Landing Pages',
        'E-commerce & WhatsApp Catalogs'
      ],
      serviceIds: ['website-development'],
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
      glowBorder: 'border-violet-500/30 hover:border-violet-500/70',
      visual: <PillarCreativeVisual />,
      services: [
        'Promotional Short Videos & Reels',
        'Long-Form Brand & Explainer Videos',
        'Branded Social Posts & Carousels',
        'AI Creative Visual Production'
      ],
      serviceIds: ['short-ad-video', 'long-video', 'individual-post', 'monthly-reels', 'youtube-content', 'monthly-posts'],
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
      glowBorder: 'border-cyan-500/30 hover:border-cyan-500/70',
      visual: <PillarGrowthVisual />,
      services: [
        'Meta & Instagram Paid Advertising',
        'Technical & Local Search SEO',
        'Content Strategy & Editorial Plans',
        'CRM & Instant WhatsApp Lead Routing'
      ],
      serviceIds: ['social-media-management', 'social-media-advertising', 'content-strategy', 'digital-growth-strategy'],
      exploreLink: '/services/social-media-advertising'
    }
  ];

  // Filter services based on active pillar or show all
  const filteredServices = selectedPillar === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => {
        const pillar = pillars.find((p) => p.id === selectedPillar);
        return pillar?.serviceIds.includes(s.id);
      });

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden bg-perspective-grid">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-violet-600/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-cyan-600/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24">
        
        {/* ========================================================= */}
        {/* PART 1: 3 CORE STUDIO PILLARS WITH 3D NEON VISUALS        */}
        {/* ========================================================= */}
        <div className="space-y-12">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121216]/90 border border-[#D4B06A]/30 shadow-[0_0_15px_rgba(212,176,106,0.1)]">
              <span className="text-xs text-[#F0D28F]">⬡</span>
              <span className="font-sans text-[11px] uppercase tracking-[0.25em] font-bold text-[#F0D28F]">
                CORE STUDIO CAPABILITIES
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] font-bold">
              Three pillars of digital growth.
            </h2>
            <p className="text-base sm:text-lg text-neutral-300 font-sans font-light max-w-2xl mx-auto">
              A simplified, unified structure designed to elevate your brand authority and drive compounding business revenue.
            </p>
          </div>

          {/* 3 Large Service Pillar Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {pillars.map((pillar) => {
              const PillarIcon = pillar.icon;
              const isSelected = selectedPillar === pillar.id;

              return (
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={`group relative p-6 sm:p-8 rounded-3xl bg-[#09090D]/85 backdrop-blur-2xl border ${pillar.glowBorder} transition-all duration-300 flex flex-col justify-between hover:-translate-y-2 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(0,0,0,0.5)] ${
                    isSelected ? 'ring-2 ring-[#D4B06A]/60 shadow-[0_0_35px_rgba(212,176,106,0.25)]' : ''
                  }`}
                >
                  {/* Top Edge Metallic Accent */}
                  <div className="absolute top-0 left-8 right-8 h-[1.5px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-80" />
                  
                  <div className="space-y-6">
                    {/* 3D Visual Stage at Card Top */}
                    <div className="w-full">
                      {pillar.visual}
                    </div>

                    {/* Pillar Badge & Icon */}
                    <div className="flex items-center justify-between pt-2">
                      <span className={`text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${pillar.badgeClass}`}>
                        {pillar.pillarNumber}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-[#14141A] border border-white/10 flex items-center justify-center text-neutral-300 group-hover:border-[#D4B06A] group-hover:text-[#F0D28F] group-hover:scale-105 transition-all duration-300 shadow-inner">
                        <PillarIcon className="w-5 h-5" />
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
                      <span>Explore Services</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                    
                    <button
                      onClick={() => setSelectedPillar(isSelected ? 'all' : pillar.id as any)}
                      className="text-[11px] font-mono text-neutral-400 hover:text-white px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      {isSelected ? 'Reset Filter' : 'Filter Grid'}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* PART 2: OUR PREMIUM SERVICES GRID (MATCHING REFERENCE)     */}
        {/* ========================================================= */}
        <div className="space-y-10 pt-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121216] border border-[#D4B06A]/30">
                <span className="text-xs text-[#F0D28F]">⬡</span>
                <span className="font-sans text-[11px] uppercase tracking-[0.25em] font-bold text-[#F0D28F]">
                  OUR PREMIUM SERVICES
                </span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl text-white font-bold">
                End-to-End Digital Solutions
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 font-light max-w-xl">
                Precision-engineered deliverables to build authority, capture inquiries, and scale revenue.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              <button
                onClick={() => setSelectedPillar('all')}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest font-bold transition-all duration-200 cursor-pointer ${
                  selectedPillar === 'all'
                    ? 'bg-[#D4B06A] text-black shadow-[0_0_15px_rgba(212,176,106,0.3)]'
                    : 'bg-[#14141A]/90 text-neutral-300 hover:text-white border border-white/10 hover:border-white/20'
                }`}
              >
                All Services
              </button>
              {pillars.map(p => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPillar(p.id as any)}
                  className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    selectedPillar === p.id
                      ? 'bg-[#D4B06A] text-black shadow-[0_0_15px_rgba(212,176,106,0.3)]'
                      : 'bg-[#14141A]/90 text-neutral-300 hover:text-white border border-white/10 hover:border-white/20'
                  }`}
                >
                  {p.pillarNumber}
                </button>
              ))}
            </div>
          </div>

          {/* Detailed Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredServices.map((service, index) => {
              const IconComponent = iconMap[service.iconName] || Globe;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="group relative p-8 rounded-3xl bg-[#09090D]/80 backdrop-blur-xl border border-white/10 hover:border-[#D4B06A]/45 transition-all duration-300 flex flex-col justify-between hover:bg-[#101016]/90 hover:-translate-y-1.5 shadow-[0_20px_40px_rgba(0,0,0,0.85)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_25px_rgba(212,176,106,0.12)]"
                >
                  {/* Subtle top shimmer */}
                  <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#D4B06A]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div>
                    {/* Service Icon */}
                    <div className="w-12 h-12 rounded-2xl bg-[#14141C] border border-[#D4B06A]/25 flex items-center justify-center text-[#D4B06A] group-hover:border-[#D4B06A] group-hover:bg-[#D4B06A] group-hover:text-black group-hover:scale-105 transition-all duration-300 mb-6 shadow-md">
                      <IconComponent className="w-5 h-5" />
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-2xl text-white mb-2 font-bold group-hover:text-[#F0D28F] transition-colors">
                      {service.title}
                    </h3>

                    {/* Pricing / Model Badge */}
                    {service.priceDisplay && (
                      <span className="inline-block text-[11px] text-[#F0D28F] bg-[#D4B06A]/10 border border-[#D4B06A]/25 px-3 py-1 rounded-full mb-4 font-mono font-medium">
                        {service.priceDisplay}
                      </span>
                    )}

                    {/* Short Description */}
                    <p className="text-sm text-neutral-300 font-light leading-relaxed mb-6">
                      {service.shortDesc}
                    </p>

                    {/* Feature Bullet Points */}
                    <ul className="space-y-2.5 mb-8 text-xs text-neutral-300">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2.5">
                          <span className="text-[#D4B06A] font-bold mt-0.5">•</span>
                          <span className="leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Learn More Link */}
                  <Link
                    to={service.link}
                    className="inline-flex items-center justify-between text-xs uppercase tracking-widest text-[#D4B06A] group-hover:text-[#F0D28F] font-bold transition-colors pt-4 border-t border-white/10"
                  >
                    <span>Explore Service Details</span>
                    <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}


