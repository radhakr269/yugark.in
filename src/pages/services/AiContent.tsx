import SEO from '../../components/SEO';
import { SERVICES_DATA } from '../../data';
import { Link } from 'react-router-dom';
import { Bot, Sparkles, Video, ArrowRight } from 'lucide-react';
import CTASection from '../../components/CTASection';

export default function AiContent() {
  const service = SERVICES_DATA.find(
    s => s.id === 'ai-content-video' || s.id === 'short-ad-video' || s.link === '/services/ai-content-video'
  );

  const deliverables = service?.deliverables || [
    'Strategic 3-Second Hook & Scripting',
    'Professional Motion Graphics & Typography',
    'Voiceover & Background Music Licensing',
    'Vertical 9:16 Format for Reels & TikTok',
    'AI-Assisted Visual Enhancements & Subtitles'
  ];

  return (
    <>
      <SEO 
        title="AI Content & AI Video — YUGARK" 
        description="Generative AI video production, brand storytelling, and high-frequency content creation." 
      />

      <main className="pt-32 pb-24 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-4xl space-y-6">
            <Link to="/services" className="text-xs uppercase tracking-widest text-[#D4B06A] hover:underline">
              ← Back to All Services
            </Link>

            <div className="flex items-center space-x-3 text-[#F0D28F]">
              <Bot className="w-6 h-6" />
              <span className="text-xs font-semibold uppercase tracking-widest">Pillar 03 / Generative Innovation</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl text-white font-normal leading-[1.1]">
              AI Content & AI Video
            </h1>

            <p className="text-lg sm:text-xl text-neutral-300 font-sans font-light leading-relaxed">
              Harness state-of-the-art Generative AI models to scale creative video output by 10x while maintaining cinematic luxury visual quality.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-8">
              <div className="p-8 rounded-2xl bg-[#090909] border border-white/10 space-y-6">
                <h2 className="font-serif text-2xl text-white">Cinematic Quality at Scale</h2>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  We combine frontier video synthesis, custom synthetic voiceovers, and photorealistic AI image rendering to generate promotional ads, social teasers, and brand storytelling campaigns without expensive traditional film production delays.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-[#090909] border border-white/10 space-y-6">
                <h2 className="font-serif text-2xl text-white">AI Video Capabilities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-200">
                  {deliverables.map((del, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#111111] border border-white/5 flex items-center space-x-3">
                      <Video className="w-4 h-4 text-[#D4B06A] shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 p-8 rounded-2xl bg-[#0C0C0C] border border-[#D4B06A]/30 space-y-6 gold-glow-subtle sticky top-32">
              <h3 className="font-serif text-xl text-white">Scale Creative Production</h3>
              <p className="text-xs text-neutral-400">
                Unlock 10x content velocity with YUGARK AI Video Studio.
              </p>
              <Link
                to="/contact?service=ai"
                className="w-full py-3.5 rounded-xl gold-gradient-bg text-black font-semibold text-xs uppercase tracking-wider block text-center hover:brightness-110 transition-all"
              >
                Inquire About AI Video
              </Link>
            </div>
          </div>

          <CTASection />
        </div>
      </main>
    </>
  );
}
