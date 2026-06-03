'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Mail,
  MessageCircle,
  MapPin,
} from 'lucide-react';

const skills = [
  'Figma',
  'React',
  'TypeScript',
  'Python',
  '交互设计',
  '网络安全',
  '渗透测试',
  'UI/UX',
  'More',
];

const experiences = [
  {
    year: '至今',
    title: '本科大三在读',
    company: '智能交互设计专业',
    description: '主修智能交互设计，辅修网络与信息安全微专业',
  },
  {
    year: '成果',
    title: '发明专利一项',
    company: '知识产权',
    description: '持有一项已授权/申请中的发明专利',
  },
];

const contacts = [
  { icon: Mail, label: 'Email', value: 'suyang2027@126.com' },
  { icon: MessageCircle, label: 'WeChat', value: 'MrYSY2005' },
  { icon: MapPin, label: 'Location', value: '天津市' },
];

export default function About() {
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
      id="about"
      className="relative py-24 bg-[#06080f] bg-grid"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-slate-600 text-sm font-mono">05</span>
          <div className="w-8 h-px bg-cyber-blue/30" />
          <span className="text-xs tracking-[0.3em] text-cyber-blue/70">
            ABOUT & CONTACT
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-12">
          关于与联系
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* About Me */}
          <div
            className={`p-6 bg-[#0d1117] border border-cyber-blue-dim rounded-xl transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <h3 className="text-white font-bold text-sm tracking-wider mb-4">
              ABOUT ME
            </h3>
            <div className="flex items-start gap-4 mb-4">
              {/* Avatar placeholder */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyber-blue/20 to-cyan-900/30 border border-cyber-blue/30 flex items-center justify-center flex-shrink-0">
                <span className="text-cyber-blue text-lg font-bold">Y</span>
              </div>
              <div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  袁苏洋，本科大三在读，主修智能交互设计专业，辅修网络与信息安全微专业。持有发明专利一项，致力于将交互设计思维与信息安全意识相融合，探索安全可信的智能交互体验。
                </p>
              </div>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mt-4">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-[10px] tracking-wider text-slate-400 bg-[#131a24] border border-cyber-blue-dim rounded-full hover:border-cyber-blue/40 hover:text-cyber-blue transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div
            className={`p-6 bg-[#0d1117] border border-cyber-blue-dim rounded-xl transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <h3 className="text-white font-bold text-sm tracking-wider mb-6">
              EXPERIENCE
            </h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-cyber-blue/50 via-cyber-blue/20 to-transparent" />

              <div className="space-y-6">
                {experiences.map((exp, i) => (
                  <div key={exp.year} className="relative pl-6">
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-cyber-blue/40 bg-[#0d1117] flex items-center justify-center">
                      <div
                        className={`w-[5px] h-[5px] rounded-full ${
                          i === 0 ? 'bg-cyber-blue' : 'bg-cyber-blue/30'
                        }`}
                      />
                    </div>
                    <span className="text-cyber-blue/60 text-[10px] font-mono">
                      {exp.year}
                    </span>
                    <h4 className="text-white text-xs font-semibold mt-1">
                      {exp.title}
                    </h4>
                    <p className="text-slate-500 text-[10px]">{exp.company}</p>
                    <p className="text-slate-600 text-[11px] mt-1">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact */}
          <div
            id="contact"
            className={`p-6 bg-[#0d1117] border border-cyber-blue-dim rounded-xl transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <h3 className="text-white font-bold text-sm tracking-wider mb-6">
              LET&apos;S CONNECT
            </h3>
            <div className="space-y-4">
              {contacts.map((contact) => {
                const Icon = contact.icon;
                return (
                  <div key={contact.label} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyber-blue/10 border border-cyber-blue/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-cyber-blue/70" />
                    </div>
                    <div>
                      <p className="text-slate-500 text-[10px] tracking-wider">
                        {contact.label}
                      </p>
                      <p className="text-slate-300 text-xs">{contact.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* WeChat QR Code */}
            <div className="mt-6 flex items-center gap-4">
              <div className="w-20 h-20 rounded-lg overflow-hidden border border-cyber-blue-dim flex-shrink-0">
                <img
                  src="/wechat-qr.jpg"
                  alt="微信二维码"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-slate-500 text-[10px] tracking-wider">
                  扫码添加微信
                </p>
                <p className="text-slate-600 text-[10px] mt-1">
                  WeChat: MrYSY2005
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
