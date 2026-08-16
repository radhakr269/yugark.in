import SEO from '../../components/SEO';
import { SERVICES_DATA } from '../../data';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, ArrowRight } from 'lucide-react';
import CTASection from '../../components/CTASection';

export default function GrowthStrategy() {
  const service = SERVICES_DATA.find(s => s.id === 'digital-growth-strategy')!;

  return (
    <>
      <SEO 
        title="Digital Growth Strategy — YUGARK" 
        description="Comprehensive 360-degree digital audits, positioning roadmaps, and growth architecture." 
      />

      <main className="pt-32 pb-24 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-4xl space-y-6">
            <Link to="/services" className="text-xs uppercase tracking-widest text-[#D4B06A] hover:underline">
              ← Back to All Services
            </Link>

            <div className="flex items-center space-x-3 text-[#F0D28F]">
              <Compass className="w-6 h-6" />
              <span className="text-xs font-semibold uppercase tracking-widest">Pillar 06 / Master Blueprint</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl text-white font-normal leading-[1.1]">
              Digital Growth Strategy
            </h1>

            <p className="text-lg sm:text-xl text-neutral-300 font-sans font-light leading-relaxed">
              Unite website, content, social media, AI, and advertising into a single compounding digital growth system.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-8">
              <div className="p-8 rounded-2xl bg-[#090909] border border-white/10 space-y-6">
                <h2 className="font-serif text-2xl text-white">Full-Funnel Digital Optimization</h2>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  We analyze every touchpoint of your digital footprint, identify leakages in your conversion funnel, and construct a bespoke multi-channel growth roadmap to accelerate compounding revenue.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-[#090909] border border-white/10 space-y-6">
                <h2 className="font-serif text-2xl text-white">Growth Roadmap Deliverables</h2>
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
              <h3 className="font-serif text-xl text-white">Request Digital Growth Plan</h3>
              <p className="text-xs text-neutral-400">
                Get a customized digital audit and growth strategy for your business.
              </p>
              <Link
                to="/contact?service=growth"
                className="w-full py-3.5 rounded-xl gold-gradient-bg text-black font-semibold text-xs uppercase tracking-wider block text-center hover:brightness-110 transition-all"
              >
                Get Growth Plan
              </Link>
            </div>
          </div>

          <CTASection />
        </div>
      </main>
    </>
  );
}
