import { useState } from 'react';
import SEO from '../components/SEO';
import { CASE_STUDIES } from '../data';
import { CaseStudy } from '../types';
import { ArrowUpRight, X, Sparkles, CheckCircle2, Quote, ExternalLink, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import CTASection from '../components/CTASection';

export default function Work() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalStudy, setActiveModalStudy] = useState<CaseStudy | null>(null);

  const categories = ['All', 'Real Estate', 'Healthcare', 'E-commerce'];

  const filteredStudies = selectedCategory === 'All' 
    ? CASE_STUDIES 
    : CASE_STUDIES.filter(s => s.category === selectedCategory || s.industry === selectedCategory);

  return (
    <>
      <SEO 
        title="Portfolio & Case Studies — YUGARK" 
        description="Explore real business transformations engineered by YUGARK across real estate, healthcare, e-commerce, and luxury sectors." 
      />

      <main className="pt-32 pb-24 bg-[#050505] bg-perspective-grid bg-aurora-glow">
        {/* Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141414] border border-[#D4B06A]/30 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#F0D28F]" />
            <span className="font-sans text-[11px] uppercase tracking-[0.25em] font-semibold text-[#F0D28F]">
              PORTFOLIO & CASE STUDIES
            </span>
          </div>
          
          <h1 className="font-serif text-4xl sm:text-6xl text-white tracking-tight leading-[1.1]">
            Work that commands <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#D4B06A] via-[#F0D28F] to-[#C9A35E] bg-clip-text text-transparent">
              respect & revenue.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 font-sans font-light max-w-2xl mx-auto leading-relaxed">
            Discover how our connected digital systems drive measurable top-line growth, high-status positioning, and market leadership.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-[#D4B06A] to-[#C9A35E] text-black shadow-[0_0_15px_rgba(212,176,106,0.3)]'
                    : 'bg-[#0E0E0E]/90 text-neutral-300 border border-white/10 hover:text-[#F0D28F] hover:border-[#D4B06A]/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {filteredStudies.map((study, idx) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative rounded-2xl bg-[#0B0B0B]/85 backdrop-blur-xl border border-[#D4B06A]/20 overflow-hidden hover:border-[#D4B06A]/60 transition-all duration-300 group flex flex-col justify-between shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:-translate-y-1.5"
              >
                {/* Metallic Top Edge Highlight */}
                <div className="absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-[#F0D28F] to-transparent opacity-70 z-20" />

                <div>
                  {/* Browser Chrome Header Mockup */}
                  <div className="px-4 py-2.5 bg-[#141414] border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="px-3 py-0.5 rounded-md bg-[#080808] border border-white/5 text-[10px] text-neutral-400 font-mono tracking-wider">
                      {study.client.toLowerCase().replace(/\s+/g, '')}.yugark.studio
                    </div>
                    <Globe className="w-3.5 h-3.5 text-neutral-500" />
                  </div>

                  {/* Hero Showcase Image */}
                  <div className="relative h-60 overflow-hidden">
                    <img 
                      src={study.heroImage} 
                      alt={study.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent opacity-60" />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/85 backdrop-blur-md text-[10px] uppercase font-bold tracking-wider text-[#F0D28F] border border-[#D4B06A]/40 shadow-lg">
                      {study.industry}
                    </div>
                  </div>

                  {/* Content Breakdown */}
                  <div className="p-7 space-y-4">
                    <h3 className="font-serif text-2xl font-semibold text-white group-hover:text-[#F0D28F] transition-colors leading-snug">
                      {study.title}
                    </h3>
                    <p className="text-xs text-neutral-300 leading-relaxed font-sans font-light">
                      {study.summary}
                    </p>

                    {/* Results Stat Chips */}
                    <div className="grid grid-cols-3 gap-2 pt-5 border-t border-neutral-800/80">
                      {study.results.map((res, rIdx) => (
                        <div key={rIdx} className="text-center p-2 rounded-lg bg-[#141414]/60 border border-white/5">
                          <span className="block font-serif text-lg font-bold text-[#F0D28F]">
                            {res.value}
                          </span>
                          <span className="text-[9px] text-neutral-400 uppercase tracking-tight block">
                            {res.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-7 pt-0">
                  <button
                    onClick={() => setActiveModalStudy(study)}
                    className="w-full py-3.5 rounded-xl bg-[#141414] border border-white/10 text-neutral-200 group-hover:text-black group-hover:bg-gradient-to-r group-hover:from-[#D4B06A] group-hover:to-[#C9A35E] font-semibold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>View Case Study Breakdown</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Modal for Case Study Detailed Breakdown */}
        <AnimatePresence>
          {activeModalStudy && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 sm:p-12 rounded-3xl bg-[#0C0C0C] border border-[#D4B06A]/40 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(212,176,106,0.15)] my-8"
              >
                <button
                  onClick={() => setActiveModalStudy(null)}
                  className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-white transition-colors rounded-full bg-white/5 hover:bg-white/10 cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="space-y-8">
                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-widest text-[#F0D28F] font-semibold">
                      Case Study / {activeModalStudy.client}
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold">
                      {activeModalStudy.title}
                    </h2>
                  </div>

                  <div className="rounded-2xl overflow-hidden h-72 border border-white/10">
                    <img 
                      src={activeModalStudy.heroImage} 
                      alt={activeModalStudy.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Results Highlights */}
                  <div className="grid grid-cols-3 gap-4 p-6 rounded-2xl bg-[#141414] border border-[#D4B06A]/30 text-center shadow-lg">
                    {activeModalStudy.results.map((res, idx) => (
                      <div key={idx}>
                        <span className="block font-serif text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#D4B06A] via-[#F0D28F] to-[#C9A35E] bg-clip-text text-transparent">
                          {res.value}
                        </span>
                        <span className="text-xs text-neutral-400 uppercase tracking-wider">
                          {res.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Challenge & Solution */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-3 p-6 rounded-xl bg-[#121212] border border-white/5">
                      <h4 className="font-serif text-xl text-white font-medium">The Challenge</h4>
                      <p className="text-xs text-neutral-300 leading-relaxed font-sans font-light">
                        {activeModalStudy.challenge}
                      </p>
                    </div>

                    <div className="space-y-3 p-6 rounded-xl bg-[#121212] border border-[#D4B06A]/30">
                      <h4 className="font-serif text-xl text-[#F0D28F] font-medium">The YUGARK Solution</h4>
                      <p className="text-xs text-neutral-300 leading-relaxed font-sans font-light">
                        {activeModalStudy.solution}
                      </p>
                    </div>
                  </div>

                  {/* Testimonial */}
                  {activeModalStudy.testimonial && (
                    <div className="p-8 rounded-2xl bg-[#141414] border border-[#D4B06A]/20 relative space-y-4">
                      <Quote className="w-8 h-8 text-[#D4B06A]/40" />
                      <p className="font-serif italic text-base text-neutral-200">
                        "{activeModalStudy.testimonial.quote}"
                      </p>
                      <div>
                        <span className="block font-semibold text-white text-sm">
                          {activeModalStudy.testimonial.author}
                        </span>
                        <span className="text-xs text-neutral-400">
                          {activeModalStudy.testimonial.role}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Tech Stack Pills */}
                  <div>
                    <h5 className="text-xs uppercase tracking-wider text-neutral-400 mb-3 font-semibold">Technologies & Methods Deployed:</h5>
                    <div className="flex flex-wrap gap-2">
                      {activeModalStudy.technology.map(tech => (
                        <span key={tech} className="px-3.5 py-1.5 rounded-lg bg-[#181818] border border-white/10 text-xs text-neutral-300 font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex justify-end">
                    <button
                      onClick={() => {
                        setActiveModalStudy(null);
                        window.location.href = '/contact';
                      }}
                      className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4B06A] to-[#C9A35E] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer shadow-[0_10px_25px_rgba(212,176,106,0.3)]"
                    >
                      Build a Similar Growth System
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <CTASection />
      </main>
    </>
  );
}

