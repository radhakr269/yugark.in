import { motion } from 'motion/react';

interface Hero3DCoreProps {
  className?: string;
}

export default function Hero3DCore({ className = '' }: Hero3DCoreProps) {
  // Capability nodes positioning & motion parameters
  const nodes = [
    {
      id: 'strategy',
      label: 'STRATEGY',
      position: '-top-2 right-4 sm:right-8',
      color: '#D4B06A',
      badgeBorder: 'border-[#D4B06A]/60 text-[#F0D28F] shadow-[0_0_20px_rgba(212,176,106,0.3)]',
      yRange: [0, -6, 0],
      duration: 4.2,
      delay: 0,
    },
    {
      id: 'growth',
      label: 'GROWTH',
      position: 'top-1/2 -right-3 sm:right-2',
      color: '#38BDF8',
      badgeBorder: 'border-cyan-500/40 text-cyan-300 shadow-[0_0_20px_rgba(56,189,248,0.25)]',
      yRange: [0, 6, 0],
      duration: 4.8,
      delay: 0.4,
    },
    {
      id: 'technology',
      label: 'TECHNOLOGY',
      position: '-bottom-2 right-6 sm:right-10',
      color: '#A855F7',
      badgeBorder: 'border-violet-500/40 text-violet-300 shadow-[0_0_20px_rgba(168,85,247,0.25)]',
      yRange: [0, -5, 0],
      duration: 5.2,
      delay: 0.8,
    },
    {
      id: 'design',
      label: 'DESIGN',
      position: 'top-1/3 -left-3 sm:left-2',
      color: '#F0D28F',
      badgeBorder: 'border-[#D4B06A]/60 text-[#F0D28F] shadow-[0_0_20px_rgba(212,176,106,0.3)]',
      yRange: [0, 6, 0],
      duration: 4.5,
      delay: 1.2,
    },
  ];

  return (
    <div className={`relative flex items-center justify-center min-h-[380px] sm:min-h-[480px] w-full select-none ${className}`}>
      
      {/* ---------------------------------------------------- */}
      {/* 1. ATMOSPHERIC VOLUMETRIC GLOWS & LIGHT FLARES      */}
      {/* ---------------------------------------------------- */}
      <div className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#D4B06A]/18 blur-[100px] pointer-events-none transform -translate-y-4" />
      <div className="absolute w-80 sm:w-[420px] h-80 sm:h-[420px] rounded-full bg-violet-600/12 blur-[130px] pointer-events-none" />
      <div className="absolute w-56 sm:w-72 h-56 sm:h-72 rounded-full bg-cyan-500/8 blur-[90px] pointer-events-none transform translate-x-12 translate-y-8" />

      {/* ---------------------------------------------------- */}
      {/* 2. SUBTLE CONCENTRIC ORBITAL RINGS & SATELLITE NODES */}
      {/* ---------------------------------------------------- */}

      {/* Outermost Orbital Ring with Traveling Node (Anticlockwise) */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[310px] sm:w-[410px] h-[310px] sm:h-[410px] rounded-full border border-[#D4B06A]/25 border-dashed pointer-events-none"
      >
        {/* Orbiting Satellite Node 1 (Gold) */}
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#F0D28F] shadow-[0_0_14px_#D4B06A]" />
        {/* Orbiting Satellite Node 2 (Cyan subtle) */}
        <div className="absolute -bottom-1 left-1/4 w-2 h-2 rounded-full bg-[#38BDF8] shadow-[0_0_10px_#38BDF8]" />
      </motion.div>

      {/* Mid Orbital Ring (Tilted, Clockwise) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 44, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[260px] sm:w-[340px] h-[260px] sm:h-[340px] rounded-full border border-violet-400/20 pointer-events-none"
      >
        {/* Orbiting Satellite Node 3 (Violet) */}
        <div className="absolute top-1/4 -right-1 w-2.5 h-2.5 rounded-full bg-[#C084FC] shadow-[0_0_12px_#A855F7]" />
      </motion.div>

      {/* Inner Precision Tracking Ring (Anticlockwise with gold dots) */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[210px] sm:w-[270px] h-[210px] sm:h-[270px] rounded-full border border-[#D4B06A]/30 border-dotted pointer-events-none"
      />

      {/* ---------------------------------------------------- */}
      {/* 3. 4 FLOATING CAPABILITY BADGES                      */}
      {/* ---------------------------------------------------- */}
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          animate={{ y: node.yRange }}
          transition={{ duration: node.duration, repeat: Infinity, ease: 'easeInOut', delay: node.delay }}
          className={`absolute ${node.position} z-20 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#0B0B0F]/90 backdrop-blur-xl border ${node.badgeBorder} text-[10px] sm:text-[11px] uppercase font-bold tracking-widest flex items-center gap-2 pointer-events-none transition-all`}
        >
          <span 
            className="w-1.5 h-1.5 rounded-full animate-pulse shadow-[0_0_6px_currentColor]" 
            style={{ backgroundColor: node.color, color: node.color }} 
          />
          <span>{node.label}</span>
        </motion.div>
      ))}

      {/* ---------------------------------------------------- */}
      {/* 4. CENTRAL 3D ROTATING 'Y' SHIELD EMBLEM & PEDESTAL  */}
      {/* ---------------------------------------------------- */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        
        {/* Floating Rotating Disc Container */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, -360]
          }}
          transition={{ 
            y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 32, repeat: Infinity, ease: 'linear' }
          }}
          className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-gradient-to-b from-[#1C1813] via-[#0E0D0B] to-[#050505] p-1.5 border-2 border-[#D4B06A]/85 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_45px_rgba(212,176,106,0.35)] flex items-center justify-center group"
        >
          {/* Outer Dashed Ring Inset */}
          <div className="w-full h-full rounded-full border border-[#D4B06A]/40 border-dashed flex items-center justify-center p-3 relative overflow-hidden">
            
            {/* Interior radial glare */}
            <div className="absolute inset-0 bg-radial from-[#D4B06A]/10 via-transparent to-transparent pointer-events-none" />

            {/* High-Precision Metallic Gold 'Y' Emblem Vector */}
            <svg
              viewBox="0 0 100 100"
              className="w-28 h-28 sm:w-36 sm:h-36 filter drop-shadow-[0_6px_16px_rgba(212,176,106,0.65)] relative z-10"
            >
              <defs>
                {/* Primary Gold Metal Gradient */}
                <linearGradient id="heroCoreGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF7E6" />
                  <stop offset="25%" stopColor="#F5D899" />
                  <stop offset="55%" stopColor="#D4B06A" />
                  <stop offset="85%" stopColor="#9E762E" />
                  <stop offset="100%" stopColor="#F3DC9B" />
                </linearGradient>

                {/* Secondary Bevel Highlight Gradient */}
                <linearGradient id="heroCoreBevel" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#D4B06A" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#7A5617" stopOpacity="0.8" />
                </linearGradient>

                {/* Disc Trim Gradient */}
                <linearGradient id="heroCoreTrim" x1="0%" y1="50%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="#D4B06A" />
                  <stop offset="50%" stopColor="#FFF2D1" />
                  <stop offset="100%" stopColor="#9E762E" />
                </linearGradient>
              </defs>

              {/* Decorative Concentric Circular Guideline */}
              <circle cx="50" cy="50" r="45" fill="none" stroke="url(#heroCoreTrim)" strokeWidth="1.2" opacity="0.65" />
              <circle cx="50" cy="50" r="41" fill="none" stroke="#D4B06A" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.4" />

              {/* Cardinal Tick Marks */}
              <line x1="50" y1="3" x2="50" y2="7" stroke="#F0D28F" strokeWidth="1.5" />
              <line x1="50" y1="93" x2="50" y2="97" stroke="#F0D28F" strokeWidth="1.5" />
              <line x1="3" y1="50" x2="7" y2="50" stroke="#F0D28F" strokeWidth="1.5" />
              <line x1="93" y1="50" x2="97" y2="50" stroke="#F0D28F" strokeWidth="1.5" />

              {/* Main 3D Faceted 'Y' Emblem Path */}
              {/* Left Branch */}
              <polygon
                points="26,22 50,49 46,51 22,25"
                fill="url(#heroCoreBevel)"
                opacity="0.9"
              />
              {/* Right Branch */}
              <polygon
                points="74,22 50,49 54,51 78,25"
                fill="url(#heroCoreGold)"
              />
              {/* Central Solid Y Body */}
              <path
                d="M 27,23 L 46,50 L 46,77 C 46,79 48,80 50,80 C 52,80 54,79 54,77 L 54,50 L 73,23 C 75,20 71,17 67,20 L 50,44 L 33,20 C 29,17 25,20 27,23 Z"
                fill="url(#heroCoreGold)"
              />
              
              {/* Center Diamond Light Node */}
              <polygon 
                points="50,41 55,48 50,55 45,48" 
                fill="#FFFDF7" 
                filter="drop-shadow(0 0 6px #FFF)"
              />
            </svg>
          </div>
        </motion.div>

        {/* Multi-Tiered Illuminated Horizon Pedestal (Stage Base) */}
        <div className="w-56 sm:w-72 h-8 rounded-full bg-gradient-to-r from-transparent via-[#D4B06A]/75 to-transparent blur-xs mt-4 shadow-[0_0_30px_rgba(212,176,106,0.45)]" />
        <div className="w-44 sm:w-56 h-2.5 rounded-full bg-[#F0D28F] shadow-[0_0_28px_#D4B06A]" />
        <div className="w-32 sm:w-40 h-1.5 rounded-full bg-[#FFF1D0] shadow-[0_0_18px_#F0D28F] mt-0.5" />
      </div>

    </div>
  );
}
