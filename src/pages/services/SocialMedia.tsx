import SEO from '../../components/SEO';
import { SERVICES_DATA } from '../../data';
import { Link } from 'react-router-dom';
import { BarChart3, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import CTASection from '../../components/CTASection';

export default function SocialMedia() {
  const service = SERVICES_DATA.find(s => s.id === 'social-media-management')!;

  return (
    <>
      <SEO 
        title="Social Media Management — YUGARK" 
        description="Build a consistent, strategic social presence across Instagram, LinkedIn, TikTok and Meta." 
      />

      <main className="pt-32 pb-24 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-4xl space-y-6">
            <Link to="/services" className="text-xs uppercase tracking-widest text-[#D4B06A] hover:underline">
              ← Back to All Services
            </Link>

            <div className="flex items-center space-x-3 text-[#F0D28F]">
              <BarChart3 className="w-6 h-6" />
              <span className="text-xs font-semibold uppercase tracking-widest">Pillar 02 / Social Dominance</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl text-white font-normal leading-[1.1]">
              Social Media Management
            </h1>

            <p className="text-lg sm:text-xl text-neutral-300 font-sans font-light leading-relaxed">
              Transform social channels into automated organic acquisition systems that build undeniable category authority.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-8">
              <div className="p-8 rounded-2xl bg-[#090909] border border-white/10 space-y-6">
                <h2 className="font-serif text-2xl text-white">Consistent High-Aesthetic Presence</h2>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  We write scripts, produce high-retention short-form video reels, design luxury carousels, and manage community interactions to ensure your brand is constantly top-of-mind for ideal buyers.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-[#090909] border border-white/10 space-y-6">
                <h2 className="font-serif text-2xl text-white">Included Deliverables</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-200">
                  {service.deliverables?.map((del, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#111111] border border-white/5 flex items-center space-x-3">
                      <Sparkles className="w-4 h-4 text-[#D4B06A] shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 p-8 rounded-2xl bg-[#0C0C0C] border border-[#D4B06A]/30 space-y-6 gold-glow-subtle sticky top-32">
              <h3 className="font-serif text-xl text-white">Elevate Your Social Footprint</h3>
              <p className="text-xs text-neutral-400">
                Let YUGARK take over social strategy and short-form video execution.
              </p>
              <Link
                to="/contact?service=social"
                className="w-full py-3.5 rounded-xl gold-gradient-bg text-black font-semibold text-xs uppercase tracking-wider block text-center hover:brightness-110 transition-all"
              >
                Inquire About Social
              </Link>
            </div>
          </div>

          <CTASection />
        </div>
      </main>
    </>
  );
}
