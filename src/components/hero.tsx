'use client';

import { ArrowRight, ArrowDown } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import { useParallax } from '@/hooks/use-parallax';
import MeteorCanvas from '@/components/effects/meteor-canvas';

const floatingCards = [
  { title: 'INTERACTION DESIGN', top: '8%', left: '60%', delay: '0s', depth: 0.3 },
  { title: 'DATA VISUALIZATION', top: '55%', left: '75%', delay: '1s', depth: 0.5 },
  { title: 'CYBER SECURITY', top: '70%', left: '50%', delay: '0.5s', depth: 0.2 },
  { title: 'SYSTEM ARCHITECTURE', top: '25%', left: '85%', delay: '1.5s', depth: 0.4 },
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [mascotHovered, setMascotHovered] = useState(false);
  const parallax = useParallax({ intensity: 0.02 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMascotEnter = useCallback(() => setMascotHovered(true), []);
  const handleMascotLeave = useCallback(() => setMascotHovered(false), []);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col items-stretch overflow-hidden bg-[#06080f] bg-stars bg-grid"
      onMouseMove={parallax.onMouseMove}
      onMouseLeave={parallax.onMouseLeave}
    >
      {/* Meteor rain effect - right side only */}
      <MeteorCanvas />

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#06080f] via-transparent to-[#06080f] pointer-events-none" />

      {/* Decorative blue orb with parallax */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyber-blue/5 rounded-full blur-3xl pointer-events-none transition-transform duration-300 ease-out"
        style={{ transform: parallax.offset(0.3) }}
      />

      <div className="relative flex flex-1 w-full">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-center pt-24 pb-12">
          <div className="flex flex-col lg:flex-row items-stretch gap-12">
            {/* Left: Text Content */}
            <div
              className={`flex-1 flex flex-col justify-center space-y-8 transition-all duration-1000 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
            {/* Section number */}
            <div className="flex items-center gap-3">
              <span className="text-slate-600 text-sm font-mono">01</span>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-cyber-blue" />
                <div className="w-1.5 h-1.5 rounded-full bg-cyber-blue/40" />
              </div>
            </div>

            {/* Tag line */}
            <div className="flex items-center gap-2 text-xs tracking-widest">
              <span className="text-cyber-blue">DESIGN</span>
              <span className="text-cyber-blue/50">×</span>
              <span className="text-cyber-blue">ENGINEERING</span>
              <span className="text-cyber-blue/50">×</span>
              <span className="text-cyber-blue">SECURITY</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              智能交互
              <br />
              设计
              <br />
              <span className="text-glow text-cyber-blue">& 网络与信息安全</span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-md">
              袁苏洋 — 本科大三在读，智能交互设计专业 & 网络与信息安全微专业，持有发明专利一项。
              <br />
              <span className="text-slate-500 text-xs">
                Undergraduate junior majoring in Intelligent Interaction Design & Network and Information Security, with one invention patent.
              </span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="btn-elastic inline-flex items-center gap-2 px-6 py-3 bg-cyber-blue text-[#06080f] font-semibold text-sm rounded-lg hover:bg-cyan-300 transition-all duration-200 glow-blue hover:glow-blue-strong active:scale-95"
              >
                VIEW PROJECTS
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#about"
                className="btn-elastic inline-flex items-center gap-2 px-6 py-3 border border-slate-600 text-white font-semibold text-sm rounded-lg hover:border-cyber-blue/50 hover:text-cyber-blue transition-all duration-200 active:scale-95"
              >
                ABOUT ME
              </a>
            </div>
          </div>

          {/* Right: Visual Element */}
          <div
            className={`relative hidden lg:flex flex-1 items-center justify-center transition-all duration-1000 delay-300 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Central visual - Astronaut placeholder with tech rings */}
            <div className="relative w-80 h-80">
              {/* Outer rotating ring with parallax */}
              <div
                className="transition-transform duration-300 ease-out"
                style={{ transform: parallax.offset(0.15) }}
              >
                <div className="w-full h-full rounded-full border border-cyber-blue/20 animate-[spin_20s_linear_infinite]">
                  <div className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-cyber-blue" />
                </div>
              </div>

              {/* Middle ring */}
              <div
                className="absolute inset-8 transition-transform duration-300 ease-out"
                style={{ transform: parallax.offset(0.25) }}
              >
                <div className="w-full h-full rounded-full border border-cyber-blue/15 animate-[spin_15s_linear_infinite_reverse]">
                  <div className="absolute -bottom-1 left-1/2 w-1.5 h-1.5 rounded-full bg-cyber-blue/60" />
                </div>
              </div>

              {/* Inner ring */}
              <div
                className="absolute inset-16 transition-transform duration-300 ease-out"
                style={{ transform: parallax.offset(0.35) }}
              >
                <div className="w-full h-full rounded-full border border-cyber-blue/10 animate-[spin_25s_linear_infinite]">
                  <div className="absolute -right-1 top-1/2 w-1 h-1 rounded-full bg-cyber-blue/40" />
                </div>
              </div>

              {/* Center element - personal logo with hover wiggle */}
              <div
                className={`absolute inset-16 rounded-full bg-gradient-to-br from-cyber-blue/10 to-transparent flex items-center justify-center glow-blue cursor-pointer transition-transform duration-300 ${mascotHovered ? 'animate-mascot-wiggle' : ''}`}
                onMouseEnter={handleMascotEnter}
                onMouseLeave={handleMascotLeave}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/logo.png"
                  alt="影溯渊 logo"
                  className={`w-full h-full object-contain p-3 transition-transform duration-300 drop-shadow-[0_0_18px_rgba(0,212,255,0.45)] ${mascotHovered ? 'scale-110' : 'scale-100'}`}
                />
              </div>

              {/* Floating tech cards with parallax */}
              {floatingCards.map((card, i) => (
                <div
                  key={card.title}
                  className="absolute transition-transform duration-300 ease-out"
                  style={{ top: card.top, left: card.left, transform: parallax.offset(card.depth) }}
                >
                  <div
                    className={`px-3 py-2 bg-[#0d1117]/80 backdrop-blur-sm border border-cyber-blue-dim rounded-lg ${
                      i % 2 === 0 ? 'animate-float' : 'animate-float-delayed'
                    }`}
                  >
                    <span className="text-[9px] tracking-wider text-cyber-blue/70 whitespace-nowrap">
                      {card.title}
                    </span>
                  </div>
                </div>
              ))}

              {/* Connecting lines (decorative) */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 320 320"
              >
                <line
                  x1="160"
                  y1="160"
                  x2="240"
                  y2="40"
                  stroke="rgba(0,212,255,0.1)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <line
                  x1="160"
                  y1="160"
                  x2="280"
                  y2="180"
                  stroke="rgba(0,212,255,0.1)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <line
                  x1="160"
                  y1="160"
                  x2="200"
                  y2="260"
                  stroke="rgba(0,212,255,0.1)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <line
                  x1="160"
                  y1="160"
                  x2="60"
                  y2="100"
                  stroke="rgba(0,212,255,0.1)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 hidden lg:flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.2em] text-slate-600 [writing-mode:vertical-lr]">
            SCROLL DOWN
          </span>
          <ArrowDown className="w-3 h-3 text-slate-600 animate-bounce" />
        </div>
        </div>
      </div>
    </section>
  );
}
