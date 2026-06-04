'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  FileText,
  ExternalLink,
  ChevronDown,
  Cpu,
  Shield,
  Sparkles,
  Zap,
  Layers,
} from 'lucide-react';
import { useMouseSpotlight } from '@/hooks/use-mouse-spotlight';

/* ---------- Patent detail data ---------- */
const patentInfo = {
  title: '一种配电柜柜体的焊接装置',
  applicationNo: '202511071601.6',
  publishNo: 'CN 120551632 A',
  grantNo: 'CN 120551632 B',
  applicant: '天津仁爱学院',
  inventors: '袁铁彪、葛军超、刘金剑、于洋洋、袁苏洋、孙熙然、储青海',
  filingDate: '2025.08.01',
  publishDate: '2025.08.29',
  grantDate: '2025.10.31',
  techFields: ['B23K 31/02', 'B23K 37/003', 'B23K 37/00'],
  abstract:
    '涉及焊接技术领域，包括机架、驱动电机、气泵、柜体、柜板、伸缩气缸和电动气缸。经导流板调控移动位置，在冷却架和气泵连接下实现焊后快速冷却；通过改变连接板作用位置控制挡板，实现自动送料；通过第一/第二磁块实现柜板在柜体上的磁性限位支撑。',
  innovations: [
    {
      icon: Zap,
      label: '自动焊接+焊后气冷',
      desc: '输送带+焊接架实现柜体自动焊接与焊后气冷降温，提高生产效率',
    },
    {
      icon: Layers,
      label: '自动投送送料',
      desc: '存储仓+引导板+电动气缸控制挡板，实现柜板自动投送送料',
    },
    {
      icon: Cpu,
      label: '磁性限位支撑',
      desc: '第一/第二磁块磁性吸附限位支撑，可调节间距，提高焊接精度',
    },
  ],
  claims: '10项权利要求',
  specPages: '说明书5页',
  drawingPages: '附图12页',
  certUrl: '/assets/patent-certificate.pdf',
  fullTextUrl: '/assets/patent-detail.pdf',
};

/* ---------- Project data ---------- */
const projects = [
  {
    title: '智能交互设计作品',
    tag: 'INTERACTION DESIGN',
    description:
      '基于用户研究与交互原型方法，打造直觉化的智能交互体验方案。',
    gradient: 'from-cyan-900/40 to-teal-900/20',
    iconBg: 'bg-cyan-500/10',
    iconBorder: 'border-cyan-500/20',
  },
  {
    title: '网络安全研究实践',
    tag: 'CYBER SECURITY',
    description:
      '网络与信息安全微专业课程实践，涵盖渗透测试与安全评估方法。',
    gradient: 'from-emerald-900/40 to-green-900/20',
    iconBg: 'bg-emerald-500/10',
    iconBorder: 'border-emerald-500/20',
  },
  {
    title: '跨学科融合探索',
    tag: 'DESIGN × SECURITY',
    description:
      '探索交互设计与信息安全的交叉领域，构建安全可信的用户体验。',
    gradient: 'from-sky-900/40 to-blue-900/20',
    iconBg: 'bg-sky-500/10',
    iconBorder: 'border-sky-500/20',
  },
];

/* ---------- Patent Card (expanded) ---------- */
function PatentCard({ isVisible }: { isVisible: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const { ref, onMouseMove, onMouseLeave, spotlightStyle } =
    useMouseSpotlight();

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-xl border border-cyber-blue-dim bg-[#0d1117] hover:border-cyber-blue/40 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,212,255,0.1)] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: '0ms' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Spotlight */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{ background: spotlightStyle }}
      />

      {/* Header: Patent abstract image */}
      <div className="relative overflow-hidden">
        <div className="w-full bg-gradient-to-br from-blue-900/30 to-cyan-900/10">
          <img
            src="/assets/patent-abstract.png"
            alt="一种配电柜柜体的焊接装置 - 专利摘要附图"
            className="w-full h-auto object-contain"
          />
        </div>
        {/* Patent badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 bg-green-500/15 border border-green-500/25 rounded-full backdrop-blur-sm">
          <Shield className="w-3 h-3 text-green-400/80" />
          <span className="text-[9px] tracking-wider text-green-400/90 font-semibold">
            INVENTION PATENT
          </span>
        </div>
        {/* Hover arrow */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0d1117]/60 rounded-full p-1.5">
          <ArrowUpRight className="w-4 h-4 text-cyber-blue" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Tag */}
        <span className="text-[10px] tracking-widest text-cyber-blue/60 font-medium">
          PATENT · INNOVATION
        </span>

        {/* Title */}
        <h3 className="text-white font-bold text-sm mt-2 mb-2 group-hover:text-cyber-blue transition-colors leading-snug">
          {patentInfo.title}
        </h3>

        {/* Meta grid */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mb-3">
          <MetaItem label="申请号" value={patentInfo.applicationNo} />
          <MetaItem label="公布号" value={patentInfo.publishNo} />
          <MetaItem label="授权号" value={patentInfo.grantNo} />
          <MetaItem label="授权日" value={patentInfo.grantDate} />
        </div>

        {/* Abstract */}
        <p className="text-slate-500 text-[11px] leading-relaxed mb-3">
          {patentInfo.abstract}
        </p>

        {/* Innovation highlights */}
        <div className="space-y-2 mb-3">
          {patentInfo.innovations.map((inn) => {
            const Icon = inn.icon;
            return (
              <div key={inn.label} className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-md bg-cyber-blue/10 border border-cyber-blue/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="w-3 h-3 text-cyber-blue/60" />
                </div>
                <div>
                  <span className="text-[10px] text-cyber-blue/80 font-semibold">
                    {inn.label}
                  </span>
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    {inn.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Expandable: full details */}
        <button
          type="button"
          onClick={useCallback(() => setExpanded((v) => !v), [])}
          className="flex items-center gap-1.5 text-[10px] text-slate-500 hover:text-cyber-blue transition-colors cursor-pointer mb-2"
        >
          <ChevronDown
            className={`w-3 h-3 transition-transform duration-300 ${
              expanded ? 'rotate-180' : ''
            }`}
          />
          <span>{expanded ? '收起详情' : '查看完整专利信息'}</span>
        </button>

        <div
          className="overflow-hidden transition-all duration-500 ease-in-out"
          style={{
            maxHeight: expanded ? '400px' : '0px',
            opacity: expanded ? 1 : 0,
          }}
        >
          <div className="pt-3 border-t border-cyber-blue/10 space-y-3">
            {/* Detailed info */}
            <div className="space-y-1.5">
              <DetailRow label="申请人" value={patentInfo.applicant} />
              <DetailRow label="发明人" value={patentInfo.inventors} />
              <DetailRow label="申请日" value={patentInfo.filingDate} />
              <DetailRow label="公布日" value={patentInfo.publishDate} />
              <DetailRow
                label="技术分类"
                value={patentInfo.techFields.join(' / ')}
              />
              <DetailRow
                label="权利要求"
                value={`${patentInfo.claims} · ${patentInfo.specPages} · ${patentInfo.drawingPages}`}
              />
            </div>

            {/* File links */}
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href={patentInfo.certUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] text-cyber-blue bg-cyber-blue/10 border border-cyber-blue/20 rounded-lg hover:bg-cyber-blue/20 hover:border-cyber-blue/40 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                专利证书 PDF
              </a>
              <a
                href={patentInfo.fullTextUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] text-cyber-blue bg-cyber-blue/10 border border-cyber-blue/20 rounded-lg hover:bg-cyber-blue/20 hover:border-cyber-blue/40 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                专利全文（含说明书附图）
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Small helpers ---------- */
function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-[9px] text-slate-600 tracking-wider">{label}</span>
      <p className="text-[10px] text-slate-300 font-mono leading-tight truncate">
        {value}
      </p>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-2 text-[10px]">
      <span className="text-slate-600 flex-shrink-0 min-w-[48px]">
        {label}
      </span>
      <span className="text-slate-400 leading-relaxed">{value}</span>
    </div>
  );
}

/* ---------- Regular Project Card ---------- */
function ProjectCard({
  project,
  index,
  isVisible,
}: {
  project: (typeof projects)[number];
  index: number;
  isVisible: boolean;
}) {
  const { ref, onMouseMove, onMouseLeave, spotlightStyle } =
    useMouseSpotlight();
  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-xl border border-cyber-blue-dim bg-[#0d1117] hover:border-cyber-blue/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgba(0,212,255,0.1)] cursor-pointer ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${(index + 1) * 100}ms` }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Spotlight */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{ background: spotlightStyle }}
      />
      {/* Visual */}
      <div
        className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative">
          <div
            className={`w-16 h-16 rounded-2xl ${project.iconBg} border ${project.iconBorder} flex items-center justify-center backdrop-blur-sm`}
          >
            <div className="w-6 h-6 rounded-md border border-current text-cyber-blue/60 flex items-center justify-center">
              <ArrowUpRight className="w-3 h-3" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight className="w-5 h-5 text-cyber-blue" />
        </div>
      </div>
      {/* Content */}
      <div className="p-5">
        <span className="text-[10px] tracking-widest text-cyber-blue/60 font-medium">
          {project.tag}
        </span>
        <h3 className="text-white font-bold text-sm mt-2 mb-2 group-hover:text-cyber-blue transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-500 text-xs leading-relaxed">
          {project.description}
        </p>
      </div>
    </div>
  );
}

/* ---------- Main Component ---------- */
export default function Projects() {
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
      id="projects"
      className="relative py-24 bg-[#06080f] bg-grid"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-slate-600 text-sm font-mono">03</span>
              <div className="w-8 h-px bg-cyber-blue/30" />
              <span className="text-xs tracking-[0.3em] text-cyber-blue/70">
                FEATURED PROJECTS
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              特色项目
            </h2>
          </div>
          <a
            href="#"
            className="hidden sm:flex items-center gap-2 text-xs tracking-wider text-slate-400 hover:text-cyber-blue transition-colors"
          >
            VIEW ALL PROJECTS
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Patent card (first, spanning full detail) */}
          <PatentCard isVisible={isVisible} />

          {/* Other project cards */}
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
