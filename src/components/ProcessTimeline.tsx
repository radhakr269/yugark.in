import { motion } from 'motion/react';
import { Search, PenTool, Code2, Rocket, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProcessTimeline() {
  const fourSteps = [
    {
      number: '01',
      title: 'DISCOVER',
      tagline: 'Understand the business, audience, goals and opportunity.',
      description: 'We audit your market positioning, research your competitors, profile your ideal buyer, and define a clear commercial roadmap for maximum impact.',
      icon: Search,
      badgeColor: 'text-[#F0D28F] bg-[#D4B06A]/15 border-[#D4B06A]/40 shadow-[0_0_12px_rgba(212,176,106,0.2)]',
      glowColor: 'from-[#D4B06A]/20 via-transparent to-transparent',
      deliverables: ['Commercial Footprint Audit', 'Competitor & Audience Analysis', 'Technical Architecture Plan']
    },
    {
      number: '02',
      title: 'DESIGN',
      tagline: 'Create the strategy, structure, UX/UI and visual direction.',
      description: 'We craft high-converting wireframes, bespoke visual design systems, interactive prototypes, and persuasive copywriting tailored to your high-ticket offerings.',
      icon: PenTool,
      badgeColor: 'text-violet-300 bg-violet-500/15 border-violet-500/40 shadow-[0_0_12px_rgba(139,92,246,0.2)]',
      glowColor: 'from-violet-500/20 via-transparent to-transparent',
      deliverables: ['Information Architecture', 'Luxury UI/UX Prototypes', 'Hook & Copywriting Blueprints']
    },
    {
      number: '03',
      title: 'BUILD',
      tagline: 'Develop the website, integrations, content systems and functionality.',
      description: 'We write clean, high-speed code, script & edit viral video reels, configure automated lead workflows, and build seamless WhatsApp and payment routing.',
      icon: Code2,
      badgeColor: 'text-cyan-300 bg-cyan-500/15 border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.2)]',
      glowColor: 'from-cyan-500/20 via-transparent to-transparent',
      deliverables: ['Zero-Bloat Web Development', 'Video & Social Asset Production', 'WhatsApp & CRM Lead Routing']
    },
    {
      number: '04',
      title: 'LAUNCH & GROW',
      tagline: 'Launch, optimize, measure and support continued growth.',
      description: 'We deploy to production with Google indexing, optimize Core Web Vitals, and support compounding brand growth with weekly content and performance campaigns.',
      icon: Rocket,
      badgeColor: 'text-[#F0D28F] bg-[#D4B06A]/15 border-[#D4B06A]/40 shadow-[0_0_12px_rgba(212,176,106,0.2)]',
      glowColor: 'from-[#D4B06A]/20 via-transparent to-transparent',
      deliverables: ['Production Deployment & Indexing', 'Speed & Conversion QA', 'Ongoing Monthly Growth Retainers']
    }
  ];

  return (
    <section className="py-24 bg-[#060608] relative overflow-hidden bg-perspective-grid">
      {/* Aurora Ambient Glows */}
      <div className="absolute top-10 left-1/4 w-[600px] h-[600px] bg-violet-600/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-[#D4B06A]/8 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121216]/90 border border-[#D4B06A]/30 backdrop-blur-md shadow-[0_0_15px_rgba(212,176,106,0.1)]">
            <span className="text-xs text-[#F0D28F]">⬡</span>
            <span className="font-sans text-[11px] uppercase tracking-[0.25em] font-bold text-[#F0D28F]">
              OUR PROVEN 4-STEP PROCESS
            </span>
          </div>
          
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] font-bold">
            A clear four-step path from concept <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#D4B06A] via-[#F0D28F] to-[#C9A35E] bg-clip-text text-transparent">
              to compounding growth.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 font-sans font-light max-w-2xl mx-auto">
            Disciplined execution designed to eliminate friction, prevent delays, and deliver high-converting digital assets.
          </p>
        </div>

        {/* Connected Horizontal Flow Conduits (Desktop View) */}
        <div className="hidden lg:block relative mb-4">
          <div className="absolute top-1/2 left-16 right-16 h-[2px] bg-gradient-to-r from-[#D4B06A]/30 via-violet-500/40 to-cyan-500/30 -translate-y-1/2 z-0" />
          
          {/* Animated Travelling Particle */}
          <motion.div 
            animate={{ left: ['5%', '95%', '5%'] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 w-8 h-[3px] bg-gradient-to-r from-transparent via-[#F0D28F] to-transparent -translate-y-1/2 z-1 filter blur-[1px] drop-shadow-[0_0_8px_#F0D28F]"
          />

          <div className="grid grid-cols-4 gap-6 relative z-10">
            {fourSteps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-[#0D0D12] border-2 border-[#D4B06A] flex items-center justify-center text-xs font-mono font-bold text-[#F0D28F] shadow-[0_0_20px_rgba(212,176,106,0.35)]">
                  {step.number}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Step Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {fourSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="relative p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#09090E]/85 backdrop-blur-xl border border-white/10 hover:border-[#D4B06A]/50 transition-all duration-300 flex flex-col justify-between group shadow-[0_20px_45px_rgba(0,0,0,0.85)] hover:-translate-y-2 overflow-hidden"
              >
                {/* Top Subtle Glow */}
                <div className={`absolute top-0 left-0 right-0 h-28 bg-gradient-to-b ${step.glowColor} pointer-events-none opacity-30 group-hover:opacity-80 transition-opacity`} />
                <div className="absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-[#F0D28F]/40 to-transparent" />

                <div className="space-y-3 sm:space-y-4 relative z-10">
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-[10px] sm:text-[11px] font-bold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border ${step.badgeColor}`}>
                      STEP {step.number}
                    </span>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#14141C] border border-white/10 flex items-center justify-center text-neutral-300 group-hover:text-[#F0D28F] group-hover:border-[#D4B06A]/50 transition-all shadow-inner">
                      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                  </div>

                  {/* Step Title */}
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-[#F0D28F] transition-colors mb-1">
                      {step.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-[#F0D28F] font-medium leading-snug">
                      {step.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-[11px] sm:text-xs text-neutral-300 leading-relaxed font-sans font-light">
                    {step.description}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="pt-2 sm:pt-3 border-t border-white/5 space-y-1.5 sm:space-y-2">
                    {step.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-[11px] sm:text-xs text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4B06A] shadow-[0_0_5px_#D4B06A] shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 sm:pt-4 mt-4 sm:mt-6 border-t border-white/10 relative z-10">
                  <Link
                    to="/process"
                    className="text-[11px] sm:text-xs uppercase tracking-wider text-neutral-400 group-hover:text-[#F0D28F] flex items-center justify-between transition-colors font-semibold"
                  >
                    <span>View Timeline Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Center CTA Button Matching Reference */}
        <div className="text-center pt-4">
          <Link
            to="/process"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#121216] to-[#1A1A22] border border-[#D4B06A]/50 text-[#F0D28F] hover:text-black hover:bg-gradient-to-r hover:from-[#D4B06A] hover:to-[#C9A35E] font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_25px_rgba(212,176,106,0.15)] hover:shadow-[0_0_30px_rgba(212,176,106,0.4)] group"
          >
            <span>VIEW DETAILED 7-DAY TIMELINE</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}



