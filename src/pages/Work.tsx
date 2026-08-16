import { useState } from 'react';
import SEO from '../components/SEO';
import { CASE_STUDIES } from '../data';
import { CaseStudy } from '../types';
import { ArrowUpRight, X, Sparkles, CheckCircle2, Quote } from 'lucide-react';
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

      <main className="pt-32 pb-24 bg-[#050505]">
        {/* Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center space-y-6">
          <span className="font-sans text-xs uppercase tracking-[0.25em] font-bold text-[#D4B06A]">
            PORTFOLIO & CASE STUDIES
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-white tracking-tight leading-[1.1]">
            Work that commands respect.
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 font-sans font-light max-w-2xl mx-auto leading-relaxed">
            Discover how our connected digital systems drive measurable top-line growth, high-status positioning, and market leadership.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#181818] text-[#F0D28F] border border-[#D4B06A] shadow-md'
                    : 'bg-[#0E0E0E] text-neutral-400 border border-white/5 hover:text-white hover:border-[#D4B06A]/40'
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
                className="rounded-2xl bg-[#0A0A0A] border border-white/10 overflow-hidden hover:border-[#D4B06A]/40 transition-all duration-300 group flex flex-col justify-between shadow-2xl hover:-translate-y-1"
              >
                <div>
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={study.heroImage} 
                      alt={study.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[10px] uppercase tracking-wider text-[#F0D28F] border border-[#D4B06A]/30">
                      {study.industry}
                    </div>
                  </div>

                  <div className="p-8 space-y-4">
                    <h3 className="font-serif text-2xl font-medium text-white group-hover:text-[#F0D28F] transition-colors">
                      {study.title}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {study.summary}
                    </p>

                    <div className="grid grid-cols-3 gap-2 pt-6 border-t border-white/5">
                      {study.results.map((res, rIdx) => (
                        <div key={rIdx} className="text-center">
                          <span className="block font-serif text-xl font-bold text-[#F0D28F]">
                            {res.value}
                          </span>
                          <span className="text-[10px] text-neutral-500 uppercase tracking-tight">
                            {res.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-8 pt-0">
                  <button
                    onClick={() => setActiveModalStudy(study)}
                    className="w-full py-3.5 rounded-xl bg-[#141414] border border-white/10 text-neutral-200 group-hover:text-black group-hover:bg-gradient-to-r group-hover:from-[#E2C17A] group-hover:to-[#C9A35E] font-semibold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
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
                className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 sm:p-12 rounded-3xl bg-[#0A0A0A] border border-[#D4B06A]/40 shadow-2xl gold-glow-subtle my-8"
              >
                <button
                  onClick={() => setActiveModalStudy(null)}
                  className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-white transition-colors rounded-full bg-white/5 hover:bg-white/10"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="space-y-8">
                  <div className="space-y-3">
                    <span className="text-xs uppercase tracking-widest text-[#F0D28F] font-semibold">
                      Case Study / {activeModalStudy.client}
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-white">
                      {activeModalStudy.title}
                    </h2>
                  </div>

                  <div className="rounded-2xl overflow-hidden h-72">
                    <img 
                      src={activeModalStudy.heroImage} 
                      alt={activeModalStudy.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Results Highlights */}
                  <div className="grid grid-cols-3 gap-4 p-6 rounded-2xl bg-[#121212] border border-[#D4B06A]/30 text-center">
                    {activeModalStudy.results.map((res, idx) => (
                      <div key={idx}>
                        <span className="block font-serif text-2xl sm:text-3xl font-bold gold-gradient-text">
                          {res.value}
                        </span>
                        <span className="text-xs text-neutral-400 uppercase tracking-wider">
                          {res.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Challenge & Solution */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    <div className="space-y-3 p-6 rounded-xl bg-[#0F0F0F] border border-white/5">
                      <h4 className="font-serif text-xl text-white">The Challenge</h4>
                      <p className="text-xs text-neutral-300 leading-relaxed">
                        {activeModalStudy.challenge}
                      </p>
                    </div>

                    <div className="space-y-3 p-6 rounded-xl bg-[#0F0F0F] border border-white/5">
                      <h4 className="font-serif text-xl text-[#F0D28F]">The YUGARK Solution</h4>
                      <p className="text-xs text-neutral-300 leading-relaxed">
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
                        <span key={tech} className="px-3 py-1 rounded-md bg-[#181818] border border-white/10 text-xs text-neutral-300">
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
                      className="px-8 py-3.5 rounded-xl gold-gradient-bg text-black font-semibold text-xs uppercase tracking-wider hover:brightness-110 transition-all"
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
