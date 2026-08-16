import { useState } from 'react';
import { INDUSTRIES } from '../data';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Industries() {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>('Real Estate');

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header matching Screenshot 7 */}
        <div className="max-w-3xl space-y-4 mb-12">
          <span className="font-sans text-xs uppercase tracking-[0.25em] font-bold text-[#D4B06A]">
            INDUSTRIES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-[1.15]">
            Built for businesses that want to be taken seriously.
          </h2>
          <p className="text-base text-neutral-400 font-sans font-light leading-relaxed">
            We work across industries, adapting strategy and content to how each business actually earns trust.
          </p>
        </div>

        {/* Industry Pills matching Screenshot 7 */}
        <div className="flex flex-wrap gap-3 mb-12">
          {INDUSTRIES.map((industry, idx) => {
            const isSelected = selectedIndustry === industry;
            return (
              <motion.button
                key={industry}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                onClick={() => setSelectedIndustry(industry)}
                className={`px-5 py-3 rounded-full text-xs font-medium tracking-wide transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-[#181818] text-[#F0D28F] border border-[#D4B06A] shadow-lg shadow-[#D4B06A]/10 scale-[1.03]'
                    : 'bg-[#0E0E0E] text-neutral-300 border border-white/5 hover:border-[#D4B06A]/40 hover:text-white'
                }`}
              >
                {industry}
              </motion.button>
            );
          })}
        </div>

        {/* Dynamic Context Card based on selected industry */}
        {selectedIndustry && (
          <motion.div 
            key={selectedIndustry}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-2xl bg-[#0B0B0B] border border-[#D4B06A]/30 flex flex-col md:flex-row md:items-center justify-between gap-6 gold-glow-subtle"
          >
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-[#D4B06A] text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Tailored Strategy for {selectedIndustry}</span>
              </div>
              <h3 className="font-serif text-2xl text-white">
                How YUGARK drives exponential growth in {selectedIndustry}
              </h3>
              <p className="text-sm text-neutral-400 max-w-2xl">
                We craft specialized positioning, high-converting web architecture, and AI-powered video funnels specifically optimized for buyer psychology in {selectedIndustry}.
              </p>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl gold-gradient-bg text-black font-semibold text-xs uppercase tracking-wider whitespace-nowrap self-start md:self-center hover:brightness-110 transition-all"
            >
              <span>Explore {selectedIndustry} Growth</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}

      </div>
    </section>
  );
}
