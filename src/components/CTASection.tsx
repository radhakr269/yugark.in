import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function CTASection() {
  return (
    <section className="py-20 bg-[#050505] space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Digital Growth Audit Container matching Screenshot 8 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 sm:p-12 rounded-2xl bg-[#0C0C0C] border border-white/5 flex flex-col lg:flex-row lg:items-center justify-between gap-8 hover:border-[#D4B06A]/30 transition-all duration-300"
        >
          <div className="space-y-3 max-w-2xl">
            <span className="font-sans text-[11px] uppercase tracking-[0.25em] font-bold text-[#D4B06A]">
              DIGITAL GROWTH AUDIT
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-white font-medium">
              Not Sure What Your Business Needs?
            </h3>
            <p className="text-sm sm:text-base text-neutral-400 font-sans font-light leading-relaxed">
              Tell us about your business and we'll help identify where your digital presence can improve.
            </p>
          </div>

          <div>
            <Link
              to="/contact?type=audit"
              className="inline-flex items-center space-x-2 px-8 py-4 rounded-xl gold-gradient-bg text-[#050505] font-semibold text-sm tracking-wide gold-gradient-bg-hover transition-all duration-300 shadow-xl whitespace-nowrap"
            >
              <span>Get My Digital Growth Plan</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Final Centered CTA Container matching Screenshots 9 & 10 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-10 sm:p-16 lg:p-20 rounded-3xl bg-[#090909] border border-white/5 text-center space-y-8 relative overflow-hidden gold-glow-subtle"
        >
          {/* Subtle Ambient Glow Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#D4B06A]/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <span className="font-sans text-[11px] uppercase tracking-[0.25em] font-bold text-[#D4B06A]">
              START WITH YUGARK
            </span>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.1]">
              Let's Build Your Digital Future.
            </h2>

            <p className="text-base sm:text-lg text-neutral-300 font-sans font-light leading-relaxed max-w-2xl mx-auto">
              Share your business and requirements. We'll come back with a clear direction for your website, content and digital growth.
            </p>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-5">
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 py-4 rounded-xl gold-gradient-bg text-[#050505] font-semibold text-sm tracking-wide gold-gradient-bg-hover transition-all duration-300 shadow-xl"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/contact?type=talk"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-xl bg-[#121212] border border-white/10 text-white font-medium text-sm hover:border-[#D4B06A]/50 hover:bg-[#181818] transition-all duration-300"
              >
                <span>Talk to Yugark</span>
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
