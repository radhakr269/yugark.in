import { useState, useMemo } from 'react';
import SEO from '../components/SEO';
import { PRICING_PACKAGES, INDIVIDUAL_SERVICES, PRICING_PLANS } from '../data';
import { Check, HelpCircle, Sparkles, Clock, Calculator, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import CTASection from '../components/CTASection';
import WhatsAppButton, { WHATSAPP_LINK, WhatsAppIcon } from '../components/WhatsAppButton';

export default function Pricing() {
  const [activeTab, setActiveTab] = useState<'packages' | 'individual' | 'calculator' | 'monthly'>('packages');

  // Calculator State
  const [selectedCalcServices, setSelectedCalcServices] = useState<string[]>([
    'calc-website',
    'calc-short-video'
  ]);

  const toggleCalcService = (serviceId: string) => {
    setSelectedCalcServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const calculatorTotal = useMemo(() => {
    return selectedCalcServices.reduce((sum, id) => {
      const item = INDIVIDUAL_SERVICES.find((s) => s.id === id);
      return sum + (item ? item.price : 0);
    }, 0);
  }, [selectedCalcServices]);

  const calculatorItemsList = useMemo(() => {
    return INDIVIDUAL_SERVICES.filter((s) => selectedCalcServices.includes(s.id));
  }, [selectedCalcServices]);

  const getCalculatorWhatsAppUrl = () => {
    const selectedNames = calculatorItemsList.map((i) => `${i.title} (₹${i.price.toLocaleString('en-IN')})`).join(', ');
    const message = `Hi Radha Krishna Sir, I used the YUGARK Project Calculator:%0A%0A*Selected Items:* ${selectedNames}%0A*Estimated Total:* ₹${calculatorTotal.toLocaleString('en-IN')}%0A%0APlease let me know how we can start!`;
    return `https://wa.me/919125205132?text=${message}`;
  };

  const faqs = [
    {
      q: 'How fast will my website be delivered?',
      a: 'Standard custom business websites (Package 1: ₹12,999) are built and launched in approximately 7 days. Bundles with promotional video reels are completed within 7 to 10 days.'
    },
    {
      q: 'What is included in the Grand Opening Launch Offer?',
      a: 'Our launch packages offer substantial discounts: Package 1 Website is ₹12,999 (Save ₹2,000), Package 2 (Website + 5 Reels) is ₹19,999 (Save ₹5,000), and Package 3 (Complete Content Kit) is ₹24,999 (Save ₹5,000).'
    },
    {
      q: 'Do you provide domain name, hosting and SSL?',
      a: 'Yes! We configure complete high-speed cloud hosting setup, custom domain mapping, and SSL certificate installation for zero-headache deployment.'
    },
    {
      q: 'How do short promotional videos / reels work?',
      a: 'We script, edit, and produce high-retention 15–30s reels tailored for Instagram and YouTube Shorts. We can use your existing raw video/photo assets, AI-generated visuals, or professional motion graphics.'
    },
    {
      q: 'What payment methods do you accept in India?',
      a: 'We accept all major Indian payment channels: UPI (Google Pay, PhonePe, Paytm, BHIM), IMPS/NEFT Net Banking, and Credit/Debit cards via Razorpay.'
    },
    {
      q: 'Can I choose individual single services without a full bundle?',
      a: 'Absolutely! Check our "Individual Services" tab or use the "Project Cost Calculator" to select standalone items like a single ₹3,000 Ad Video or a custom web build.'
    }
  ];

  return (
    <>
      <SEO 
        title="Pricing & Packages | YUGARK Digital Studio (₹ INR)" 
        description="Explore clear, transparent Indian Rupee (₹ INR) pricing for website development (₹12,999), short promotional video reels (₹3,000), and complete digital bundles." 
      />

      <main className="pt-32 pb-24 bg-[#050505]">
        {/* Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center space-y-6">
          <span className="font-sans text-xs uppercase tracking-[0.25em] font-bold text-[#D4B06A]">
            TRANSPARENT VALUE • FAST DELIVERY
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-white tracking-tight leading-[1.1]">
            Clear, Accessible Studio Pricing
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 font-sans font-light max-w-2xl mx-auto leading-relaxed">
            High-converting digital execution priced honestly in Indian Rupees (₹ INR). No hidden charges, no surprises.
          </p>

          {/* Grand Opening Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#121008] border border-[#D4B06A]/40 text-xs text-[#F0D28F] font-semibold shadow-xl">
            <Sparkles className="w-4 h-4 text-[#D4B06A]" />
            <span>Grand Opening Launch Offers Active • Limited Intake</span>
          </div>

          {/* Navigation Filter Tabs */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {[
              { id: 'packages', label: '🔥 Launch Packages (Best Value)' },
              { id: 'calculator', label: '🧮 Project Cost Calculator' },
              { id: 'individual', label: '📦 Individual Services' },
              { id: 'monthly', label: '🔄 Monthly Growth Retainers' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#D4B06A] text-black shadow-lg ring-2 ring-[#D4B06A]/30'
                    : 'bg-[#121212] text-neutral-400 hover:text-white border border-neutral-800 hover:border-[#D4B06A]/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {/* 1. Launch Packages Tab */}
        {activeTab === 'packages' && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {PRICING_PACKAGES.map((pkg) => {
                const savings = pkg.regularPrice - pkg.launchPrice;
                return (
                  <div
                    key={pkg.id}
                    className={`relative p-8 sm:p-10 rounded-3xl bg-[#0A0A0A] border flex flex-col justify-between transition-all duration-300 ${
                      pkg.isPopular
                        ? 'border-[#D4B06A] shadow-2xl gold-border-glow lg:-translate-y-2'
                        : 'border-neutral-800 hover:border-[#D4B06A]/40'
                    }`}
                  >
                    {pkg.isPopular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gold-gradient-bg text-black text-[10px] font-extrabold uppercase tracking-widest shadow-lg">
                        ⭐ {pkg.popularBadge || 'MOST POPULAR'}
                      </div>
                    )}

                    <div className="space-y-6">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4B06A] block mb-1">
                          {pkg.tagline}
                        </span>
                        <h3 className="font-serif text-2xl text-white font-bold tracking-wide">
                          {pkg.name}
                        </h3>
                      </div>

                      {/* Pricing Block */}
                      <div className="pt-4 border-t border-neutral-800 space-y-2">
                        <div className="flex items-baseline space-x-2">
                          <span className="font-serif text-4xl sm:text-5xl font-bold gold-gradient-text">
                            ₹{pkg.launchPrice.toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs text-neutral-500 line-through">
                            ₹{pkg.regularPrice.toLocaleString('en-IN')}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#D4B06A]/10 text-[#D4B06A] border border-[#D4B06A]/30">
                            Save ₹{savings.toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs text-neutral-400 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#D4B06A]" />
                            <span>{pkg.deliveryTime}</span>
                          </span>
                        </div>
                      </div>

                      {/* Features */}
                      <ul className="space-y-3 pt-4 border-t border-neutral-800 text-xs text-neutral-300">
                        {pkg.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start space-x-2.5">
                            <Check className="w-4 h-4 text-[#D4B06A] shrink-0 mt-0.5" />
                            <span className="leading-tight">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-8 space-y-3">
                      <Link
                        to={`/contact?bundle=${encodeURIComponent(pkg.name)}`}
                        className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider block text-center transition-all ${
                          pkg.isPopular
                            ? 'gold-gradient-bg text-black hover:brightness-110 shadow-lg'
                            : 'bg-[#141414] border border-neutral-700 text-white hover:border-[#D4B06A]'
                        }`}
                      >
                        {pkg.ctaText}
                      </Link>

                      <a
                        href={`https://wa.me/919125205132?text=${encodeURIComponent(`Hi Radha Krishna Sir, I want to book ${pkg.name} (Offer Price: ₹${pkg.launchPrice.toLocaleString('en-IN')}).`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 rounded-xl border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-black font-semibold text-xs tracking-wider flex items-center justify-center gap-2 transition-all"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5" />
                        <span>Book on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 2. Interactive Calculator Tab */}
        {activeTab === 'calculator' && (
          <section id="calculator" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
            <div className="p-8 sm:p-12 rounded-3xl bg-[#0A0A0A] border border-[#D4B06A]/30 shadow-2xl space-y-8 gold-border-glow">
              <div className="text-center space-y-2 border-b border-neutral-800 pb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121212] border border-[#D4B06A]/30 text-xs text-[#D4B06A] font-semibold">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>CUSTOM PROJECT ESTIMATOR</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-white">
                  Build Your Custom Project Scope
                </h2>
                <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto">
                  Select the exact services your business needs right now. Real-time transparent estimation.
                </p>
              </div>

              {/* Service Selection Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {INDIVIDUAL_SERVICES.map((item) => {
                  const isSelected = selectedCalcServices.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleCalcService(item.id)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                        isSelected
                          ? 'bg-[#14120C] border-[#D4B06A] shadow-md ring-1 ring-[#D4B06A]/40'
                          : 'bg-[#101010] border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800">
                            {item.category}
                          </span>
                          <h4 className="text-sm font-semibold text-white">
                            {item.title}
                          </h4>
                        </div>
                        <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                          {item.description}
                        </p>
                        <span className="text-[11px] text-[#A3916D] flex items-center gap-1 pt-1">
                          <Clock className="w-3 h-3 text-[#D4B06A]" />
                          <span>Delivery: {item.deliveryTime}</span>
                        </span>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-sm font-bold text-[#F0D28F] font-serif">
                          ₹{item.price.toLocaleString('en-IN')}
                        </div>
                        <div className={`mt-2 w-5 h-5 rounded-md border flex items-center justify-center ml-auto ${
                          isSelected ? 'bg-[#D4B06A] border-[#D4B06A] text-black' : 'border-neutral-700'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Estimate Summary Box */}
              <div className="p-6 rounded-2xl bg-[#121212] border border-[#D4B06A]/40 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-xs uppercase tracking-widest text-[#D4B06A] font-bold block">
                    Calculated Project Estimate ({selectedCalcServices.length} Selected)
                  </span>
                  <div className="font-serif text-3xl sm:text-4xl font-bold text-white">
                    ₹{calculatorTotal.toLocaleString('en-IN')}
                  </div>
                  <p className="text-xs text-neutral-400">
                    Includes responsive design, testing, indexing, and founder review.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                  <a
                    href={getCalculatorWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#25D366] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 shadow-lg"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>Inquire via WhatsApp</span>
                  </a>

                  <Link
                    to="/contact"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider block text-center"
                  >
                    Start Project
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 3. Individual Services Tab */}
        {activeTab === 'individual' && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 space-y-8">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <h2 className="font-serif text-3xl text-white">A La Carte Services</h2>
              <p className="text-xs sm:text-sm text-neutral-400">
                Need a specific deliverable? Pick standalone services with fixed timelines.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {INDIVIDUAL_SERVICES.map((item) => (
                <div
                  key={item.id}
                  className="p-7 rounded-2xl bg-[#0A0A0A] border border-neutral-800 hover:border-[#D4B06A]/40 transition-all flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#D4B06A]/10 text-[#D4B06A] border border-[#D4B06A]/20">
                        {item.category}
                      </span>
                      <span className="text-xs text-neutral-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#D4B06A]" />
                        <span>{item.deliveryTime}</span>
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-white">
                      {item.title}
                    </h3>

                    <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-900 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-neutral-500 uppercase block">Investment</span>
                      <span className="font-serif text-2xl font-bold gold-gradient-text">
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-neutral-400 block">{item.unit}</span>
                    </div>

                    <Link
                      to={`/contact?service=${encodeURIComponent(item.title)}`}
                      className="px-4 py-2 rounded-lg bg-[#141414] border border-neutral-700 hover:border-[#D4B06A] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      Book Service
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 4. Monthly Growth Retainers Tab */}
        {activeTab === 'monthly' && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
            <div className="text-center space-y-2 mb-12 max-w-2xl mx-auto">
              <span className="text-xs uppercase tracking-widest text-[#D4B06A] font-bold">MONTHLY PARTNERSHIPS</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white">Ongoing Growth & Management</h2>
              <p className="text-xs sm:text-sm text-neutral-400">
                Continuous content production, ad campaign management, and digital optimization.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {PRICING_PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={`p-8 rounded-3xl bg-[#0A0A0A] border flex flex-col justify-between space-y-6 ${
                    plan.isPopular ? 'border-[#D4B06A] gold-border-glow' : 'border-neutral-800'
                  }`}
                >
                  <div className="space-y-4">
                    <h3 className="font-serif text-2xl font-bold text-white">{plan.name}</h3>
                    <p className="text-xs text-neutral-400">{plan.tagline}</p>
                    <div className="font-serif text-4xl font-bold gold-gradient-text">
                      ₹{plan.monthlyPrice.toLocaleString('en-IN')}
                      <span className="text-xs text-neutral-400 font-sans"> / month</span>
                    </div>

                    <ul className="space-y-2.5 pt-4 border-t border-neutral-800 text-xs text-neutral-300">
                      {plan.features.map((f, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#D4B06A] shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to={`/contact?plan=${plan.id}`}
                    className="w-full py-3.5 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider block text-center"
                  >
                    Start Monthly Plan
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Guarantees Bar */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="p-6 rounded-2xl bg-[#0D0D0D] border border-neutral-800 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-[#D4B06A] shrink-0 mx-auto sm:mx-0" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase">Fast ~7 Day Turnaround</h4>
                <p className="text-[11px] text-neutral-400">Websites delivered on schedule.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#D4B06A] shrink-0 mx-auto sm:mx-0" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase">100% Code Ownership</h4>
                <p className="text-[11px] text-neutral-400">Complete source files and access.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <WhatsAppIcon className="w-6 h-6 text-[#25D366] shrink-0 mx-auto sm:mx-0" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase">WhatsApp Direct Support</h4>
                <p className="text-[11px] text-neutral-400">Direct founder communication.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-[#080808] border-t border-neutral-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#D4B06A] font-semibold">
                PRICING FAQS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-[#0D0D0D] border border-neutral-800 space-y-2">
                  <h3 className="font-serif text-base sm:text-lg text-white font-medium flex items-center space-x-2">
                    <HelpCircle className="w-4 h-4 text-[#D4B06A] shrink-0" />
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 pl-6 leading-relaxed font-sans font-light">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
        <WhatsAppButton />
      </main>
    </>
  );
}
