import { useState, useEffect } from 'react';
import { X, ExternalLink, Smartphone, Monitor, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BusinessTemplate } from '../types';
import { WHATSAPP_NUMBER, WhatsAppIcon } from './WhatsAppButton';

interface TemplatePreviewModalProps {
  template: BusinessTemplate | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TemplatePreviewModal({
  template,
  isOpen,
  onClose,
}: TemplatePreviewModalProps) {
  const [deviceView, setDeviceView] = useState<'desktop' | 'mobile'>('desktop');

  // ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  if (!isOpen || !template) return null;

  const orderWhatsAppUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Radha%20Krishna%20Sir,%20I%20am%20interested%20in%20the%20${encodeURIComponent(template.industry)}%20Website%20Template%20(Launch%20Offer%20₹12,999).%20Please%20share%20next%20steps!`;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-5xl bg-[#090909] border border-[#D4B06A]/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] gold-border-glow"
        >
          {/* Top Modal Header Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 bg-[#0F0F0F] border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 rounded-full bg-[#D4B06A]/10 text-[#D4B06A] border border-[#D4B06A]/30 text-[10px] uppercase font-bold tracking-wider">
                {template.liveBadge || 'Demo Template'}
              </span>
              <div>
                <h3 className="text-base sm:text-lg font-serif text-white font-medium">
                  {template.demoName || `${template.industry} Website Template`}
                </h3>
                <span className="text-xs text-neutral-400 font-sans hidden sm:inline">
                  {template.industry} • Category Architecture
                </span>
              </div>
            </div>

            {/* View Switcher & Close */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden sm:flex items-center bg-black/60 rounded-lg p-1 border border-neutral-800">
                <button
                  onClick={() => setDeviceView('desktop')}
                  className={`p-1.5 rounded-md text-xs flex items-center gap-1.5 transition-colors ${
                    deviceView === 'desktop'
                      ? 'bg-[#D4B06A] text-black font-semibold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                  title="Desktop Preview"
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span className="text-[11px]">Desktop</span>
                </button>

                <button
                  onClick={() => setDeviceView('mobile')}
                  className={`p-1.5 rounded-md text-xs flex items-center gap-1.5 transition-colors ${
                    deviceView === 'mobile'
                      ? 'bg-[#D4B06A] text-black font-semibold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                  title="Mobile Preview"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span className="text-[11px]">Mobile</span>
                </button>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Main Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left/Main Column: Visual Mockup Screen */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div
                className={`w-full transition-all duration-300 ${
                  deviceView === 'mobile' ? 'max-w-[320px]' : 'max-w-full'
                }`}
              >
                {/* Browser / Device Chrome */}
                <div className="bg-[#151515] border border-neutral-700 rounded-t-xl px-3 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <div className="text-[10px] text-neutral-400 font-mono bg-black/40 px-3 py-0.5 rounded-md truncate max-w-[200px]">
                    https://templates.yugark.in/demo/{template.id}
                  </div>
                  <div className="w-8" />
                </div>

                {/* Simulated Webpage Canvas */}
                <div className="relative bg-[#050505] border-x border-b border-neutral-700 rounded-b-xl overflow-hidden shadow-2xl">
                  {/* Hero Canvas Image */}
                  <div className="relative h-64 sm:h-72 overflow-hidden group">
                    <img
                      src={template.previewImage}
                      alt={template.demoName || template.industry}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />

                    {/* Watermark Tag */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md text-[10px] uppercase tracking-wider text-[#F0D28F] border border-[#D4B06A]/30">
                      ⚡ YUGARK Interactive Demo
                    </div>

                    {/* Headline Overlay inside simulation */}
                    <div className="absolute bottom-4 left-4 right-4 space-y-1 text-left">
                      <span className="text-[9px] uppercase tracking-widest text-[#D4B06A] font-bold">
                        {template.industry} PREVIEW
                      </span>
                      <h4 className="text-lg sm:text-xl font-serif font-bold text-white leading-tight">
                        {template.demoName}
                      </h4>
                      <p className="text-[11px] text-neutral-300 line-clamp-2">
                        {template.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Simulated Inclusions Preview Bar */}
                  <div className="p-4 bg-[#0A0A0A] border-t border-neutral-800 space-y-2">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-neutral-400">
                      Sample Blueprint Sections:
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-neutral-300">
                      {template.websiteIncludes.slice(0, 4).map((inc, i) => (
                        <div key={i} className="flex items-center gap-1.5 truncate">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#D4B06A] shrink-0" />
                          <span className="truncate">{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Template Specifications & Order Action */}
            <div className="lg:col-span-5 space-y-5 text-left">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-[#D4B06A] uppercase tracking-widest">
                  Template Specifications
                </span>
                <h4 className="text-xl sm:text-2xl font-serif text-white font-medium">
                  {template.demoName || `${template.industry} System`}
                </h4>
                <p className="text-xs text-neutral-300 leading-relaxed font-sans font-light">
                  {template.tagline}
                </p>
              </div>

              {/* Price & Delivery Badge */}
              <div className="p-4 rounded-xl bg-[#121212] border border-[#D4B06A]/30 flex items-center justify-between">
                <div>
                  <span className="block text-[10px] text-neutral-400 uppercase font-medium">
                    Grand Opening Price
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-serif font-bold text-[#F0D28F]">
                      ₹12,999
                    </span>
                    <span className="text-xs text-neutral-500 line-through">
                      ₹14,999
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] text-neutral-400 uppercase font-medium">
                    Turnaround
                  </span>
                  <span className="text-xs font-semibold text-white">
                    ~7 Days Delivery
                  </span>
                </div>
              </div>

              {/* Inclusions List */}
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-400">
                  What You Receive With This Template:
                </span>
                <ul className="space-y-1.5 text-xs text-neutral-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366] shrink-0 mt-0.5" />
                    <span>Tailored to your specific brand, colors, logo, and menu/services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366] shrink-0 mt-0.5" />
                    <span>Direct WhatsApp & Call lead capture routing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366] shrink-0 mt-0.5" />
                    <span>Mobile-first responsive layout & sub-second loading</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366] shrink-0 mt-0.5" />
                    <span>Google SEO structure & Search Console indexing setup</span>
                  </li>
                </ul>
              </div>

              {/* Call to action buttons */}
              <div className="space-y-2.5 pt-2">
                <a
                  href={orderWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-[#25D366] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-98 transition-all"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Order This Template (₹12,999)</span>
                </a>

                <button
                  onClick={() => {
                    onClose();
                    window.location.href = `/contact?template=${template.id}`;
                  }}
                  className="w-full py-3 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-[#D4B06A]/50 text-white font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Request Custom Modifications</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4B06A]" />
                </button>
              </div>
            </div>

          </div>

          {/* Footer note */}
          <div className="px-6 py-3 bg-[#060606] border-t border-neutral-800 text-[11px] text-neutral-500 flex items-center justify-between">
            <span>YUGARK Digital Studio • Demo Architecture</span>
            <span>All templates custom-coded with React & Tailwind</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
