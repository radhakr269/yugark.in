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
    <div className={`relative flex items-center justify-center min-h-[380px] sm:min-h-[480px] lg:min-h-[520px] w-full select-none ${className}`}>
      
      {/* ---------------------------------------------------- */}
      {/* 1. ATMOSPHERIC VOLUMETRIC GLOWS & LIGHT FLARES      */}
      {/* ---------------------------------------------------- */}
      <div className="absolute w-72 sm:w-96 lg:w-[450px] h-72 sm:h-96 lg:h-[450px] rounded-full bg-[#D4B06A]/20 blur-[110px] pointer-events-none transform -translate-y-4" />
      <div className="absolute w-80 sm:w-[420px] lg:w-[480px] h-80 sm:h-[420px] lg:h-[480px] rounded-full bg-violet-600/15 blur-[140px] pointer-events-none" />
      <div className="absolute w-56 sm:w-72 h-56 sm:h-72 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none transform translate-x-12 translate-y-8" />

      {/* ---------------------------------------------------- */}
      {/* 2. CONCENTRIC ORBITAL RINGS & SATELLITE NODES        */}
      {/* ---------------------------------------------------- */}

      {/* Outermost Orbital Ring with Traveling Nodes (Anticlockwise) */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[320px] sm:w-[430px] lg:w-[480px] h-[320px] sm:h-[430px] lg:h-[480px] rounded-full border border-[#D4B06A]/30 border-dashed pointer-events-none"
      >
        {/* Orbiting Satellite Node 1 (Gold) */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#FFF2D1] shadow-[0_0_16px_#D4B06A]" />
        {/* Orbiting Satellite Node 2 (Cyan) */}
        <div className="absolute -bottom-1.5 left-1/4 w-2.5 h-2.5 rounded-full bg-[#38BDF8] shadow-[0_0_12px_#38BDF8]" />
      </motion.div>

      {/* Mid Orbital Ring (Tilted, Clockwise for Gyroscopic Counter-Motion) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 42, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[270px] sm:w-[360px] lg:w-[400px] h-[270px] sm:h-[360px] lg:h-[400px] rounded-full border border-violet-400/25 pointer-events-none"
      >
        {/* Orbiting Satellite Node 3 (Violet) */}
        <div className="absolute top-1/4 -right-1.5 w-3 h-3 rounded-full bg-[#C084FC] shadow-[0_0_14px_#A855F7]" />
      </motion.div>

      {/* Inner Precision Tracking Ring (Anticlockwise with gold nodes) */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[220px] sm:w-[290px] lg:w-[320px] h-[220px] sm:h-[290px] lg:h-[320px] rounded-full border border-[#D4B06A]/35 border-dotted pointer-events-none"
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
        
        {/* Floating Rotating Disc Container (Continuous Anticlockwise Rotation) */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, -360]
          }}
          transition={{ 
            y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 30, repeat: Infinity, ease: 'linear' }
          }}
          className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full bg-gradient-to-b from-[#221C14] via-[#100F0D] to-[#040404] p-2 border-2 border-[#D4B06A]/90 shadow-[0_30px_70px_rgba(0,0,0,0.98),0_0_55px_rgba(212,176,106,0.4)] flex items-center justify-center group"
        >
          {/* Outer Dashed Ring Inset */}
          <div className="w-full h-full rounded-full border border-[#D4B06A]/45 border-dashed flex items-center justify-center p-3 sm:p-4 relative overflow-hidden">
            
            {/* Interior radial glare */}
            <div className="absolute inset-0 bg-radial from-[#D4B06A]/15 via-transparent to-transparent pointer-events-none" />

            {/* High-Precision 3D/4D Volumetric Metallic Gold 'Y' Emblem Vector */}
            <svg
              viewBox="0 0 100 100"
              className="w-32 h-32 sm:w-44 sm:h-44 lg:w-48 lg:h-48 filter drop-shadow-[0_8px_20px_rgba(212,176,106,0.75)] relative z-10"
            >
              <defs>
                {/* Primary Gold Metal Gradient */}
                <linearGradient id="heroCoreGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF9E6" />
                  <stop offset="25%" stopColor="#F5D899" />
                  <stop offset="55%" stopColor="#D4B06A" />
                  <stop offset="85%" stopColor="#9E762E" />
                  <stop offset="100%" stopColor="#F3DC9B" />
                </linearGradient>

                {/* Secondary Bevel Highlight Gradient */}
                <linearGradient id="heroCoreBevel" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                  <stop offset="50%" stopColor="#D4B06A" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#7A5617" stopOpacity="0.85" />
                </linearGradient>

                {/* Disc Trim Gradient */}
                <linearGradient id="heroCoreTrim" x1="0%" y1="50%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="#D4B06A" />
                  <stop offset="50%" stopColor="#FFF2D1" />
                  <stop offset="100%" stopColor="#9E762E" />
                </linearGradient>
              </defs>

              {/* Decorative Concentric Circular Guideline */}
              <circle cx="50" cy="50" r="45" fill="none" stroke="url(#heroCoreTrim)" strokeWidth="1.4" opacity="0.75" />
              <circle cx="50" cy="50" r="41" fill="none" stroke="#D4B06A" strokeWidth="0.6" strokeDasharray="3 3" opacity="0.5" />

              {/* Main 3D Faceted 'Y' Emblem Body */}
              <g filter="drop-shadow(0 4px 10px rgba(0,0,0,0.8))">
                {/* Left Branch Bevel */}
                <polygon
                  points="26,22 50,49 46,51 22,25"
                  fill="url(#heroCoreBevel)"
                  opacity="0.95"
                />
                {/* Right Branch Bevel */}
                <polygon
                  points="74,22 50,49 54,51 78,25"
                  fill="url(#heroCoreGold)"
                />
                {/* Central Solid Y Silhouette */}
                <path
                  d="M 27,23 L 46,50 L 46,77 C 46,79 48,80 50,80 C 52,80 54,79 54,77 L 54,50 L 73,23 C 75,20 71,17 67,20 L 50,44 L 33,20 C 29,17 25,20 27,23 Z"
                  fill="url(#heroCoreGold)"
                />
              </g>
              
              {/* Center Diamond Light Node */}
              <polygon 
                points="50,41 55,48 50,55 45,48" 
                fill="#FFFFFF" 
                filter="drop-shadow(0 0 8px #FFF)"
              />
            </svg>
          </div>
        </motion.div>

        {/* Multi-Tiered Illuminated Horizon Pedestal (Stage Base from Reference) */}
        <div className="w-60 sm:w-80 lg:w-96 h-8 rounded-full bg-gradient-to-r from-transparent via-[#D4B06A]/80 to-transparent blur-xs mt-5 shadow-[0_0_35px_rgba(212,176,106,0.5)]" />
        <div className="w-48 sm:w-64 lg:w-72 h-3 rounded-full bg-[#F0D28F] shadow-[0_0_30px_#D4B06A]" />
        <div className="w-36 sm:w-48 lg:w-56 h-1.5 rounded-full bg-[#FFF1D0] shadow-[0_0_20px_#F0D28F] mt-0.5" />
      </div>

    </div>
  );
}
