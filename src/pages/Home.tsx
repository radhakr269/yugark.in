import { useState } from 'react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import ServiceCategories from '../components/ServiceCategories';
import StudioTicker from '../components/StudioTicker';
import FounderSection from '../components/FounderSection';
import WhyYugark from '../components/WhyYugark';
import { ThreePillarsSection, PremiumServicesSection } from '../components/ServicesGrid';
import WebsiteTemplatesShowcase from '../components/WebsiteTemplatesShowcase';
import ProcessTimeline from '../components/ProcessTimeline';
import Industries from '../components/Industries';
import CTASection from '../components/CTASection';
import WhatsAppButton from '../components/WhatsAppButton';
import { CASE_STUDIES } from '../data';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  // 4 Featured Showcase Case Studies matching Reference Image Specification
  const showcaseCaseStudies = [
    {
      id: 'aadhil-living-real-estate',
      title: 'Aadhil Living — Luxury Real Estate Showcase',
      industry: 'REAL ESTATE',
      badgeClass: 'text-[#F0D28F] border-[#D4B06A]/40 bg-[#D4B06A]/10',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      link: '/work'
    },
    {
      id: 'lumina-health-clinic',
      title: 'Lumina Health — Patient Growth via Modern Web & Video',
      industry: 'HEALTHCARE',
      badgeClass: 'text-[#F0D28F] border-[#D4B06A]/40 bg-[#D4B06A]/10',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
      link: '/work'
    },
    {
      id: 'solace-coffee-roastery',
      title: 'Solace Coffee & Roastery — Digital Presence & Reels',
      industry: 'RESTAURANT & CAFE',
      badgeClass: 'text-[#F0D28F] border-[#D4B06A]/40 bg-[#D4B06A]/10',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80',
      link: '/work'
    },
    {
      id: 'iron-vault-fitness',
      title: 'Iron Vault Fitness — Premium Gym Launch Concept',
      industry: 'GYM & FITNESS',
      badgeClass: 'text-[#F0D28F] border-[#D4B06A]/40 bg-[#D4B06A]/10',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
      link: '/work'
    }
  ];

  return (
    <>
      <SEO 
        title="YUGARK Digital Studio | Premium Digital Growth Agency India"
        description="Luxury websites, short promotional video, branding, SEO, and digital growth solutions by Founder Mr. Radha Krishna."
      />

      <main className="bg-[#050505]">
        {/* 1. Header is in Navbar.tsx; Hero with 4 Statistics & Volumetric Core */}
        <Hero />

        {/* Four Main Service Categories */}
        <ServiceCategories />

        {/* 2. Three Pillars of Digital Growth (Pillars 01, 02, 03) */}
        <ThreePillarsSection />

        {/* 3. Our Proven 4-Step Process (01 Discover, 02 Design, 03 Build, 04 Launch) */}
        <ProcessTimeline />

        {/* 4. Our Premium Services (10 Compact Neon Futuristic Cards) */}
        <PremiumServicesSection />

        {/* 5. Selected Case Studies (Matching Reference Image Specification) */}
        <section className="py-24 bg-[#050505] relative overflow-hidden bg-perspective-grid">
          {/* Ambient Lighting */}
          <div className="absolute top-10 right-1/4 w-[500px] h-[500px] bg-[#D4B06A]/6 blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute bottom-10 left-1/4 w-[500px] h-[500px] bg-violet-600/8 blur-[160px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
            
            {/* Header & View All Link */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121216] border border-[#D4B06A]/30">
                  <span className="text-xs text-[#F0D28F]">⬡</span>
                  <span className="font-sans text-[11px] uppercase tracking-[0.25em] font-bold text-[#F0D28F]">
                    SELECTED CASE STUDIES
                  </span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-bold tracking-tight">
                  Real business impact for market leaders.
                </h2>
              </div>

              <Link
                to="/work"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4B06A] hover:text-[#F0D28F] font-bold transition-colors"
              >
                <span>VIEW ALL CASE STUDIES</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Case Studies 4-Card Horizontal Stage with Carousel Arrows */}
            <div className="relative">
              {/* Left Carousel Navigation Button */}
              <button
                onClick={() => setActiveSlide((prev) => (prev > 0 ? prev - 1 : showcaseCaseStudies.length - 1))}
                className="hidden xl:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#0E0E14]/90 border border-white/15 backdrop-blur-md items-center justify-center text-neutral-300 hover:text-white hover:border-[#D4B06A] hover:scale-105 transition-all shadow-xl cursor-pointer"
                aria-label="Previous Project"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Right Carousel Navigation Button */}
              <button
                onClick={() => setActiveSlide((prev) => (prev < showcaseCaseStudies.length - 1 ? prev + 1 : 0))}
                className="hidden xl:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#0E0E14]/90 border border-white/15 backdrop-blur-md items-center justify-center text-neutral-300 hover:text-white hover:border-[#D4B06A] hover:scale-105 transition-all shadow-xl cursor-pointer"
                aria-label="Next Project"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* 4 Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {showcaseCaseStudies.map((study, idx) => (
                  <motion.div
                    key={study.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: idx * 0.08 }}
                    className="rounded-3xl bg-[#09090E]/85 backdrop-blur-xl border border-white/10 overflow-hidden hover:border-[#D4B06A]/50 transition-all duration-300 group flex flex-col justify-between shadow-[0_20px_45px_rgba(0,0,0,0.85)] hover:-translate-y-1.5"
                  >
                    <div>
                      {/* Image Container with Badge */}
                      <div className="relative h-48 sm:h-52 overflow-hidden bg-neutral-900">
                        <img 
                          src={study.image} 
                          alt={study.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#09090E] via-transparent to-black/30 pointer-events-none" />
                        
                        <div className={`absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md ${study.badgeClass}`}>
                          {study.industry}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-3">
                        <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#F0D28F] transition-colors leading-snug">
                          {study.title}
                        </h3>
                      </div>
                    </div>

                    {/* Bottom Action Link */}
                    <div className="p-6 pt-0">
                      <Link
                        to={study.link}
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#D4B06A] group-hover:text-[#F0D28F] transition-colors"
                      >
                        <span>Read Case Study</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination Dots (Matching Reference Image) */}
              <div className="flex items-center justify-center gap-2 pt-8">
                {showcaseCaseStudies.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setActiveSlide(dotIdx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      dotIdx === activeSlide
                        ? 'w-7 bg-[#D4B06A] shadow-[0_0_10px_#D4B06A]'
                        : 'bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Slide ${dotIdx + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* 6. Website Templates Showcase */}
        <WebsiteTemplatesShowcase />

        {/* 7. Cinematic Studio Marquee Ticker */}
        <StudioTicker />

        {/* 8. Founder Section */}
        <FounderSection />

        {/* 9. Why YUGARK Section */}
        <WhyYugark />

        {/* 10. Industries Section */}
        <Industries />

        {/* 11. Horizontal Master CTA Section */}
        <CTASection />

        {/* 12. Global Floating WhatsApp Contact Widget */}
        <WhatsAppButton />
      </main>
    </>
  );
}

