import SEO from '../../components/SEO';
import { SERVICES_DATA } from '../../data';
import { Link } from 'react-router-dom';
import { PenTool, Compass, ArrowRight } from 'lucide-react';
import CTASection from '../../components/CTASection';

export default function ContentStrategy() {
  const service = SERVICES_DATA.find(s => s.id === 'content-strategy')!;

  return (
    <>
      <SEO 
        title="Content Strategy — YUGARK" 
        description="Comprehensive editorial calendars, messaging pillars, and campaign strategy for modern brands." 
      />

      <main className="pt-32 pb-24 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-4xl space-y-6">
            <Link to="/services" className="text-xs uppercase tracking-widest text-[#D4B06A] hover:underline">
              ← Back to All Services
            </Link>

            <div className="flex items-center space-x-3 text-[#F0D28F]">
              <PenTool className="w-6 h-6" />
              <span className="text-xs font-semibold uppercase tracking-widest">Pillar 05 / Messaging Architecture</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl text-white font-normal leading-[1.1]">
              Content Strategy
            </h1>

            <p className="text-lg sm:text-xl text-neutral-300 font-sans font-light leading-relaxed">
              Eliminate guesswork with structured editorial frameworks that align every post and video with business growth goals.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-8">
              <div className="p-8 rounded-2xl bg-[#090909] border border-white/10 space-y-6">
                <h2 className="font-serif text-2xl text-white">Strategic Brand Positioning</h2>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  We audit your industry, analyze audience pain points, and synthesize month-by-month content pillars, campaign themes, and multi-channel distribution workflows.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-[#090909] border border-white/10 space-y-6">
                <h2 className="font-serif text-2xl text-white">Strategy Deliverables</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-200">
                  {service.deliverables?.map((del, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#111111] border border-white/5 flex items-center space-x-3">
                      <Compass className="w-4 h-4 text-[#D4B06A] shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 p-8 rounded-2xl bg-[#0C0C0C] border border-[#D4B06A]/30 space-y-6 gold-glow-subtle sticky top-32">
              <h3 className="font-serif text-xl text-white">Structure Your Brand Voice</h3>
              <p className="text-xs text-neutral-400">
                Align content with revenue goals using YUGARK's proven strategy framework.
              </p>
              <Link
                to="/contact?service=content"
                className="w-full py-3.5 rounded-xl gold-gradient-bg text-black font-semibold text-xs uppercase tracking-wider block text-center hover:brightness-110 transition-all"
              >
                Inquire About Content Strategy
              </Link>
            </div>
          </div>

          <CTASection />
        </div>
      </main>
    </>
  );
}
