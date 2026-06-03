'use client';

import { useEffect, useRef, useState } from 'react';
import {
  MousePointerClick,
  Code2,
  ShieldCheck,
  BrainCircuit,
} from 'lucide-react';

const capabilities = [
  {
    id: '01',
    title: 'INTERACTION DESIGN',
    subtitle: '智能交互设计',
    icon: MousePointerClick,
    skills: [
      'User Research',
      'Interaction Design',
      'UI/UX Design',
      'Prototyping',
    ],
  },
  {
    id: '02',
    title: 'ENGINEERING',
    subtitle: '工程开发实现',
    icon: Code2,
    skills: [
      'Frontend Development',
      'System Architecture',
      'API Integration',
      'IoT & Hardware',
    ],
  },
  {
    id: '03',
    title: 'CYBER SECURITY',
    subtitle: '网络与信息安全',
    icon: ShieldCheck,
    skills: [
      'Network Security',
      'Web Security',
      'Data Encryption',
      'Security Testing',
    ],
  },
  {
    id: '04',
    title: 'DATA & AI',
    subtitle: '数据智能与AI应用',
    icon: BrainCircuit,
    skills: [
      'Data Analysis',
      'Machine Learning',
      'Intelligent Agent',
      'Visualization',
    ],
  },
];

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 bg-[#06080f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-slate-600 text-sm font-mono">02</span>
          <div className="w-8 h-px bg-cyber-blue/30" />
          <span className="text-xs tracking-[0.3em] text-cyber-blue/70">
            CORE CAPABILITIES
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-12">
          核心能力
        </h2>

        {/* Capability Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.id}
                className={`group relative p-6 bg-[#0d1117] border border-cyber-blue-dim rounded-xl hover:border-cyber-blue/40 hover:bg-[#131a24] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,212,255,0.08)] ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Number */}
                <span className="text-slate-600/50 text-xs font-mono">
                  {cap.id}
                </span>

                {/* Icon */}
                <div className="my-4 w-12 h-12 rounded-lg bg-cyber-blue/10 border border-cyber-blue/20 flex items-center justify-center group-hover:bg-cyber-blue/15 group-hover:border-cyber-blue/40 transition-all">
                  <Icon className="w-6 h-6 text-cyber-blue" />
                </div>

                {/* Title */}
                <h3 className="text-white font-bold text-sm tracking-wider mb-1">
                  {cap.title}
                </h3>
                <p className="text-slate-500 text-xs mb-4">{cap.subtitle}</p>

                {/* Skills */}
                <ul className="space-y-2">
                  {cap.skills.map((skill) => (
                    <li
                      key={skill}
                      className="text-slate-400 text-xs flex items-center gap-2"
                    >
                      <div className="w-1 h-1 rounded-full bg-cyber-blue/50" />
                      {skill}
                    </li>
                  ))}
                </ul>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-b from-cyber-blue/[0.03] to-transparent" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
