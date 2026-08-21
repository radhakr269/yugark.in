import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Clock, ShieldCheck, Zap, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

export default function CTASection() {
  return (
    <section className="py-20 bg-[#050505] space-y-12 relative overflow-hidden bg-perspective-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Digital Growth Audit Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 sm:p-12 rounded-3xl bg-[#0B0B0B]/85 backdrop-blur-2xl border border-[#D4B06A]/25 flex flex-col lg:flex-row lg:items-center justify-between gap-8 hover:border-[#D4B06A]/50 transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden"
        >
          <div className="absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-[#F0D28F] to-transparent opacity-70" />

          <div className="space-y-3 max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#D4B06A]/30">
              <Sparkles className="w-3 h-3 text-[#F0D28F]" />
              <span className="font-sans text-[10px] uppercase tracking-[0.25em] font-bold text-[#F0D28F]">
                DIGITAL GROWTH AUDIT
              </span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl text-white font-bold tracking-tight">
              Not Sure What Your Business Needs?
            </h3>
            <p className="text-sm sm:text-base text-neutral-300 font-sans font-light leading-relaxed">
              Tell us about your business and we'll help identify where your digital presence can improve with high-impact precision.
            </p>
          </div>

          <div className="relative z-10">
            <Link
              to="/contact?type=audit"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#D4B06A] to-[#C9A35E] text-black font-bold text-xs uppercase tracking-widest hover:brightness-110 hover:-translate-y-0.5 active:scale-98 transition-all duration-300 shadow-[0_10px_25px_rgba(212,176,106,0.3)] whitespace-nowrap cursor-pointer group"
            >
              <span>Get My Digital Growth Plan</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* Horizontal Master Banner (Matching Reference Image Exact Specification) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 sm:p-10 lg:p-12 rounded-3xl bg-[#09090D]/90 backdrop-blur-2xl border border-[#D4B06A]/35 flex flex-col xl:flex-row xl:items-center justify-between gap-8 relative overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(212,176,106,0.12)] hover:border-[#D4B06A]/60 transition-all duration-300"
        >
          {/* Top Metallic Highlight Line */}
          <div className="absolute top-0 left-12 right-12 h-[2px] bg-gradient-to-r from-transparent via-[#F0D28F] to-transparent" />
          
          {/* Subtle Ambient Glow Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#D4B06A]/8 rounded-full blur-[140px] pointer-events-none" />

          {/* Left: Headline */}
          <div className="space-y-2 max-w-md relative z-10">
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold leading-tight tracking-tight">
              Ready <span className="text-neutral-300 font-normal">to build something</span> <br />
              <span className="bg-gradient-to-r from-[#D4B06A] via-[#F0D28F] to-[#C9A35E] bg-clip-text text-transparent">
                exceptional together?
              </span>
            </h2>
          </div>

          {/* Center: 3 Feature Badges with Dual Lines */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 relative z-10">
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#121218]/90 border border-white/10 hover:border-[#D4B06A]/40 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-[#1A1A24] border border-[#D4B06A]/30 flex items-center justify-center text-[#D4B06A] shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white tracking-wide">7-Day Delivery</div>
                <div className="text-[11px] text-neutral-400 font-mono">Timeline</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#121218]/90 border border-white/10 hover:border-[#D4B06A]/40 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-[#1A1A24] border border-[#D4B06A]/30 flex items-center justify-center text-[#D4B06A] shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white tracking-wide">Dedicated Support</div>
                <div className="text-[11px] text-neutral-400 font-mono">Direct Communication</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#121218]/90 border border-white/10 hover:border-[#D4B06A]/40 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-[#1A1A24] border border-[#D4B06A]/30 flex items-center justify-center text-[#D4B06A] shrink-0">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white tracking-wide">Result Driven</div>
                <div className="text-[11px] text-neutral-400 font-mono">Growth Focused</div>
              </div>
            </div>
          </div>

          {/* Right: Gold CTA Button */}
          <div className="relative z-10 shrink-0">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#D4B06A] to-[#C9A35E] text-black font-bold text-xs uppercase tracking-widest hover:brightness-110 hover:-translate-y-0.5 active:scale-98 transition-all duration-300 shadow-[0_10px_25px_rgba(212,176,106,0.3)] cursor-pointer group whitespace-nowrap"
            >
              <span>START YOUR PROJECT</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

