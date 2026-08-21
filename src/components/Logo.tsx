import React from 'react';

interface LogoProps {
  variant?: 'default' | 'icon' | 'gold' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
}

export default function Logo({
  variant = 'default',
  size = 'md',
  className = '',
  showText = true,
}: LogoProps) {
  // Dimension mapping
  const dimensions = {
    sm: { icon: 34, text: 'text-lg', height: 34 },
    md: { icon: 44, text: 'text-xl', height: 44 },
    lg: { icon: 56, text: 'text-2xl', height: 56 },
    xl: { icon: 72, text: 'text-4xl', height: 72 },
  }[size];

  return (
    <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
      {/* 3D/4D Volumetric Metallic Emblem SVG */}
      <svg
        width={dimensions.icon}
        height={dimensions.icon}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transform transition-transform duration-300 hover:scale-105 filter drop-shadow-[0_4px_16px_rgba(212,176,106,0.35)]"
      >
        <defs>
          {/* Metallic Gold Primary Gradient */}
          <linearGradient id="goldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2D1" />
            <stop offset="25%" stopColor="#F5D899" />
            <stop offset="55%" stopColor="#D4B06A" />
            <stop offset="85%" stopColor="#9E762E" />
            <stop offset="100%" stopColor="#F3DC9B" />
          </linearGradient>

          {/* 3D Outer Ring Glow Gradient */}
          <linearGradient id="ringGlow" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4B06A" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FFF7E6" stopOpacity="1" />
            <stop offset="100%" stopColor="#7A5617" stopOpacity="0.7" />
          </linearGradient>

          {/* Core Dark Radial Depth */}
          <radialGradient id="coreDepth" cx="45%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#221E16" />
            <stop offset="60%" stopColor="#0E0D0A" />
            <stop offset="100%" stopColor="#040404" />
          </radialGradient>

          {/* 3D Shadow Overlay */}
          <filter id="dropShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000000" floodOpacity="0.95" />
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#D4B06A" floodOpacity="0.4" />
          </filter>

          {/* Gold Inner Bevel Reflection */}
          <linearGradient id="innerReflection" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#D4B06A" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Outer 3D Beveled Ring */}
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="url(#coreDepth)"
          stroke="url(#ringGlow)"
          strokeWidth="2.8"
          filter="url(#dropShadow)"
        />

        {/* Geometric Micro Gold Accent Ring */}
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="url(#goldMetallic)"
          strokeWidth="0.85"
          strokeDasharray="4 2 1 2"
          opacity="0.9"
        />

        {/* 3D Stylized Metallic 'Y' Motif */}
        <g filter="url(#dropShadow)">
          {/* Main Solid Y Body */}
          <path
            d="M 27,24 L 46,50 L 46,76 C 46,78 48,79 50,79 C 52,79 54,78 54,76 L 54,50 L 73,24 C 75,21 71,18 67,21 L 50,44 L 33,21 C 29,18 25,21 27,24 Z"
            fill="url(#goldMetallic)"
          />
          {/* Bevel Highlight Layer */}
          <path
            d="M 50,44 L 67,21 C 69,19.5 71,19.5 72,21 C 73,22.5 72,24 70,27 L 53,50 L 53,76 C 53,77.5 52,78.5 50,78.5 Z"
            fill="url(#innerReflection)"
          />
        </g>

        {/* Center Radiant Diamond Gem Accent */}
        <polygon
          points="50,42 53.5,48 50,54 46.5,48"
          fill="#FFF9E6"
          filter="drop-shadow(0 0 4px #FFF)"
        />
      </svg>

      {/* Typography */}
      {showText && variant !== 'icon' && (
        <div className="flex flex-col justify-center">
          <span
            className={`font-serif font-bold tracking-[0.22em] uppercase leading-none ${dimensions.text} ${
              variant === 'white'
                ? 'text-white'
                : 'bg-gradient-to-r from-[#F5E0AA] via-[#D4B06A] to-[#C9A35E] bg-clip-text text-transparent'
            }`}
            style={{ fontFamily: 'Cinzel, "Playfair Display", Georgia, serif' }}
          >
            YUGARK
          </span>
          <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.35em] text-[#D4B06A] font-sans font-semibold mt-0.5">
            Digital Studio
          </span>
        </div>
      )}
    </div>
  );
}
