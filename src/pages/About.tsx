import SEO from '../components/SEO';
import CTASection from '../components/CTASection';
import WhatsAppButton, { WHATSAPP_LINK, WhatsAppIcon } from '../components/WhatsAppButton';
import { ShieldCheck, Zap, Compass, Target, Sparkles, CheckCircle2, ArrowRight, Award } from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {

  const studioValues = [
    {
      title: 'High-Status Craft & Clarity',
      desc: 'We refuse commodity templates. Every website and visual asset is built to establish immediate authority and move your business forward.',
      icon: ShieldCheck,
      badge: 'CRAFT'
    },
    {
      title: 'Rapid ~7 Day Execution',
      desc: 'We eliminate bloated agency cycles. By pairing disciplined engineering with modern tooling, we deliver production-ready platforms in days, not months.',
      icon: Zap,
      badge: 'SPEED'
    },
    {
      title: 'Measurable Business Impact',
      desc: 'We tie every website layout, video hook, and content calendar directly to inquiries, calls, and customer conversion.',
      icon: Target,
      badge: 'RESULTS'
    },
    {
      title: 'Connected Growth Ecosystem',
      desc: 'Disjointed marketing stalls growth. We unite high-converting web architecture, promotional reels, and direct WhatsApp routing into one engine.',
      icon: Compass,
      badge: 'ECOSYSTEM'
    },
  ];

  const coreFocusAreas = [
    {
      title: 'Custom Website Engineering',
      desc: 'Building lightning-fast, conversion-focused websites optimized for mobile, Google indexing, and direct customer action.'
    },
    {
      title: 'Short Promotional Videos & Reels',
      desc: 'Producing high-retention 15–30s video ads and reels for organic and paid reach.'
    },
    {
      title: 'Social Media Management & Strategy',
      desc: 'Executing consistent monthly publishing, branded graphic design, and audience engagement across key business platforms.'
    },
    {
      title: 'Digital Growth Strategy',
      desc: 'Formulating end-to-end acquisition roadmaps tailored to your industry, customer psychology, and revenue targets.'
    },
    {
      title: 'Direct WhatsApp Lead Routing',
      desc: 'Integrating direct WhatsApp chat, automated responses, and structured enquiry capture to close deals instantly.'
    },
    {
      title: 'Content & Messaging Blueprints',
      desc: 'Crafting persuasive messaging, video scripts, and industry-specific content frameworks that build market credibility.'
    }
  ];

  const testimonials = [
    {
      quote: "YUGARK transformed how buyers perceive our developments. The digital platform and video reels generated serious inquiries in our very first month.",
      author: 'Marcus Vance',
      role: 'Managing Director, Aethel Living'
    },
    {
      quote: "The combination of a fast website and educational video content helped our clinic build immediate trust with prospective patients.",
      author: 'Dr. Elena Rostova',
      role: 'Chief Medical Officer, Lumina Health'
    },
    {
      quote: "YUGARK gave our brand a modern look that customers love. Our online table queries and beans orders skyrocketed.",
      author: 'Julian Thorne',
      role: 'Co-Founder & CEO, Solace Coffee'
    }
  ];

  return (
    <>
      <SEO 
        title="About YUGARK Digital Studio | Founder Mr. Radha Krishna" 
        description="Learn about YUGARK Digital Studio, founded by Mr. Radha Krishna. Delivering premium websites, compelling video content, and digital growth solutions." 
      />

      <main className="pt-32 pb-24 bg-[#050505] bg-perspective-grid bg-aurora-glow">
        {/* Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141414] border border-[#D4B06A]/30 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#F0D28F]" />
            <span className="font-sans text-[11px] uppercase tracking-[0.25em] font-semibold text-[#F0D28F]">
              ABOUT YUGARK DIGITAL STUDIO
            </span>
          </div>
          
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.08] max-w-4xl mx-auto font-bold">
            We build digital experiences that <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#D4B06A] via-[#F0D28F] to-[#C9A35E] bg-clip-text text-transparent">
              grow your business.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 font-sans font-light max-w-3xl mx-auto leading-relaxed">
            YUGARK Digital Studio was founded on a simple truth: a website alone is rarely enough. True business momentum happens when a fast, high-converting website is paired with compelling short video content and strategic digital reach.
          </p>
        </section>

        {/* Founder Profile Section with Glassmorphic Spotlight */}
        <section className="py-20 bg-[#080808]/80 border-t border-b border-[#D4B06A]/15 relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              
              {/* Founder Profile Block */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-8 sm:p-12 md:p-14 rounded-3xl bg-[#0B0B0B]/85 backdrop-blur-2xl border border-[#D4B06A]/35 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(212,176,106,0.1)] relative overflow-hidden"
              >
                <div className="absolute top-0 left-8 right-8 h-[1.5px] bg-gradient-to-r from-transparent via-[#F0D28F] to-transparent" />

                <div className="space-y-6 relative z-10">
                  <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#121212] border border-[#D4B06A]/35 text-xs text-[#F0D28F] font-semibold tracking-[0.25em] uppercase">
                    <Sparkles className="w-3.5 h-3.5 text-[#F0D28F]" />
                    <span>STUDIO LEADERSHIP</span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] uppercase tracking-[0.3em] text-[#D4B06A] font-bold block">
                      FOUNDER & LEAD STRATEGIST
                    </span>
                    <h2 className="font-serif text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#D4B06A] via-[#F0D28F] to-[#C9A35E] bg-clip-text text-transparent tracking-tight">
                      Mr. Radha Krishna
                    </h2>
                    <p className="text-xs sm:text-sm font-sans text-neutral-300 uppercase tracking-widest font-medium">
                      Founder, YUGARK Digital Studio
                    </p>
                  </div>

                  <p className="text-base sm:text-lg text-neutral-200 font-serif italic leading-relaxed pt-1">
                    "Guiding digital strategy, web engineering, video creation, and business growth."
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#25D366] text-black text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all shadow-[0_10px_25px_rgba(37,211,102,0.3)] cursor-pointer"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      <span>Chat on WhatsApp (+91 9125205132)</span>
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Founder Narrative & Vision */}
              <div className="space-y-8 bg-[#0B0B0B]/80 backdrop-blur-xl p-8 sm:p-10 rounded-2xl border border-neutral-800 shadow-xl">
                <div className="space-y-4 text-sm sm:text-base text-neutral-300 font-sans font-light leading-relaxed">
                  <p>
                    <strong className="text-white font-semibold">Mr. Radha Krishna</strong> is the founder of YUGARK Digital Studio. He established YUGARK to give businesses across India access to agency-quality digital execution — custom websites, promotional video content, and growth management — delivered with speed, transparency, and accessible pricing.
                  </p>
                  <p>
                    With deep expertise in <strong className="text-white font-medium">Web Architecture, Short-Form Video Storytelling, Brand Positioning, and Growth Funnels</strong>, Mr. Radha Krishna leads every project with direct attention to detail.
                  </p>
                  <p>
                    His focus is ensuring that every website launched and every video published creates tangible value: more credibility, more leads, and sustainable customer growth.
                  </p>
                </div>

                {/* Core Expertise Grid */}
                <div className="pt-4 sm:pt-6 border-t border-neutral-800 space-y-3 sm:space-y-4">
                  <h4 className="text-xs uppercase font-bold text-[#F0D28F] tracking-[0.2em]">
                    Core Studio Capabilities:
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
                    {coreFocusAreas.map((area, idx) => (
                      <div key={idx} className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-[#121212]/70 border border-neutral-800 space-y-1 sm:space-y-1.5 hover:border-[#D4B06A]/40 transition-colors">
                        <div className="flex items-center space-x-1.5 sm:space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4B06A] shrink-0" />
                          <h5 className="text-[11px] sm:text-xs font-bold text-white leading-snug">{area.title}</h5>
                        </div>
                        <p className="text-[10px] sm:text-[11px] text-neutral-400 pl-5 sm:pl-6 leading-relaxed font-light line-clamp-2 sm:line-clamp-none">{area.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Guiding Principles */}
        <section className="py-14 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-16">
          <div className="text-center space-y-2 sm:space-y-3 max-w-3xl mx-auto">
            <span className="font-sans text-xs uppercase tracking-[0.25em] font-bold text-[#D4B06A]">
              OUR COMMITMENT
            </span>
            <h2 className="font-serif text-2xl sm:text-5xl text-white font-bold">
              Built on craftsmanship and speed.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-light">
              Four principles guiding every strategy, line of code, and creative video delivered by YUGARK Digital Studio.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5 sm:gap-8">
            {studioValues.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div 
                  key={idx}
                  className="p-3.5 sm:p-8 rounded-xl sm:rounded-2xl bg-[#0B0B0B]/85 backdrop-blur-xl border border-neutral-800 hover:border-[#D4B06A]/40 transition-all space-y-2 sm:space-y-4 shadow-xl group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#D4B06A]/10 border border-[#D4B06A]/30 flex items-center justify-center text-[#F0D28F] group-hover:bg-[#D4B06A]/20 transition-colors">
                      <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
                    </div>
                    <span className="text-[8px] sm:text-[10px] font-mono font-bold tracking-widest text-[#D4B06A] border border-[#D4B06A]/30 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md">
                      {value.badge}
                    </span>
                  </div>
                  <h3 className="font-serif text-xs sm:text-xl font-medium text-white group-hover:text-[#F0D28F] transition-colors leading-snug">{value.title}</h3>
                  <p className="text-[10px] sm:text-sm text-neutral-300 leading-relaxed font-sans font-light line-clamp-3 sm:line-clamp-none">
                    {value.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-14 sm:py-20 bg-[#080808]/90 border-t border-b border-[#D4B06A]/15">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-16">
            <div className="text-center space-y-2 sm:space-y-3">
              <span className="font-sans text-xs uppercase tracking-[0.25em] font-bold text-[#D4B06A]">
                CLIENT OUTCOMES
              </span>
              <h2 className="font-serif text-2xl sm:text-5xl text-white font-bold">
                Trusted by growing businesses.
              </h2>
            </div>

            <div className="grid grid-cols-1 min-[600px]:grid-cols-3 gap-3 sm:gap-8">
              {testimonials.map((t, idx) => (
                <div key={idx} className="p-4 sm:p-8 rounded-xl sm:rounded-2xl bg-[#0C0C0C]/85 backdrop-blur-xl border border-neutral-800 space-y-4 sm:space-y-6 flex flex-col justify-between hover:border-[#D4B06A]/30 transition-colors shadow-lg">
                  <p className="font-serif italic text-xs sm:text-sm text-neutral-200 leading-relaxed">
                    "{t.quote}"
                  </p>
                  <div className="pt-3 sm:pt-4 border-t border-neutral-800">
                    <span className="block font-semibold text-white text-xs sm:text-sm">{t.author}</span>
                    <span className="text-[10px] sm:text-xs text-neutral-400">{t.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
        <WhatsAppButton />
      </main>
    </>
  );
}

