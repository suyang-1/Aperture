'use client';

import { useEffect, useRef, useState } from 'react';
import { PenTool, Stamp, Sparkles, ChevronRight } from 'lucide-react';
import { useMouseSpotlight } from '@/hooks/use-mouse-spotlight';

const hobbyItems = [
  {
    id: 'seal-carving',
    title: '篆刻',
    subtitle: 'SEAL CARVING',
    icon: Stamp,
    description:
      '以刀代笔，在方寸之间刻写天地。篆刻融合了书法的笔意与雕刻的刀味，是汉字艺术的微缩宇宙。每一次奏刀，都是与石头的对话，在石屑纷飞中感受古朴与力量的碰撞。',
    details: [
      '以秦汉古玺为宗，追求金石气韵',
      '擅长白文与朱文两种风格',
      '从选石、磨面、上石、奏刀到钤印，全程手工完成',
      '在方寸印面中体悟章法布局与留白之道',
    ],
    accent: 'cyber-blue',
    tags: ['秦汉古玺', '白文朱文', '金石气韵', '方寸之间'],
  },
  {
    id: 'calligraphy',
    title: '写字',
    subtitle: 'CALLIGRAPHY',
    icon: PenTool,
    description:
      '提笔落墨间，感受笔锋的提按顿挫与墨色的浓淡枯润。写字不仅是技法的修炼，更是一种心性的沉淀——在点画之间寻找节奏，在留白处体悟虚实相生之道。',
    details: [
      '以楷书筑基，兼修行书与隶书',
      '注重笔法传承，从经典碑帖中汲取养分',
      '日常临池不辍，以书写为心性修炼',
      '追求字中有法、法外有意，书为心画',
    ],
    accent: 'cyan',
    tags: ['楷书筑基', '行书隶书', '临池不辍', '书为心画'],
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
      <div className="pointer-events-none absolute inset-0 z-10" style={{ background: spotlightStyle }} />
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
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = hobby.icon;

  return (
    <SpotlightCard
      className={`bg-[#0d1117] border border-cyber-blue-dim p-6 group transition-all duration-700 hover:border-cyber-blue/40 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,212,255,0.08)] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div style={{ transitionDelay: `${index * 150}ms` }}>
        {/* Header */}
        <div className="flex items-start gap-4 mb-5">
          <div className="w-12 h-12 rounded-lg bg-cyber-blue/10 border border-cyber-blue/20 flex items-center justify-center flex-shrink-0 group-hover:bg-cyber-blue/15 group-hover:border-cyber-blue/30 transition-colors">
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
        </div>

        {/* Description */}
        <p className="text-slate-300 text-xs leading-relaxed mb-4">
          {hobby.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {hobby.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 text-[10px] tracking-wider text-cyber-blue/70 bg-cyber-blue/8 border border-cyber-blue/15 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Expandable details */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1.5 text-[10px] text-slate-500 hover:text-cyber-blue transition-colors cursor-pointer group/toggle"
        >
          <ChevronRight
            className={`w-3 h-3 transition-transform duration-300 ${
              isExpanded ? 'rotate-90' : ''
            }`}
          />
          <span>{isExpanded ? '收起详情' : '了解更多'}</span>
        </button>

        {/* Expandable content */}
        <div
          className="overflow-hidden transition-all duration-500 ease-in-out"
          style={{
            maxHeight: isExpanded ? `${hobby.details.length * 40 + 30}px` : '0px',
            opacity: isExpanded ? 1 : 0,
          }}
        >
          <div className="mt-3 pt-3 border-t border-cyber-blue/10">
            <div className="flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3 h-3 text-cyber-blue/60" />
              <span className="text-[10px] text-cyber-blue/70 font-semibold tracking-wider">
                深入了解
              </span>
            </div>
            <ul className="space-y-2">
              {hobby.details.map((detail, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-[11px] text-slate-400 leading-relaxed"
                >
                  <span className="w-1 h-1 rounded-full bg-cyber-blue/40 mt-1.5 flex-shrink-0" />
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
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
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
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
          在专业之外，刀与笔是另一种表达。篆刻让我在方寸间体悟章法，写字让我在点画中沉淀心性。
        </p>

        {/* Hobby Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
