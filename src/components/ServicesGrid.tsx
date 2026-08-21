import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES_DATA } from '../data';
import { ArrowUpRight, Globe, BarChart3, Bot, Megaphone, PenTool, Compass, Layers, Video, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

const iconMap: Record<string, any> = {
  Globe,
  BarChart3,
  Bot,
  Megaphone,
  PenTool,
  Compass,
  Video,
  Sparkles
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
      services: ['Custom Website Engineering', 'UI/UX & Interactive Design', 'High-Converting Landing Pages', 'E-commerce & WhatsApp Catalogs'],
      serviceIds: ['website-development']
    },
    {
      id: 'creative',
      pillarNumber: 'PILLAR 02',
      title: 'Content & Creative',
      tagline: 'High-retention video reels, graphics & multi-channel storytelling.',
      icon: Video,
      accentColor: '#8B5CF6',
      badgeClass: 'bg-violet-500/10 text-violet-300 border-violet-500/30',
      services: ['Promotional Short Videos & Reels', 'Long-Form Brand & Explainer Videos', 'Branded Social Posts & Carousels', 'AI Creative Visual Production'],
      serviceIds: ['short-ad-video', 'long-video', 'individual-post', 'monthly-reels', 'youtube-content', 'monthly-posts']
    },
    {
      id: 'growth',
      pillarNumber: 'PILLAR 03',
      title: 'Growth & Automation',
      tagline: 'Targeted acquisition, search visibility & automated lead management.',
      icon: Sparkles,
      accentColor: '#38BDF8',
      badgeClass: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
      services: ['Meta & Instagram Paid Advertising', 'Technical & Local Search SEO', 'Content Strategy & Editorial Plans', 'CRM & Instant WhatsApp Lead Routing'],
      serviceIds: ['social-media-management', 'social-media-advertising', 'content-strategy', 'digital-growth-strategy']
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-4">
          <span className="font-sans text-xs uppercase tracking-[0.25em] font-bold text-[#D4B06A]">
            CORE CAPABILITIES
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
            Three pillars of digital growth.
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 font-sans font-light">
            A simplified, unified structure designed to elevate your brand authority and drive compounding business revenue.
          </p>
        </div>

        {/* 3 Service Pillars Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {pillars.map((pillar) => {
            const PillarIcon = pillar.icon;
            const isSelected = selectedPillar === pillar.id;

            return (
              <div
                key={pillar.id}
                onClick={() => setSelectedPillar(isSelected ? 'all' : pillar.id as any)}
                className={`p-8 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer group ${
                  isSelected
                    ? 'bg-[#101010] border-[#D4B06A] shadow-2xl scale-[1.02]'
                    : 'bg-[#0B0B0B] border-white/10 hover:border-white/20 hover:bg-[#0E0E0E]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className={`text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${pillar.badgeClass}`}>
                      {pillar.pillarNumber}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#141414] border border-white/10 flex items-center justify-center text-white group-hover:border-[#D4B06A] group-hover:text-[#F0D28F] transition-colors">
                      <PillarIcon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl text-white font-medium mb-3 group-hover:text-[#F0D28F] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-neutral-300 font-sans font-light leading-relaxed mb-6">
                    {pillar.tagline}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-white/5">
                    {pillar.services.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4B06A]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs uppercase tracking-widest font-semibold text-[#D4B06A] group-hover:text-[#F0D28F]">
                  <span>{isSelected ? 'Viewing Category Details' : 'Filter Detailed Services'}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Category Filter Pills & Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
              Detailed Ecosystem:
            </span>
            <span className="text-xs font-serif text-[#F0D28F]">
              {selectedPillar === 'all' ? 'All Services' : pillars.find(p => p.id === selectedPillar)?.title} ({filteredServices.length})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedPillar('all')}
              className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer ${
                selectedPillar === 'all'
                  ? 'bg-[#D4B06A] text-black'
                  : 'bg-[#141414] text-neutral-300 hover:text-white border border-white/10'
              }`}
            >
              View All
            </button>
            {pillars.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedPillar(p.id as any)}
                className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer hidden sm:inline-block ${
                  selectedPillar === p.id
                    ? 'bg-[#D4B06A] text-black'
                    : 'bg-[#141414] text-neutral-300 hover:text-white border border-white/10'
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
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative p-8 rounded-2xl bg-[#0B0B0B] border border-white/5 hover:border-[#D4B06A]/40 transition-all duration-300 flex flex-col justify-between hover:bg-[#101010] hover:-translate-y-1 shadow-2xl"
              >
                <div>
                  {/* Service Icon */}
                  <div className="w-12 h-12 rounded-xl bg-[#141414] border border-[#D4B06A]/20 flex items-center justify-center text-[#D4B06A] group-hover:border-[#D4B06A] group-hover:bg-[#D4B06A] group-hover:text-black transition-colors mb-6">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-2xl text-white mb-2 font-medium group-hover:text-[#F0D28F] transition-colors">
                    {service.title}
                  </h3>

                  {/* Pricing / Model Badge */}
                  {service.priceDisplay && (
                    <span className="inline-block text-[11px] text-[#F0D28F] bg-[#D4B06A]/10 border border-[#D4B06A]/20 px-2.5 py-0.5 rounded mb-4 font-mono">
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
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-[#D4B06A] font-bold mt-0.5">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Learn More Link */}
                <Link
                  to={service.link}
                  className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest text-[#D4B06A] group-hover:text-[#F0D28F] font-semibold transition-colors pt-4 border-t border-white/5 group-hover:border-white/10"
                >
                  <span>Explore Service Details</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

