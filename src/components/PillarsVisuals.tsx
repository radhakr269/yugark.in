import { motion } from 'motion/react';

// 3D Isometric Neon Visual for Pillar 01: Website & Digital Experience
export function PillarWebVisual() {
  return (
    <div className="relative w-full h-44 sm:h-48 flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-[#14121A]/80 to-[#0A090D]/90 border border-[#D4B06A]/20">
      {/* Ambient Radial Glow */}
      <div className="absolute inset-0 bg-radial from-[#D4B06A]/15 via-transparent to-transparent blur-xl pointer-events-none" />
      <div className="absolute top-2 right-2 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* SVG Isometric 3D Layered Browser & UI Wireframes */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 w-48 h-36"
      >
        <svg viewBox="0 0 200 150" className="w-full h-full filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
          <defs>
            <linearGradient id="webIsoGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2D1" />
              <stop offset="50%" stopColor="#D4B06A" />
              <stop offset="100%" stopColor="#9E762E" />
            </linearGradient>
            <linearGradient id="webIsoCyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
            <linearGradient id="webIsoPurple" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C084FC" />
              <stop offset="100%" stopColor="#7E22CE" />
            </linearGradient>
          </defs>

          {/* Bottom Base Grid Plane */}
          <polygon points="100,135 175,95 100,55 25,95" fill="rgba(20,20,25,0.7)" stroke="rgba(212,176,106,0.3)" strokeWidth="1" />
          <line x1="100" y1="55" x2="100" y2="135" stroke="rgba(212,176,106,0.15)" strokeDasharray="3 3" />
          <line x1="62" y1="75" x2="138" y2="115" stroke="rgba(56,189,248,0.2)" />

          {/* Middle UI Layer (Cyan/Purple Glass Pane) */}
          <g transform="translate(0, -14)">
            <polygon points="100,115 165,80 100,45 35,80" fill="rgba(30,27,75,0.6)" stroke="url(#webIsoPurple)" strokeWidth="1.5" />
            {/* UI Mock elements */}
            <line x1="55" y1="73" x2="85" y2="58" stroke="#C084FC" strokeWidth="2" strokeLinecap="round" />
            <line x1="55" y1="80" x2="110" y2="52" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
            <line x1="65" y1="88" x2="130" y2="55" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinecap="round" />
            <circle cx="140" cy="70" r="4" fill="#38BDF8" filter="drop-shadow(0 0 4px #38BDF8)" />
          </g>

          {/* Top Browser Wireframe Window (Gold/Cyan) */}
          <g transform="translate(0, -28)">
            <polygon points="100,95 155,65 100,35 45,65" fill="rgba(15,15,20,0.85)" stroke="url(#webIsoGold)" strokeWidth="2" />
            {/* Window Dots */}
            <circle cx="60" cy="60" r="2" fill="#EF4444" />
            <circle cx="68" cy="56" r="2" fill="#F59E0B" />
            <circle cx="76" cy="52" r="2" fill="#10B981" />
            {/* Wireframe Hero block */}
            <polygon points="90,70 135,46 115,36 70,60" fill="rgba(212,176,106,0.2)" stroke="#F0D28F" strokeWidth="1" />
            {/* Action Button */}
            <polygon points="65,75 80,67 92,73 77,81" fill="#D4B06A" />
          </g>

          {/* Floating Neon Accent Particle Nodes */}
          <circle cx="40" cy="45" r="2.5" fill="#38BDF8" className="animate-pulse" />
          <circle cx="165" cy="50" r="2" fill="#F0D28F" className="animate-pulse" />
          <circle cx="100" cy="18" r="3" fill="#C084FC" className="animate-pulse" />
        </svg>
      </motion.div>
    </div>
  );
}

// 3D Isometric Neon Visual for Pillar 02: Content & Creative
export function PillarCreativeVisual() {
  return (
    <div className="relative w-full h-44 sm:h-48 flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-[#181124]/80 to-[#0C0814]/90 border border-violet-500/25">
      {/* Ambient Radial Glow */}
      <div className="absolute inset-0 bg-radial from-violet-600/20 via-transparent to-transparent blur-xl pointer-events-none" />
      <div className="absolute top-2 left-2 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* SVG Isometric 3D Neon Play Shield & Creative Reels */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        className="relative z-10 w-48 h-36"
      >
        <svg viewBox="0 0 200 150" className="w-full h-full filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
          <defs>
            <linearGradient id="creaIsoPurple" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E879F9" />
              <stop offset="50%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#6B21A8" />
            </linearGradient>
            <linearGradient id="creaIsoPink" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F472B6" />
              <stop offset="100%" stopColor="#DB2777" />
            </linearGradient>
          </defs>

          {/* Perspective Studio Base */}
          <polygon points="100,135 175,95 100,55 25,95" fill="rgba(25,18,35,0.7)" stroke="rgba(168,85,247,0.3)" strokeWidth="1" />
          
          {/* Floating Video Slate Panel 1 (Left Back) */}
          <g transform="translate(-20, -10)">
            <polygon points="65,100 85,88 85,45 65,57" fill="rgba(40,20,60,0.7)" stroke="#A855F7" strokeWidth="1.5" />
            <line x1="70" y1="65" x2="80" y2="59" stroke="#E879F9" strokeWidth="1" />
            <line x1="70" y1="73" x2="80" y2="67" stroke="#E879F9" strokeWidth="1" />
          </g>

          {/* Floating Video Slate Panel 2 (Right Back) */}
          <g transform="translate(15, -15)">
            <polygon points="135,100 155,88 155,45 135,57" fill="rgba(40,20,60,0.7)" stroke="#EC4899" strokeWidth="1.5" />
            <circle cx="145" cy="65" r="4" fill="#F472B6" opacity="0.8" />
          </g>

          {/* Central 3D Glowing Play Button Cube (Center Stage) */}
          <g transform="translate(0, -10)">
            {/* Isometric Glass Screen Box */}
            <polygon points="100,110 145,85 145,45 100,70" fill="rgba(45,20,70,0.85)" stroke="url(#creaIsoPurple)" strokeWidth="1.5" />
            <polygon points="100,110 55,85 55,45 100,70" fill="rgba(30,12,50,0.9)" stroke="url(#creaIsoPurple)" strokeWidth="1.5" />
            <polygon points="100,70 145,45 100,20 55,45" fill="rgba(60,25,95,0.9)" stroke="url(#creaIsoPink)" strokeWidth="1.5" />

            {/* Neon Glowing Play Icon Center */}
            <polygon 
              points="94,48 114,60 94,72" 
              fill="none" 
              stroke="#FDF4FF" 
              strokeWidth="2.5" 
              strokeLinejoin="round"
              filter="drop-shadow(0 0 6px #E879F9)"
            />
            <polygon points="94,48 114,60 94,72" fill="#E879F9" opacity="0.4" />
          </g>

          {/* Floating Reels Media Sparkles */}
          <circle cx="155" cy="35" r="2.5" fill="#E879F9" className="animate-pulse" />
          <circle cx="45" cy="38" r="2" fill="#F472B6" className="animate-pulse" />
          <circle cx="100" cy="12" r="3" fill="#FFF" className="animate-pulse" />
        </svg>
      </motion.div>
    </div>
  );
}

// 3D Isometric Neon Visual for Pillar 03: Growth & Automation
export function PillarGrowthVisual() {
  return (
    <div className="relative w-full h-44 sm:h-48 flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-[#0F172A]/80 to-[#070D1A]/90 border border-cyan-500/25">
      {/* Ambient Radial Glow */}
      <div className="absolute inset-0 bg-radial from-cyan-600/18 via-transparent to-transparent blur-xl pointer-events-none" />
      <div className="absolute top-2 right-2 w-24 h-24 bg-[#D4B06A]/10 rounded-full blur-2xl pointer-events-none" />

      {/* SVG Isometric 3D Neon Growth Chart with Ascending Gold Arrow */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        className="relative z-10 w-48 h-36"
      >
        <svg viewBox="0 0 200 150" className="w-full h-full filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
          <defs>
            <linearGradient id="growIsoCyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>
            <linearGradient id="growIsoGoldArrow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE082" />
              <stop offset="50%" stopColor="#FFB300" />
              <stop offset="100%" stopColor="#FF8F00" />
            </linearGradient>
          </defs>

          {/* Perspective Analytics Plane Base */}
          <polygon points="100,135 175,95 100,55 25,95" fill="rgba(15,23,42,0.7)" stroke="rgba(56,189,248,0.3)" strokeWidth="1" />
          
          {/* Bar 1 (Shortest - Left) */}
          <g transform="translate(0, 0)">
            <polygon points="55,102 65,96 65,80 55,86" fill="#0369A1" stroke="#38BDF8" strokeWidth="1" />
            <polygon points="65,96 75,102 75,86 65,80" fill="#075985" stroke="#38BDF8" strokeWidth="1" />
            <polygon points="65,80 75,86 65,92 55,86" fill="#38BDF8" />
          </g>

          {/* Bar 2 (Medium - Middle Left) */}
          <g transform="translate(18, -10)">
            <polygon points="65,102 75,96 75,68 65,74" fill="#0284C7" stroke="#38BDF8" strokeWidth="1" />
            <polygon points="75,96 85,102 85,74 75,68" fill="#0369A1" stroke="#38BDF8" strokeWidth="1" />
            <polygon points="75,68 85,74 75,80 65,74" fill="#7DD3FC" />
          </g>

          {/* Bar 3 (Tall - Middle Right) */}
          <g transform="translate(36, -20)">
            <polygon points="75,102 85,96 85,52 75,58" fill="#0284C7" stroke="#38BDF8" strokeWidth="1" />
            <polygon points="85,96 95,102 95,58 85,52" fill="#0369A1" stroke="#38BDF8" strokeWidth="1" />
            <polygon points="85,52 95,58 85,64 75,58" fill="#BAE6FD" />
          </g>

          {/* Bar 4 (Peak - Right) */}
          <g transform="translate(54, -32)">
            <polygon points="85,102 95,96 95,36 85,42" fill="#0369A1" stroke="#38BDF8" strokeWidth="1" />
            <polygon points="95,96 105,102 105,42 95,36" fill="#075985" stroke="#38BDF8" strokeWidth="1" />
            <polygon points="95,36 105,42 95,48 85,42" fill="#E0F2FE" />
          </g>

          {/* Ascending 3D Metallic Gold Zigzag Arrow */}
          <path
            d="M 50,90 L 78,70 L 105,52 L 140,25"
            fill="none"
            stroke="url(#growIsoGoldArrow)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="drop-shadow(0 0 8px #F59E0B)"
          />
          {/* Arrow Head */}
          <polygon 
            points="140,25 128,24 135,35" 
            fill="#FFE082" 
            stroke="#D97706" 
            strokeWidth="1"
            filter="drop-shadow(0 0 6px #FBBF24)"
          />

          {/* Data Nodes Floating Above Bars */}
          <circle cx="50" cy="90" r="3" fill="#38BDF8" filter="drop-shadow(0 0 4px #38BDF8)" />
          <circle cx="78" cy="70" r="3" fill="#38BDF8" filter="drop-shadow(0 0 4px #38BDF8)" />
          <circle cx="105" cy="52" r="3" fill="#FBBF24" filter="drop-shadow(0 0 4px #FBBF24)" />
          <circle cx="140" cy="25" r="4" fill="#FFF" filter="drop-shadow(0 0 8px #FBBF24)" className="animate-pulse" />
        </svg>
      </motion.div>
    </div>
  );
}
