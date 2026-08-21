import { Sparkles } from 'lucide-react';

export default function StudioTicker() {
  const tickerItems = [
    'CUSTOM WEB ENGINEERING (~7 DAYS)',
    '15–30S HIGH-RETENTION VIDEO REELS',
    'AI CREATIVE DIRECTION & PRODUCTION',
    'HYPER-LOCAL SEO & GOOGLE MAPS RANKING',
    'SUB-SECOND SPEED ARCHITECTURE',
    'WHATSAPP CRM LEAD ROUTING',
    'META & INSTAGRAM CONVERSION CAMPAIGNS',
    'FOUNDER-DIRECT STRATEGIC OVERSIGHT',
  ];

  return (
    <div className="relative w-full overflow-hidden py-4 border-y border-[#D4B06A]/20 bg-[#060606]/90 backdrop-blur-md select-none z-20">
      {/* Left/Right Edge Gradient Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

      <div className="animate-ticker flex items-center space-x-8 sm:space-x-12">
        {/* Double array for seamless endless marquee */}
        {[...tickerItems, ...tickerItems].map((item, idx) => (
          <div key={idx} className="flex items-center space-x-3 sm:space-x-4 shrink-0">
            <span className="text-[11px] sm:text-xs font-sans tracking-[0.22em] text-neutral-300 font-medium uppercase hover:text-[#F0D28F] transition-colors">
              {item}
            </span>
            <Sparkles className="w-3 h-3 text-[#D4B06A]/70 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
