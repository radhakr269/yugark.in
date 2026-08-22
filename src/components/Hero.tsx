import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Box, Users, Clock, Globe, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import Hero3DCore from './Hero3DCore';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Cinematic 3D perspective particle mesh & digital landscape
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 1000);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 700);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // 3D Perspective Mesh Grid Points
    const cols = isMobile ? 18 : 28;
    const rows = isMobile ? 14 : 20;
    const spacing = isMobile ? 48 : 56;

    let step = 0;
    let lastTime = performance.now();

    // Floating hero particles
    const heroParticleCount = isMobile ? 14 : 28;
    const heroParticles = Array.from({ length: heroParticleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * (isMobile ? 0.15 : 0.28),
      vy: (Math.random() - 0.5) * (isMobile ? 0.15 : 0.28) - 0.05,
      size: Math.random() * 1.8 + 0.6,
      alpha: Math.random() * 0.45 + 0.15,
      phase: Math.random() * Math.PI * 2,
    }));

    const render = (now: number) => {
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (!prefersReducedMotion) {
        step += delta * 0.45;
      }

      ctx.clearRect(0, 0, width, height);

      // --- LAYER 1: Deep Atmospheric Radial Auroras ---
      // Violet & Gold Core Aurora (Top-Right)
      const auroraGradient = ctx.createRadialGradient(
        width * 0.72,
        height * 0.38,
        20,
        width * 0.7,
        height * 0.42,
        width * (isMobile ? 0.7 : 0.62)
      );
      auroraGradient.addColorStop(0, 'rgba(139, 92, 246, 0.14)');
      auroraGradient.addColorStop(0.35, 'rgba(212, 176, 106, 0.09)');
      auroraGradient.addColorStop(0.7, 'rgba(6, 182, 212, 0.035)');
      auroraGradient.addColorStop(1, 'rgba(5, 5, 5, 0)');
      ctx.fillStyle = auroraGradient;
      ctx.fillRect(0, 0, width, height);

      // Midnight Indigo Glow (Bottom-Left)
      const leftGlow = ctx.createRadialGradient(
        width * 0.12,
        height * 0.72,
        10,
        width * 0.18,
        height * 0.68,
        width * (isMobile ? 0.55 : 0.46)
      );
      leftGlow.addColorStop(0, 'rgba(30, 27, 75, 0.2)');
      leftGlow.addColorStop(0.6, 'rgba(212, 176, 106, 0.02)');
      leftGlow.addColorStop(1, 'rgba(5, 5, 5, 0)');
      ctx.fillStyle = leftGlow;
      ctx.fillRect(0, 0, width, height);

      // --- LAYER 2: 3D Flowing Mesh Digital Landscape ---
      const originX = width * (isMobile ? 0.55 : 0.68);
      const originY = height * (isMobile ? 0.62 : 0.56);
      const fov = isMobile ? 320 : 400;
      const tilt = 0.52;

      const projectedPoints: Array<Array<{ x: number; y: number; scale: number; alpha: number; z: number }>> = [];

      for (let r = 0; r < rows; r++) {
        const rowPoints: Array<{ x: number; y: number; scale: number; alpha: number; z: number }> = [];
        for (let c = 0; c < cols; c++) {
          const worldX = (c - cols / 2) * spacing;
          const worldZ = r * spacing + 130;

          // Multi-frequency undulating terrain wave
          const waveHeight =
            Math.sin(c * 0.32 + step + r * 0.18) * 26 +
            Math.cos(r * 0.42 + step * 0.75) * 18 +
            Math.sin((c + r) * 0.18 + step * 0.45) * 12;

          const worldY = waveHeight - (r * 11);

          // 3D Projection math
          const scale = fov / (fov + worldZ);
          const projX = originX + worldX * scale;
          const projY = originY + (worldY * Math.cos(tilt) - worldZ * Math.sin(tilt) * 0.3) * scale;
          const alpha = Math.max(0.03, Math.min(0.68, scale * 1.3 * (1 - (r / rows) * 0.55)));

          rowPoints.push({ x: projX, y: projY, scale, alpha, z: worldZ });
        }
        projectedPoints.push(rowPoints);
      }

      // Draw 3D connecting latitude (row) mesh lines
      ctx.lineWidth = 1;
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const p = projectedPoints[r][c];
          if (c === 0) {
            ctx.moveTo(p.x, p.y);
          } else {
            ctx.lineTo(p.x, p.y);
          }
        }
        const rowAlpha = projectedPoints[r][0]?.alpha || 0.1;
        if (r % 3 === 0) {
          ctx.strokeStyle = `rgba(56, 189, 248, ${rowAlpha * 0.55})`;
        } else if (r % 2 === 0) {
          ctx.strokeStyle = `rgba(167, 139, 250, ${rowAlpha * 0.5})`;
        } else {
          ctx.strokeStyle = `rgba(212, 176, 106, ${rowAlpha * 0.7})`;
        }
        ctx.stroke();
      }

      // Draw 3D connecting longitude (column) curves
      for (let c = 0; c < cols; c += (isMobile ? 3 : 2)) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const p = projectedPoints[r][c];
          if (r === 0) {
            ctx.moveTo(p.x, p.y);
          } else {
            ctx.lineTo(p.x, p.y);
          }
        }
        const colAlpha = projectedPoints[0][c]?.alpha || 0.1;
        ctx.strokeStyle = `rgba(212, 176, 106, ${colAlpha * 0.3})`;
        ctx.stroke();
      }

      // Draw glowing nodes at grid intersections
      for (let r = 0; r < rows; r += 2) {
        for (let c = 0; c < cols; c += 2) {
          const p = projectedPoints[r][c];
          const nodeRadius = Math.max(1, p.scale * 2.8);

          ctx.beginPath();
          ctx.arc(p.x, p.y, nodeRadius, 0, Math.PI * 2);

          if ((r + c) % 6 === 0) {
            ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha * 0.85})`;
          } else if ((r + c) % 4 === 0) {
            ctx.fillStyle = `rgba(167, 139, 250, ${p.alpha * 0.8})`;
          } else {
            ctx.fillStyle = `rgba(240, 210, 143, ${p.alpha * 0.9})`;
          }
          ctx.fill();
        }
      }

      // --- LAYER 3: Floating Micro-Particles with Proximity Links ---
      for (let i = 0; i < heroParticles.length; i++) {
        const hp = heroParticles[i];

        if (!prefersReducedMotion) {
          hp.x += hp.vx;
          hp.y += hp.vy;
          hp.phase += 0.02;

          if (hp.x < -10) hp.x = width + 10;
          if (hp.x > width + 10) hp.x = -10;
          if (hp.y < -10) hp.y = height + 10;
          if (hp.y > height + 10) hp.y = -10;
        }

        const currentAlpha = hp.alpha * (0.6 + 0.4 * Math.sin(hp.phase));
        ctx.beginPath();
        ctx.arc(hp.x, hp.y, hp.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 210, 143, ${currentAlpha})`;
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="relative min-h-[92vh] pt-28 pb-20 md:pt-36 md:pb-24 overflow-hidden bg-[#050505] flex items-center bg-perspective-grid bg-aurora-glow">
      {/* Radial Gold, Violet & Midnight Ambient Atmospheric Glows */}
      <div className="absolute top-[-140px] right-[-60px] w-[600px] h-[600px] bg-violet-600/10 blur-[150px] rounded-full pointer-events-none animate-aurora-float" />
      <div className="absolute top-[20%] right-[8%] w-[500px] h-[500px] bg-[#D4B06A]/[0.09] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-80px] w-[500px] h-[500px] bg-indigo-950/35 blur-[140px] rounded-full pointer-events-none" />

      {/* 3D Flowing Landscape Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-90">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Split Hero Composition Grid (Matching Reference Images 1 & 2) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Editorial & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7">
            
            {/* Top Meta Brand Badge & Founder Name (Single Clean Line) */}
            <div className="flex flex-wrap items-center gap-3">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 border border-[#D4B06A]/40 bg-[#D4B06A]/10 px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-[0_0_15px_rgba(212,176,106,0.15)]"
              >
                <span className="text-[#D4B06A] text-xs">⬡</span>
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#F0D28F] font-semibold">
                  YUGARK • DIGITAL STUDIO
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="text-xs uppercase tracking-[0.22em] text-[#D4B06A]/90 font-serif font-medium"
              >
                Radha Krishna
              </motion.div>
            </div>

            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.08] text-white tracking-tight"
            >
              We Build. We Create. <br />
              <span className="bg-gradient-to-r from-[#D4B06A] via-[#F0D28F] to-[#C9A35E] bg-clip-text text-transparent font-serif">
                We Grow Brands.
              </span>
            </motion.h1>

            {/* Supporting Paragraph (Concise and responsive) */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-neutral-300 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed font-sans font-light"
            >
              Websites, videos, social media, Meta Ads and digital strategies designed to help your business grow.
            </motion.p>

            {/* Tactile CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1"
            >
              <Link
                to="/contact"
                className="bg-gradient-to-r from-[#D4B06A] via-[#E2C17A] to-[#C9A35E] text-black px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:brightness-110 hover:-translate-y-0.5 active:scale-98 active:translate-y-0 transition-all duration-300 shadow-[0_10px_25px_rgba(212,176,106,0.3)] group cursor-pointer text-center"
              >
                <span>GET A FREE WEBSITE DEMO →</span>
              </Link>

              <Link
                to="/work"
                className="px-7 sm:px-8 py-3.5 sm:py-4 rounded-full border border-white/20 bg-white/[0.03] backdrop-blur-sm text-white hover:border-[#D4B06A] hover:text-[#D4B06A] hover:bg-white/[0.06] hover:-translate-y-0.5 active:scale-98 active:translate-y-0 text-xs uppercase tracking-widest font-semibold text-center transition-all duration-200 cursor-pointer"
              >
                VIEW OUR WORK →
              </Link>
            </motion.div>

            {/* Connected Stat Cards Row (Exact 4 Transparent Boxes with Icons from Reference) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-5 border-t border-neutral-800/80"
            >
              <div className="p-3 sm:p-3.5 rounded-xl bg-[#0D0D0D]/80 border border-white/10 backdrop-blur-md hover:border-[#D4B06A]/40 transition-colors shadow-lg">
                <div className="flex items-center gap-1.5 text-sm sm:text-base text-[#F0D28F] font-bold font-serif">
                  <Box className="w-3.5 h-3.5 text-[#D4B06A]" />
                  <span>100+</span>
                </div>
                <span className="text-[9px] sm:text-[10px] text-neutral-400 block mt-1 uppercase tracking-wider">Projects Delivered</span>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl bg-[#0D0D0D]/80 border border-white/10 backdrop-blur-md hover:border-[#D4B06A]/40 transition-colors shadow-lg">
                <div className="flex items-center gap-1.5 text-sm sm:text-base text-[#F0D28F] font-bold font-serif">
                  <Users className="w-3.5 h-3.5 text-[#D4B06A]" />
                  <span>50+</span>
                </div>
                <span className="text-[9px] sm:text-[10px] text-neutral-400 block mt-1 uppercase tracking-wider">Happy Clients</span>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl bg-[#0D0D0D]/80 border border-white/10 backdrop-blur-md hover:border-[#D4B06A]/40 transition-colors shadow-lg">
                <div className="flex items-center gap-1.5 text-sm sm:text-base text-[#F0D28F] font-bold font-serif">
                  <Clock className="w-3.5 h-3.5 text-[#D4B06A]" />
                  <span>3+</span>
                </div>
                <span className="text-[9px] sm:text-[10px] text-neutral-400 block mt-1 uppercase tracking-wider">Years Experience</span>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl bg-[#0D0D0D]/80 border border-white/10 backdrop-blur-md hover:border-[#D4B06A]/40 transition-colors shadow-lg">
                <div className="flex items-center gap-1.5 text-sm sm:text-base text-[#F0D28F] font-bold font-serif">
                  <Globe className="w-3.5 h-3.5 text-[#D4B06A]" />
                  <span>India</span>
                </div>
                <span className="text-[9px] sm:text-[10px] text-neutral-400 block mt-1 uppercase tracking-wider">Worldwide Service</span>
              </div>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Primary Visual Anchor - 3D Golden Y Digital Core & Orbiting System */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <Hero3DCore />
          </div>

        </div>
      </div>
    </section>
  );
}


