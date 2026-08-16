import SEO from '../components/SEO';
import ContactForm from '../components/ContactForm';
import WhatsAppButton, { WHATSAPP_LINK, WhatsAppIcon } from '../components/WhatsAppButton';
import { Mail, MapPin, Clock, ShieldCheck, Sparkles } from 'lucide-react';

export default function Contact() {
  return (
    <>
      <SEO 
        title="Contact Us — Start Your Project | YUGARK Digital Studio" 
        description="Connect with Founder Mr. Radha Krishna and the YUGARK Digital Studio team for website development, short promotional video, and social media growth in India." 
      />

      <main className="pt-32 pb-24 bg-[#050505]">
        {/* Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center space-y-6">
          <span className="font-sans text-xs uppercase tracking-[0.25em] font-bold text-[#D4B06A]">
            LET'S BUILD TOGETHER
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-white tracking-tight leading-[1.1]">
            Start Your Digital Project.
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 font-sans font-light max-w-2xl mx-auto leading-relaxed">
            Share your business goals and requirements below. Founder Mr. Radha Krishna and the studio team will review your inquiry and provide a tailored plan.
          </p>
        </section>

        {/* Form & Direct Contact Info */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Contact Form Container */}
            <div className="lg:col-span-8">
              <ContactForm />
            </div>

            {/* Direct Details Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-8 rounded-3xl bg-[#090909] border border-neutral-800 space-y-6 shadow-xl">
                <div className="flex items-center space-x-2 text-[#D4B06A] text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Direct Communication</span>
                </div>

                <h3 className="font-serif text-2xl text-white font-medium">Studio Contact Details</h3>

                <div className="space-y-4 text-xs text-neutral-300">
                  {/* Email */}
                  <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-[#121212] border border-neutral-800">
                    <Mail className="w-4 h-4 text-[#D4B06A] shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[10px] text-neutral-500 uppercase font-medium">Official Email</span>
                      <a href="mailto:business@yugark.in" className="text-white hover:text-[#F0D28F] font-semibold text-sm">
                        business@yugark.in
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-[#121212] border border-neutral-800">
                    <div className="w-5 h-5 rounded-full bg-[#25D366] flex items-center justify-center text-white shrink-0 mt-0.5">
                      <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <span className="block text-[10px] text-neutral-500 uppercase font-medium">WhatsApp Direct</span>
                      <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:underline font-bold text-sm">
                        +91 9125205132
                      </a>
                    </div>
                  </div>

                  {/* Response SLA */}
                  <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-[#121212] border border-neutral-800">
                    <Clock className="w-4 h-4 text-[#D4B06A] shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[10px] text-neutral-500 uppercase">Response Time</span>
                      <span className="text-white font-medium">Within 24 Hours Guaranteed</span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-[#121212] border border-neutral-800">
                    <MapPin className="w-4 h-4 text-[#D4B06A] shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[10px] text-neutral-500 uppercase">Studio Base</span>
                      <span className="text-white font-medium">YUGARK Digital Studio, India</span>
                    </div>
                  </div>
                </div>

                {/* Direct WhatsApp CTA Button */}
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-[#25D366] text-black transition-all font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:brightness-110"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Chat Immediately on WhatsApp</span>
                </a>

                <div className="pt-4 border-t border-neutral-800">
                  <span className="block text-xs text-[#D4B06A] font-semibold mb-1">Founder Direct</span>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Founder <span className="text-white font-medium">Mr. Radha Krishna</span> directly reviews project requirements to ensure quick turnaround and accurate technical delivery.
                  </p>
                </div>
              </div>

              {/* Security & Confidentiality Card */}
              <div className="p-6 rounded-2xl bg-[#090909] border border-[#D4B06A]/20 flex items-center space-x-4">
                <ShieldCheck className="w-8 h-8 text-[#D4B06A] shrink-0" />
                <div className="text-xs">
                  <span className="block font-semibold text-white">100% Confidentiality Guarantee</span>
                  <span className="text-neutral-400">All business information and project assets remain strictly confidential.</span>
                </div>
              </div>

            </div>

          </div>
        </section>

        <WhatsAppButton />
      </main>
    </>
  );
}
