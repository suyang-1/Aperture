'use client';

import { useEffect, useRef, useCallback } from 'react';
import { usePerformanceMonitor, useVisibilityPause } from '@/hooks/use-performance-monitor';

const MAX_PARTICLES = 12;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  life: number;
  maxLife: number;
  hue: number;
}

export default function ParticleTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const visibleRef = useRef(true);
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0, moving: false });
  const perf = usePerformanceMonitor();

  useEffect(() => {
    // Skip on touch devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.moving = true;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let lastTime = 0;

    const draw = (timestamp: number) => {
      if (!canvas || !ctx) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      // Check if particle trail should be disabled
      if (perf.current.disableAll || !visibleRef.current) {
        if (particlesRef.current.length > 0) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          particlesRef.current = [];
        }
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      const dt = lastTime ? Math.min((timestamp - lastTime) / 1000, 0.05) : 0.016;
      lastTime = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn particles on mouse move (max 2 per frame)
      if (mouseRef.current.moving && particlesRef.current.length < MAX_PARTICLES) {
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const dx = mx - mouseRef.current.prevX;
        const dy = my - mouseRef.current.prevY;
        const count = Math.min(2, MAX_PARTICLES - particlesRef.current.length);

        for (let i = 0; i < count; i++) {
          const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 1.2;
          const speed = 0.5 + Math.random() * 1;
          particlesRef.current.push({
            x: mx + (Math.random() - 0.5) * 6,
            y: my + (Math.random() - 0.5) * 6,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            radius: 2 + Math.random() * 2,
            life: 0.6,
            maxLife: 0.6,
            hue: 190 + (Math.random() - 0.5) * 20, // cyber-blue with slight hue variance
          });
        }
        mouseRef.current.moving = false;
      }

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(p => {
        p.life -= dt;
        if (p.life <= 0) return false;

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;

        const lifeRatio = p.life / p.maxLife;
        const alpha = lifeRatio * 0.8;
        const r = p.radius * (0.5 + lifeRatio * 0.5);

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 60%, ${alpha})`;
        ctx.fill();

        // Soft glow
        if (alpha > 0.2) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, r * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 100%, 60%, ${alpha * 0.15})`;
          ctx.fill();
        }

        return true;
      });

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [perf]);

  useVisibilityPause(useCallback((visible: boolean) => {
    visibleRef.current = visible;
  }, []));

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      aria-hidden="true"
    />
  );
}
