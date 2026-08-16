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
    sm: { icon: 32, text: 'text-lg', height: 32 },
    md: { icon: 40, text: 'text-xl', height: 40 },
    lg: { icon: 52, text: 'text-2xl', height: 52 },
    xl: { icon: 68, text: 'text-4xl', height: 68 },
  }[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* 3D Metallic Emblem SVG */}
      <svg
        width={dimensions.icon}
        height={dimensions.icon}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transform transition-transform duration-300 hover:scale-105"
      >
        <defs>
          {/* Metallic Gold Primary Gradient */}
          <linearGradient id="goldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5E0AA" />
            <stop offset="30%" stopColor="#D4B06A" />
            <stop offset="70%" stopColor="#B38A3E" />
            <stop offset="100%" stopColor="#EAD293" />
          </linearGradient>

          {/* 3D Outer Ring Glow Gradient */}
          <linearGradient id="ringGlow" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4B06A" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FFF2D1" stopOpacity="1" />
            <stop offset="100%" stopColor="#8A6723" stopOpacity="0.6" />
          </linearGradient>

          {/* Core Dark Radial Depth */}
          <radialGradient id="coreDepth" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1C1A14" />
            <stop offset="70%" stopColor="#0D0C0A" />
            <stop offset="100%" stopColor="#050505" />
          </radialGradient>

          {/* 3D Shadow Overlay */}
          <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.8" />
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#D4B06A" floodOpacity="0.3" />
          </filter>

          {/* Gold Inner Reflection */}
          <linearGradient id="innerReflection" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
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
          strokeWidth="2.5"
          filter="url(#dropShadow)"
        />

        {/* Geometric Micro Gold Accent Ring */}
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="url(#goldMetallic)"
          strokeWidth="0.75"
          strokeDasharray="4 2 1 2"
          opacity="0.85"
        />

        {/* Inner Diamond/Star Poly Pattern */}
        <path
          d="M 50,14 L 54,42 L 82,42 L 59,58 L 68,84 L 50,68 L 32,84 L 41,58 L 18,42 L 46,42 Z"
          fill="none"
          stroke="url(#goldMetallic)"
          strokeWidth="0.5"
          opacity="0.3"
        />

        {/* 3D Stylized Metallic 'Y' Motif */}
        <g filter="url(#dropShadow)">
          {/* Left Wing of Y */}
          <path
            d="M 30,26 L 46,50 L 46,74 C 46,76 48,77 50,77 C 52,77 54,76 54,74 L 54,50 L 70,26 C 72,23 68,20 64,23 L 50,44 L 36,23 C 32,20 28,23 30,26 Z"
            fill="url(#goldMetallic)"
          />
          {/* Bevel Highlight Layer */}
          <path
            d="M 50,44 L 64,23 C 66,21.5 68,21.5 69,23 C 70,24.5 69,26 67,29 L 52,50 L 52,74 C 52,75.5 51,76.5 50,76.5 Z"
            fill="url(#innerReflection)"
          />
        </g>

        {/* Center Radiant Diamond Gem Accent */}
        <polygon
          points="50,42 53,48 50,54 47,48"
          fill="#FFF4D6"
          filter="url(#dropShadow)"
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
