import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import Logo from './Logo';
import SearchModal from './SearchModal';
import { WHATSAPP_LINK, WhatsAppIcon } from './WhatsAppButton';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const location = useLocation();

  // Scroll detection for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Safe handler to close mobile menu
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname, location.search, location.hash, closeMobileMenu]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  // Global Cmd/Ctrl + K shortcut for search & ESC to close mobile menu
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
      if (e.key === 'Escape') {
        if (isMobileMenuOpen) {
          closeMobileMenu();
        }
      }
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, [isMobileMenuOpen, closeMobileMenu]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Templates', path: '/templates' },
    { name: 'Work', path: '/work' },
    { name: 'Process', path: '/process' },
    { name: 'About', path: '/about' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' },
  ];

  // Do not render floating public website navbar on the admin dashboard to avoid layout overlay
  if (location.pathname === '/admin') {
    return null;
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? 'bg-[#050505]/85 backdrop-blur-xl border-b border-[#D4B06A]/20 py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : 'bg-gradient-to-b from-[#050505]/80 via-[#050505]/40 to-transparent backdrop-blur-[6px] border-b border-white/5 py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* 3D Metallic Gold Logo with dedicated breathing room */}
            <div className="flex-shrink-0 mr-8 xl:mr-16">
              <Link 
                to="/" 
                onClick={closeMobileMenu}
                className="flex items-center group relative z-50 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Logo size="md" variant="default" />
              </Link>
            </div>

            {/* Desktop Navigation Links with clean start & deliberate gap from logo */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path || (link.path.startsWith('/#') && location.hash === link.path.substring(1));
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative py-1 text-xs uppercase tracking-[0.18em] transition-all duration-200 group ${
                      isActive
                        ? 'text-[#F0D28F] font-semibold'
                        : 'text-[#9A9A9A] hover:text-[#F0D28F]'
                    }`}
                  >
                    <span>{link.name}</span>
                    {/* Hover & Active Underline Indicator */}
                    <span 
                      className={`absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-[#D4B06A] to-[#F0D28F] transition-all duration-300 ease-out ${
                        isActive
                          ? 'w-full opacity-100 shadow-[0_0_8px_rgba(212,176,106,0.6)]'
                          : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Right Side Actions: Search Bar & CTAs */}
            <div className="hidden lg:flex items-center space-x-3.5 ml-4 xl:ml-8">
              {/* Search Trigger Button */}
              <button
                onClick={() => setSearchModalOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#121212]/80 backdrop-blur-sm border border-[#D4B06A]/20 hover:border-[#D4B06A]/60 hover:bg-[#1A1A1A]/90 text-neutral-400 hover:text-white transition-all duration-200 text-xs shadow-sm hover:shadow-[0_0_15px_rgba(212,176,106,0.1)] active:scale-95"
                title="Search website (Cmd+K)"
                type="button"
              >
                <Search className="w-3.5 h-3.5 text-[#D4B06A]" />
                <span className="text-[11px] font-sans">Search...</span>
                <kbd className="hidden xl:inline-block px-1.5 py-0.5 bg-neutral-900 border border-neutral-800 rounded text-[9px] text-neutral-400 font-mono">
                  ⌘K
                </kbd>
              </button>

              {/* WhatsApp Quick Link */}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-[#128C7E]/20 text-[#25D366] hover:bg-[#25D366] hover:text-black hover:shadow-[0_0_15px_rgba(37,211,102,0.4)] transition-all duration-200 border border-[#25D366]/30 flex items-center justify-center active:scale-95"
                title="Chat on WhatsApp (+91 9125205132)"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>

              {/* Start Project CTA */}
              <Link
                to="/contact"
                className="gold-gradient-bg gold-gradient-bg-hover text-black px-5 py-2 rounded-full text-xs uppercase tracking-widest font-bold shadow-md active:scale-95"
              >
                Start Project
              </Link>
            </div>

            {/* Mobile Actions & Menu Trigger */}
            <div className="lg:hidden flex items-center space-x-1 sm:space-x-2 relative z-50">
              <button
                onClick={() => setSearchModalOpen(true)}
                className="p-2.5 text-neutral-300 hover:text-[#D4B06A] active:scale-95 transition-transform"
                aria-label="Search website"
                type="button"
              >
                <Search className="w-5 h-5" />
              </button>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-[#25D366] hover:text-[#F0D28F] active:scale-95 transition-transform"
                aria-label="WhatsApp Contact"
                title="WhatsApp"
              >
                <WhatsAppIcon className="w-5 h-5" />
              </a>

              <button
                onClick={toggleMobileMenu}
                className="p-2.5 rounded-lg text-neutral-300 hover:text-white active:scale-95 transition-all touch-manipulation focus:outline-none focus:ring-1 focus:ring-[#D4B06A]/50"
                aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
                aria-expanded={isMobileMenuOpen}
                type="button"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-[#D4B06A]" />
                ) : (
                  <Menu className="w-6 h-6 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Full-Screen Drawer */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-[#050505]/98 backdrop-blur-2xl flex flex-col justify-between pt-24 pb-8 px-6 overflow-y-auto animate-in fade-in duration-200"
          onClick={(e) => {
            // Close if clicking outside the inner content
            if (e.target === e.currentTarget) {
              closeMobileMenu();
            }
          }}
        >
          <div className="space-y-6 max-w-md mx-auto w-full">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4B06A] font-semibold">
                Menu Navigation
              </span>
              <span className="text-[10px] text-neutral-500 font-sans">
                YUGARK Digital Studio
              </span>
            </div>

            {/* Nav links */}
            <nav className="space-y-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path || (link.path.startsWith('/#') && location.hash === link.path.substring(1));
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={closeMobileMenu}
                    className={`block py-3 px-3 rounded-xl text-xl font-serif transition-all ${
                      isActive
                        ? 'bg-[#141414] text-[#F0D28F] font-bold border-l-2 border-[#D4B06A]'
                        : 'text-neutral-300 hover:text-white hover:bg-[#101010]'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Quick Search Shortcut inside Drawer */}
            <button
              onClick={() => {
                closeMobileMenu();
                setSearchModalOpen(true);
              }}
              className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#121212] border border-neutral-800 text-neutral-300 text-xs font-sans hover:border-[#D4B06A]/40 transition-colors"
              type="button"
            >
              <div className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-[#D4B06A]" />
                <span>Search pages, services, templates...</span>
              </div>
              <span className="text-[10px] text-[#D4B06A] uppercase font-bold">Search →</span>
            </button>
          </div>

          {/* Bottom Drawer Actions */}
          <div className="pt-6 border-t border-neutral-800 space-y-3 max-w-md mx-auto w-full">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobileMenu}
              className="w-full py-3.5 rounded-xl bg-[#25D366] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg active:scale-98 transition-transform"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>WhatsApp Direct (+91 9125205132)</span>
            </a>

            <Link
              to="/contact"
              onClick={closeMobileMenu}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4B06A] to-[#C9A35E] text-black font-bold text-xs uppercase tracking-wider block text-center shadow-lg active:scale-98 transition-transform"
            >
              Start Your Project
            </Link>
          </div>
        </div>
      )}

      {/* Advanced Search System Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </>
  );
}

