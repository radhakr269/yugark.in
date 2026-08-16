import { Link } from 'react-router-dom';
import { SERVICES_DATA } from '../data';
import { ArrowUpRight, Globe, BarChart3, Bot, Megaphone, PenTool, Compass } from 'lucide-react';
import { motion } from 'motion/react';

const iconMap: Record<string, any> = {
  Globe,
  BarChart3,
  Bot,
  Megaphone,
  PenTool,
  Compass
};

export default function ServicesGrid() {
  return (
    <section className="py-24 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching Screenshot 4 */}
        <div className="max-w-3xl mb-16 space-y-4">
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
            Everything your digital presence needs.
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 font-sans font-light">
            Six connected services. Choose one, or combine them into a complete digital system.
          </p>
        </div>

        {/* 3x2 Service Cards Grid matching Screenshots 4 & 5 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES_DATA.map((service, index) => {
            const IconComponent = iconMap[service.iconName] || Globe;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative p-8 rounded-2xl bg-[#0B0B0B] border border-white/5 hover:border-[#D4B06A]/40 transition-all duration-300 flex flex-col justify-between hover:bg-[#101010] hover:-translate-y-1 shadow-2xl"
              >
                <div>
                  {/* Service Icon */}
                  <div className="w-12 h-12 rounded-xl bg-[#141414] border border-[#D4B06A]/20 flex items-center justify-center text-[#D4B06A] group-hover:border-[#D4B06A] group-hover:bg-[#D4B06A] group-hover:text-black transition-colors mb-8">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-2xl text-white mb-3 font-medium group-hover:text-[#F0D28F] transition-colors">
                    {service.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>

                  {/* Feature Bullet Points */}
                  <ul className="space-y-2.5 mb-8 text-xs text-neutral-300">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-[#D4B06A] font-bold mt-0.5">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Learn More Link */}
                <Link
                  to={service.link}
                  className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest text-[#D4B06A] group-hover:text-[#F0D28F] font-semibold transition-colors pt-4 border-t border-white/5 group-hover:border-white/10"
                >
                  <span>Learn More</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
