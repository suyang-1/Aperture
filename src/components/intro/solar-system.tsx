'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { ChevronRight, MousePointerClick } from 'lucide-react';

export default function SolarSystem() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [entering, setEntering] = useState(false);
  const [hoverEarth, setHoverEarth] = useState(false);

  useEffect(() => {
    setMounted(true);
    router.prefetch('/portfolio');
  }, [router]);

  const handleEnter = useCallback(() => {
    if (entering) return;
    setEntering(true);
    window.setTimeout(() => router.push('/portfolio'), 1100);
  }, [entering, router]);

  return (
    <main
      className={`relative min-h-screen w-full overflow-hidden bg-[#04060d] transition-all duration-1000 ${
        entering ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
      }`}
    >
      {/* Galaxy reference image background */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/intro-galaxy.jpg)' }}
        aria-hidden
      />

      {/* Top/bottom darkening for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#04060d]/80 via-[#04060d]/10 to-[#04060d]/85 pointer-events-none" />
      {/* Center vignette + cool tint */}
      <div className="absolute inset-0 bg-vignette pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,212,255,0.05)_0%,_transparent_60%)] pointer-events-none" />

      {/* Twinkle stars overlay (subtle on top of image) */}
      <div className="absolute inset-0 bg-stars opacity-30 pointer-events-none animate-star-twinkle" />

      {/* Top headline */}
      <div
        className={`relative z-10 pt-16 sm:pt-24 px-6 flex flex-col items-center text-center transition-all duration-1000 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
        }`}
      >
        <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs tracking-[0.4em] text-cyber-blue/80">
          <span className="w-6 h-px bg-cyber-blue/60" />
          SY · DIGITAL UNIVERSE
          <span className="w-6 h-px bg-cyber-blue/60" />
        </span>
        <h1 className="mt-5 text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-wide leading-tight drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]">
          欢迎来到 <span className="text-glow text-cyber-blue">袁苏洋</span> 的数字宇宙
        </h1>
        <p className="mt-4 text-slate-300 text-xs sm:text-sm max-w-md drop-shadow-[0_0_12px_rgba(0,0,0,0.9)]">
          点击星河中的<span className="text-cyan-300 font-semibold">地球</span>
          ，启程探索智能交互与赛博安全的星河。
        </p>
      </div>

      {/* Center: Clickable Earth */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div
          className={`relative pointer-events-auto transition-all duration-1000 ${
            mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
        >
          {/* Outer dashed orbit ring (decorative) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full border border-dashed border-cyan-400/25 animate-[orbit-spin_60s_linear_infinite]" />
          {/* Mid solid orbit ring */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-cyan-400/20" />
          {/* Inner glow ring */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] rounded-full bg-cyan-400/5 blur-2xl" />

          {/* Pulse rings */}
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-cyan-300/40 animate-ping" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-cyan-300/60 animate-[ping_2.4s_ease-out_infinite]" />

          {/* Hover label (top) */}
          <span
            className={`absolute left-1/2 -translate-x-1/2 -top-14 px-3 py-1 rounded-full bg-[#0d1117]/90 backdrop-blur-sm border border-cyan-400/50 text-[10px] tracking-[0.3em] text-cyan-200 whitespace-nowrap transition-all duration-300 ${
              hoverEarth ? 'opacity-100 translate-y-0' : 'opacity-70 translate-y-1'
            }`}
            style={{ textShadow: '0 0 8px rgba(34,211,238,0.6)' }}
          >
            ★ EARTH · ENTER
          </span>

          {/* Earth button */}
          <button
            type="button"
            onClick={handleEnter}
            onMouseEnter={() => setHoverEarth(true)}
            onMouseLeave={() => setHoverEarth(false)}
            aria-label="点击地球进入主页"
            className="relative block w-20 h-20 rounded-full cursor-pointer animate-earth-glow transition-transform duration-500 hover:scale-110 active:scale-95"
            style={{
              background:
                'radial-gradient(circle at 32% 28%, #67e8f9 0%, #06b6d4 22%, #0284c7 45%, #0369a1 70%, #082f49 100%)',
            }}
          >
            {/* Earth surface texture overlay (continents-ish) */}
            <span
              className="absolute inset-0 rounded-full opacity-70 mix-blend-overlay"
              style={{
                background:
                  'radial-gradient(ellipse 22px 14px at 30% 40%, rgba(16,185,129,0.85) 0%, transparent 60%),' +
                  'radial-gradient(ellipse 16px 22px at 65% 55%, rgba(16,185,129,0.7) 0%, transparent 65%),' +
                  'radial-gradient(ellipse 12px 8px at 50% 75%, rgba(16,185,129,0.6) 0%, transparent 65%)',
              }}
            />
            {/* Atmosphere highlight */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 via-transparent to-transparent" />
            {/* Outer atmosphere ring */}
            <span className="absolute -inset-1 rounded-full border border-cyan-300/30" />
          </button>

          {/* Below hint */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 top-[calc(100%+1.25rem)] flex items-center gap-2 text-[10px] tracking-[0.3em] text-slate-400 whitespace-nowrap transition-opacity duration-300 ${
              hoverEarth ? 'opacity-100' : 'opacity-60'
            }`}
          >
            <MousePointerClick className="w-3 h-3 text-cyan-300" />
            CLICK TO LAUNCH
          </div>
        </div>
      </div>

      {/* Bottom skip */}
      <div
        className={`absolute bottom-8 left-0 right-0 z-10 flex flex-col items-center gap-3 transition-all duration-1000 delay-300 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <span className="text-[11px] tracking-[0.3em] text-slate-500">
          CLICK · EARTH · TO · ENTER
        </span>
        <button
          type="button"
          onClick={handleEnter}
          className="btn-elastic group inline-flex items-center gap-1.5 px-4 py-1.5 text-[10px] tracking-[0.25em] text-slate-400 hover:text-cyber-blue border border-slate-700 hover:border-cyber-blue/60 rounded-full transition-colors backdrop-blur-sm bg-[#06080f]/40"
        >
          SKIP
          <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Hyperspace overlay during transition */}
      {entering && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className="absolute inset-0 bg-cyber-blue/15 animate-hyperspace" />
        </div>
      )}
    </main>
  );
}
