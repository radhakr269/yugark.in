import { useState } from 'react';
import { motion } from 'motion/react';
import { Globe, BarChart3, Bot, Sparkles } from 'lucide-react';

export default function WhyYugark() {
  const [activeTab, setActiveTab] = useState('Websites');

  const tabs = ['Websites', 'Social Media', 'AI Creative', 'Growth Strategy'];

  const gridCards = [
    {
      title: 'Website',
      description: 'A premium digital foundation built around business conversion and buyer trust.',
      icon: Globe,
      category: 'Websites'
    },
    {
      title: 'Content',
      description: 'Strategic pillars, video hooks and calendars that give your brand continuous momentum.',
      icon: Sparkles,
      category: 'Social Media'
    },
    {
      title: 'Social Media',
      description: 'Consistent authority presence with commercial intent behind every post.',
      icon: BarChart3,
      category: 'Social Media'
    },
    {
      title: 'AI & Automation',
      description: 'AI-assisted video and lead capture workflows that scale output without overhead.',
      icon: Bot,
      category: 'AI Creative'
    }
  ];

  return (
    <section className="py-24 bg-[#080808] border-t border-b border-white/5 relative overflow-hidden bg-perspective-grid">
      {/* Subtle Aurora Ambient Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Pills Bar */}
        <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto pb-4 mb-16 no-scrollbar border-b border-white/5">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg text-xs uppercase tracking-widest font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab
                  ? 'bg-[#121212] text-[#F0D28F] border border-[#D4B06A]/40 shadow-lg'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Text Block */}
          <div className="lg:col-span-6 space-y-6">
            <span className="font-sans text-xs uppercase tracking-[0.25em] font-bold text-[#D4B06A]">
              BUSINESS GROWTH SYSTEM
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white leading-[1.15]">
              Not Just a Pretty Website.
            </h2>

            <p className="text-neutral-300 font-sans leading-relaxed text-base md:text-lg pt-2">
              A website alone rarely grows a business. Yugark builds a complete digital growth system — uniting high-converting web architecture, engaging video content, organic social authority, and automated lead capture so every asset actively drives customer action.
            </p>

            <p className="text-neutral-400 font-sans text-sm leading-relaxed">
              When your brand touchpoints operate in isolation, potential customers drop off. We engineer synchronized digital ecosystems where your website converts high-intent traffic, social media nurtures warm audiences, and automated workflows route leads straight to WhatsApp in real-time.
            </p>
          </div>

          {/* Right 2x2 Feature Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {gridCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-6 rounded-xl bg-[#0F0F0F] border border-white/5 hover:border-[#D4B06A]/30 transition-all duration-300 group hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif text-2xl font-medium text-white group-hover:text-[#F0D28F] transition-colors">
                      {card.title}
                    </h3>
                    <div className="w-8 h-8 rounded-lg bg-[#181818] border border-[#D4B06A]/20 flex items-center justify-center text-[#D4B06A] group-hover:bg-[#D4B06A] group-hover:text-black transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <p className="text-sm text-neutral-400 leading-relaxed">
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

