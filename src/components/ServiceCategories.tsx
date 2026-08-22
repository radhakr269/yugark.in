import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface ServiceCategory {
  id: string;
  emoji: string;
  action: string;
  title: string;
  link: string;
}

const CATEGORIES: ServiceCategory[] = [
  {
    id: 'build',
    emoji: '🌐',
    action: 'BUILD',
    title: 'Websites & Digital Presence',
    link: '/services/website-development'
  },
  {
    id: 'create',
    emoji: '🎬',
    action: 'CREATE',
    title: 'Videos, Reels & Social Content',
    link: '/services/ai-content-video'
  },
  {
    id: 'advertise',
    emoji: '📢',
    action: 'ADVERTISE',
    title: 'Meta Ads & Social Advertising',
    link: '/services/social-media-advertising'
  },
  {
    id: 'grow',
    emoji: '🚀',
    action: 'GROW',
    title: 'Content & Digital Growth Strategy',
    link: '/services/digital-growth-strategy'
  }
];

export default function ServiceCategories() {
  return (
    <section className="relative py-12 md:py-16 bg-[#050505] border-y border-white/5 overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#D4B06A]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-violet-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5 lg:gap-6">
          {CATEGORIES.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Link
                to={item.link}
                className="group relative block p-3.5 sm:p-7 rounded-xl sm:rounded-2xl bg-[#0C0C0E]/90 border border-white/10 hover:border-[#D4B06A]/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-8px_rgba(212,176,106,0.18)] flex flex-col justify-between min-h-[115px] sm:min-h-[168px] overflow-hidden"
              >
                {/* Subtle Top Gold Highlight on Hover */}
                <div className="absolute top-0 left-4 sm:left-6 right-4 sm:right-6 h-[1px] bg-gradient-to-r from-transparent via-[#D4B06A]/0 group-hover:via-[#D4B06A]/60 to-transparent transition-all duration-500" />

                {/* Category Action & Emoji Header */}
                <div className="flex items-center justify-between gap-2 mb-2 sm:mb-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-xl sm:text-3xl select-none" role="img" aria-label={item.action}>
                      {item.emoji}
                    </span>
                    <span className="font-serif text-xs sm:text-xl font-bold tracking-wider text-white group-hover:text-[#F0D28F] transition-colors">
                      {item.action}
                    </span>
                  </div>

                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-white/10 group-hover:border-[#D4B06A]/40 bg-white/[0.03] group-hover:bg-[#D4B06A]/10 flex items-center justify-center text-neutral-400 group-hover:text-[#F0D28F] transition-all duration-300 shrink-0">
                    <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                {/* Service Category Subtitle */}
                <div className="mt-auto">
                  <p className="text-[11px] sm:text-base text-neutral-300 font-sans font-medium leading-snug group-hover:text-white transition-colors line-clamp-2 sm:line-clamp-none">
                    {item.title}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
