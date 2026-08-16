import SEO from '../../components/SEO';
import { SERVICES_DATA } from '../../data';
import { Link } from 'react-router-dom';
import { Globe, ArrowRight, Zap, Clock, Tag, MessageCircle } from 'lucide-react';
import CTASection from '../../components/CTASection';
import WhatsAppButton, { WHATSAPP_LINK } from '../../components/WhatsAppButton';

export default function WebsiteDev() {
  const service = SERVICES_DATA.find(s => s.id === 'website-development')!;

  return (
    <>
      <SEO 
        title="Custom Website Development (₹12,999) — YUGARK Digital Studio" 
        description="Premium, mobile-first, SEO-ready and conversion-focused custom website development with fast ~7 day delivery. Founded by Mr. Radha Krishna." 
      />

      <main className="pt-32 pb-24 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Header */}
          <div className="max-w-4xl space-y-6">
            <Link to="/services" className="text-xs uppercase tracking-widest text-[#D4B06A] hover:underline">
              ← Back to All Services
            </Link>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center space-x-2 text-[#F0D28F] px-3 py-1 bg-[#141414] border border-[#D4B06A]/30 rounded-lg text-xs font-semibold uppercase tracking-widest">
                <Globe className="w-4 h-4" />
                <span>One-Time Service</span>
              </div>
              <div className="px-3 py-1 bg-[#D4B06A]/10 border border-[#D4B06A]/40 text-[#D4B06A] rounded-lg text-xs font-bold flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" />
                <span>Offer: ₹12,999 (Regular ₹14,999)</span>
              </div>
              <div className="px-3 py-1 bg-neutral-900 border border-neutral-800 text-neutral-400 rounded-lg text-xs flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#D4B06A]" />
                <span>Delivery: ~7 Days</span>
              </div>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl text-white font-normal leading-[1.1]">
              Custom Website Development
            </h1>

            <p className="text-lg sm:text-xl text-neutral-300 font-sans font-light leading-relaxed">
              We build custom high-status digital flagships engineered for speed, mobile responsiveness, Google SEO indexing, and immediate lead generation.
            </p>
          </div>

          {/* Grid Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-8">
              <div className="p-8 rounded-2xl bg-[#090909] border border-white/10 space-y-6">
                <h2 className="font-serif text-2xl text-white">Why Standard Website Templates Fail</h2>
                <p className="text-sm text-neutral-300 leading-relaxed font-sans font-light">
                  Off-the-shelf WordPress themes and generic site builders suffer from massive plugin bloat, sluggish mobile loading, and uninspired cookie-cutter design that fails to convert visitors into paying clients.
                </p>
                <p className="text-sm text-neutral-300 leading-relaxed font-sans font-light">
                  YUGARK Digital Studio engineers bespoke React/Tailwind platforms with custom animations, 95+ Lighthouse speed scores, integrated WhatsApp lead routing, and conversion flows tailored to your business.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-[#090909] border border-white/10 space-y-6">
                <h2 className="font-serif text-2xl text-white">Deliverables Included in the ₹12,999 Package</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-200">
                  {service.deliverables?.map((del, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#111111] border border-white/5 flex items-center space-x-3">
                      <Zap className="w-4 h-4 text-[#D4B06A] shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar CTA Card */}
            <div className="lg:col-span-4 p-8 rounded-2xl bg-[#0C0C0C] border border-[#D4B06A]/30 space-y-6 gold-border-glow sticky top-32">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4B06A]">Launch Pricing</span>
                <div className="font-serif text-3xl font-bold text-white">
                  ₹12,999 <span className="text-xs text-neutral-500 line-through">₹14,999</span>
                </div>
                <p className="text-xs text-neutral-400">Complete ~7 day delivery with mobile optimization and SEO.</p>
              </div>

              <div className="pt-2 space-y-3">
                <Link
                  to="/contact?service=Website+Development"
                  className="w-full py-3.5 rounded-xl gold-gradient-bg text-black font-semibold text-xs uppercase tracking-wider block text-center hover:brightness-110 transition-all shadow-md"
                >
                  Start Website Project
                </Link>

                <a
                  href={`${WHATSAPP_LINK}&text=Hi%20Radha%20Krishna%20Sir,%20I%20am%20interested%20in%20the%20Website%20Development%20Package%20(₹12,999).`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-black font-semibold text-xs tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Inquire on WhatsApp</span>
                </a>
              </div>

              <div className="pt-3 border-t border-neutral-800 text-[11px] text-neutral-400">
                Direct founder review by <strong className="text-white">Mr. Radha Krishna</strong>.
              </div>
            </div>
          </div>

          <CTASection />
        </div>
        <WhatsAppButton />
      </main>
    </>
  );
}
