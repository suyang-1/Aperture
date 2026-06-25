'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronRight, MousePointerClick } from 'lucide-react';

/**
 * 八大行星按真实公转周期比例转动。
 * 真实公转周期（地球年）：水 0.241 / 金 0.615 / 地 1 / 火 1.881 / 木 11.862 / 土 29.457 / 天 84.011 / 海 164.79
 * 此处把 1 个地球年映射为 20 秒，其它行星等比例换算。
 */
const EARTH_YEAR_SECONDS = 20;

interface Planet {
  name: string;
  label: string;
  size: number;       // 行星直径 px
  orbit: number;      // 轨道直径 px
  yearsOnEarth: number; // 公转周期（地球年）
  startAngle: number; // 起始角度（度，让行星散布在不同位置）
  color: string;
  isEarth?: boolean;
  hasRing?: boolean;
}

const planets: Planet[] = [
  { name: 'mercury',  label: '水星', size: 5,  orbit: 110, yearsOnEarth: 0.241,   startAngle: 30,  color: 'radial-gradient(circle at 30% 30%, #cbd5e1 0%, #6b7280 70%, #374151 100%)' },
  { name: 'venus',    label: '金星', size: 8,  orbit: 160, yearsOnEarth: 0.615,   startAngle: 110, color: 'radial-gradient(circle at 30% 30%, #fde68a 0%, #f59e0b 60%, #92400e 100%)' },
  { name: 'earth',    label: '地球', size: 11, orbit: 220, yearsOnEarth: 1.0,     startAngle: 200, color: 'radial-gradient(circle at 32% 28%, #67e8f9 0%, #06b6d4 25%, #0369a1 65%, #082f49 100%)', isEarth: true },
  { name: 'mars',     label: '火星', size: 7,  orbit: 290, yearsOnEarth: 1.881,   startAngle: 320, color: 'radial-gradient(circle at 30% 30%, #fca5a5 0%, #dc2626 55%, #7f1d1d 100%)' },
  { name: 'jupiter',  label: '木星', size: 22, orbit: 400, yearsOnEarth: 11.862,  startAngle: 60,  color: 'linear-gradient(180deg, #fde68a 0%, #f97316 30%, #b45309 65%, #78350f 100%)' },
  { name: 'saturn',   label: '土星', size: 18, orbit: 500, yearsOnEarth: 29.457,  startAngle: 150, color: 'radial-gradient(circle at 30% 30%, #fef3c7 0%, #eab308 55%, #854d0e 100%)', hasRing: true },
  { name: 'uranus',   label: '天王星', size: 13, orbit: 590, yearsOnEarth: 84.011, startAngle: 240, color: 'radial-gradient(circle at 35% 30%, #a7f3d0 0%, #22d3ee 55%, #0e7490 100%)' },
  { name: 'neptune',  label: '海王星', size: 13, orbit: 680, yearsOnEarth: 164.79, startAngle: 320, color: 'radial-gradient(circle at 32% 30%, #93c5fd 0%, #2563eb 55%, #1e3a8a 100%)' },
];

export default function SolarSystem() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [entering, setEntering] = useState(false);
  const [hoverEarth, setHoverEarth] = useState(false);

  const enterTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
    router.prefetch('/portfolio');
    return () => {
      if (enterTimerRef.current !== null) {
        window.clearTimeout(enterTimerRef.current);
      }
    };
  }, [router]);

  const handleEnter = useCallback(() => {
    if (entering) return;
    setEntering(true);
    enterTimerRef.current = window.setTimeout(() => router.push('/portfolio'), 1100);
  }, [entering, router]);

  return (
    <main
      className={`relative min-h-screen w-full overflow-hidden bg-[#04060d] transition-all duration-1000 ${
        entering ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
      }`}
    >
      {/* Galaxy ambient image */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/intro-galaxy.jpg)', opacity: 0.55 }}
        aria-hidden
      />
      {/* Strong darken to push image to ambient role so foreground CSS solar system reads clearly */}
      <div className="absolute inset-0 bg-[#04060d]/55 pointer-events-none" />
      <div className="absolute inset-0 bg-vignette pointer-events-none" />
      {/* Subtle twinkle stars */}
      <div className="absolute inset-0 bg-stars opacity-40 pointer-events-none animate-star-twinkle" />

      {/* Top headline */}
      <div
        className={`relative z-10 pt-12 sm:pt-16 px-6 flex flex-col items-center text-center transition-all duration-1000 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
        }`}
      >
        <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs tracking-[0.4em] text-cyber-blue/80">
          <span className="w-6 h-px bg-cyber-blue/60" />
          SY · DIGITAL UNIVERSE
          <span className="w-6 h-px bg-cyber-blue/60" />
        </span>
        <h1 className="mt-4 text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-wide leading-tight drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]">
          欢迎来到 <span className="text-glow text-cyber-blue">袁苏洋</span> 的数字宇宙
        </h1>
        <p className="mt-3 text-slate-300 text-xs sm:text-sm max-w-md drop-shadow-[0_0_12px_rgba(0,0,0,0.9)]">
          点击轨道上的<span className="text-cyan-300 font-semibold">地球</span>
          ，进入探索
        </p>
        <p className="mt-2 text-[10px] tracking-[0.2em] text-slate-500">
          PLANETS REVOLVE AT REAL ORBITAL PERIOD RATIO
        </p>
      </div>

      {/* Solar system stage */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div className="relative w-[720px] h-[720px] scale-[0.42] sm:scale-[0.6] lg:scale-[0.85] xl:scale-100">
          {/* Sun */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full pointer-events-none animate-pulse-slow"
            style={{
              background:
                'radial-gradient(circle at 35% 35%, #fef9c3 0%, #fbbf24 30%, #ea580c 70%, #7f1d1d 100%)',
            }}
          />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-amber-400/20 blur-2xl pointer-events-none" />

          {/* Static orbit rings */}
          {planets.map((p) => (
            <div
              key={`orbit-${p.name}`}
              className={`absolute left-1/2 top-1/2 rounded-full border border-dashed pointer-events-none ${
                p.isEarth ? 'border-cyan-400/35' : 'border-cyber-blue/12'
              }`}
              style={{
                width: `${p.orbit}px`,
                height: `${p.orbit}px`,
                marginLeft: `-${p.orbit / 2}px`,
                marginTop: `-${p.orbit / 2}px`,
              }}
            />
          ))}

          {/* Rotating arms (one per planet) */}
          {planets.map((p) => {
            const duration = p.yearsOnEarth * EARTH_YEAR_SECONDS;
            // CSS animation negative delay shifts the start position to startAngle
            const delay = -((p.startAngle / 360) * duration);
            return (
              <div
                key={`arm-${p.name}`}
                className="absolute left-1/2 top-1/2 rounded-full pointer-events-none"
                style={{
                  width: `${p.orbit}px`,
                  height: `${p.orbit}px`,
                  marginLeft: `-${p.orbit / 2}px`,
                  marginTop: `-${p.orbit / 2}px`,
                  animation: `orbit-spin ${duration}s linear ${delay}s infinite`,
                }}
              >
                <div
                  className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2"
                  style={{ width: `${p.size}px`, height: `${p.size}px` }}
                >
                  {/* Saturn ring */}
                  {p.hasRing && (
                    <span
                      className="absolute left-1/2 top-1/2 rounded-full border-2 border-yellow-200/55 pointer-events-none"
                      style={{
                        width: `${p.size * 2.4}px`,
                        height: `${Math.max(p.size * 0.55, 6)}px`,
                        transform: 'translate(-50%, -50%) rotate(-22deg)',
                      }}
                    />
                  )}

                  {p.isEarth ? (
                    <button
                      type="button"
                      onClick={handleEnter}
                      onMouseEnter={() => setHoverEarth(true)}
                      onMouseLeave={() => setHoverEarth(false)}
                      aria-label="点击地球进入主页"
                      className="relative block rounded-full pointer-events-auto cursor-pointer animate-earth-glow transition-transform duration-300 hover:scale-[1.6]"
                      style={{
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        background: p.color,
                      }}
                    >
                      {/* atmosphere highlight */}
                      <span className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 via-transparent to-transparent" />
                      {/* pulse */}
                      <span className="absolute inset-0 rounded-full border border-cyan-300/80 animate-ping" />
                      {/* Hover label */}
                      <span
                        className={`absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[9px] tracking-[0.25em] text-cyan-200 whitespace-nowrap bg-[#0d1117]/90 border border-cyan-400/50 transition-opacity duration-200 ${
                          hoverEarth ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        ENTER →
                      </span>
                    </button>
                  ) : (
                    <div
                      className="rounded-full"
                      style={{
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        background: p.color,
                        boxShadow: '0 0 6px rgba(255,255,255,0.18)',
                      }}
                      aria-label={p.label}
                    />
                  )}
                </div>
              </div>
            );
          })}

          {/* Earth orbit standing label (rides Earth's orbit) */}
          {planets
            .filter((p) => p.isEarth)
            .map((p) => {
              const duration = p.yearsOnEarth * EARTH_YEAR_SECONDS;
              const delay = -((p.startAngle / 360) * duration);
              return (
                <div
                  key={`label-${p.name}`}
                  className="absolute left-1/2 top-1/2 rounded-full pointer-events-none"
                  style={{
                    width: `${p.orbit}px`,
                    height: `${p.orbit}px`,
                    marginLeft: `-${p.orbit / 2}px`,
                    marginTop: `-${p.orbit / 2}px`,
                    animation: `orbit-spin ${duration}s linear ${delay}s infinite`,
                  }}
                >
                  <span
                    className="absolute top-1/2 right-0 translate-x-[28px] -translate-y-1/2 text-[10px] tracking-[0.3em] text-cyan-300 whitespace-nowrap"
                    style={{ textShadow: '0 0 8px rgba(34,211,238,0.6)' }}
                  >
                    ★ EARTH
                  </span>
                </div>
              );
            })}
        </div>
      </div>

      {/* Bottom hint + skip */}
      <div
        className={`absolute bottom-8 left-0 right-0 z-10 flex flex-col items-center gap-3 transition-all duration-1000 delay-300 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] text-slate-400">
          <MousePointerClick className="w-3 h-3 text-cyan-300" />
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
