import { useState } from 'react';
import SEO from '../components/SEO';
import { SERVICES_DATA, ONE_TIME_SERVICES, MONTHLY_SERVICES, BUSINESS_TEMPLATES } from '../data';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Globe, BarChart3, Bot, Megaphone, PenTool, Compass, Sparkles, Clock, Tag, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import CTASection from '../components/CTASection';
import WhatsAppButton, { WHATSAPP_LINK, WhatsAppIcon } from '../components/WhatsAppButton';

const iconMap: Record<string, any> = {
  Globe,
  BarChart3,
  Bot,
  Megaphone,
  PenTool,
  Compass
};

export default function Services() {
  const [activeTab, setActiveTab] = useState<'all' | 'one-time' | 'monthly' | 'templates'>('all');

  const filteredServices = activeTab === 'one-time' 
    ? ONE_TIME_SERVICES 
    : activeTab === 'monthly' 
    ? MONTHLY_SERVICES 
    : SERVICES_DATA;

  return (
    <>
      <SEO 
        title="Services — YUGARK Digital Studio | Web Development & Content Creation" 
        description="Explore YUGARK Digital Studio's fixed-cost one-time services (Website ₹12,999, Short Video ₹3,000) and monthly growth retainers. Built for Indian businesses."
      />

      <main className="pt-32 pb-24 bg-[#050505]">
        {/* Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center space-y-6">
          <span className="font-sans text-xs uppercase tracking-[0.25em] font-bold text-[#D4B06A]">
            YUGARK DIGITAL STUDIO CAPABILITIES
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.1]">
            Services built to move your business forward.
          </h1>
          <p className="text-base sm:text-xl text-neutral-300 font-sans font-light max-w-3xl mx-auto leading-relaxed">
            Choose fast fixed-cost one-time deliverables (websites & promotional video content) or comprehensive monthly growth management.
          </p>

          {/* Navigation Filter Tabs */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'one-time', label: 'One-Time Services (Fixed Cost)' },
              { id: 'monthly', label: 'Monthly Growth Retainers' },
              { id: 'templates', label: 'Industry Blueprints' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#D4B06A] text-black shadow-lg'
                    : 'bg-[#121212] text-neutral-400 hover:text-white border border-neutral-800 hover:border-[#D4B06A]/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {/* Industry Blueprints View */}
        {activeTab === 'templates' && (
          <section id="templates" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 space-y-12">
            <div className="text-center space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#D4B06A] font-bold">Tailored Growth Frameworks</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white">Custom Blueprints by Industry</h2>
              <p className="text-sm text-neutral-400 max-w-2xl mx-auto">
                Pre-configured web architecture, video hooks, and WhatsApp conversion workflows optimized for your sector.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {BUSINESS_TEMPLATES.map((item) => (
                <div
                  key={item.id}
                  className="p-7 rounded-2xl bg-[#0A0A0A] border border-neutral-800 hover:border-[#D4B06A]/40 transition-all space-y-5 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#D4B06A] px-3 py-1 bg-[#D4B06A]/10 border border-[#D4B06A]/20 rounded-lg">
                        {item.industry}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl text-white group-hover:text-[#F0D28F] transition-colors">
                      {item.tagline}
                    </h3>

                    <p className="text-xs text-neutral-300 leading-relaxed font-sans font-light">
                      <strong className="text-white font-medium">Growth Focus:</strong> {item.growthFocus}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-neutral-900">
                      <p className="text-[11px] uppercase tracking-wider font-semibold text-neutral-400">Included In Blueprint:</p>
                      <ul className="space-y-1.5 text-xs text-neutral-300">
                        {item.websiteIncludes.map((d, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2">
                            <span className="text-[#D4B06A]">✓</span>
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D4B06A] hover:underline"
                    >
                      <span>Request This Blueprint</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <a
                      href={`https://wa.me/919125205132?text=Hi%20Radha%20Krishna%20Sir,%20I%20am%20interested%20in%20the%20${encodeURIComponent(item.industry)}%20Blueprint.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-[#128C7E]/20 text-[#25D366] hover:bg-[#25D366] hover:text-black transition-colors"
                      title="Ask on WhatsApp"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Detailed Service Cards List */}
        {activeTab !== 'templates' && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            <AnimatePresence>
              {filteredServices.map((service, index) => {
                const IconComponent = iconMap[service.iconName] || Globe;
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    id={service.id}
                    className="p-8 sm:p-12 rounded-3xl bg-[#0A0A0A] border border-white/10 hover:border-[#D4B06A]/40 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl gold-border-glow"
                  >
                    {/* Text Content */}
                    <div className={`lg:col-span-7 space-y-6 ${isEven ? '' : 'lg:order-2'}`}>
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-[#141414] border border-[#D4B06A]/30 text-[#F0D28F] text-xs font-semibold uppercase tracking-wider">
                          <IconComponent className="w-4 h-4" />
                          <span>{service.modelType}</span>
                        </div>

                        {service.priceDisplay && (
                          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-[#D4B06A]/10 border border-[#D4B06A]/40 text-[#D4B06A] text-xs font-bold">
                            <Tag className="w-3.5 h-3.5" />
                            <span>{service.priceDisplay}</span>
                          </div>
                        )}

                        {service.deliveryTime && (
                          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 text-xs">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{service.deliveryTime}</span>
                          </div>
                        )}
                      </div>

                      <h2 className="font-serif text-3xl sm:text-4xl text-white">
                        {service.title}
                      </h2>

                      <p className="text-neutral-300 text-base leading-relaxed font-sans font-light">
                        {service.fullDescription}
                      </p>

                      <div className="space-y-3">
                        <h4 className="text-xs uppercase tracking-wider text-[#D4B06A] font-semibold">Key Deliverables:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                          {service.deliverables?.map((del, dIdx) => (
                            <div key={dIdx} className="flex items-center space-x-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#D4B06A] shrink-0" />
                              <span>{del}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 flex flex-wrap items-center gap-4">
                        <Link
                          to={service.link}
                          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl gold-gradient-bg text-black font-semibold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-md"
                        >
                          <span>Service Details</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>

                        <Link
                          to="/contact"
                          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#141414] border border-white/10 text-white font-medium text-xs uppercase tracking-wider hover:border-[#D4B06A] transition-all"
                        >
                          <span>Start This Service</span>
                        </Link>

                        <a
                          href={`${WHATSAPP_LINK}&text=Hi%20Radha%20Krishna%20Sir,%20I%20have%20an%20inquiry%20regarding%20${encodeURIComponent(service.title)}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 px-4 py-3 rounded-xl bg-[#128C7E]/20 border border-[#25D366]/30 text-[#25D366] font-medium text-xs uppercase tracking-wider hover:bg-[#25D366] hover:text-black transition-all"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>

                    {/* Visual Feature Card */}
                    <div className={`lg:col-span-5 p-8 rounded-2xl bg-[#0F0F0F] border border-white/5 space-y-6 ${isEven ? '' : 'lg:order-1'}`}>
                      <div className="flex items-center space-x-2 text-[#D4B06A] text-xs uppercase tracking-wider font-semibold">
                        <Sparkles className="w-4 h-4" />
                        <span>Strategic Business Benefits</span>
                      </div>

                      <ul className="space-y-4">
                        {service.benefits?.map((benefit, bIdx) => (
                          <li key={bIdx} className="flex items-start space-x-3 text-sm text-neutral-200">
                            <span className="text-[#D4B06A] font-bold mt-1">✓</span>
                            <span className="leading-snug">{benefit}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-neutral-400">
                        <span>Direct Founder Oversight</span>
                        <span className="text-[#D4B06A] font-medium">Mr. Radha Krishna</span>
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </section>
        )}

        {/* CTA */}
        <div className="mt-20">
          <CTASection />
        </div>

        <WhatsAppButton />
      </main>
    </>
  );
}
