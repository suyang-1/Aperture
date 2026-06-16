'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const greetings = [
  '你好呀～我是小溯',
  '想了解袁苏洋的项目吗？',
  '点我可以收起哦',
  '一起在赛博暗夜里探索吧 ✦',
];

export default function FloatingMascot() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const [bubbleOpen, setBubbleOpen] = useState(false);
  const [greetingIndex, setGreetingIndex] = useState(0);

  useEffect(() => {
    // Delay appearance for smoother first paint
    const t = window.setTimeout(() => setMounted(true), 600);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!bubbleOpen) return;
    const id = window.setInterval(() => {
      setGreetingIndex((i) => (i + 1) % greetings.length);
    }, 3500);
    return () => window.clearInterval(id);
  }, [bubbleOpen]);

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 pointer-events-none transition-all duration-700 ease-out ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      aria-hidden={!mounted}
    >
      <div className="relative flex flex-col items-end gap-2 pointer-events-auto">
        {/* Speech bubble */}
        {bubbleOpen && (
          <div className="relative max-w-[220px] rounded-2xl border border-cyber-blue/30 bg-[#0d1117]/90 backdrop-blur-md px-4 py-3 text-xs text-slate-200 shadow-[0_0_24px_rgba(0,212,255,0.18)] animate-fade-in-up">
            <p className="leading-relaxed">{greetings[greetingIndex]}</p>
            <span className="absolute -bottom-2 right-8 w-3 h-3 rotate-45 bg-[#0d1117]/90 border-r border-b border-cyber-blue/30" />
          </div>
        )}

        {/* Mascot button */}
        <div className="relative group">
          {/* Close badge */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setVisible(false);
            }}
            aria-label="关闭智能体"
            className="absolute -top-1 -right-1 z-10 flex h-5 w-5 items-center justify-center rounded-full border border-cyber-blue/40 bg-[#06080f] text-slate-400 opacity-0 transition-all duration-200 group-hover:opacity-100 hover:text-cyber-blue hover:border-cyber-blue"
          >
            <X className="w-3 h-3" />
          </button>

          {/* Glow ring */}
          <span className="pointer-events-none absolute inset-0 rounded-full bg-cyber-blue/15 blur-2xl scale-90 group-hover:scale-110 transition-transform duration-500" />

          {/* Mascot image */}
          <button
            type="button"
            onClick={() => setBubbleOpen((v) => !v)}
            aria-label="呼出智能体小溯"
            className="relative block animate-float-slow cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/mascot.png"
              alt="智能体小溯"
              className="w-24 h-24 sm:w-28 sm:h-28 object-contain drop-shadow-[0_8px_24px_rgba(0,212,255,0.35)] select-none"
              draggable={false}
            />

            {/* Status dot */}
            <span className="absolute bottom-2 right-2 flex h-3 w-3 items-center justify-center">
              <span className="absolute inline-flex h-full w-full rounded-full bg-cyber-blue opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyber-blue shadow-[0_0_8px_rgba(0,212,255,0.8)]" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
