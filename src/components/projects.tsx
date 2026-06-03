'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'AIoT 智能健康终端系统',
    tag: 'AI × HARDWARE',
    description:
      '面向智能健康场景的物联网终端解决方案，融合AI算法与嵌入式系统，实现实时健康监测与预警。',
    gradient: 'from-blue-900/40 to-cyan-900/20',
    iconBg: 'bg-blue-500/10',
    iconBorder: 'border-blue-500/20',
  },
  {
    title: '安全态势感知平台',
    tag: 'DATA VISUALIZATION',
    description:
      '多维安全数据可视化分析平台，实时监控网络态势，智能识别威胁，辅助安全决策。',
    gradient: 'from-cyan-900/40 to-teal-900/20',
    iconBg: 'bg-cyan-500/10',
    iconBorder: 'border-cyan-500/20',
  },
  {
    title: '智能漏洞扫描与修复系统',
    tag: 'WEB SECURITY',
    description:
      '自动化Web安全检测与修复平台，集成漏洞扫描、风险评估与智能修复建议。',
    gradient: 'from-emerald-900/40 to-green-900/20',
    iconBg: 'bg-emerald-500/10',
    iconBorder: 'border-emerald-500/20',
  },
  {
    title: '校园互联服务平台',
    tag: 'MOBILE APP',
    description:
      '连接校园生活的移动端服务平台，整合课程、社交、生活服务，打造一站式校园体验。',
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
            <div
              key={project.title}
              className={`group relative overflow-hidden rounded-xl border border-cyber-blue-dim bg-[#0d1117] hover:border-cyber-blue/40 transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
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
          ))}
        </div>
      </div>
    </section>
  );
}
