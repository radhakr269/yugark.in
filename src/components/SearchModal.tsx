import { useState, useEffect, useMemo, useRef, FormEvent } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  SERVICES_DATA, 
  PRICING_PACKAGES, 
  INDIVIDUAL_SERVICES, 
  CASE_STUDIES, 
  BLOG_POSTS, 
  PROCESS_STEPS, 
  BUSINESS_TEMPLATES 
} from '../data';
import { PHONE_NUMBER } from './WhatsAppButton';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResultItem {
  id: string;
  title: string;
  description: string;
  category: 'Services' | 'Pricing' | 'About' | 'Work' | 'Blog' | 'Process' | 'Templates' | 'Contact' | 'FAQ';
  link: string;
  tags?: string[];
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [inputValue, setInputValue] = useState('');
  const [executedQuery, setExecutedQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Reset state on open/close and lock/unlock body scroll
  useEffect(() => {
    if (isOpen) {
      setInputValue('');
      setExecutedQuery('');
      setActiveCategory('All');
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    document.body.style.overflow = 'unset';
    setInputValue('');
    setExecutedQuery('');
    onClose();
  };

  // Comprehensive indexable site items
  const allSearchableItems: SearchResultItem[] = useMemo(() => {
    const items: SearchResultItem[] = [];

    // 1. Pages
    items.push(
      {
        id: 'page-home',
        title: 'Home — YUGARK Digital Studio',
        description: 'Premium digital growth studio. Luxury custom websites, promotional short video reels, SEO, and strategic business systems in India.',
        category: 'Services',
        link: '/',
        tags: ['Home', 'Homepage', 'Main', 'Digital Agency', 'Studio'],
      },
      {
        id: 'page-services',
        title: 'All Services & Digital Blueprints',
        description: 'Explore all 6 core growth services: Website Engineering, AI & Short Promotional Video, Content Strategy, Social Media Management, Ads, and Growth Strategy.',
        category: 'Services',
        link: '/services',
        tags: ['Services', 'Solutions', 'Capabilities', 'Website', 'Video', 'Social Media', 'Ads'],
      },
      {
        id: 'page-pricing',
        title: 'Pricing & Custom Package Builder',
        description: 'Transparent pricing: Frontend Website at ₹9,999, Full Website at ₹14,999, Social Media Plans from ₹9,999/mo, and Interactive Calculator with duration discounts.',
        category: 'Pricing',
        link: '/pricing',
        tags: ['Pricing', 'Cost', 'Packages', 'Plans', 'Fees', 'Rates', 'Calculator', 'Offer', '₹9,999', '₹14,999', '₹19,999', 'Frontend', 'Fullstack'],
      },
      {
        id: 'page-templates',
        title: 'Website Templates Showcase (10 Industries)',
        description: 'Production-ready website templates for Restaurants, Gyms, Dental Clinics, Luxury Real Estate, Cafes, Salons, Law Firms, and E-commerce.',
        category: 'Templates',
        link: '/templates',
        tags: ['Templates', 'Demo', 'Demo Template', 'Restaurant', 'Gym', 'Fitness', 'Clinic', 'Dental', 'Real Estate', 'Cafe', 'Salon', 'Law', 'Ecommerce'],
      },
      {
        id: 'page-process',
        title: '6-Step Growth Methodology',
        description: 'How we build and launch: 1. Deep Intake, 2. Narrative Architecture, 3. Design & Motion, 4. Production, 5. Quality Assurance, 6. Launch & Scale.',
        category: 'Process',
        link: '/process',
        tags: ['Process', 'Workflow', 'Methodology', 'Timeline', 'Steps', 'How it works'],
      },
      {
        id: 'page-about',
        title: 'About YUGARK Digital Studio & Founder',
        description: 'Meet Founder Mr. Radha Krishna and learn about our mission to combine fast web development with high-impact video reels and digital growth.',
        category: 'About',
        link: '/about',
        tags: ['About', 'Founder', 'Radha Krishna', 'Mr. Radha Krishna', 'Mission', 'Vision', 'Values', 'Studio'],
      },
      {
        id: 'page-work',
        title: 'Work & Client Case Studies',
        description: 'Verified business results and case studies across real estate, healthcare, luxury hospitality, and specialty retail.',
        category: 'Work',
        link: '/work',
        tags: ['Work', 'Portfolio', 'Case Studies', 'Results', 'Projects', 'Clients'],
      },
      {
        id: 'page-contact',
        title: 'Contact & Project Inquiry',
        description: `Start your project directly with Founder Mr. Radha Krishna. Email: business@yugark.in | Phone/WhatsApp: +91 ${PHONE_NUMBER}`,
        category: 'Contact',
        link: '/contact',
        tags: ['Contact', 'Inquiry', 'Hire', 'Email', 'Phone', 'WhatsApp', 'Quote', 'Start Project'],
      }
    );

    // 2. Services
    SERVICES_DATA.forEach((s) => {
      items.push({
        id: `service-${s.id}`,
        title: `${s.title} (${s.priceDisplay || s.modelType})`,
        description: `${s.shortDesc} ${s.fullDescription || ''}`,
        category: 'Services',
        link: s.link,
        tags: [...s.features, s.modelType, s.category, s.title, 'Service', 'Development', 'Video', 'Marketing'],
      });
    });

    // 3. Pricing Packages
    PRICING_PACKAGES.forEach((p) => {
      items.push({
        id: `pricing-${p.id}`,
        title: `${p.name} (Launch Offer: ₹${p.launchPrice.toLocaleString('en-IN')})`,
        description: `${p.tagline} | Timeline: ${p.deliveryTime} | Includes: ${p.features.join(', ')}`,
        category: 'Pricing',
        link: '/pricing',
        tags: ['Pricing', 'Cost', 'INR', 'Package', p.name, 'Launch Offer', 'Grand Opening', 'Discount'],
      });
    });

    // 4. Individual Services & Calculator
    INDIVIDUAL_SERVICES.forEach((item) => {
      items.push({
        id: `calc-${item.id}`,
        title: `${item.title} (₹${item.price.toLocaleString('en-IN')} ${item.unit})`,
        description: `${item.description} | Delivery: ${item.deliveryTime}`,
        category: 'Pricing',
        link: '/pricing#calculator',
        tags: ['Calculator', 'A la carte', 'Single Service', item.title, 'Pricing', 'Cost'],
      });
    });

    // 5. Business Templates (10 Industries)
    BUSINESS_TEMPLATES.forEach((tpl) => {
      items.push({
        id: `template-${tpl.id}`,
        title: `Template: ${tpl.industry} (${tpl.demoName || 'Demo'})`,
        description: `${tpl.tagline} | Deliverables: ${tpl.websiteIncludes.join(', ')} | Launch Offer: ₹12,999`,
        category: 'Templates',
        link: `/templates/${tpl.id}`,
        tags: [
          tpl.industry, 
          tpl.demoName || '', 
          'Template', 
          'Demo Template', 
          'Website Template', 
          '₹12,999',
          'Restaurant',
          'Gym',
          'Fitness',
          'Healthcare',
          'Dental',
          'Real Estate',
          'Cafe',
          'Salon',
          'Law'
        ],
      });
    });

    // 6. About & Founder
    items.push(
      {
        id: 'about-founder-radhakrishna',
        title: 'Founder — Mr. Radha Krishna',
        description: 'Mr. Radha Krishna is the Founder of YUGARK Digital Studio, directing web engineering, short-form video storytelling, and digital acquisition roadmaps across India.',
        category: 'About',
        link: '/about',
        tags: ['Founder', 'Radha Krishna', 'Mr. Radha Krishna', 'Leadership', 'Founder Profile', 'Biography'],
      }
    );

    // 7. Case Studies
    CASE_STUDIES.forEach((c) => {
      items.push({
        id: `work-${c.id}`,
        title: `Case Study: ${c.title} (${c.client})`,
        description: `${c.summary} Results: ${c.results.map(r => `${r.value} ${r.label}`).join(', ')}`,
        category: 'Work',
        link: '/work',
        tags: [c.industry, c.client, ...c.technology, 'Case Study', 'Client Work', 'Portfolio'],
      });
    });

    // 8. Blog Posts
    BLOG_POSTS.forEach((b) => {
      items.push({
        id: `blog-${b.id}`,
        title: b.title,
        description: b.excerpt,
        category: 'Blog',
        link: '/blog',
        tags: [b.category, b.author, 'Blog', 'Article', 'Insights'],
      });
    });

    // 9. 6-Step Process
    PROCESS_STEPS.forEach((pr) => {
      items.push({
        id: `process-${pr.number}`,
        title: `Process Step ${pr.number}: ${pr.title}`,
        description: `${pr.shortDesc} ${pr.details}`,
        category: 'Process',
        link: '/process',
        tags: ['Process', 'Methodology', 'Workflow', '6 Steps', 'How we work', `Step ${pr.number}`],
      });
    });

    // 10. FAQs
    items.push(
      {
        id: 'faq-delivery-time',
        title: 'FAQ: How fast will my website be delivered?',
        description: 'Standard custom websites are delivered in ~7 days with full responsiveness, SEO optimization, and direct WhatsApp routing.',
        category: 'FAQ',
        link: '/pricing#faq',
        tags: ['Timeline', 'Delivery', '7 Days', 'Speed', 'FAQ'],
      },
      {
        id: 'faq-video-production',
        title: 'FAQ: How are promotional short videos produced?',
        description: 'We script, edit, and produce high-retention 15–30s reels tailored for Instagram, YouTube Shorts, and paid Meta ads.',
        category: 'FAQ',
        link: '/pricing#faq',
        tags: ['Video', 'Reels', 'Shorts', 'Promotional Video', 'FAQ'],
      },
      {
        id: 'faq-launch-offer',
        title: 'FAQ: What are the Grand Opening launch prices?',
        description: 'Package 1 Website: ₹12,999 (Regular ₹14,999) | Package 2 Website + 5 Reels: ₹19,999 | Package 3 Content Bundle: ₹24,999.',
        category: 'FAQ',
        link: '/pricing',
        tags: ['Pricing', 'Cost', 'Launch Offer', 'Discount', 'INR', 'FAQ'],
      }
    );

    return items;
  }, []);

  // Use either active typed input or explicitly submitted search
  const effectiveQuery = (executedQuery || inputValue).trim().toLowerCase();

  // Filtered results
  const filteredResults = useMemo(() => {
    if (!effectiveQuery) return [];

    const searchWords = effectiveQuery.split(/\s+/).filter(Boolean);

    return allSearchableItems.filter((item) => {
      const matchesCategory =
        activeCategory === 'All' || item.category === activeCategory;

      const titleLower = item.title.toLowerCase();
      const descLower = item.description.toLowerCase();
      const tagsLower = (item.tags || []).map((t) => t.toLowerCase());

      // Check if all search words match in title, description, or tags
      const matchesAllWords = searchWords.every((word) => {
        return (
          titleLower.includes(word) ||
          descLower.includes(word) ||
          tagsLower.some((t) => t.includes(word))
        );
      });

      return matchesCategory && matchesAllWords;
    });
  }, [effectiveQuery, activeCategory, allSearchableItems]);

  const handleSearchSubmit = (e?: FormEvent) => {
    if (e) e.preventDefault();
    setExecutedQuery(inputValue);
  };

  const handleSelectResult = (link: string) => {
    handleClose();
    if (link.startsWith('http')) {
      window.open(link, '_blank', 'noopener,noreferrer');
      return;
    }

    if (link.includes('#')) {
      const [path, hash] = link.split('#');
      navigate(path || '/');
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    } else {
      navigate(link);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-3 sm:px-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200"
        onClick={(e) => {
          if (e.target === e.currentTarget) handleClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.98 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="relative w-full max-w-2xl bg-[#0A0A0A]/92 backdrop-blur-2xl border border-[#D4B06A]/35 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(212,176,106,0.15)] overflow-hidden flex flex-col max-h-[85vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Header with Form, Search Button, and Clear Close Button */}
          <form 
            onSubmit={handleSearchSubmit}
            className="relative flex items-center gap-2 px-3 sm:px-5 py-3.5 border-b border-[#D4B06A]/20 bg-[#0F0F0F]/85 backdrop-blur-md"
          >
            <Search className="w-5 h-5 text-[#D4B06A] shrink-0 ml-1" />
            
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                // Also update live search query for instant responsiveness
                setExecutedQuery(e.target.value);
              }}
              placeholder="Type keyword (e.g., website, video, pricing, restaurant, gym...)"
              className="w-full bg-transparent text-white text-sm sm:text-base placeholder-neutral-500 focus:outline-none font-sans py-1"
            />

            {inputValue && (
              <button
                type="button"
                onClick={() => {
                  setInputValue('');
                  setExecutedQuery('');
                  inputRef.current?.focus();
                }}
                className="text-neutral-400 hover:text-white p-1 text-xs uppercase font-medium shrink-0 active:scale-95"
                title="Clear input"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Explicit SEARCH Button */}
            <button
              type="submit"
              className="px-3.5 sm:px-4 py-2 rounded-xl gold-gradient-bg gold-gradient-bg-hover text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shrink-0 shadow-md active:scale-95 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Search</span>
            </button>

            {/* Visible & Clickable CLOSE Button */}
            <button
              type="button"
              onClick={handleClose}
              className="px-3 py-2 text-neutral-300 hover:text-white bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700/80 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shrink-0 transition-all active:scale-95 cursor-pointer"
              aria-label="Close search interface"
            >
              <X className="w-4 h-4 text-[#D4B06A]" />
              <span className="hidden sm:inline">Close</span>
            </button>
          </form>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 border-b border-neutral-900 overflow-x-auto no-scrollbar bg-[#080808]/90">
            {['All', 'Services', 'Pricing', 'Templates', 'About', 'Work', 'Process', 'FAQ'].map(
              (cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#D4B06A] text-black font-bold shadow-[0_0_12px_rgba(212,176,106,0.35)]'
                      : 'text-neutral-400 hover:text-white bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  {cat}
                </button>
              )
            )}
          </div>

          {/* Results Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
            {!effectiveQuery ? (
              <div className="text-center py-8 sm:py-10 space-y-3">
                <Sparkles className="w-8 h-8 text-[#D4B06A] mx-auto opacity-60 animate-pulse" />
                <p className="text-sm text-neutral-200 font-medium">
                  Search pages, services, pricing, templates, process & leadership
                </p>
                <div className="flex flex-wrap justify-center gap-2 pt-2 max-w-lg mx-auto">
                  {[
                    'website',
                    'video',
                    'pricing',
                    'restaurant',
                    'gym',
                    'process',
                    'contact',
                    'services',
                    'templates',
                    'founder',
                  ].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => {
                        setInputValue(preset);
                        setExecutedQuery(preset);
                      }}
                      className="text-xs text-[#D4B06A] bg-[#14120C]/90 border border-[#D4B06A]/25 px-3 py-1 rounded-lg hover:bg-[#D4B06A]/20 hover:border-[#D4B06A]/50 transition-all capitalize font-medium cursor-pointer active:scale-95"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            ) : filteredResults.length === 0 ? (
              <div className="text-center py-10 space-y-2">
                <p className="text-base text-neutral-200 font-medium">
                  No matching results for "{inputValue || executedQuery}"
                </p>
                <p className="text-xs text-neutral-400">
                  Try searching for "website", "video", "pricing", "restaurant", "gym", "process", or "founder".
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between pb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#D4B06A]">
                    {filteredResults.length} Result{filteredResults.length > 1 ? 's' : ''} Found
                  </span>
                  <span className="text-[11px] text-neutral-400">
                    Click result to navigate
                  </span>
                </div>

                {filteredResults.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectResult(item.link)}
                    className="group p-3.5 sm:p-4 bg-[#0F0F0F]/80 hover:bg-[#161616]/95 border border-neutral-800/80 hover:border-[#D4B06A]/45 rounded-xl cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex items-start justify-between gap-3 sm:gap-4"
                  >
                    <div className="space-y-1 text-left">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#D4B06A]/10 text-[#D4B06A] border border-[#D4B06A]/20">
                          {item.category}
                        </span>
                        <h4 className="text-sm font-semibold text-white group-hover:text-[#F0D28F] transition-colors">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed font-sans">
                        {item.description}
                      </p>
                    </div>

                    <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-[#D4B06A] group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-4 sm:px-6 py-2.5 bg-[#080808]/90 border-t border-neutral-900 text-[11px] text-neutral-400 flex justify-between items-center">
            <span>YUGARK Digital Studio Search</span>
            <div className="flex items-center gap-2">
              <button 
                type="button" 
                onClick={handleClose} 
                className="text-[#D4B06A] hover:underline font-semibold cursor-pointer"
              >
                Close (ESC)
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
