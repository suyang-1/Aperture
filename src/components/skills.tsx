'use client';

import { useEffect, useRef, useState } from 'react';
import {
  PenTool,
  Box,
  ScanLine,
  Eye,
  Brain,
  Monitor,
  Figma,
  Code2,
  Cpu,
  Camera,
  Layers,
  Palette,
  Mic,
  Globe,
  MessageSquare,
  Award,
} from 'lucide-react';
import { useMouseSpotlight } from '@/hooks/use-mouse-spotlight';

/* ---------- data ---------- */

interface SkillItem {
  name: string;
  nameCn: string;
  icon: React.ElementType;
  category: 'design' | '3d' | 'equipment' | 'dev';
}

const skills: SkillItem[] = [
  // 设计软件
  { name: 'Photoshop', nameCn: '图像处理与合成', icon: Palette, category: 'design' },
  { name: 'Illustrator', nameCn: '矢量图形设计', icon: PenTool, category: 'design' },
  { name: 'Figma', nameCn: '界面与原型设计', icon: Figma, category: 'design' },
  { name: 'After Effects', nameCn: '动效与视觉合成', icon: Layers, category: 'design' },

  // 3D 建模
  { name: 'Rhino', nameCn: 'NURBS 曲面建模', icon: Box, category: '3d' },
  { name: 'Blender', nameCn: '三维渲染与动画', icon: Monitor, category: '3d' },

  // 专业设备
  { name: '手持三维扫描仪', nameCn: '点云采集与逆向工程', icon: ScanLine, category: 'equipment' },
  { name: '眼动仪', nameCn: 'Tobii 视觉追踪实验', icon: Eye, category: 'equipment' },
  { name: '脑电帽', nameCn: 'EEG 脑电信号采集', icon: Brain, category: 'equipment' },

  // 开发工具
  { name: 'VS Code', nameCn: '全栈开发环境', icon: Code2, category: 'dev' },
  { name: 'Arduino', nameCn: '硬件原型与交互', icon: Cpu, category: 'dev' },
  { name: 'Unity', nameCn: '交互原型与 XR 开发', icon: Camera, category: 'dev' },
];

const categoryMeta: Record<string, { label: string; labelCn: string; color: string }> = {
  design: { label: 'DESIGN TOOLS', labelCn: '设计工具', color: 'from-fuchsia-500/80 to-pink-500/60' },
  '3d': { label: '3D MODELING', labelCn: '三维建模', color: 'from-cyan-400/80 to-sky-500/60' },
  equipment: { label: 'SPECIALIZED EQUIPMENT', labelCn: '专业设备', color: 'from-emerald-400/80 to-teal-500/60' },
  dev: { label: 'DEV & PROTOTYPING', labelCn: '开发与原型', color: 'from-amber-400/80 to-orange-500/60' },
};

/* ---------- Certifications ---------- */

interface CertItem {
  name: string;
  nameEn: string;
  level: string;
  issuer: string;
  icon: React.ElementType;
  color: string;
}

const certifications: CertItem[] = [
  {
    name: '普通话水平测试',
    nameEn: 'Mandarin Proficiency Test',
    level: '一级乙等',
    issuer: '国家语言文字工作委员会',
    icon: Mic,
    color: 'from-rose-400/80 to-pink-500/60',
  },
  {
    name: '国际人才英语考试',
    nameEn: 'English Test for International Communication',
    level: '初级',
    issuer: '中国外语测评中心',
    icon: Globe,
    color: 'from-violet-400/80 to-purple-500/60',
  },
  {
    name: '大学英语四级（笔试）',
    nameEn: 'CET-4 Written',
    level: '合格',
    issuer: '教育部教育考试院',
    icon: MessageSquare,
    color: 'from-cyan-400/80 to-sky-500/60',
  },
  {
    name: '大学英语四级（口试）',
    nameEn: 'CET-4 Spoken',
    level: '良好',
    issuer: '教育部教育考试院',
    icon: MessageSquare,
    color: 'from-emerald-400/80 to-teal-500/60',
  },
];

/* ---------- CertCard ---------- */

function CertCard({
  cert,
  index,
  isVisible,
}: {
  cert: CertItem;
  index: number;
  isVisible: boolean;
}) {
  const Icon = cert.icon;

  return (
    <SpotlightCard
      className={`group relative p-5 bg-[#0d1117] border border-cyber-blue-dim rounded-xl hover:border-cyber-blue/40 hover:bg-[#131a24] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(0,212,255,0.06)] overflow-hidden ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Top accent line */}
      <div className={`absolute top-0 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r ${cert.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="shrink-0 w-11 h-11 rounded-lg bg-cyber-blue/10 border border-cyber-blue/20 flex items-center justify-center group-hover:bg-cyber-blue/15 group-hover:border-cyber-blue/40 transition-all">
          <Icon className="w-5 h-5 text-cyber-blue" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-white font-bold text-sm tracking-wide">
              {cert.name}
            </h4>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyber-blue/15 text-cyber-blue border border-cyber-blue/25 font-medium whitespace-nowrap">
              {cert.level}
            </span>
          </div>
          <p className="text-slate-600 text-[10px] mt-0.5 font-mono tracking-wide">
            {cert.nameEn}
          </p>
          <div className="flex items-center gap-1.5 mt-2">
            <Award className="w-3 h-3 text-slate-600" />
            <span className="text-slate-500 text-[11px]">{cert.issuer}</span>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}

/* ---------- SpotlightCard ---------- */

function SpotlightCard({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className: string;
  style: React.CSSProperties;
}) {
  const { ref, onMouseMove, onMouseLeave, spotlightStyle } = useMouseSpotlight();
  return (
    <div
      ref={ref}
      className={className}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div
        className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: spotlightStyle }}
      />
      {children}
    </div>
  );
}

/* ---------- SkillCard ---------- */

function SkillCard({
  skill,
  index,
  isVisible,
}: {
  skill: SkillItem;
  index: number;
  isVisible: boolean;
}) {
  const Icon = skill.icon;
  const meta = categoryMeta[skill.category];

  return (
    <SpotlightCard
      className={`group relative p-4 bg-[#0d1117] border border-cyber-blue-dim rounded-xl hover:border-cyber-blue/40 hover:bg-[#131a24] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(0,212,255,0.06)] overflow-hidden ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      {/* Category accent line */}
      <div className={`absolute top-0 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r ${meta.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="shrink-0 w-10 h-10 rounded-lg bg-cyber-blue/10 border border-cyber-blue/20 flex items-center justify-center group-hover:bg-cyber-blue/15 group-hover:border-cyber-blue/40 transition-all">
          <Icon className="w-5 h-5 text-cyber-blue" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-bold text-sm tracking-wide leading-tight">
            {skill.name}
          </h4>
          <p className="text-slate-500 text-[11px] mt-0.5 truncate">{skill.nameCn}</p>

          <div className="mt-2.5">
            <span className="text-[10px] text-slate-600 font-mono">{meta.labelCn}</span>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}

/* ---------- Main Component ---------- */

export default function Skills() {
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

  const categories = ['design', '3d', 'equipment', 'dev'] as const;

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-24 bg-[#06080f]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-slate-600 text-sm font-mono">05</span>
          <div className="w-8 h-px bg-cyber-blue/30" />
          <span className="text-xs tracking-[0.3em] text-cyber-blue/70">
            PROFESSIONAL SKILLS
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          专业技能
        </h2>
        <p className="text-slate-400 text-sm max-w-xl mb-12">
          从视觉设计到三维建模，从科研设备到开发原型，跨领域工具链支撑全流程设计能力
        </p>

        {/* Category sections */}
        <div className="space-y-10">
          {categories.map((cat) => {
            const meta = categoryMeta[cat];
            const catSkills = skills.filter((s) => s.category === cat);
            const baseIndex = skills.findIndex((s) => s.category === cat);

            return (
              <div key={cat}>
                {/* Category label */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${meta.color}`} />
                  <span className="text-xs tracking-[0.2em] text-slate-400 font-medium">
                    {meta.label}
                  </span>
                  <span className="text-xs text-slate-600">—</span>
                  <span className="text-xs text-slate-500">{meta.labelCn}</span>
                  <div className="flex-1 h-px bg-white/5" />
                  <span className="text-[10px] text-slate-600 font-mono">
                    {catSkills.length}项
                  </span>
                </div>

                {/* Skills grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {catSkills.map((skill, i) => (
                    <SkillCard
                      key={skill.name}
                      skill={skill}
                      index={baseIndex + i}
                      isVisible={isVisible}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom summary bar */}
        <div
          className={`mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-6 px-8 rounded-xl border border-cyber-blue-dim bg-[#0d1117]/60 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {[
            { label: '设计工具', value: '4', unit: '项' },
            { label: '三维建模', value: '2', unit: '项' },
            { label: '专业设备', value: '3', unit: '项' },
            { label: '开发原型', value: '3', unit: '项' },
          ].map((item, i) => (
            <div key={item.label} className="flex items-center gap-2">
              {i > 0 && (
                <div className="w-px h-6 bg-white/10 -ml-4 mr-4 hidden sm:block" />
              )}
              <span className="text-cyber-blue font-bold text-lg font-mono">
                {item.value}
              </span>
              <span className="text-slate-500 text-xs">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-16 flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyber-blue/20 to-transparent" />
          <Award className="w-4 h-4 text-cyber-blue/40" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyber-blue/20 to-transparent" />
        </div>

        {/* Certifications sub-section */}
        <div className="mt-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs tracking-[0.2em] text-slate-400 font-medium">
              SKILL CERTIFICATIONS
            </span>
            <span className="text-xs text-slate-600">—</span>
            <span className="text-xs text-slate-500">技能资格认证</span>
            <div className="flex-1 h-px bg-white/5" />
            <span className="text-[10px] text-slate-600 font-mono">
              {certifications.length}项
            </span>
          </div>
          <p className="text-slate-500 text-sm mb-8">
            语言能力与专业资格认证，跨领域沟通无障碍
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert, i) => (
              <CertCard
                key={cert.name}
                cert={cert}
                index={i}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
