import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Canvas wave & particles animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
    }> = [];

    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.6 + 0.2,
      });
    }

    let step = 0;

    const render = () => {
      step += 0.008;
      ctx.clearRect(0, 0, width, height);

      const radialGlow = ctx.createRadialGradient(
        width * 0.7,
        height * 0.5,
        10,
        width * 0.7,
        height * 0.5,
        width * 0.5
      );
      radialGlow.addColorStop(0, 'rgba(212, 176, 106, 0.16)');
      radialGlow.addColorStop(0.5, 'rgba(201, 163, 94, 0.04)');
      radialGlow.addColorStop(1, 'rgba(5, 5, 5, 0)');
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      ctx.lineWidth = 1;
      const linesCount = 16;
      const focalX = width * 0.65;
      const focalY = height * 0.52;

      for (let i = 0; i < linesCount; i++) {
        ctx.beginPath();
        const goldAlpha = 0.1 + (i / linesCount) * 0.2;
        ctx.strokeStyle = `rgba(226, 193, 122, ${goldAlpha})`;

        for (let x = 0; x <= width; x += 10) {
          const distFromFocal = Math.abs(x - focalX);
          const y =
            focalY +
            Math.sin(x * 0.004 + step + i * 0.2) * (80 + i * 8) * Math.sin(x * 0.002) +
            Math.cos(step * 0.8 + i) * 30 * (1 - distFromFocal / width);

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 210, 143, ${p.alpha})`;
        ctx.fill();

        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(212, 176, 106, ${0.15 * (1 - dist / 110)})`;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="relative min-h-[90vh] pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#050505] flex items-center">
      {/* Radial Gold Glow */}
      <div className="absolute top-[-200px] right-[-100px] w-[600px] h-[600px] bg-[#D4B06A] opacity-[0.04] blur-[120px] rounded-full pointer-events-none" />

      {/* Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
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
            Digital Experiences That <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#D4B06A] via-[#F0D28F] to-[#C9A35E] bg-clip-text text-transparent font-serif">
              Grow Your Business.
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
            className="inline-flex flex-wrap items-center gap-3 p-3 px-4 rounded-xl bg-[#101010] border border-[#D4B06A]/40 text-xs text-neutral-200"
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
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/work"
              className="px-8 py-4 rounded-full border border-white/20 text-white hover:border-[#D4B06A] hover:text-[#D4B06A] text-xs uppercase tracking-widest font-semibold text-center transition-all"
            >
              View Our Work
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
