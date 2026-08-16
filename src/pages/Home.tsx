import SEO from '../components/SEO';
import Hero from '../components/Hero';
import FounderSection from '../components/FounderSection';
import WhyYugark from '../components/WhyYugark';
import ServicesGrid from '../components/ServicesGrid';
import WebsiteTemplatesShowcase from '../components/WebsiteTemplatesShowcase';
import ProcessTimeline from '../components/ProcessTimeline';
import Industries from '../components/Industries';
import CTASection from '../components/CTASection';
import WhatsAppButton from '../components/WhatsAppButton';
import { CASE_STUDIES } from '../data';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  return (
    <>
      <SEO 
        title="YUGARK Digital Studio | Premium Digital Growth Agency India"
        description="Luxury websites, short promotional video, branding, SEO, and digital growth solutions by Founder Mr. Radha Krishna."
      />

      <main className="bg-[#050505]">
        {/* Hero Section */}
        <Hero />

        {/* Founder Section */}
        <FounderSection />

        {/* Why YUGARK Section */}
        <WhyYugark />

        {/* Services Grid Section */}
        <ServicesGrid />

        {/* Website Templates Showcase */}
        <WebsiteTemplatesShowcase />

        {/* Featured Case Studies Spotlight */}
        <section className="py-24 bg-[#080808] border-t border-b border-[#D4B06A]/15 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="space-y-3">
                <span className="font-sans text-xs uppercase tracking-[0.25em] font-bold text-[#D4B06A]">
                  SELECTED CASE STUDIES
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white">
                  Real business impact for market leaders.
                </h2>
              </div>
              <Link
                to="/work"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#D4B06A] hover:text-[#F0D28F] font-semibold"
              >
                <span>View All Case Studies</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {CASE_STUDIES.map((study, idx) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="rounded-2xl bg-[#0B0B0B] border border-white/5 overflow-hidden hover:border-[#D4B06A]/40 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    {/* Hero Image */}
                    <div className="relative h-56 overflow-hidden">
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

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <h3 className="font-serif text-xl font-medium text-white group-hover:text-[#F0D28F] transition-colors">
                        {study.title}
                      </h3>
                      <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed">
                        {study.summary}
                      </p>

                      {/* Results Metrics */}
                      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/5">
                        {study.results.map((res, rIdx) => (
                          <div key={rIdx} className="text-center">
                            <span className="block font-serif text-lg font-bold text-[#F0D28F]">
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

                  <div className="p-6 pt-0">
                    <Link
                      to="/work"
                      className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest text-neutral-300 group-hover:text-[#F0D28F] font-medium pt-4 border-t border-white/5 w-full justify-between"
                    >
                      <span>Read Case Study</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Timeline Section */}
        <ProcessTimeline />

        {/* Industries Section */}
        <Industries />

        {/* CTA Section */}
        <CTASection />

        {/* Global Floating WhatsApp Contact Widget */}
        <WhatsAppButton />
      </main>
    </>
  );
}
