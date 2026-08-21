import { Sparkles, Quote, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { WHATSAPP_LINK, WhatsAppIcon } from './WhatsAppButton';

export default function FounderSection() {
  return (
    <section className="relative py-20 sm:py-28 bg-[#050505] overflow-hidden border-t border-[#D4B06A]/15">
      {/* Background Ambient Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4B06A] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="p-8 sm:p-12 md:p-14 rounded-3xl rounded-tr-lg rounded-bl-lg bg-[#0A0A0A]/85 backdrop-blur-xl border border-[#D4B06A]/30 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(212,176,106,0.08)] relative overflow-hidden"
        >
          {/* Top Gold Accent Highlight */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4B06A] via-[#F0D28F] to-[#C9A35E]" />

          {/* Subtle Glowing Corner Markers */}
          <div className="glowing-corner-dot top-3.5 right-3.5" />
          <div className="glowing-corner-dot bottom-3.5 left-3.5" />

          {/* Top Pill */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#0D0D0D]/90 border border-[#D4B06A]/30 text-xs text-[#D4B06A] font-medium tracking-wider uppercase backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#F0D28F]" />
              <span>STUDIO LEADERSHIP</span>
            </div>

            <span className="text-xs text-neutral-400 font-sans tracking-wide">
              Direct Strategic Direction
            </span>
          </div>

          {/* Founder Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#D4B06A] font-bold block">
                FOUNDER
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Mr. Radha Krishna
              </h2>
              <p className="text-sm sm:text-base font-sans text-neutral-400 uppercase tracking-widest font-semibold">
                Founder, YUGARK Digital Studio
              </p>
              <h3 className="font-serif text-lg sm:text-xl text-[#F0D28F] italic leading-relaxed pt-2">
                "We engineer digital experiences and compelling content that move businesses forward."
              </h3>
            </div>

            {/* Blockquote Body */}
            <div className="relative pl-5 border-l-2 border-[#D4B06A] space-y-3 py-1">
              <Quote className="absolute -top-3 -left-3 w-6 h-6 text-[#D4B06A]/30" />
              <p className="text-sm sm:text-base text-neutral-300 font-sans font-light leading-relaxed">
                At <span className="text-white font-medium">YUGARK Digital Studio</span>, our philosophy is simple: businesses grow when they combine a fast, high-converting website with compelling short video content and strategic digital reach.
              </p>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                We eliminate agency delays and deliver production-grade websites in ~7 days alongside high-impact video reels and social media systems designed for direct business outcomes.
              </p>
            </div>

            {/* Core Execution Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'Custom Website Development (~7 Days)',
                'Promotional Short Videos & Reels',
                'Social Media Management & Strategy',
                'Direct Founder Strategic Oversight'
              ].map((point, idx) => (
                <div key={idx} className="flex items-center space-x-2.5 bg-[#0D0D0D]/80 backdrop-blur-sm p-3 rounded-xl border border-neutral-800/90 hover:border-[#D4B06A]/40 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-[#D4B06A] flex-shrink-0" />
                  <span className="text-xs text-neutral-300 font-medium">{point}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-0.5">
                <span className="font-serif text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#D4B06A] via-[#F0D28F] to-[#C9A35E] bg-clip-text text-transparent block">
                  Mr. Radha Krishna
                </span>
                <p className="text-[10px] text-neutral-400 font-sans uppercase tracking-widest font-semibold">
                  Founder, YUGARK Digital Studio
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#25D366] text-black text-xs font-bold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-lg"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  <span>Connect on WhatsApp</span>
                </a>

                <Link
                  to="/about"
                  className="inline-flex items-center space-x-1 px-4 py-2.5 rounded-full border border-[#D4B06A]/40 text-[#D4B06A] hover:bg-[#D4B06A] hover:text-black active:scale-95 text-xs font-semibold transition-all"
                >
                  <span>About Founder</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
