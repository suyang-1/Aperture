'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useMouseSpotlight } from '@/hooks/use-mouse-spotlight';

const projects = [
  {
    title: '发明专利项目',
    tag: 'PATENT · INNOVATION',
    description:
      '持有一项发明专利，将智能交互设计与安全防护技术相融合的创新成果。',
    gradient: 'from-blue-900/40 to-cyan-900/20',
    iconBg: 'bg-blue-500/10',
    iconBorder: 'border-blue-500/20',
  },
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
    <section ref={sectionRef} id="projects" className="relative py-24 bg-[#06080f] bg-grid">
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
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, isVisible }: { project: typeof projects[number]; index: number; isVisible: boolean }) {
  const { ref, onMouseMove, onMouseLeave, spotlightStyle } = useMouseSpotlight();
  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-xl border border-cyber-blue-dim bg-[#0d1117] hover:border-cyber-blue/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgba(0,212,255,0.1)] cursor-pointer ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Mouse-following spotlight */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{ background: spotlightStyle }}
      />
      {/* Project Visual Placeholder */}
      <div
        className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}
      >
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid opacity-30" />
        {/* Decorative circles */}
        <div className="relative">
          <div
            className={`w-16 h-16 rounded-2xl ${project.iconBg} border ${project.iconBorder} flex items-center justify-center backdrop-blur-sm`}
          >
            <div className="w-6 h-6 rounded-md border border-current text-cyber-blue/60 flex items-center justify-center">
              <ArrowUpRight className="w-3 h-3" />
            </div>
          </div>
        </div>
        {/* Hover arrow */}
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
