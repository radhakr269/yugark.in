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
      badgeColor: 'text-[#F0D28F] bg-[#D4B06A]/10 border-[#D4B06A]/30',
      deliverables: ['Commercial Footprint Audit', 'Competitor & Audience Analysis', 'Technical Architecture Plan']
    },
    {
      number: '02',
      title: 'DESIGN',
      tagline: 'Create the strategy, structure, UX/UI and visual direction.',
      description: 'We craft high-converting wireframes, bespoke visual design systems, interactive prototypes, and persuasive copywriting tailored to your high-ticket offerings.',
      icon: PenTool,
      badgeColor: 'text-violet-300 bg-violet-500/10 border-violet-500/30',
      deliverables: ['Information Architecture', 'Luxury UI/UX Prototypes', 'Hook & Copywriting Blueprints']
    },
    {
      number: '03',
      title: 'BUILD',
      tagline: 'Develop the website, integrations, content systems and functionality.',
      description: 'We write clean, high-speed code, script & edit viral video reels, configure automated lead workflows, and build seamless WhatsApp and payment routing.',
      icon: Code2,
      badgeColor: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/30',
      deliverables: ['Zero-Bloat Web Development', 'Video & Social Asset Production', 'WhatsApp & CRM Lead Routing']
    },
    {
      number: '04',
      title: 'LAUNCH & GROW',
      tagline: 'Launch, optimize, measure and support continued growth.',
      description: 'We deploy to production with Google indexing, optimize Core Web Vitals, and support compounding brand growth with weekly content and performance campaigns.',
      icon: Rocket,
      badgeColor: 'text-[#F0D28F] bg-[#D4B06A]/10 border-[#D4B06A]/30',
      deliverables: ['Production Deployment & Indexing', 'Speed & Conversion QA', 'Ongoing Monthly Growth Retainers']
    }
  ];

  return (
    <section className="py-24 bg-[#080808] border-t border-b border-[#D4B06A]/15 relative overflow-hidden bg-perspective-grid">
      {/* Aurora Ambient Glows */}
      <div className="absolute top-10 left-1/3 w-[550px] h-[550px] bg-violet-600/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[450px] h-[450px] bg-[#D4B06A]/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="space-y-3 mb-16 text-center max-w-3xl mx-auto">
          <span className="font-sans text-xs uppercase tracking-[0.25em] font-bold text-[#D4B06A]">
            HOW YUGARK WORKS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-[1.15]">
            A clear four-step path from concept to compounding growth.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-sans font-light">
            Disciplined execution designed to eliminate friction, prevent delays, and deliver high-converting digital assets.
          </p>
        </div>

        {/* 4 Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {fourSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-7 rounded-2xl bg-[#0A0A0A] border border-neutral-800/90 hover:border-[#D4B06A]/50 transition-all duration-300 flex flex-col justify-between group gold-border-glow hover:-translate-y-1"
              >
                <div className="space-y-4">
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between">
                    <span className={`font-serif text-xs font-bold px-2.5 py-1 rounded-md border ${step.badgeColor}`}>
                      STEP {step.number}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#141414] border border-white/10 flex items-center justify-center text-neutral-300 group-hover:text-[#F0D28F] group-hover:border-[#D4B06A]/40 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Step Title */}
                  <div>
                    <h3 className="font-serif text-2xl font-medium text-white group-hover:text-[#F0D28F] transition-colors mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#F0D28F] font-medium leading-snug">
                      {step.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-neutral-300 leading-relaxed font-sans font-light">
                    {step.description}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="pt-3 border-t border-neutral-900 space-y-1.5">
                    {step.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-1.5 text-[11px] text-neutral-400">
                        <span className="w-1 h-1 rounded-full bg-[#D4B06A]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-900/60">
                  <Link
                    to="/process"
                    className="text-[11px] uppercase tracking-wider text-neutral-400 group-hover:text-[#F0D28F] flex items-center justify-between transition-colors"
                  >
                    <span>View Timeline Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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

