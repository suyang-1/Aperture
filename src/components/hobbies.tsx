'use client';

import { useEffect, useRef, useState } from 'react';
import { PenTool, Stamp, Zap, Disc3 } from 'lucide-react';
import { useMouseSpotlight } from '@/hooks/use-mouse-spotlight';

const hobbyItems = [
  {
    id: 'seal-carving',
    title: '篆刻',
    subtitle: 'SEAL CARVING',
    icon: Stamp,
    blurb: '刀石之间，方寸天地。',
  },
  {
    id: 'calligraphy',
    title: '写字',
    subtitle: 'CALLIGRAPHY',
    icon: PenTool,
    blurb: '提笔写心，临池不辍。',
  },
  {
    id: 'badminton',
    title: '羽毛球',
    subtitle: 'BADMINTON',
    icon: Zap,
    blurb: '挥拍奔跑，释放压力。',
  },
  {
    id: 'table-tennis',
    title: '乒乓球',
    subtitle: 'TABLE TENNIS',
    icon: Disc3,
    blurb: '快攻博弈，专注当下。',
  },
];

/* ---------- Spotlight Card ---------- */
function SpotlightCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, onMouseMove, onMouseLeave, spotlightStyle } =
    useMouseSpotlight();

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`relative overflow-hidden rounded-xl ${className ?? ''}`}
    >
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{ background: spotlightStyle }}
      />
      {children}
    </div>
  );
}

/* ---------- Hobby Card ---------- */
function HobbyCard({
  hobby,
  index,
  isVisible,
}: {
  hobby: (typeof hobbyItems)[number];
  index: number;
  isVisible: boolean;
}) {
  const Icon = hobby.icon;

  return (
    <SpotlightCard
      className={`bg-[#0d1117] border border-cyber-blue-dim p-6 group transition-all duration-700 hover:border-cyber-blue/40 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,212,255,0.08)] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div
        className="flex flex-col items-start gap-4"
        style={{ transitionDelay: `${index * 120}ms` }}
      >
        <div className="w-12 h-12 rounded-lg bg-cyber-blue/10 border border-cyber-blue/20 flex items-center justify-center group-hover:bg-cyber-blue/15 group-hover:border-cyber-blue/30 transition-colors">
          <Icon className="w-6 h-6 text-cyber-blue/70 group-hover:text-cyber-blue transition-colors" />
        </div>
        <div>
          <h3 className="text-white font-bold text-lg leading-tight">
            {hobby.title}
          </h3>
          <p className="text-cyber-blue/50 text-[10px] tracking-[0.2em] font-mono mt-1">
            {hobby.subtitle}
          </p>
        </div>
        <p className="text-slate-400 text-xs leading-relaxed">{hobby.blurb}</p>
      </div>
    </SpotlightCard>
  );
}

/* ---------- Main Component ---------- */
export default function Hobbies() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hobbies"
      className="relative py-24 bg-[#06080f] bg-grid"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-slate-600 text-sm font-mono">06</span>
          <div className="w-8 h-px bg-cyber-blue/30" />
          <span className="text-xs tracking-[0.3em] text-cyber-blue/70">
            HOBBIES & PASSIONS
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          兴趣爱好
        </h2>
        <p className="text-slate-400 text-xs mb-12 max-w-lg">
          专业之外，刀笔与球拍亦是日常。
        </p>

        {/* Hobby Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {hobbyItems.map((hobby, i) => (
            <HobbyCard
              key={hobby.id}
              hobby={hobby}
              index={i}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
