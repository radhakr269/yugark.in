import { useState, FormEvent } from 'react';
import { Send, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';
import { ContactFormData } from '../types';
import { submitLead } from '../lib/api';
import { addEnquiry } from '../lib/enquiryStore';
import { WhatsAppIcon } from './WhatsAppButton';

interface ContactFormProps {
  defaultService?: string;
  defaultBundle?: string;
  pageSource?: string;
  formSource?: string;
}

export default function ContactForm({
  defaultService = 'Website Development',
  defaultBundle = 'Package 1 — Website Development',
  pageSource = 'Contact Page',
  formSource = 'Project Inquiry Form'
}: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    businessName: '',
    businessCategory: 'Restaurant & Café',
    otherCategory: '',
    selectedService: defaultService,
    selectedBundle: defaultBundle,
    projectRequirement: '',
    remarks: '',
    pageSource,
    formSource,
    website_url_hp: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEnquiryId, setSubmittedEnquiryId] = useState<string>('');
  const [serverError, setServerError] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const businessCategories = [
    'Restaurant & Café',
    'Gym & Fitness',
    'Real Estate',
    'Healthcare & Clinic',
    'Coaching & Education',
    'E-commerce & Retail',
    'Salon & Beauty',
    'Hotel & Hospitality',
    'Corporate & B2B',
    'Local Business / Other'
  ];

  const bundleOptions = [
    'Package 1 — Website Development (₹12,999 / ~7 Days)',
    'Package 2 — Website + 5 Reels Bundle (₹19,999)',
    'Package 3 — Website + Complete Content (₹24,999)',
    'Short Advertisement Video (₹3,000 / ~7 Days)',
    'Long-Form Brand Video (₹5,000 / ~15 Days)',
    'Monthly Social Media Management',
    'Custom Project / Consultation'
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone / WhatsApp number is required';
    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
    if (!formData.projectRequirement.trim()) newErrors.projectRequirement = 'Please describe your requirement or goal';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;

    setIsLoading(true);

    try {
      const response = await submitLead({
        ...formData,
        pageSource: typeof window !== 'undefined' ? `${window.location.pathname} (${pageSource})` : pageSource,
        formSource
      });

      if (response.success && response.leadId) {
        setSubmittedEnquiryId(response.leadId);
        // Also update local store for instant client cache
        try {
          addEnquiry({
            ...formData,
            pageSource,
            formSource
          });
        } catch {
          // ignore
        }
        setIsLoading(false);
        setIsSubmitted(true);
      } else {
        if (response.errors) {
          setErrors(response.errors);
        }
        setServerError(response.error || 'Failed to submit enquiry. Please try again.');
        setIsLoading(false);
      }
    } catch (err: any) {
      console.error('Submission error', err);
      // Fallback
      const record = addEnquiry(formData);
      setSubmittedEnquiryId(record.id);
      setIsLoading(false);
      setIsSubmitted(true);
    }
  };

  const generateWhatsAppMessage = () => {
    const text = `Hi Radha Krishna Sir, I submitted project inquiry #${submittedEnquiryId || 'NEW'} on YUGARK Digital Studio.%0A%0A*Name:* ${formData.fullName}%0A*Business:* ${formData.businessName} (${formData.businessCategory})%0A*Package:* ${formData.selectedBundle}%0A*Requirements:* ${formData.projectRequirement}%0A%0APlease let me know the next steps!`;
    return `https://wa.me/919125205132?text=${text}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl bg-[#090909] border border-[#D4B06A]/20 shadow-2xl gold-border-glow relative overflow-hidden">
      
      {isSubmitted ? (
        <div className="text-center py-16 space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-[#D4B06A]/20 border border-[#D4B06A] flex items-center justify-center text-[#F0D28F] animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="inline-block px-3 py-1 rounded-full bg-[#121212] border border-[#D4B06A]/30 text-xs text-[#D4B06A] uppercase tracking-wider font-semibold">
            Inquiry Ref: {submittedEnquiryId}
          </span>

          <h3 className="font-serif text-3xl sm:text-4xl text-white font-medium">
            Project Inquiry Received
          </h3>

          <p className="text-neutral-300 max-w-xl mx-auto text-base leading-relaxed font-sans font-light">
            Thank you, <span className="text-[#F0D28F] font-semibold">{formData.fullName}</span>. Founder <span className="text-white font-medium">Mr. Radha Krishna</span> and the YUGARK team will review your requirements for <span className="text-white font-medium">{formData.businessName}</span> and contact you within 24 hours.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={generateWhatsAppMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1ebd59] text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Message on WhatsApp Now</span>
            </a>

            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  fullName: '',
                  email: '',
                  phone: '',
                  businessName: '',
                  businessCategory: 'Restaurant & Café',
                  otherCategory: '',
                  selectedService: defaultService,
                  selectedBundle: defaultBundle,
                  projectRequirement: '',
                  remarks: ''
                });
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#141414] border border-white/10 text-neutral-300 hover:text-white hover:border-[#D4B06A] font-semibold text-xs uppercase tracking-wider transition-all"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="space-y-2 border-b border-neutral-800 pb-6">
            <div className="flex items-center gap-2 text-[#D4B06A] text-xs font-semibold uppercase tracking-[0.25em]">
              <Sparkles className="w-3.5 h-3.5 text-[#F0D28F]" />
              <span>START YOUR PROJECT</span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl text-white font-medium">
              Tell us about your business goals.
            </h3>
            <p className="text-xs text-neutral-400 font-sans">
              Fill in your project requirements below. Founder Mr. Radha Krishna will review your inquiry and provide a tailored plan.
            </p>
          </div>

          {/* Hidden Honeypot Field for anti-bot spam protection */}
          <div className="hidden absolute -left-[9999px]" aria-hidden="true">
            <input
              type="text"
              name="website_url_hp"
              value={formData.website_url_hp || ''}
              onChange={(e) => setFormData({ ...formData, website_url_hp: e.target.value })}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {serverError && (
            <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/80 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{serverError}</span>
            </div>
          )}

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-300 mb-2 font-medium">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Vikram Sharma"
                className={`w-full px-4 py-3.5 bg-[#121212] border rounded-xl text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors ${
                  errors.fullName ? 'border-red-500' : 'border-neutral-800 focus:border-[#D4B06A]'
                }`}
              />
              {errors.fullName && <p className="text-xs text-red-400 mt-1">{errors.fullName}</p>}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-300 mb-2 font-medium">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="business@company.in"
                className={`w-full px-4 py-3.5 bg-[#121212] border rounded-xl text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors ${
                  errors.email ? 'border-red-500' : 'border-neutral-800 focus:border-[#D4B06A]'
                }`}
              />
              {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-300 mb-2 font-medium">
                Phone / WhatsApp Number *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 92359 00875"
                className={`w-full px-4 py-3.5 bg-[#121212] border rounded-xl text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors ${
                  errors.phone ? 'border-red-500' : 'border-neutral-800 focus:border-[#D4B06A]'
                }`}
              />
              {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
            </div>

            {/* Business Name */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-300 mb-2 font-medium">
                Business / Brand Name *
              </label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                placeholder="e.g. SpiceCraft Bistro"
                className={`w-full px-4 py-3.5 bg-[#121212] border rounded-xl text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors ${
                  errors.businessName ? 'border-red-500' : 'border-neutral-800 focus:border-[#D4B06A]'
                }`}
              />
              {errors.businessName && <p className="text-xs text-red-400 mt-1">{errors.businessName}</p>}
            </div>

            {/* Business Category */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-300 mb-2 font-medium">
                Business Category
              </label>
              <select
                value={formData.businessCategory}
                onChange={(e) => setFormData({ ...formData, businessCategory: e.target.value })}
                className="w-full px-4 py-3.5 bg-[#121212] border border-neutral-800 focus:border-[#D4B06A] rounded-xl text-sm text-white focus:outline-none transition-colors"
              >
                {businessCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Selected Package / Service Bundle */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-300 mb-2 font-medium">
                Selected Service / Bundle
              </label>
              <select
                value={formData.selectedBundle}
                onChange={(e) => setFormData({ ...formData, selectedBundle: e.target.value })}
                className="w-full px-4 py-3.5 bg-[#121212] border border-neutral-800 focus:border-[#D4B06A] rounded-xl text-sm text-white focus:outline-none transition-colors"
              >
                {bundleOptions.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Other Category Specification if selected */}
          {formData.businessCategory.includes('Other') && (
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-300 mb-2 font-medium">
                Please specify your business type
              </label>
              <input
                type="text"
                value={formData.otherCategory || ''}
                onChange={(e) => setFormData({ ...formData, otherCategory: e.target.value })}
                placeholder="e.g. Architecture firm, Solar equipment, Event management..."
                className="w-full px-4 py-3.5 bg-[#121212] border border-neutral-800 focus:border-[#D4B06A] rounded-xl text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors"
              />
            </div>
          )}

          {/* Project Requirement */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-300 mb-2 font-medium">
              Project Requirements & Goals *
            </label>
            <textarea
              rows={4}
              value={formData.projectRequirement}
              onChange={(e) => setFormData({ ...formData, projectRequirement: e.target.value })}
              placeholder="Tell us what you want to achieve (e.g. need a 5-page responsive website, 5 reels for launch, WhatsApp order integration, target launch in 2 weeks)..."
              className={`w-full px-4 py-3.5 bg-[#121212] border rounded-xl text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors ${
                errors.projectRequirement ? 'border-red-500' : 'border-neutral-800 focus:border-[#D4B06A]'
              }`}
            />
            {errors.projectRequirement && <p className="text-xs text-red-400 mt-1">{errors.projectRequirement}</p>}
          </div>

          {/* Additional Remarks */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-300 mb-2 font-medium">
              Additional Remarks / Preferred Call Time (Optional)
            </label>
            <input
              type="text"
              value={formData.remarks || ''}
              onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
              placeholder="e.g. Best time to call: Afternoon. Already have domain name."
              className="w-full px-4 py-3.5 bg-[#121212] border border-neutral-800 focus:border-[#D4B06A] rounded-xl text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-xl"
            >
              {isLoading ? (
                <span className="inline-block w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry to YUGARK Digital Studio</span>
                </>
              )}
            </button>
            <p className="text-center text-[11px] text-neutral-500 mt-3">
              Direct review by Founder Mr. Radha Krishna. Confidential & secure.
            </p>
          </div>

        </form>
      )}

    </div>
  );
}
