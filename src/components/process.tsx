'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Search,
  Camera,
  Lightbulb,
  PenTool,
  Code2,
  Send,
  Quote,
} from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'RESEARCH',
    subtitle: '研究洞察',
    description: '深入了解用户需求与市场趋势',
  },
  {
    icon: Camera,
    title: 'DEFINE',
    subtitle: '问题定义',
    description: '明确核心问题与设计目标',
  },
  {
    icon: Lightbulb,
    title: 'IDEATE',
    subtitle: '创意构思',
    description: '探索多元化创新解决方案',
  },
  {
    icon: PenTool,
    title: 'DESIGN',
    subtitle: '方案设计',
    description: '精细化设计交互与视觉方案',
  },
  {
    icon: Code2,
    title: 'DEVELOP',
    subtitle: '开发实现',
    description: '高质量编码与技术落地',
  },
  {
    icon: Send,
    title: 'TEST & DEPLOY',
    subtitle: '测试验证',
    description: '全面测试与安全部署上线',
  },
];

export default function Process() {
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
    <section ref={sectionRef} id="process" className="relative py-24 bg-[#06080f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-slate-600 text-sm font-mono">04</span>
          <div className="w-8 h-px bg-cyber-blue/30" />
          <span className="text-xs tracking-[0.3em] text-cyber-blue/70">
            DESIGN & ENGINEERING PROCESS
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-16">
          工作流程
        </h2>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Process Steps */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.title}
                    className={`relative group ${
                      isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-6'
                    }`}
                    style={{
                      transitionProperty: 'opacity, transform',
                      transitionDuration: '0.6s',
                      transitionDelay: `${i * 80}ms`,
                    }}
                  >
                    {/* Connecting line (only between items, not after last) */}
                    {i < steps.length - 1 && (
                      <div className="hidden sm:block absolute top-6 left-full w-6 h-px bg-gradient-to-r from-cyber-blue/30 to-transparent -translate-x-3" />
                    )}

                    {/* Icon circle */}
                    <div className="w-12 h-12 rounded-full border border-cyber-blue/30 bg-[#0d1117] flex items-center justify-center mb-3 group-hover:border-cyber-blue/60 group-hover:bg-cyber-blue/10 transition-all duration-300">
                      <Icon className="w-5 h-5 text-cyber-blue/70 group-hover:text-cyber-blue transition-colors" />
                    </div>

                    {/* Step number */}
                    <span className="text-slate-600/50 text-[10px] font-mono">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Title */}
                    <h4 className="text-white text-xs font-bold tracking-wider mt-1">
                      {step.title}
                    </h4>
                    <p className="text-slate-500 text-[10px] tracking-wider mb-1">
                      {step.subtitle}
                    </p>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Connecting line below process */}
            <div className="hidden sm:flex items-center mt-8 gap-1">
              {steps.map((_, i) => (
                <div key={i} className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-cyber-blue/30" />
                  {i < steps.length - 1 && (
                    <div className="w-8 sm:w-16 h-px bg-cyber-blue/10" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quote */}
          <div
            className={`lg:col-span-1 flex items-center transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="relative p-6 bg-[#0d1117] border border-cyber-blue-dim rounded-xl">
              <Quote className="w-8 h-8 text-cyber-blue/20 mb-4" />
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                设计不止于体验，更关乎安全与信任。
              </p>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                在交互设计的每个环节融入安全思维，让每一次人机交互都经得起信任的检验。
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-cyber-blue/10 border border-cyber-blue/30 flex items-center justify-center">
                  <span className="text-cyber-blue text-xs font-bold">Y</span>
                </div>
                <div>
                  <p className="text-white text-xs font-semibold">YUAN SUYANG</p>
                  <p className="text-slate-600 text-[10px]">
                    交互设计 & 信息安全
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
