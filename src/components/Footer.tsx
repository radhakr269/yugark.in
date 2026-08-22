import { Link, useLocation } from 'react-router-dom';
import { Mail, ArrowUpRight, MapPin, Linkedin, Twitter, Youtube } from 'lucide-react';
import Logo from './Logo';
import { WHATSAPP_LINK, WhatsAppIcon } from './WhatsAppButton';

export default function Footer() {
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  // Do not render marketing footer on admin dashboard
  if (location.pathname === '/admin') {
    return null;
  }

  return (
    <footer className="bg-[#050505] border-t border-[#D4B06A]/20 pt-16 pb-12 text-[#9A9A9A] text-sm relative overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-64 bg-[#D4B06A]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 sm:pb-16 border-b border-[#D4B06A]/15">
          
          {/* Brand & Studio Column */}
          <div className="col-span-2 md:col-span-2 lg:col-span-2 space-y-5">
            <Link to="/" className="inline-block">
              <Logo size="lg" variant="default" />
            </Link>

            <p className="text-xs text-[#9A9A9A] leading-relaxed max-w-sm font-sans font-light">
              Premium websites, compelling content and digital growth solutions built to move your business forward. Delivering custom web development, short promotional video, and social media growth.
            </p>

            {/* Founder Card */}
            <div className="p-4 rounded-xl bg-[#0A0A0A] border border-[#D4B06A]/30 max-w-sm space-y-1.5 gold-border-glow">
              <span className="text-[10px] uppercase tracking-widest text-[#D4B06A] font-bold block">
                Studio Leadership
              </span>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-base font-bold text-white">Mr. Radha Krishna</h4>
                  <p className="text-xs text-neutral-400">Founder</p>
                </div>
                <span className="font-serif text-sm text-[#F0D28F] italic">YUGARK Studio</span>
              </div>
            </div>

            {/* Direct Contact Links */}
            <div className="space-y-2 pt-1">
              <a
                href="mailto:business@yugark.in"
                className="flex items-center space-x-2.5 text-xs text-neutral-300 hover:text-[#D4B06A] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#D4B06A]" />
                <span>business@yugark.in</span>
              </a>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2.5 text-xs text-neutral-300 hover:text-[#25D366] transition-colors font-medium"
              >
                <div className="w-5 h-5 rounded-full bg-[#25D366] flex items-center justify-center text-white shrink-0">
                  <WhatsAppIcon className="w-3.5 h-3.5 fill-white text-white" />
                </div>
                <span>WhatsApp: +91 9125205132</span>
              </a>
            </div>

            {/* Social / Professional Links */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#0F0F0F] border border-neutral-800 text-neutral-400 hover:text-[#D4B06A] hover:border-[#D4B06A]/50 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#0F0F0F] border border-neutral-800 text-neutral-400 hover:text-[#D4B06A] hover:border-[#D4B06A]/50 transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#0F0F0F] border border-neutral-800 text-neutral-400 hover:text-[#D4B06A] hover:border-[#D4B06A]/50 transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-serif text-[#D4B06A] font-semibold text-sm tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-xs">
              {[
                { name: 'Home', path: '/' },
                { name: 'Services', path: '/services' },
                { name: 'Website Templates', path: '/templates' },
                { name: 'Work / Portfolio', path: '/work' },
                { name: '6-Step Process', path: '/process' },
                { name: 'About Founder & Studio', path: '/about' },
                { name: 'Pricing & Packages', path: '/pricing' },
                { name: 'Contact & Inquiry', path: '/contact' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="hover:text-[#F0D28F] transition-colors duration-200 block py-0.5"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="space-y-4">
            <h3 className="font-serif text-[#D4B06A] font-semibold text-sm tracking-wider uppercase">
              Services
            </h3>
            <ul className="space-y-2.5 text-xs">
              {[
                { name: 'Website Development (From ₹9,999)', path: '/services/website-development' },
                { name: 'Short Ad Video (₹3,000)', path: '/services/ai-content-video' },
                { name: 'Long Brand Video (₹5,000)', path: '/services/ai-content-video' },
                { name: 'Social Media Management (From ₹9,999/mo)', path: '/services/social-media-management' },
                { name: 'Social Media Advertising (₹15,000/mo)', path: '/services/social-media-advertising' },
                { name: 'Digital Growth Strategy', path: '/services/digital-growth-strategy' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="hover:text-[#F0D28F] transition-colors duration-200 block py-0.5"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Headquarters & Legal */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1 space-y-4 pt-4 sm:pt-0 border-t sm:border-t-0 border-neutral-900">
            <h3 className="font-serif text-[#D4B06A] font-semibold text-sm tracking-wider uppercase">
              Contact & Studio
            </h3>
            <div className="space-y-3 text-xs text-neutral-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4B06A] shrink-0 mt-0.5" />
                <span>YUGARK Digital Studio, India</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4B06A] shrink-0" />
                <a href="mailto:business@yugark.in" className="hover:text-white">business@yugark.in</a>
              </p>
              <p className="flex items-center gap-2">
                <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0" />
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  +91 9125205132
                </a>
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-900 space-y-2">
              <p className="text-[11px] text-[#D4B06A] font-semibold uppercase tracking-wider">
                Legal
              </p>
              <ul className="space-y-1.5 text-xs">
                <li>
                  <Link to="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-white transition-colors">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/admin" className="text-neutral-500 hover:text-neutral-300 transition-colors">
                    Admin Portal
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© {currentYear} YUGARK DIGITAL STUDIO. All rights reserved. Founded by Mr. Radha Krishna.</p>
          <div className="flex items-center space-x-6">
            <Link to="/privacy" className="hover:text-neutral-400 transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-neutral-400 transition-colors">
              Terms
            </Link>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] hover:underline flex items-center gap-1 font-semibold"
            >
              <span>WhatsApp Direct</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
