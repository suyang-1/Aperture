'use client';

import { useCallback, useRef, useState } from 'react';

interface ParallaxOptions {
  intensity?: number;
}

export function useParallax(options: ParallaxOptions = {}) {
  const { intensity = 0.02 } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [rawOffset, setRawOffset] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = (e.clientX - centerX) * intensity;
        const dy = (e.clientY - centerY) * intensity;
        setRawOffset({ x: dx, y: dy });
      });
    },
    [intensity]
  );

  const onMouseLeave = useCallback(() => {
    setRawOffset({ x: 0, y: 0 });
  }, []);

  // Returns a CSS transform string with an optional multiplier
  const offset = useCallback(
    (multiplier: number = 1) => {
      return `translate3d(${rawOffset.x * multiplier}px, ${rawOffset.y * multiplier}px, 0)`;
    },
    [rawOffset.x, rawOffset.y]
  );

  return { ref, offset, onMouseMove, onMouseLeave };
}
