import SEO from '../../components/SEO';
import { SERVICES_DATA } from '../../data';
import { Link } from 'react-router-dom';
import { Globe, ArrowRight, Zap, Clock, Tag, MessageCircle, Layers, CheckCircle2 } from 'lucide-react';
import CTASection from '../../components/CTASection';
import WhatsAppButton, { WHATSAPP_LINK } from '../../components/WhatsAppButton';

export default function WebsiteDev() {
  const service = SERVICES_DATA.find(s => s.id === 'website-development')!;

  return (
    <>
      <SEO 
        title="Custom Website Development (From ₹9,999) — YUGARK Digital Studio" 
        description="Premium, mobile-first, SEO-ready and conversion-focused custom frontend and fullstack website development. Fast ~7–14 day delivery. Founded by Mr. Radha Krishna." 
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
                <span>Offer: From ₹9,999 (Regular ₹15,999)</span>
              </div>
              <div className="px-3 py-1 bg-neutral-900 border border-neutral-800 text-neutral-400 rounded-lg text-xs flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#D4B06A]" />
                <span>Delivery: ~7–14 Days</span>
              </div>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl text-white font-normal leading-[1.1]">
              Custom Website Development
            </h1>

            <p className="text-lg sm:text-xl text-neutral-300 font-sans font-light leading-relaxed">
              We build custom high-status digital flagships engineered for speed, mobile responsiveness, Google SEO indexing, and immediate WhatsApp lead conversion.
            </p>
          </div>

          {/* Grid Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-8">
              {/* Options Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Option 1 */}
                <div className="p-6 rounded-2xl bg-[#090909] border border-[#D4B06A]/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded bg-[#D4B06A]/15 text-[#D4B06A] border border-[#D4B06A]/30">
                      Standard Frontend
                    </span>
                    <span className="text-xs text-neutral-400">~7 Days Delivery</span>
                  </div>
                  <h3 className="font-serif text-xl text-white font-semibold">Frontend Website</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-serif font-bold text-[#F0D28F]">₹9,999</span>
                    <span className="text-xs line-through text-neutral-500">₹15,999</span>
                  </div>
                  <p className="text-xs text-neutral-300 font-light">
                    Custom high-performance responsive frontend website built for conversion, speed, and brand credibility.
                  </p>
                  <ul className="space-y-2 text-xs text-neutral-300 pt-2 border-t border-neutral-800/80">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4B06A] shrink-0" />
                      <span>Custom React / Vite Responsive UI</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4B06A] shrink-0" />
                      <span>Direct WhatsApp & Enquiry Routing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4B06A] shrink-0" />
                      <span>Sub-second Speed & SEO Ready</span>
                    </li>
                  </ul>
                  <Link
                    to="/contact?service=Frontend+Website"
                    className="block text-center py-2.5 rounded-xl bg-neutral-900 hover:bg-[#D4B06A] hover:text-black border border-neutral-700 text-xs font-semibold uppercase tracking-wider transition-all"
                  >
                    Select Frontend (₹9,999)
                  </Link>
                </div>

                {/* Option 2 */}
                <div className="p-6 rounded-2xl bg-[#090909] border border-[#F0D28F]/50 space-y-4 shadow-lg shadow-[#D4B06A]/5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800">
                      Fullstack Solution
                    </span>
                    <span className="text-xs text-neutral-400">~10–14 Days Delivery</span>
                  </div>
                  <h3 className="font-serif text-xl text-white font-semibold">Full Frontend + Backend</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-serif font-bold text-[#F0D28F]">₹14,999</span>
                    <span className="text-xs line-through text-neutral-500">₹19,999</span>
                  </div>
                  <p className="text-xs text-neutral-300 font-light">
                    End-to-end custom web system with frontend UI, backend server logic, database integration, and APIs.
                  </p>
                  <ul className="space-y-2 text-xs text-neutral-300 pt-2 border-t border-neutral-800/80">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4B06A] shrink-0" />
                      <span>Everything in Frontend Package</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4B06A] shrink-0" />
                      <span>Custom API Server & Cloud Database</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4B06A] shrink-0" />
                      <span>Lead Management & CRM Workflows</span>
                    </li>
                  </ul>
                  <Link
                    to="/contact?service=Full+Frontend+%2B+Backend+Website"
                    className="block text-center py-2.5 rounded-xl gold-gradient-bg text-black text-xs font-semibold uppercase tracking-wider hover:brightness-110 transition-all shadow-md"
                  >
                    Select Fullstack (₹14,999)
                  </Link>
                </div>
              </div>

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
                <h2 className="font-serif text-2xl text-white">Deliverables Included in the Website Architecture</h2>
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
                  From ₹9,999 <span className="text-xs text-neutral-500 line-through">₹15,999</span>
                </div>
                <p className="text-xs text-neutral-400">Complete ~7–14 day delivery with mobile optimization and SEO.</p>
              </div>

              <div className="pt-2 space-y-3">
                <Link
                  to="/pricing"
                  className="w-full py-3.5 rounded-xl gold-gradient-bg text-black font-semibold text-xs uppercase tracking-wider block text-center hover:brightness-110 transition-all shadow-md"
                >
                  View Pricing & Calculator
                </Link>

                <a
                  href={`${WHATSAPP_LINK}&text=Hi%20Radha%20Krishna%20Sir,%20I%20am%20interested%20in%20the%20Website%20Development%20Package%20(From%20₹9,999).`}
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
