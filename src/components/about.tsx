'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Mail,
  MessageCircle,
  MapPin,
  Award,
  Mic,
  GraduationCap,
  Users,
  Trophy,
  ShieldCheck,
  ExternalLink,
  FileText,
  Calendar,
  Building2,
  Sparkles,
  Briefcase,
  Flame,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const skills = [
  'Figma',
  'React',
  'TypeScript',
  'Python',
  '交互设计',
  '网络安全',
  'UI/UX',
  '英语演讲',
  '主持',
  '创新创业',
  '社团管理',
  '演讲竞赛',
  'More',
];

/* ---------- Credential detail type ---------- */
interface CredentialDetail {
  id: string;
  name: string;
  issuer: string;
  date: string;
  highlights: string[];
  fileUrl?: string;
  fileType?: 'pdf' | 'image';
}

const credentials: CredentialDetail[] = [
  {
    id: 'patent-welding',
    name: '一种配电柜柜体的焊接装置',
    issuer: '国家知识产权局',
    date: '2025年10月31日（授权公告日）',
    highlights: [
      '专利类型：发明专利',
      '专利号：ZL 2025 1 1071601.6',
      '授权公告号：CN 120551632 B',
      '证书号：第8428532号',
      '专利权人：天津仁爱学院',
      '发明人：袁铁彪、葛军超、刘金剑、于洋洋、袁苏洋、孙熙然、储青海',
      '专利申请日：2025年08月01日',
    ],
    fileUrl: '/assets/patent-certificate.pdf',
    fileType: 'pdf',
  },
];

/* ---------- Which timeline events have credentials ---------- */
const eventCredentialMap: Record<string, string> = {
  '发明专利一项': 'patent-welding',
};

const campusTimeline = [
  {
    year: '2023',
    events: [
      {
        title: '入读天津仁爱学院',
        description: '智能交互设计专业',
        icon: GraduationCap,
      },
      {
        title: '军训优秀学生',
        description: '9月 · 校级荣誉',
        icon: Award,
      },
      {
        title: '英语演讲大赛校级三等奖',
        description: '10月 · 外研社·国才杯"理解当代中国"',
        icon: Mic,
      },
      {
        title: '加入创业实践协会',
        description: '10月 · 天津仁爱学院',
        icon: Users,
      },
      {
        title: '主持首届大学生职业规划大赛',
        description: '12月 · 天津仁爱学院',
        icon: Mic,
      },
    ],
  },
  {
    year: '2024',
    events: [
      {
        title: '英语文化节参与及获奖',
        description: '5月 · 朗诵《Youth》，朗读赛道决赛校级三等奖',
        icon: Award,
      },
      {
        title: '主持2024届毕业生晚会',
        description: '6月 · 数智传媒与设计艺术学院"艺起向未来"',
        icon: Mic,
      },
      {
        title: '加入智交互产教融合创新实验室',
        description: '10月 · 数智传媒与设计艺术学院',
        icon: GraduationCap,
      },
      {
        title: '获"优秀学生二等奖学金"',
        description: '12月 · 天津仁爱学院2023-2024学年',
        icon: Award,
      },
    ],
  },
  {
    year: '2025',
    events: [
      {
        title: '"知网杯"数字素养大赛双项三等奖',
        description: '7月 · 第三届天津高校数字素养大赛 · 个人三等奖 + 团队三等奖',
        icon: Trophy,
      },
      {
        title: '中国国际大学生创新大赛天津赛区铜奖',
        description: '7月 · 第一负责人获铜奖一项，成员身份获铜奖一项',
        icon: Award,
      },
      {
        title: '发明专利一项',
        description:
          '10月 · 一种配电柜柜体的焊接装置 · ZL 2025 1 1071601.6',
        icon: FileText,
      },
      {
        title: '担任创业实践协会社团主席',
        description: '9月 · 天津仁爱学院',
        icon: Users,
      },
      {
        title: '担任智交互产教融合创新实验室学生负责人',
        description: '9月 · 数智传媒与设计艺术学院',
        icon: GraduationCap,
      },
      {
        title: '加入网络与信息安全微专业',
        description: '9月 · 辅修',
        icon: ShieldCheck,
      },
      {
        title: '应聘图书馆信息咨询助理馆员',
        description: '10月27日 · 天津仁爱图书馆 · 为期一年',
        icon: Briefcase,
      },
      {
        title: '网络安全主题演讲获二等奖',
        description: '11月 · 智算工程学院"国安强音——奏响网络安全时代华章"',
        icon: Mic,
      },
      {
        title: '获"社团活动奖""优秀学生干部"荣誉称号',
        description: '12月 · 天津仁爱学院2024-2025学年校级荣誉',
        icon: Award,
      },
    ],
  },
  {
    year: '2026',
    events: [
      {
        title: '国家安全教育日演讲比赛获一等奖',
        description:
          '4月15日 · "筑牢安全防线，激扬青春誓言"第十一个全民国家安全教育日',
        icon: Trophy,
      },
      {
        title: '大创项目获国家级立项',
        description:
          '5月 · 《智宠灵瑞——基于具身智能的适老化情感陪伴机器人》创新训练项目 · 为期一年',
        icon: Flame,
      },
    ],
  },
];

const contacts = [
  { icon: Mail, label: 'Email', value: 'suyang2027@126.com' },
  { icon: MessageCircle, label: 'WeChat', value: 'MrYSY2005' },
  { icon: MapPin, label: 'Location', value: '天津市' },
];

/* ---------- Credential Detail Dialog ---------- */
function CredentialDialog({
  credential,
  open,
  onOpenChange,
}: {
  credential: CredentialDetail | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!credential) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0d1117] border border-cyber-blue/30 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-cyber-blue">
            <FileText className="w-5 h-5" />
            <span className="text-sm font-bold tracking-wide">
              材料详情
            </span>
          </DialogTitle>
          <DialogDescription className="text-slate-400 text-xs sr-only">
            证书或专利的详细摘要信息
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-1">
          {/* Name */}
          <div>
            <h3 className="text-white font-semibold text-base leading-snug">
              {credential.name}
            </h3>
          </div>

          {/* Meta info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-300 text-xs">
              <Building2 className="w-3.5 h-3.5 text-cyber-blue/60 flex-shrink-0" />
              <span>
                <span className="text-slate-500">颁发机构：</span>
                {credential.issuer}
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-300 text-xs">
              <Calendar className="w-3.5 h-3.5 text-cyber-blue/60 flex-shrink-0" />
              <span>
                <span className="text-slate-500">时间：</span>
                {credential.date}
              </span>
            </div>
          </div>

          {/* Highlights */}
          <div className="bg-[#06080f] border border-cyber-blue/15 rounded-lg p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cyber-blue/70" />
              <span className="text-[11px] text-cyber-blue/80 font-semibold tracking-wider">
                核心信息
              </span>
            </div>
            <ul className="space-y-1.5">
              {credential.highlights.map((h, i) => (
                <li
                  key={i}
                  className="text-[11px] text-slate-400 leading-relaxed flex items-start gap-1.5"
                >
                  <span className="w-1 h-1 rounded-full bg-cyber-blue/50 mt-1.5 flex-shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* File link */}
          {credential.fileUrl && (
            <a
              href={credential.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 text-xs text-cyber-blue bg-cyber-blue/10 border border-cyber-blue/20 rounded-lg hover:bg-cyber-blue/20 hover:border-cyber-blue/40 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              查看原始{credential.fileType === 'pdf' ? 'PDF' : '图片'}文件
            </a>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ---------- Main Component ---------- */
export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCredential, setActiveCredential] =
    useState<CredentialDetail | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCredentialClick = (credentialId: string) => {
    const cred = credentials.find((c) => c.id === credentialId);
    if (cred) {
      setActiveCredential(cred);
      setDialogOpen(true);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05 }
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
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyber-blue/20 to-cyan-900/30 border border-cyber-blue/30 flex items-center justify-center flex-shrink-0">
                <span className="text-cyber-blue text-lg font-bold">Y</span>
              </div>
              <div>
                <p className="text-white text-xs font-semibold">袁苏洋</p>
                <p className="text-cyber-blue/60 text-[10px] mt-0.5">
                  天津仁爱学院 · 大三在读 · 智能交互设计
                </p>
              </div>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed mb-3">
              天津仁爱学院大三在读，主修智能交互设计专业，2025年加入网络与信息安全微专业。持有发明专利一项，担任创业实践协会社团主席及智交互产教融合创新实验室学生负责人。致力于将交互设计思维与信息安全意识相融合，探索安全可信的智能交互体验。
            </p>

            {/* Highlight badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center gap-1 px-2 py-1 text-[10px] tracking-wider text-cyber-blue bg-cyber-blue/10 border border-cyber-blue/20 rounded-full">
                <GraduationCap className="w-3 h-3" />
                智能交互设计
              </span>
              <button
                type="button"
                onClick={() => handleCredentialClick('patent-welding')}
                className="inline-flex items-center gap-1 px-2 py-1 text-[10px] tracking-wider text-green-400 bg-green-400/10 border border-green-400/20 rounded-full hover:bg-green-400/20 hover:border-green-400/40 transition-colors cursor-pointer"
              >
                <Award className="w-3 h-3" />
                发明专利一项
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </button>
              <span className="inline-flex items-center gap-1 px-2 py-1 text-[10px] tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-full">
                <Users className="w-3 h-3" />
                社团主席
              </span>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-0.5 text-[10px] tracking-wider text-slate-400 bg-[#131a24] border border-cyber-blue-dim rounded-full hover:border-cyber-blue/40 hover:text-cyber-blue transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Campus Experience */}
          <div
            className={`p-6 bg-[#0d1117] border border-cyber-blue-dim rounded-xl transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <h3 className="text-white font-bold text-sm tracking-wider mb-6">
              CAMPUS EXPERIENCE
            </h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-cyber-blue/50 via-cyber-blue/20 to-transparent" />

              <div className="space-y-5">
                {campusTimeline.map((group, gi) => (
                  <div key={group.year}>
                    {/* Year header */}
                    <div className="relative pl-6 mb-3">
                      <div className="absolute left-0 top-0.5 w-[15px] h-[15px] rounded-full border-2 border-cyber-blue bg-[#0d1117] flex items-center justify-center">
                        <div className="w-[5px] h-[5px] rounded-full bg-cyber-blue" />
                      </div>
                      <span className="text-cyber-blue text-xs font-bold font-mono tracking-wider">
                        {group.year}
                      </span>
                    </div>

                    {/* Events */}
                    <div className="space-y-3 ml-6 border-l border-cyber-blue/10 pl-4">
                      {group.events.map((event, ei) => {
                        const Icon = event.icon;
                        const credentialId =
                          eventCredentialMap[event.title] ?? null;
                        const hasCredential = credentialId !== null;

                        return (
                          <div key={`${group.year}-${ei}`} className="relative">
                            {/* Sub-dot */}
                            <div className="absolute -left-[21px] top-1 w-[7px] h-[7px] rounded-full border border-cyber-blue/40 bg-[#0d1117]" />

                            <div className="flex items-start gap-2">
                              <div
                                className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                  hasCredential
                                    ? 'bg-green-400/10 border border-green-400/20'
                                    : 'bg-cyber-blue/10 border border-cyber-blue/15'
                                }`}
                              >
                                <Icon
                                  className={`w-3 h-3 ${
                                    hasCredential
                                      ? 'text-green-400/70'
                                      : 'text-cyber-blue/60'
                                  }`}
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <h4 className="text-white text-[11px] font-semibold leading-tight">
                                    {event.title}
                                  </h4>
                                  {hasCredential && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleCredentialClick(credentialId)
                                      }
                                      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[9px] text-green-400 bg-green-400/10 border border-green-400/20 rounded-full hover:bg-green-400/20 hover:border-green-400/40 transition-colors cursor-pointer flex-shrink-0"
                                    >
                                      <FileText className="w-2.5 h-2.5" />
                                      查看详情
                                    </button>
                                  )}
                                </div>
                                <p className="text-slate-500 text-[10px] mt-0.5 leading-relaxed">
                                  {event.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
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
              <div className="w-20 h-20 rounded-lg overflow-hidden border border-cyber-blue-dim flex-shrink-0 bg-white">
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

      {/* Credential Detail Dialog */}
      <CredentialDialog
        credential={activeCredential}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </section>
  );
}
