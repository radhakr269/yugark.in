import { PROCESS_STEPS } from '../data';
import { motion } from 'motion/react';

export default function ProcessTimeline() {
  return (
    <section className="py-24 bg-[#080808] border-t border-b border-[#D4B06A]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="space-y-3 mb-16 text-center max-w-3xl mx-auto">
          <span className="font-sans text-xs uppercase tracking-[0.25em] font-bold text-[#D4B06A]">
            HOW YUGARK WORKS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-[1.15]">
            A clear six-step path from concept to compounding growth.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-sans font-light">
            Disciplined execution designed to eliminate friction, prevent delays, and deliver high-converting digital assets.
          </p>
        </div>

        {/* 6 Step Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROCESS_STEPS.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-8 rounded-2xl bg-[#0A0A0A] border border-neutral-800 hover:border-[#D4B06A]/50 transition-all space-y-4 group gold-border-glow"
            >
              {/* Step Number Badge */}
              <div className="flex items-center justify-between">
                <span className="font-serif text-xs font-bold px-2.5 py-1 rounded-md bg-[#D4B06A]/10 text-[#D4B06A] border border-[#D4B06A]/30">
                  STEP {step.number}
                </span>
              </div>

              {/* Step Title */}
              <h3 className="font-serif text-2xl font-medium text-white group-hover:text-[#F0D28F] transition-colors">
                {step.title}
              </h3>

              {/* Short Desc */}
              <p className="text-xs text-neutral-300 leading-relaxed font-sans font-light">
                {step.shortDesc}
              </p>

              {/* Details if present */}
              {step.details && (
                <div className="pt-3 border-t border-neutral-900 text-[11px] text-neutral-400 leading-relaxed">
                  {step.details}
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
