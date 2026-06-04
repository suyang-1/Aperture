'use client';

import { useCallback, useRef, useState } from 'react';

export function useMouseSpotlight() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setVisible(false);
  }, []);

  const spotlightStyle = visible
    ? `radial-gradient(300px circle at ${pos.x}px ${pos.y}px, rgba(0,212,255,0.07), transparent 60%)`
    : 'none';

  return { ref: cardRef, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave, spotlightStyle, visible };
}
