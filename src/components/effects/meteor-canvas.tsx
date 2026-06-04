'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { usePerformanceMonitor, useVisibilityPause } from '@/hooks/use-performance-monitor';

interface Meteor {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  angle: number;
  active: boolean;
}

export default function MeteorCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const meteorsRef = useRef<Meteor[]>([]);
  const animRef = useRef<number>(0);
  const visibleRef = useRef(true);
  const [canvasOpacity, setCanvasOpacity] = useState(1);
  const heroVisibleRef = useRef(true);
  const lastSpawnRef = useRef(0);
  const perf = usePerformanceMonitor();

  const createMeteor = useCallback((canvas: HTMLCanvasElement): Meteor => {
    // Spawn from right side, upper portion
    const startX = canvas.width * (0.4 + Math.random() * 0.6);
    const startY = -20 + Math.random() * canvas.height * 0.3;
    const length = 80 + Math.random() * 120;
    const speed = canvas.height / (0.8 + Math.random() * 1.2); // 0.8-2s to cross
    const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.15; // ~45° with slight variance

    return {
      x: startX,
      y: startY,
      length,
      speed,
      opacity: 0.3 + Math.random() * 0.2,
      angle,
      active: true,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = (timestamp: number) => {
      if (!canvas || !ctx) return;

      // Check performance
      if (perf.current.disableAll) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      // Check visibility
      if (!visibleRef.current || !heroVisibleRef.current) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn new meteors intermittently
      const activeCount = meteorsRef.current.filter(m => m.active).length;
      const spawnInterval = 400 + Math.random() * 600; // intermittent
      if (activeCount < 5 && timestamp - lastSpawnRef.current > spawnInterval) {
        meteorsRef.current.push(createMeteor(canvas));
        lastSpawnRef.current = timestamp;
      }

      // Update and draw meteors
      const dt = 1 / 60; // approximate frame time
      meteorsRef.current = meteorsRef.current.filter(meteor => {
        if (!meteor.active) return false;

        meteor.x += Math.cos(meteor.angle) * meteor.speed * dt;
        meteor.y += Math.sin(meteor.angle) * meteor.speed * dt;

        // Out of bounds
        if (meteor.y > canvas.height + 50 || meteor.x < -50) {
          return false;
        }

        // Draw meteor: head bright point + fading tail
        const tailX = meteor.x - Math.cos(meteor.angle) * meteor.length;
        const tailY = meteor.y - Math.sin(meteor.angle) * meteor.length;

        const gradient = ctx.createLinearGradient(meteor.x, meteor.y, tailX, tailY);
        // Head: bright cyber-blue
        gradient.addColorStop(0, `rgba(0, 212, 255, ${meteor.opacity})`);
        // Mid: dimmer
        gradient.addColorStop(0.15, `rgba(0, 180, 230, ${meteor.opacity * 0.6})`);
        // Tail: fade to transparent
        gradient.addColorStop(1, `rgba(0, 150, 200, 0)`);

        ctx.beginPath();
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Bright head dot
        ctx.beginPath();
        ctx.arc(meteor.x, meteor.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${meteor.opacity * 1.5})`;
        ctx.fill();

        // Glow around head
        const glow = ctx.createRadialGradient(meteor.x, meteor.y, 0, meteor.x, meteor.y, 8);
        glow.addColorStop(0, `rgba(0, 212, 255, ${meteor.opacity * 0.4})`);
        glow.addColorStop(1, `rgba(0, 212, 255, 0)`);
        ctx.beginPath();
        ctx.arc(meteor.x, meteor.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        return true;
      });

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    // Observe hero visibility
    const heroSection = document.getElementById('home');
    if (heroSection) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          heroVisibleRef.current = entry.isIntersecting;
          setCanvasOpacity(entry.isIntersecting ? 1 : 0);
        },
        { threshold: 0.1 }
      );
      observer.observe(heroSection);
    }

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [createMeteor, perf]);

  useVisibilityPause(useCallback((visible: boolean) => {
    visibleRef.current = visible;
  }, []));

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[1]"
      style={{ opacity: canvasOpacity, transition: 'opacity 0.5s ease' }}
      aria-hidden="true"
    />
  );
}
