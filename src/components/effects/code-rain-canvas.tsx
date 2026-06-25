'use client';

import { useEffect, useRef, useCallback } from 'react';
import { usePerformanceMonitor, useVisibilityPause } from '@/hooks/use-performance-monitor';

// Blue layer: tech keywords
const CODE_WORDS = [
  'function', 'import', 'const', 'return', 'export', 'async',
  'await', 'class', '<div>', '{...}', '=>', 'let', 'interface',
  'type', 'useState', 'useEffect', 'npm', 'git', 'hook',
  'render', 'props', 'map()', 'filter', 'reduce', 'Promise',
  'try', 'catch', 'switch', 'default', 'new', 'this',
  '</>', 'null', 'void', 'true', '===', '!==', '&&',
];

// Green layer: single characters (Matrix-style)
const GREEN_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*<>{}[]|/\\';

interface BlueColumn {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  charIndex: number;
  opacity: number;
}

interface GreenColumn {
  x: number;
  y: number;
  speed: number;
  char: string;
  length: number;       // trail length
  charSize: number;     // font size
  opacity: number;
  flickerTimer: number; // time until char changes
}

export default function CodeRainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const blueColsRef = useRef<BlueColumn[]>([]);
  const greenColsRef = useRef<GreenColumn[]>([]);
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

      const w = canvas.width;

      // --- Blue keyword columns (sparse) ---
      const blueColWidth = 90;
      const maxBlue = Math.min(15, Math.floor(w / blueColWidth));
      const blueSpacing = w / (maxBlue + 1);

      blueColsRef.current = Array.from({ length: maxBlue }, (_, i) => ({
        x: blueSpacing * (i + 1),
        y: -Math.random() * canvas.height,
        speed: 30 + Math.random() * 50,
        chars: Array.from({ length: 20 }, () =>
          CODE_WORDS[Math.floor(Math.random() * CODE_WORDS.length)]
        ),
        charIndex: Math.floor(Math.random() * 20),
        opacity: 0.15 + Math.random() * 0.1,
      }));

      // --- Green character columns (dense, Matrix-style) ---
      const greenColWidth = 18; // dense spacing
      const maxGreen = Math.min(50, Math.floor(w / greenColWidth));
      const greenSpacing = w / (maxGreen + 1);

      greenColsRef.current = Array.from({ length: maxGreen }, (_, i) => ({
        x: greenSpacing * (i + 1) + (Math.random() - 0.5) * 4,
        y: -Math.random() * canvas.height * 1.5,
        speed: 60 + Math.random() * 100, // faster than blue
        char: GREEN_CHARS[Math.floor(Math.random() * GREEN_CHARS.length)],
        length: 8 + Math.floor(Math.random() * 20), // trail 8-28 chars
        charSize: 10 + Math.floor(Math.random() * 4), // 10-14px
        opacity: 0.12 + Math.random() * 0.13, // 0.12-0.25
        flickerTimer: Math.random() * 0.1,
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

      // Skip if performance is low
      if (perf.current.shouldReduceEffects) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const globalAlpha = fadeOpacityRef.current;

      // --- Draw green character rain (behind blue) ---
      greenColsRef.current.forEach(col => {
        col.y += col.speed * dt;

        // Flicker: randomly change character
        col.flickerTimer -= dt;
        if (col.flickerTimer <= 0) {
          col.char = GREEN_CHARS[Math.floor(Math.random() * GREEN_CHARS.length)];
          col.flickerTimer = 0.03 + Math.random() * 0.08;
        }

        // Reset when off screen
        if (col.y > canvas.height + col.length * col.charSize + 50) {
          col.y = -(col.length * col.charSize + Math.random() * 200);
          col.char = GREEN_CHARS[Math.floor(Math.random() * GREEN_CHARS.length)];
        }

        const lineH = col.charSize + 2;

        // Draw trail
        for (let j = 0; j < col.length; j++) {
          const charY = col.y - j * lineH;
          if (charY < -20 || charY > canvas.height + 20) continue;

          const isHead = j === 0;
          // Head is bright, trail fades out
          const trailFade = Math.max(0, 1 - j / col.length);
          const alpha = globalAlpha * col.opacity * (isHead ? 1.0 : trailFade * 0.6);

          if (alpha < 0.005) continue;

          if (isHead) {
            // Head: bright white-green
            ctx.font = `bold ${col.charSize}px monospace`;
            ctx.fillStyle = `rgba(180, 255, 180, ${Math.min(alpha * 1.5, 0.6)})`;
          } else {
            // Trail: green fade
            ctx.font = `${col.charSize}px monospace`;
            const g = isHead ? 255 : Math.floor(160 + trailFade * 95);
            ctx.fillStyle = `rgba(0, ${g}, 0, ${alpha})`;
          }

          // Randomly swap char for trail segments
          const displayChar = j === 0
            ? col.char
            : GREEN_CHARS[(GREEN_CHARS.indexOf(col.char) + j * 7) % GREEN_CHARS.length];
          ctx.fillText(displayChar, col.x, charY);
        }
      });

      // --- Draw blue keyword columns (on top) ---
      blueColsRef.current.forEach(col => {
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
      observer.disconnect();
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
