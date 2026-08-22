import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Utensils,
  Dumbbell,
  Building,
  HeartPulse,
  GraduationCap,
  ShoppingBag,
  Sparkles,
  Hotel,
  Wrench,
  Briefcase,
  Eye,
  ArrowRight,
  CheckCircle2,
  Filter,
} from 'lucide-react';
import { BUSINESS_TEMPLATES } from '../data';
import { BusinessTemplate } from '../types';
import TemplatePreviewModal from './TemplatePreviewModal';
import { WHATSAPP_NUMBER, WhatsAppIcon } from './WhatsAppButton';

const iconMap: Record<string, any> = {
  Utensils,
  Dumbbell,
  Building,
  HeartPulse,
  GraduationCap,
  ShoppingBag,
  Sparkles,
  Hotel,
  Wrench,
  Briefcase,
};

export default function WebsiteTemplatesShowcase() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalTemplate, setActiveModalTemplate] = useState<BusinessTemplate | null>(null);

  const categories = ['All', 'Hospitality', 'Healthcare', 'Fitness', 'Real Estate', 'Retail', 'Education', 'Services'];

  const filterTemplates = () => {
    if (selectedCategory === 'All') return BUSINESS_TEMPLATES;
    if (selectedCategory === 'Hospitality') {
      return BUSINESS_TEMPLATES.filter((t) => ['restaurant-cafe', 'hotel-hospitality'].includes(t.id));
    }
    if (selectedCategory === 'Healthcare') {
      return BUSINESS_TEMPLATES.filter((t) => t.id === 'healthcare-clinic');
    }
    if (selectedCategory === 'Fitness') {
      return BUSINESS_TEMPLATES.filter((t) => t.id === 'gym-fitness');
    }
    if (selectedCategory === 'Real Estate') {
      return BUSINESS_TEMPLATES.filter((t) => t.id === 'real-estate');
    }
    if (selectedCategory === 'Retail') {
      return BUSINESS_TEMPLATES.filter((t) => ['ecommerce-retail', 'salon-beauty'].includes(t.id));
    }
    if (selectedCategory === 'Education') {
      return BUSINESS_TEMPLATES.filter((t) => t.id === 'coaching-education');
    }
    if (selectedCategory === 'Services') {
      return BUSINESS_TEMPLATES.filter((t) => ['local-business', 'corporate-professional'].includes(t.id));
    }
    return BUSINESS_TEMPLATES;
  };

  const visibleTemplates = filterTemplates();

  return (
    <section id="templates" className="py-24 bg-[#050505] relative overflow-hidden border-t border-white/5">
      {/* Ambient gold glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#D4B06A]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="font-sans text-[11px] uppercase tracking-[0.25em] font-bold text-[#D4B06A] inline-block px-3 py-1 rounded-full bg-[#D4B06A]/10 border border-[#D4B06A]/20">
            DEMO TEMPLATES • 10 BUSINESS CATEGORIES
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal leading-tight">
            Explore Our Website Templates.
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 font-sans font-light leading-relaxed">
            Ready-to-launch website architectures engineered specifically for your industry. Each template is customized with your branding, photos, services, and WhatsApp lead flow.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#D4B06A] to-[#C9A35E] text-black font-bold shadow-lg shadow-[#D4B06A]/20 scale-[1.02]'
                  : 'bg-[#0E0E0E]/80 backdrop-blur-sm text-neutral-400 border border-neutral-800 hover:text-white hover:border-[#D4B06A]/40 hover:bg-[#151515]'
              }`}
            >
              {cat} {cat === 'All' ? `(${BUSINESS_TEMPLATES.length})` : ''}
            </button>
          ))}
        </div>

        {/* 10 Business Template Grid (2-column on mobile) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-8">
          {visibleTemplates.map((template, idx) => {
            const IconComponent = iconMap[template.iconName] || Building;

            return (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                className="group relative rounded-xl sm:rounded-2xl bg-[#0A0A0A]/75 backdrop-blur-md border border-neutral-800 hover:border-[#D4B06A]/50 transition-all duration-300 flex flex-col overflow-hidden shadow-xl hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.9),0_0_20px_rgba(212,176,106,0.12)] hover:-translate-y-1.5"
              >
                {/* Visual Preview Container with Browser Chrome */}
                <div className="relative bg-[#121212] overflow-hidden">
                  {/* Browser Top Dot Bar */}
                  <div className="px-2 sm:px-3 py-1 sm:py-1.5 bg-[#171717] border-b border-neutral-800 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500/70" />
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-500/70" />
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500/70" />
                    </div>
                    <span className="text-[8px] sm:text-[9px] font-mono text-neutral-400 truncate max-w-[110px] sm:max-w-none">demo.yugark.in/{template.id}</span>
                    <span className="w-2 sm:w-4" />
                  </div>

                  {/* Image Preview with Hover Zoom */}
                  <div className="relative h-28 sm:h-52 overflow-hidden">
                    <img
                      src={template.previewImage}
                      alt={template.demoName || template.industry}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />

                    {/* "Demo Template" Badge */}
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 px-1.5 py-0.5 sm:px-2 rounded bg-black/80 backdrop-blur-md border border-[#D4B06A]/30 text-[8px] sm:text-[9px] uppercase font-bold tracking-wider text-[#D4B06A]">
                      {template.liveBadge || 'Demo'}
                    </div>

                    {/* Turnaround Pill */}
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 px-1.5 py-0.5 sm:px-2 rounded bg-[#0A0A0A]/90 text-[8px] sm:text-[9px] font-medium text-neutral-300 border border-neutral-700">
                      ⚡ 7-Day
                    </div>

                    {/* Interactive Overlay button on hover */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-center justify-center gap-2 p-4">
                      <button
                        onClick={() => navigate(`/templates/${template.id}`)}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#D4B06A] to-[#C9A35E] text-black font-bold text-xs flex items-center gap-1.5 shadow-xl hover:scale-105 transition-transform active:scale-95 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview Template</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-3 sm:p-6 flex-1 flex flex-col justify-between space-y-2.5 sm:space-y-4">
                  <div className="space-y-1.5 sm:space-y-2.5">
                    <div className="flex items-center gap-1.5 text-[#D4B06A]">
                      <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                      <span className="text-[9px] sm:text-[11px] uppercase font-bold tracking-wider text-[#D4B06A] truncate">
                        {template.industry}
                      </span>
                    </div>

                    <h3 className="text-xs sm:text-lg font-serif font-medium text-white group-hover:text-[#F0D28F] transition-colors leading-snug">
                      <Link to={`/templates/${template.id}`} className="hover:underline">
                        {template.demoName || `${template.industry} Template`}
                      </Link>
                    </h3>

                    <p className="text-[10px] sm:text-xs text-neutral-400 font-sans font-light line-clamp-2">
                      {template.tagline}
                    </p>
                  </div>

                  {/* Card Bottom: Price + Action Buttons */}
                  <div className="pt-2 sm:pt-3 border-t border-neutral-800/80 flex items-center justify-between gap-1.5 sm:gap-2">
                    <div>
                      <span className="block text-[8px] sm:text-[9px] uppercase tracking-wider text-neutral-500">
                        Package
                      </span>
                      <span className="text-xs sm:text-base font-serif font-bold text-[#F0D28F]">
                        From ₹9,999
                      </span>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-1.5">
                      <button
                        onClick={() => navigate(`/templates/${template.id}`)}
                        className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-[#141414]/90 border border-neutral-700 hover:border-[#D4B06A]/50 text-white text-[10px] sm:text-xs font-medium flex items-center gap-1 transition-all duration-200 hover:bg-[#1F1F1F] active:scale-95 cursor-pointer"
                      >
                        <Eye className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#D4B06A]" />
                        <span>View</span>
                      </button>

                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Radha%20Krishna%20Sir,%20I%20am%20interested%20in%20the%20${encodeURIComponent(template.industry)}%20Website%20Template.%20Please%20guide%20me.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-[#25D366] text-black hover:brightness-110 active:scale-95 transition-all"
                        title="Chat on WhatsApp"
                      >
                        <WhatsAppIcon className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="p-6 rounded-2xl bg-[#0E0E0E] border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-sm sm:text-base font-serif text-white font-medium">
              Don't See Your Specific Industry?
            </h4>
            <p className="text-xs text-neutral-400 font-sans">
              Founder Mr. Radha Krishna custom-architects bespoke web frameworks for any custom business model.
            </p>
          </div>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Radha%20Krishna%20Sir,%20I%20have%20a%20custom%20industry%20requirement%20for%20a%20new%20website.`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4B06A] to-[#C9A35E] text-black text-xs font-bold uppercase tracking-wider flex items-center gap-2 shrink-0 hover:brightness-110 transition-all shadow-md"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>Consult on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Interactive Modal */}
      <TemplatePreviewModal
        template={activeModalTemplate}
        isOpen={!!activeModalTemplate}
        onClose={() => setActiveModalTemplate(null)}
      />
    </section>
  );
}
