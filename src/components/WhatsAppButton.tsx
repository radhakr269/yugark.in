import { motion } from 'motion/react';
import WhatsAppIcon from './WhatsAppIcon';

export const PHONE_NUMBER = '9125205132';
export const WHATSAPP_NUMBER = '919125205132';
export const WHATSAPP_DISPLAY = '+91 9125205132';
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
export { WhatsAppIcon };

interface WhatsAppButtonProps {
  className?: string;
}

export default function WhatsAppButton({ className = 'bottom-6 right-6' }: WhatsAppButtonProps) {
  return (
    <div className={`fixed ${className} z-50 pointer-events-auto transition-all duration-300`}>
      <motion.a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/40 border-2 border-[#D4B06A] transition-all duration-300"
        aria-label="Contact on WhatsApp"
      >
        {/* Subtle Outer Pulsing Ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none" />

        {/* Official WhatsApp SVG Icon */}
        <img
          src="/icons/whatsapp.svg"
          alt="WhatsApp"
          className="w-7 h-7 relative z-10"
        />

        {/* Gold Border Glow */}
        <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#D4B06A] to-[#F0D28F] opacity-40 blur-[2px] -z-10" />
      </motion.a>
    </div>
  );
}
