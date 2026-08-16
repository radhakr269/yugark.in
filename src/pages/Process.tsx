import SEO from '../components/SEO';
import ProcessTimeline from '../components/ProcessTimeline';
import CTASection from '../components/CTASection';
import { PROCESS_STEPS } from '../data';
import { ShieldCheck, Clock, Award, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Process() {
  const timelinePhases = [
    {
      phase: 'Weeks 1 — 2',
      title: 'Strategic Alignment & Audit',
      description: 'Discovery workshops, competitive intelligence analysis, user persona mapping, and technical architecture blueprint.'
    },
    {
      phase: 'Weeks 3 — 4',
      title: 'Design & Generative Prototyping',
      description: 'Framer/React wireframing, high-status UI design, AI video scriptwriting, and content pillar structure.'
    },
    {
      phase: 'Weeks 5 — 6',
      title: 'Engineering & Ad Integration',
      description: 'Full-stack development, mobile responsiveness optimization, Meta ad pixel setup, and SEO indexing.'
    },
    {
      phase: 'Post-Launch',
      title: 'Continuous Optimization',
      description: 'Weekly campaign monitoring, A/B conversion testing, performance analytics, and organic content scaling.'
    }
  ];

  return (
    <>
      <SEO 
        title="Our Process — YUGARK Digital Methodology" 
        description="A clear five-step path from idea to growth. Discover how YUGARK executes digital transformations with speed and precision." 
      />

      <main className="pt-32 pb-24 bg-[#050505]">
        {/* Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center space-y-6">
          <span className="font-sans text-xs uppercase tracking-[0.25em] font-bold text-[#D4B06A]">
            METHODOLOGY & EXECUTION
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-white tracking-tight leading-[1.1]">
            A clear path from vision to market dominance.
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 font-sans font-light max-w-2xl mx-auto leading-relaxed">
            We eliminate chaos and delays with a structured five-stage delivery model honed across multi-million dollar projects.
          </p>
        </section>

        {/* 5 Step Timeline Section */}
        <ProcessTimeline />

        {/* Detailed Timeline Breakdown */}
        <section className="py-24 bg-[#050505] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            <div className="text-center space-y-3">
              <span className="font-sans text-xs uppercase tracking-[0.25em] font-bold text-[#D4B06A]">
                DELIVERY TIMELINE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white">
                How we execute in 6 weeks or less.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {timelinePhases.map((phase, idx) => (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-8 rounded-2xl bg-[#0A0A0A] border border-white/10 hover:border-[#D4B06A]/30 transition-all space-y-4"
                >
                  <span className="text-xs uppercase tracking-widest text-[#F0D28F] font-semibold block">
                    {phase.phase}
                  </span>
                  <h3 className="font-serif text-xl text-white">
                    {phase.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {phase.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Executive Guarantees */}
        <section className="py-20 bg-[#080808] border-t border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#D4B06A] font-semibold">
                QUALITY GUARANTEES
              </span>
              <h2 className="font-serif text-3xl text-white">The YUGARK Execution Benchmark</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-[#0E0E0E] border border-white/5 space-y-4 text-center">
                <Clock className="w-8 h-8 text-[#D4B06A] mx-auto" />
                <h3 className="font-serif text-xl text-white">On-Time Delivery SLA</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Every milestone is backed by a strict delivery timeline. No missed launch dates or endless revisions.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-[#0E0E0E] border border-white/5 space-y-4 text-center">
                <Award className="w-8 h-8 text-[#D4B06A] mx-auto" />
                <h3 className="font-serif text-xl text-white">95+ Lighthouse Score</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  We write clean, zero-bloat code to ensure mobile site load times stay under 1.2 seconds.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-[#0E0E0E] border border-white/5 space-y-4 text-center">
                <ShieldCheck className="w-8 h-8 text-[#D4B06A] mx-auto" />
                <h3 className="font-serif text-xl text-white">Strict IP & Confidentiality</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  All custom code, AI models, and strategic assets belong 100% to your company from day one.
                </p>
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
    </>
  );
}
