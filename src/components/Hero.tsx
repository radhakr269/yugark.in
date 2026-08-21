import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Cinematic 3D perspective particle mesh & digital landscape
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // 3D Perspective Mesh Grid Points
    const cols = 26;
    const rows = 18;
    const spacing = 55;

    let step = 0;

    const render = () => {
      if (!prefersReducedMotion) {
        step += 0.012;
      }

      ctx.clearRect(0, 0, width, height);

      // Multi-layer Aurora & Atmospheric Radial Glows
      const auroraGradient = ctx.createRadialGradient(
        width * 0.72,
        height * 0.42,
        20,
        width * 0.7,
        height * 0.45,
        width * 0.65
      );
      auroraGradient.addColorStop(0, 'rgba(139, 92, 246, 0.12)'); // Violet depth
      auroraGradient.addColorStop(0.35, 'rgba(212, 176, 106, 0.08)'); // Gold core
      auroraGradient.addColorStop(0.7, 'rgba(6, 182, 212, 0.04)'); // Cyan rim
      auroraGradient.addColorStop(1, 'rgba(5, 5, 5, 0)');
      ctx.fillStyle = auroraGradient;
      ctx.fillRect(0, 0, width, height);

      // Subtle second atmospheric glow on left
      const leftGlow = ctx.createRadialGradient(
        width * 0.15,
        height * 0.7,
        10,
        width * 0.2,
        height * 0.65,
        width * 0.45
      );
      leftGlow.addColorStop(0, 'rgba(30, 27, 75, 0.18)'); // Midnight indigo
      leftGlow.addColorStop(1, 'rgba(5, 5, 5, 0)');
      ctx.fillStyle = leftGlow;
      ctx.fillRect(0, 0, width, height);

      // 3D Projected Mesh Landscape
      const originX = width * 0.68;
      const originY = height * 0.58;
      const fov = 380;
      const tilt = 0.55;

      const projectedPoints: Array<Array<{ x: number; y: number; scale: number; alpha: number; z: number }>> = [];

      for (let r = 0; r < rows; r++) {
        const rowPoints: Array<{ x: number; y: number; scale: number; alpha: number; z: number }> = [];
        for (let c = 0; c < cols; c++) {
          const worldX = (c - cols / 2) * spacing;
          const worldZ = r * spacing + 140;

          // 3D undulating wave height
          const waveHeight =
            Math.sin(c * 0.35 + step + r * 0.2) * 28 +
            Math.cos(r * 0.45 + step * 0.8) * 20 +
            Math.sin((c + r) * 0.2 + step * 0.5) * 14;

          const worldY = waveHeight - (r * 12);

          // 3D Projection math
          const scale = fov / (fov + worldZ);
          const projX = originX + worldX * scale;
          const projY = originY + (worldY * Math.cos(tilt) - worldZ * Math.sin(tilt) * 0.32) * scale;
          const alpha = Math.max(0.04, Math.min(0.7, scale * 1.35 * (1 - r / rows * 0.6)));

          rowPoints.push({ x: projX, y: projY, scale, alpha, z: worldZ });
        }
        projectedPoints.push(rowPoints);
      }

      // Draw 3D connecting latitude and longitude mesh lines
      ctx.lineWidth = 1;

      // Draw Row Lines (Latitudes)
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
        // Palette gradient for depth: gold foreground to violet/cyan background
        const rowAlpha = projectedPoints[r][0]?.alpha || 0.1;
        if (r % 3 === 0) {
          ctx.strokeStyle = `rgba(56, 189, 248, ${rowAlpha * 0.6})`; // subtle cyan
        } else if (r % 2 === 0) {
          ctx.strokeStyle = `rgba(167, 139, 250, ${rowAlpha * 0.55})`; // subtle violet
        } else {
          ctx.strokeStyle = `rgba(212, 176, 106, ${rowAlpha * 0.75})`; // gold
        }
        ctx.stroke();
      }

      // Draw Column Lines (Longitudes)
      for (let c = 0; c < cols; c += 2) {
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
        ctx.strokeStyle = `rgba(212, 176, 106, ${colAlpha * 0.35})`;
        ctx.stroke();
      }

      // Draw glowing particle nodes at mesh intersections
      for (let r = 0; r < rows; r += 2) {
        for (let c = 0; c < cols; c += 2) {
          const p = projectedPoints[r][c];
          const nodeRadius = Math.max(1, p.scale * 3);

          ctx.beginPath();
          ctx.arc(p.x, p.y, nodeRadius, 0, Math.PI * 2);

          if ((r + c) % 6 === 0) {
            ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha * 0.9})`; // Cyan accent
          } else if ((r + c) % 4 === 0) {
            ctx.fillStyle = `rgba(167, 139, 250, ${p.alpha * 0.85})`; // Violet accent
          } else {
            ctx.fillStyle = `rgba(240, 210, 143, ${p.alpha})`; // Gold accent
          }
          ctx.fill();
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="relative min-h-[90vh] pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#050505] flex items-center bg-perspective-grid bg-aurora-glow">
      {/* Radial Gold & Violet Ambient Glows */}
      <div className="absolute top-[-180px] right-[-80px] w-[550px] h-[550px] bg-violet-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-[20%] right-[15%] w-[450px] h-[450px] bg-[#D4B06A]/[0.06] blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] bg-indigo-950/25 blur-[120px] rounded-full pointer-events-none" />

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-85">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="space-y-8 max-w-4xl">
          {/* Top Pill Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 border border-[#D4B06A]/30 bg-[#D4B06A]/10 px-4 py-1.5 rounded-full"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F0D28F]" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#F0D28F] font-semibold">
              YUGARK • DIGITAL STUDIO
            </span>
          </motion.div>

          {/* Founder Designation Line */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="flex items-center gap-3 pt-1 border-l-2 border-[#D4B06A] pl-4"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-sans">
              Founder — <strong className="text-white font-medium">Mr. Radha Krishna</strong>
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] text-white tracking-tight"
          >
            Websites that make people <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#D4B06A] via-[#F0D28F] to-[#C9A35E] bg-clip-text text-transparent font-serif">
              stop, trust & act.
            </span>
          </motion.h1>

          {/* Supporting Paragraph / Introduction */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-neutral-300 text-base sm:text-xl max-w-2xl leading-relaxed font-sans font-light"
          >
            Premium websites, compelling content and digital growth solutions built to move your business forward.
          </motion.p>

          {/* Grand Opening Banner Pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="inline-flex flex-wrap items-center gap-3 p-3 px-4 rounded-xl bg-[#101010]/90 backdrop-blur-md border border-[#D4B06A]/40 text-xs text-neutral-200"
          >
            <span className="px-2 py-0.5 rounded bg-[#D4B06A] text-black font-bold uppercase tracking-wider text-[10px]">
              Grand Opening Offer
            </span>
            <span>Custom Websites from <strong>₹12,999</strong> (~7 Days Delivery)</span>
          </motion.div>

          {/* Dual CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
          >
            <Link
              to="/contact"
              className="bg-gradient-to-r from-[#D4B06A] to-[#C9A35E] text-black px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:brightness-110 transition-all duration-300 shadow-xl group"
            >
              <span>Get my free website plan</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/work"
              className="px-8 py-4 rounded-full border border-white/20 text-white hover:border-[#D4B06A] hover:text-[#D4B06A] text-xs uppercase tracking-widest font-semibold text-center transition-all"
            >
              See our work
            </Link>

            <Link
              to="/pricing"
              className="text-neutral-400 hover:text-white text-xs uppercase tracking-widest font-semibold text-center sm:text-left py-2 px-3 transition-colors"
            >
              View Pricing & Plans →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

