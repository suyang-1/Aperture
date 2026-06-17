'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface Planet {
  name: string;
  label: string;
  size: number;
  orbit: number;
  duration: number;
  delay: number;
  color: string;
  isEarth?: boolean;
  hasRing?: boolean;
}

const planets: Planet[] = [
  { name: 'mercury', label: '水星', size: 6, orbit: 160, duration: 8, delay: 0, color: '#cbd5e1' },
  { name: 'venus', label: '金星', size: 9, orbit: 230, duration: 14, delay: -3, color: 'radial-gradient(circle at 30% 30%, #fde68a 0%, #f59e0b 70%, #92400e 100%)' },
  {
    name: 'earth',
    label: '地球 · ENTER',
    size: 18,
    orbit: 320,
    duration: 22,
    delay: -1,
    color: 'radial-gradient(circle at 32% 30%, #67e8f9 0%, #06b6d4 32%, #0369a1 70%, #082f49 100%)',
    isEarth: true,
  },
  { name: 'mars', label: '火星', size: 9, orbit: 410, duration: 32, delay: -10, color: 'radial-gradient(circle at 30% 30%, #fca5a5 0%, #dc2626 60%, #7f1d1d 100%)' },
  { name: 'jupiter', label: '木星', size: 24, orbit: 530, duration: 50, delay: -5, color: 'linear-gradient(180deg, #fde68a 0%, #f59e0b 45%, #b45309 100%)' },
  { name: 'saturn', label: '土星', size: 18, orbit: 660, duration: 65, delay: -15, color: 'radial-gradient(circle at 30% 30%, #fde68a 0%, #eab308 70%, #854d0e 100%)', hasRing: true },
];

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
      {/* Galaxy nebula layer */}
      <div className="absolute inset-0 bg-galaxy pointer-events-none" />
      {/* Deep star field */}
      <div className="absolute inset-0 bg-stars-deep animate-star-twinkle pointer-events-none" />
      {/* Tile grid star field for density */}
      <div className="absolute inset-0 bg-stars opacity-60 pointer-events-none" />
      {/* Vignette */}
      <div className="absolute inset-0 bg-vignette pointer-events-none" />

      {/* Top headline */}
      <div
        className={`relative z-10 pt-16 sm:pt-24 px-6 flex flex-col items-center text-center transition-all duration-1000 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
        }`}
      >
        <span className="text-[10px] sm:text-xs tracking-[0.4em] text-cyber-blue/70">
          SY · DIGITAL UNIVERSE
        </span>
        <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold text-white tracking-wide leading-tight">
          欢迎来到 <span className="text-glow text-cyber-blue">袁苏洋</span> 的数字宇宙
        </h1>
        <p className="mt-3 text-slate-400 text-xs sm:text-sm max-w-md">
          点击轨道上的<span className="text-cyan-300 font-semibold">地球</span>
          ，启程探索智能交互与赛博安全的星河。
        </p>
      </div>

      {/* Solar system stage */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div className="relative w-[680px] h-[680px] scale-[0.5] sm:scale-75 lg:scale-100">
          {/* Sun */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full pointer-events-none animate-pulse-slow"
            style={{
              background:
                'radial-gradient(circle at 35% 35%, #fef3c7 0%, #fbbf24 35%, #ea580c 80%, #7f1d1d 100%)',
            }}
          />
          {/* Sun corona */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-amber-400/10 blur-2xl pointer-events-none" />

          {/* Static orbits */}
          {planets.map((p) => (
            <div
              key={`orbit-${p.name}`}
              className={`absolute left-1/2 top-1/2 rounded-full border border-dashed pointer-events-none ${
                p.isEarth ? 'border-cyan-400/30' : 'border-cyber-blue/10'
              }`}
              style={{
                width: `${p.orbit}px`,
                height: `${p.orbit}px`,
                marginLeft: `-${p.orbit / 2}px`,
                marginTop: `-${p.orbit / 2}px`,
              }}
            />
          ))}

          {/* Planet arms (rotating) */}
          {planets.map((p) => (
            <div
              key={`arm-${p.name}`}
              className="absolute left-1/2 top-1/2 rounded-full pointer-events-none"
              style={{
                width: `${p.orbit}px`,
                height: `${p.orbit}px`,
                marginLeft: `-${p.orbit / 2}px`,
                marginTop: `-${p.orbit / 2}px`,
                animation: `orbit-spin ${p.duration}s linear ${p.delay}s infinite`,
              }}
            >
              {/* Planet container */}
              <div
                className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2"
                style={{ width: `${p.size}px`, height: `${p.size}px` }}
              >
                {/* Saturn ring (drawn behind body) */}
                {p.hasRing && (
                  <span
                    className="absolute left-1/2 top-1/2 rounded-full border-2 border-yellow-200/50 pointer-events-none"
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
                    className="relative block rounded-full pointer-events-auto cursor-pointer animate-earth-glow transition-transform duration-300 hover:scale-150"
                    style={{
                      width: `${p.size}px`,
                      height: `${p.size}px`,
                      background: p.color,
                    }}
                  >
                    {/* Pulse ring */}
                    <span className="absolute inset-0 rounded-full border border-cyan-300/80 animate-ping" />
                    {/* Hover label */}
                    <span
                      className={`absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[9px] tracking-[0.25em] text-cyan-200 whitespace-nowrap bg-[#0d1117]/90 border border-cyan-400/40 transition-opacity duration-300 ${
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
          ))}

          {/* Earth standing label (always visible, follows orbit) */}
          {planets
            .filter((p) => p.isEarth)
            .map((p) => (
              <div
                key={`label-${p.name}`}
                className="absolute left-1/2 top-1/2 rounded-full pointer-events-none"
                style={{
                  width: `${p.orbit}px`,
                  height: `${p.orbit}px`,
                  marginLeft: `-${p.orbit / 2}px`,
                  marginTop: `-${p.orbit / 2}px`,
                  animation: `orbit-spin ${p.duration}s linear ${p.delay}s infinite`,
                }}
              >
                <span
                  className="absolute top-1/2 right-0 translate-x-[28px] -translate-y-1/2 text-[10px] tracking-[0.3em] text-cyan-300 whitespace-nowrap"
                  style={{ textShadow: '0 0 8px rgba(34,211,238,0.6)' }}
                >
                  ★ EARTH
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* Bottom hint */}
      <div
        className={`absolute bottom-10 left-0 right-0 z-10 flex flex-col items-center gap-3 transition-all duration-1000 delay-300 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <span className="text-[11px] tracking-[0.3em] text-slate-500">
          CLICK · EARTH · TO · ENTER
        </span>
        <button
          type="button"
          onClick={handleEnter}
          className="btn-elastic group inline-flex items-center gap-1.5 px-4 py-1.5 text-[10px] tracking-[0.25em] text-slate-400 hover:text-cyber-blue border border-slate-700 hover:border-cyber-blue/60 rounded-full transition-colors"
        >
          SKIP
          <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Hyperspace overlay during transition */}
      {entering && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className="absolute inset-0 bg-cyber-blue/15 animate-hyperspace" />
          <div className="absolute inset-0 bg-[#06080f] opacity-0 animate-[fadeInUp_1s_ease-in_forwards]" />
        </div>
      )}
    </main>
  );
}
