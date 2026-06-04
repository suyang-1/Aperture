'use client';

import { useEffect, useRef, useCallback } from 'react';
import { usePerformanceMonitor, useVisibilityPause } from '@/hooks/use-performance-monitor';

const CODE_WORDS = [
  'function', 'import', 'const', 'return', 'export', 'async',
  'await', 'class', '<div>', '{...}', '=>', 'let', 'interface',
  'type', 'useState', 'useEffect', 'npm', 'git', 'hook',
  'render', 'props', 'map()', 'filter', 'reduce', 'Promise',
  'try', 'catch', 'switch', 'default', 'new', 'this',
  '</>', 'null', 'void', 'true', '===', '!==', '&&',
];

interface CodeColumn {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  charIndex: number;
  opacity: number;
}

export default function CodeRainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const columnsRef = useRef<CodeColumn[]>([]);
  const animRef = useRef<number>(0);
  const visibleRef = useRef(true);
  const sectionVisibleRef = useRef(false);
  const fadeOpacityRef = useRef(0);
  const perf = usePerformanceMonitor();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let initialized = false;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      if (initialized) return;
      initialized = true;

      // Create columns with spacing
      const columnWidth = 90;
      const maxColumns = Math.min(15, Math.floor(canvas.width / columnWidth));
      const spacing = canvas.width / (maxColumns + 1);

      columnsRef.current = Array.from({ length: maxColumns }, (_, i) => ({
        x: spacing * (i + 1),
        y: -Math.random() * canvas.height,
        speed: 30 + Math.random() * 50, // px per second
        chars: Array.from({ length: 20 }, () =>
          CODE_WORDS[Math.floor(Math.random() * CODE_WORDS.length)]
        ),
        charIndex: Math.floor(Math.random() * 20),
        opacity: 0.15 + Math.random() * 0.1,
      }));
    };

    resize();
    window.addEventListener('resize', resize);

    let lastTime = 0;

    const draw = (timestamp: number) => {
      if (!canvas || !ctx) return;

      if (perf.current.disableAll || !visibleRef.current) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      const dt = lastTime ? (timestamp - lastTime) / 1000 : 0.016;
      lastTime = timestamp;

      // Fade in/out based on section visibility
      const targetOpacity = sectionVisibleRef.current ? 1 : 0;
      fadeOpacityRef.current += (targetOpacity - fadeOpacityRef.current) * 0.03;

      if (fadeOpacityRef.current < 0.01) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      // Skip if performance is low (drop code rain before particles)
      if (perf.current.shouldReduceEffects) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const globalAlpha = fadeOpacityRef.current;

      columnsRef.current.forEach(col => {
        col.y += col.speed * dt;

        // Reset column when it goes off screen
        if (col.y > canvas.height + 300) {
          col.y = -200;
          col.charIndex = (col.charIndex + 1) % col.chars.length;
        }

        // Draw characters vertically
        const charSpacing = 22;
        for (let j = 0; j < col.chars.length; j++) {
          const charY = col.y + j * charSpacing;
          if (charY < -20 || charY > canvas.height + 20) continue;

          // Head character brighter, tail fades
          const isHead = j === col.chars.length - 1;
          const tailFade = Math.max(0, 1 - (col.chars.length - j) / col.chars.length);
          const alpha = globalAlpha * col.opacity * (isHead ? 1 : tailFade * 0.7);

          if (alpha < 0.01) continue;

          ctx.font = `${isHead ? '13' : '11'}px monospace`;
          ctx.fillStyle = isHead
            ? `rgba(0, 212, 255, ${alpha * 1.2})`
            : `rgba(0, 180, 230, ${alpha})`;
          ctx.fillText(col.chars[j], col.x, charY);
        }

        // Slowly rotate keywords
        if (Math.random() < 0.002) {
          const idx = Math.floor(Math.random() * col.chars.length);
          col.chars[idx] = CODE_WORDS[Math.floor(Math.random() * CODE_WORDS.length)];
        }
      });

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    // Observe capabilities and projects sections
    const targets = document.querySelectorAll('#capabilities, #projects');
    const observer = new IntersectionObserver(
      (entries) => {
        sectionVisibleRef.current = entries.some(e => e.isIntersecting);
      },
      { threshold: 0.15, rootMargin: '50px' }
    );
    targets.forEach(t => observer.observe(t));

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      targets.forEach(t => observer.unobserve(t));
    };
  }, [perf]);

  useVisibilityPause(useCallback((visible: boolean) => {
    visibleRef.current = visible;
  }, []));

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[1]"
      aria-hidden="true"
    />
  );
}
