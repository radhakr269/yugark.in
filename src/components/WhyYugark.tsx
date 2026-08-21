import { useState } from 'react';
import { motion } from 'motion/react';
import { Globe, BarChart3, Bot, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WhyYugark() {
  const [activeTab, setActiveTab] = useState('Websites');

  const tabs = ['Websites', 'Social Media', 'AI Creative', 'Growth Strategy'];

  const gridCards = [
    {
      title: 'Website',
      description: 'A premium digital foundation built around business conversion, high-speed performance, and buyer trust.',
      icon: Globe,
      category: 'Websites',
      glow: 'from-[#D4B06A]/20'
    },
    {
      title: 'Content',
      description: 'Strategic content pillars, short video hooks, and publishing calendars that give your brand continuous momentum.',
      icon: Sparkles,
      category: 'Social Media',
      glow: 'from-violet-500/20'
    },
    {
      title: 'Social Media',
      description: 'Consistent authority presence with commercial intent behind every reel, carousel, and community interaction.',
      icon: BarChart3,
      category: 'Social Media',
      glow: 'from-cyan-500/20'
    },
    {
      title: 'AI & Automation',
      description: 'AI-assisted video and lead capture workflows that scale output and route inquiries to WhatsApp with zero overhead.',
      icon: Bot,
      category: 'AI Creative',
      glow: 'from-emerald-500/20'
    }
  ];

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden bg-perspective-grid">
      {/* Subtle Aurora Ambient Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#D4B06A]/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Top Pills Bar */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 no-scrollbar border-b border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-[#D4B06A] to-[#C9A35E] text-black shadow-[0_0_20px_rgba(212,176,106,0.3)] scale-[1.02]'
                  : 'bg-[#101014]/80 text-neutral-400 border border-white/10 hover:text-white hover:border-[#D4B06A]/30'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Block */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121216]/90 border border-[#D4B06A]/30">
              <span className="text-xs text-[#F0D28F]">⬡</span>
              <span className="font-sans text-[11px] uppercase tracking-[0.25em] font-bold text-[#F0D28F]">
                BUSINESS GROWTH SYSTEM
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl text-white leading-[1.1] font-bold">
              Not Just a Pretty Website.
            </h2>

            <p className="text-neutral-300 font-sans leading-relaxed text-base sm:text-lg font-light">
              A website alone rarely grows a business. Yugark builds a complete digital growth system — uniting high-converting web architecture, engaging video content, organic social authority, and automated lead capture so every asset actively drives customer action.
            </p>

            <p className="text-neutral-400 font-sans text-sm leading-relaxed font-light">
              When your brand touchpoints operate in isolation, potential customers drop off. We engineer synchronized digital ecosystems where your website converts high-intent traffic, social media nurtures warm audiences, and automated workflows route leads straight to WhatsApp in real-time.
            </p>

            <div className="pt-4 flex items-center gap-4">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#D4B06A] to-[#C9A35E] text-black font-bold text-xs uppercase tracking-widest hover:brightness-110 active:scale-98 transition-all shadow-md group"
              >
                <span>Explore Full Ecosystem</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right 2x2 Feature Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {gridCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="p-7 rounded-3xl bg-[#09090D]/85 backdrop-blur-xl border border-white/10 hover:border-[#D4B06A]/45 transition-all duration-300 group hover:-translate-y-1.5 shadow-[0_20px_40px_rgba(0,0,0,0.85)] relative overflow-hidden"
                >
                  {/* Subtle Top Glow */}
                  <div className={`absolute top-0 left-0 right-0 h-20 bg-gradient-to-b ${card.glow} via-transparent to-transparent pointer-events-none opacity-20 group-hover:opacity-70 transition-opacity`} />
                  <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#F0D28F]/30 to-transparent" />

                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <h3 className="font-serif text-2xl font-bold text-white group-hover:text-[#F0D28F] transition-colors">
                      {card.title}
                    </h3>
                    <div className="w-10 h-10 rounded-2xl bg-[#14141C] border border-[#D4B06A]/20 flex items-center justify-center text-[#D4B06A] group-hover:bg-[#D4B06A] group-hover:text-black transition-all shadow-inner">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <p className="text-sm text-neutral-300 leading-relaxed font-light relative z-10">
                    {card.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}


