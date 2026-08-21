import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * AmbientBackground
 * Master cinematic continuous ambient canvas background:
 * - Layer 1: Dark Obsidian base with slow moving radial atmospheric auroras
 *   (Midnight-Indigo, Violet, Subtle Cyan, Metallic Gold, Coral)
 * - Layer 2: Parallax scroll-responsive grid curves and nodes
 * - Layer 3: Floating micro-particles with depth, vertical & horizontal drift,
 *   soft glow, and subtle proximity line connections.
 * - Auto-pauses when hidden / prefers-reduced-motion.
 */
export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Keep admin clean and hyper-performant
    if (location.pathname.startsWith('/admin')) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates with smooth interpolation
    let targetMouseX = width * 0.5;
    let targetMouseY = height * 0.3;
    let mouseX = targetMouseX;
    let mouseY = targetMouseY;

    // Scroll offset tracking (mutable without React state)
    let currentScrollY = window.scrollY;
    let smoothScrollY = currentScrollY;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleScroll = () => {
      currentScrollY = window.scrollY;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    // Micro-particle setup (budgeted for high FPS)
    const particleCount = isMobile ? 18 : 36;
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseAlpha: number;
      color: string;
      phase: number;
      depth: number;
    }

    const colorPalette = [
      'rgba(212, 176, 106, ', // Gold
      'rgba(240, 210, 143, ', // Soft Gold
      'rgba(139, 92, 246, ',  // Violet
      'rgba(56, 189, 248, ',  // Subtle Cyan
      'rgba(251, 113, 133, ', // Subtle Coral
    ];

    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * (isMobile ? 0.12 : 0.22),
      vy: (Math.random() - 0.5) * (isMobile ? 0.12 : 0.22) - 0.04,
      size: Math.random() * 1.5 + 0.6,
      baseAlpha: Math.random() * 0.35 + 0.1,
      color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
      phase: Math.random() * Math.PI * 2,
      depth: Math.random() * 0.6 + 0.4,
    }));

    let time = 0;
    let isVisible = !document.hidden;

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible && !prefersReducedMotion) {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    let lastTime = performance.now();

    const render = (now: number) => {
      if (!isVisible) return;

      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (!prefersReducedMotion) {
        time += delta * 0.35;
        // Smooth cursor easing
        mouseX += (targetMouseX - mouseX) * 0.04;
        mouseY += (targetMouseY - mouseY) * 0.04;
        // Smooth scroll parallax
        smoothScrollY += (currentScrollY - smoothScrollY) * 0.05;
      }

      ctx.clearRect(0, 0, width, height);

      // --- LAYER 1: Continuous Multi-Cycle Moving Radial Auroras ---
      // Aurora 1: Top-Right Violet / Gold Slow Drift (Period ~28s)
      const a1X = width * 0.72 + Math.sin(time * 0.45) * (isMobile ? 35 : 85) + (mouseX - width * 0.5) * 0.025;
      const a1Y = height * 0.18 + Math.cos(time * 0.32) * (isMobile ? 25 : 60) - smoothScrollY * 0.08;
      const g1 = ctx.createRadialGradient(a1X, a1Y, 15, a1X, a1Y, width * (isMobile ? 0.6 : 0.48));
      g1.addColorStop(0, 'rgba(124, 58, 237, 0.08)'); // Violet core
      g1.addColorStop(0.4, 'rgba(212, 176, 106, 0.045)'); // Gold rim
      g1.addColorStop(0.75, 'rgba(6, 182, 212, 0.02)'); // Cyan trace
      g1.addColorStop(1, 'rgba(5, 5, 5, 0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);

      // Aurora 2: Bottom-Left Midnight Indigo / Coral Glow (Period ~36s)
      const a2X = width * 0.22 + Math.cos(time * 0.38) * (isMobile ? 30 : 75) + (mouseX - width * 0.5) * 0.02;
      const a2Y = height * 0.8 + Math.sin(time * 0.48) * (isMobile ? 30 : 65) - smoothScrollY * 0.05;
      const g2 = ctx.createRadialGradient(a2X, a2Y, 20, a2X, a2Y, width * (isMobile ? 0.55 : 0.44));
      g2.addColorStop(0, 'rgba(30, 27, 75, 0.16)'); // Midnight indigo
      g2.addColorStop(0.45, 'rgba(251, 113, 133, 0.03)'); // Subtle coral
      g2.addColorStop(0.8, 'rgba(139, 92, 246, 0.015)');
      g2.addColorStop(1, 'rgba(5, 5, 5, 0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, width, height);

      // Aurora 3: Center-Bottom Subtle Gold Light Pulse (Period ~22s)
      const a3X = width * 0.5 + Math.sin(time * 0.55) * 50;
      const a3Y = height * 0.55 + Math.cos(time * 0.4) * 40 - smoothScrollY * 0.03;
      const g3 = ctx.createRadialGradient(a3X, a3Y, 10, a3X, a3Y, width * 0.35);
      g3.addColorStop(0, 'rgba(212, 176, 106, 0.035)');
      g3.addColorStop(0.6, 'rgba(56, 189, 248, 0.012)');
      g3.addColorStop(1, 'rgba(5, 5, 5, 0)');
      ctx.fillStyle = g3;
      ctx.fillRect(0, 0, width, height);

      // Interactive Desktop Cursor Spotlight
      if (!isMobile && !prefersReducedMotion) {
        const gMouse = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 340);
        gMouse.addColorStop(0, 'rgba(212, 176, 106, 0.04)');
        gMouse.addColorStop(0.4, 'rgba(139, 92, 246, 0.015)');
        gMouse.addColorStop(1, 'rgba(5, 5, 5, 0)');
        ctx.fillStyle = gMouse;
        ctx.fillRect(0, 0, width, height);
      }

      // --- LAYER 2: Floating Micro-Particles & Soft Proximity Threads ---
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx * p.depth;
          p.y += p.vy * p.depth;
          p.phase += 0.02;

          // Seamless edge wrapping
          if (p.x < -15) p.x = width + 15;
          if (p.x > width + 15) p.x = -15;
          if (p.y < -15) p.y = height + 15;
          if (p.y > height + 15) p.y = -15;
        }

        const alpha = p.baseAlpha * (0.6 + 0.4 * Math.sin(p.phase));
        
        // Render node particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.depth, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${alpha})`;
        ctx.fill();

        // Subtle proximity line connections between select particles
        if (!isMobile && i % 2 === 0) {
          for (let j = i + 1; j < particles.length; j += 3) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 110) {
              const lineAlpha = (1 - dist / 110) * 0.12 * p.depth;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(212, 176, 106, ${lineAlpha})`;
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    lastTime = performance.now();
    render(lastTime);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [location.pathname]);

  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <div 
      aria-hidden="true" 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block opacity-95 transition-opacity duration-1000"
      />
    </div>
  );
}
