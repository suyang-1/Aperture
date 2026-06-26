'use client';

import { useEffect, useRef, useCallback } from 'react';

interface PerformanceMonitor {
  fps: number;
  shouldReduceEffects: boolean;
  disableAll: boolean;
}

export function usePerformanceMonitor(): React.MutableRefObject<PerformanceMonitor> {
  const monitor = useRef<PerformanceMonitor>({
    fps: 60,
    shouldReduceEffects: false,
    disableAll: false,
  });

  useEffect(() => {
    // Check prefers-reduced-motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      monitor.current.disableAll = true;
      return;
    }

    let frames = 0;
    let lastTime = performance.now();
    let rafId: number;

    const measure = () => {
      frames++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        const fps = Math.round((frames * 1000) / (now - lastTime));
        monitor.current.fps = fps;
        monitor.current.shouldReduceEffects = fps < 30;
        monitor.current.disableAll = fps < 15;
        frames = 0;
        lastTime = now;
      }
      rafId = requestAnimationFrame(measure);
    };

    rafId = requestAnimationFrame(measure);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      monitor.current.disableAll = e.matches;
    };
    mq.addEventListener('change', handleMotionChange);

    return () => {
      cancelAnimationFrame(rafId);
      mq.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return monitor;
}

export function useVisibilityPause(callback: (visible: boolean) => void) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    const handler = () => callbackRef.current(!document.hidden);
    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }, []);
}
