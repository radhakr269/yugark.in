import SEO from '../components/SEO';
import CTASection from '../components/CTASection';
import WhatsAppButton, { WHATSAPP_LINK, WhatsAppIcon } from '../components/WhatsAppButton';
import { ShieldCheck, Zap, Compass, Target, Sparkles, CheckCircle2 } from 'lucide-react';

export default function About() {

  const studioValues = [
    {
      title: 'High-Status Craft & Clarity',
      desc: 'We refuse commodity templates. Every website and visual asset is built to establish immediate authority and move your business forward.',
      icon: ShieldCheck,
    },
    {
      title: 'Rapid ~7 Day Execution',
      desc: 'We eliminate bloated agency cycles. By pairing disciplined engineering with modern tooling, we deliver production-ready platforms in days, not months.',
      icon: Zap,
    },
    {
      title: 'Measurable Business Impact',
      desc: 'We tie every website layout, video hook, and content calendar directly to inquiries, calls, and customer conversion.',
      icon: Target,
    },
    {
      title: 'Connected Growth Ecosystem',
      desc: 'Disjointed marketing stalls growth. We unite high-converting web architecture, promotional reels, and direct WhatsApp routing into one engine.',
      icon: Compass,
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

      <main className="pt-32 pb-24 bg-[#050505]">
        {/* Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 space-y-6">
          <span className="font-sans text-xs uppercase tracking-[0.25em] font-bold text-[#D4B06A]">
            ABOUT YUGARK DIGITAL STUDIO
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.1] max-w-4xl">
            We build digital experiences that grow your business.
          </h1>
          <p className="text-base sm:text-xl text-neutral-300 font-sans font-light max-w-3xl leading-relaxed">
            YUGARK Digital Studio was founded on a simple truth: a website alone is rarely enough. True business momentum happens when a fast, high-converting website is paired with compelling short video content and strategic digital reach.
          </p>
        </section>

        {/* Founder Profile Section */}
        <section className="py-20 bg-[#080808] border-t border-b border-[#D4B06A]/15 relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              
              {/* Founder Profile Block */}
              <div className="p-8 sm:p-12 md:p-14 rounded-3xl bg-[#0A0A0A] border border-[#D4B06A]/30 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4B06A] via-[#F0D28F] to-[#C9A35E]" />

                <div className="space-y-6">
                  <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#0D0D0D] border border-[#D4B06A]/30 text-xs text-[#D4B06A] font-semibold tracking-[0.25em] uppercase">
                    <Sparkles className="w-3.5 h-3.5 text-[#F0D28F]" />
                    <span>STUDIO LEADERSHIP</span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] uppercase tracking-[0.3em] text-[#D4B06A] font-bold block">
                      FOUNDER
                    </span>
                    <h2 className="font-serif text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#D4B06A] via-[#F0D28F] to-[#C9A35E] bg-clip-text text-transparent tracking-tight">
                      Mr. Radha Krishna
                    </h2>
                    <p className="text-sm sm:text-base font-sans text-neutral-400 uppercase tracking-widest font-semibold">
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
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-black text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all shadow-lg"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      <span>Chat on WhatsApp (+91 9125205132)</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Founder Narrative & Vision */}
              <div className="space-y-8 bg-[#0A0A0A] p-8 sm:p-10 rounded-2xl border border-neutral-800">
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
                <div className="pt-6 border-t border-neutral-800 space-y-4">
                  <h4 className="text-xs uppercase font-bold text-[#D4B06A] tracking-[0.2em]">
                    Core Studio Capabilities:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {coreFocusAreas.map((area, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-[#0D0D0D] border border-neutral-800 space-y-1.5 hover:border-[#D4B06A]/30 transition-colors">
                        <div className="flex items-center space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-[#D4B06A] shrink-0" />
                          <h5 className="text-xs font-bold text-white">{area.title}</h5>
                        </div>
                        <p className="text-[11px] text-neutral-400 pl-6 leading-relaxed">{area.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Guiding Principles */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="font-sans text-xs uppercase tracking-[0.25em] font-bold text-[#D4B06A]">
              OUR COMMITMENT
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-white">
              Built on craftsmanship and speed.
            </h2>
            <p className="text-sm text-neutral-400">
              Four principles guiding every strategy, line of code, and creative video delivered by YUGARK Digital Studio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {studioValues.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div 
                  key={idx}
                  className="p-8 rounded-2xl bg-[#0A0A0A] border border-neutral-800 hover:border-[#D4B06A]/40 transition-all space-y-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#D4B06A]/10 border border-[#D4B06A]/30 flex items-center justify-center text-[#D4B06A]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-medium text-white">{value.title}</h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans font-light">
                    {value.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-20 bg-[#080808] border-t border-b border-[#D4B06A]/15">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            <div className="text-center space-y-3">
              <span className="font-sans text-xs uppercase tracking-[0.25em] font-bold text-[#D4B06A]">
                CLIENT OUTCOMES
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-white">
                Trusted by growing businesses.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, idx) => (
                <div key={idx} className="p-8 rounded-2xl bg-[#0A0A0A] border border-neutral-800 space-y-6 flex flex-col justify-between hover:border-[#D4B06A]/30 transition-colors">
                  <p className="font-serif italic text-sm text-neutral-200 leading-relaxed">
                    "{t.quote}"
                  </p>
                  <div className="pt-4 border-t border-neutral-800">
                    <span className="block font-semibold text-white text-sm">{t.author}</span>
                    <span className="text-xs text-neutral-400">{t.role}</span>
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
