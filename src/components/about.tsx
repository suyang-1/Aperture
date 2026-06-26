'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
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
  BookOpen,
  UserCheck,
  BrainCircuit,
  Cpu,
  Globe,
  ChevronDown,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useMouseSpotlight } from '@/hooks/use-mouse-spotlight';

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
  '深度学习',
  'AI Agent',
  '提示工程',
  '服务设计',
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
  extraLinks?: { label: string; url: string; type?: 'pdf' | 'image' }[];
}

const credentials: CredentialDetail[] = [
  {
    id: 'patent-welding',
    name: '一种配电柜柜体的焊接装置',
    issuer: '国家知识产权局',
    date: '2025年10月31日（授权公告日）',
    highlights: [
      '专利类型：发明专利',
      '申请号：202511071601.6',
      '申请公布号：CN 120551632 A',
      '授权公告号：CN 120551632 B',
      '证书号：第8428532号',
      '专利权人：天津仁爱学院（天津市静海区团泊新城博学苑）',
      '发明人：袁铁彪、葛军超、刘金剑、于洋洋、袁苏洋、孙熙然、储青海',
      '专利申请日：2025年08月01日',
      '申请公布日：2025年08月29日',
      '技术领域：焊接技术（B23K 31/02, B23K 37/003, B23K 37/00）',
      '核心创新：自动焊接+焊后快速冷却+自动送料+磁性限位支撑一体化装置',
      '三大技术效果：',
      '  1. 输送带+焊接架实现柜体自动焊接与焊后气冷降温，提高生产效率',
      '  2. 存储仓+引导板+电动气缸控制挡板，实现柜板自动投送送料',
      '  3. 第一/第二磁块磁性吸附限位支撑，提高焊接精度与可调节性',
      '权利要求：10项，说明书5页，附图12页',
    ],
    fileUrl: '/assets/patent-certificate.pdf',
    fileType: 'pdf',
    extraLinks: [
      { label: '查看专利全文（含说明书附图）', url: '/assets/patent-detail.pdf' },
    ],
  },
  {
    id: 'scholarship-2024',
    name: '优秀学生二等奖学金',
    issuer: '天津仁爱学院',
    date: '2024年12月（2023-2024学年）',
    highlights: [
      '荣誉类型：校级奖学金',
      '学年：2023-2024学年',
      '等级：二等奖学金',
      '颁发机构：天津仁爱学院',
    ],
    fileUrl: '/assets/scholarship-certificate.jpg',
    fileType: 'image',
  },
  {
    id: 'google-digital-talent',
    name: '谷歌数字人才培养计划结业证书',
    issuer: 'Google谷歌 × 中国大学MOOC',
    date: '2024年8月31日',
    highlights: [
      '课程：谷歌官方出品——海外数字营销系列课程',
      '以优秀成绩通过最终考核',
      '证书编号：G20240827006200',
    ],
    fileUrl: '/assets/google-digital-talent.jpg',
    fileType: 'image',
  },
  {
    id: 'english-writing-2024',
    name: '2024百万同题英语写作大赛优秀作品奖',
    issuer: '全国高等学校大学外语教学研究会 / 中国高校英语写作教学联盟',
    date: '2024年6月',
    highlights: [
      '奖项：优秀作品奖（Excellent Composition Award）',
      '赛事：2024 Big Writing Event Under One Topic',
      '学校：天津仁爱学院',
    ],
    fileUrl: '/assets/english-writing-2024.jpg',
    fileType: 'image',
  },
  {
    id: 'service-design-jam',
    name: '2025全球服务设计共创节参与证书',
    issuer: '全球服务设计联盟 / 与贤服务设计 / 天津仁爱学院',
    date: '2025年2月23日',
    highlights: [
      '活动：GLOBAL SERVICE JAM 2025',
      '作品：《一场物质的轮回演出》',
      '团队成员：袁苏洋、吴美妮、孙熙然、王慧智、杨寓涵、王乐涵、余坤洋',
      '指导老师：李春秋、梁芷贤、张寞轩、石丽雯',
      '证书编号：GSJ-YX-2025011',
    ],
    fileUrl: '/assets/service-design-fest.png',
    fileType: 'image',
  },
  {
    id: 'prompt-engineer',
    name: 'Prompt Engineer 提示工程师认证',
    issuer: 'Datawhale × 讯飞星火',
    date: '2025年3月',
    highlights: [
      '认证：具备提示工程相关技能，通过最终考核',
      '被认定为 Prompt Engineer',
      '证书编号：DWPE016547',
      '合作方：讯飞开放平台',
    ],
    fileUrl: '/assets/prompt-engineer.png',
    fileType: 'image',
  },
  {
    id: 'ai-agent-cert',
    name: 'AI Agent 能力认证证书',
    issuer: 'Datawhale × 扣子（Coze）',
    date: '2025年6月5日',
    highlights: [
      '活动：Datawhale AI+X高校行"AI+Agent"主题学习',
      '通过理论考试并完成实践任务',
      '具备使用AI Agent工具基本知识与能力',
      '证书编号：DW219-12060103',
    ],
    fileUrl: '/assets/coze-cert.png',
    fileType: 'image',
  },
  {
    id: 'zhiwang-cup-team',
    name: '第三届"知网杯"天津高校数字素养大赛团队三等奖',
    issuer: '天津市高等学校图书情报工作委员会 / 同方知网',
    date: '2025年7月',
    highlights: [
      '奖项：团队三等奖',
      '作品：《基于多模态感知与边缘计算的复杂城市环境无人机自主避障研究现状报告》',
      '颁发机构：天津高等教育文献信息中心 / 天津理工大学图书馆',
    ],
    fileUrl: '/assets/zhiwang-cup-team.png',
    fileType: 'image',
  },
  {
    id: 'ai-defender',
    name: '2025全球AI攻防挑战赛·鉴真季 AI守卫者称号',
    issuer: '中国图象图形学学会 × 蚂蚁集团',
    date: '2025年',
    highlights: [
      '荣誉：AI守卫者称号',
      '赛事：2025 Global AI Attacks and Defense Challenge · Jianzhen Season',
      '颁发机构：中国图象图形学学会 / 蚂蚁集团',
    ],
    fileUrl: '/assets/ai-defender-title.png',
    fileType: 'image',
  },
  {
    id: 'nvidia-dl-cert',
    name: 'NVIDIA 深度学习基础认证',
    issuer: 'NVIDIA',
    date: '2025年11月28日',
    highlights: [
      '课程：深度学习基础——理论与实践入门',
      '认证类型：Certificate of Competency',
      '认证ID：sL661SC9Rh6WmuY3jiJYpw',
      '签发人：Greg Estes, VP of NVIDIA',
    ],
    fileUrl: '/assets/nvidia-dl-cert.pdf',
    fileType: 'pdf',
  },
  {
    id: 'fuxing-cup',
    name: '"复兴杯"第五届全国大学生网络安全精英赛·双赛道晋级',
    issuer: '国家网络空间安全人才培养基地',
    date: '2025年11月17日',
    highlights: [
      '赛道一：网络安全攻防赛道（证书编号：52527734164813）',
      '赛道二：人工智能应用与安全赛道（证书编号：56924141301584）',
      '成绩：双赛道初赛成绩优异，均成功晋级复赛',
    ],
    fileUrl: '/assets/fuxing-cup-attack.png',
    fileType: 'image',
    extraLinks: [
      { label: '人工智能应用与安全赛道证书', url: '/assets/fuxing-cup-prelim.png', type: 'image' as const },
    ],
  },
  {
    id: 'datawhale-spring-camp',
    name: 'Datawhale AI春训营结营证书',
    issuer: 'Datawhale × 上海科学智能研究院',
    date: '2026年5月24日',
    highlights: [
      '活动：2026 Datawhale AI春训营第一期',
      '赛道：第四届世界科学智能大赛·电力市场交易赛道：储能电站收益优化',
      '完成全部学习，授予结营证书',
      '证书编号：DW306-12060655',
    ],
    fileUrl: '/assets/datawhale-spring-camp.png',
    fileType: 'image',
  },
  {
    id: 'bohack-2025',
    name: 'BoHack 2025 天津黑客松参赛项目',
    issuer: '天开高教科创园 / 天津大学宣怀学院 / 北洋海棠基金',
    date: '2025年12月26日-28日',
    highlights: [
      '赛事：BoHack 2025 天津黑客松 · "链动创新"',
      '赛道：企业赛道——九安医疗',
      '团队：LZY 005组',
      '产出：小程序设计与开发（48小时极限开发）',
      '成果展示：路演PPT + 产品演示视频',
      '主办方：天开高教科创园 / 天津大学宣怀学院 / 北洋海棠基金 / 天津大学科技园 / 创业知本社',
    ],
    fileUrl: '/assets/bohack-poster.jpg',
    fileType: 'image',
    extraLinks: [
      { label: '查看路演PPT', url: '/assets/bohack-ppt.pptx' },
      { label: '查看产品演示视频', url: '/assets/bohack-demo-video.mp4' },
      { label: '查看活动照片-团队协作', url: '/assets/bohack-photo1.jpg' },
      { label: '查看活动照片-路演现场', url: '/assets/bohack-photo2.jpg' },
    ],
  },
];

/* ---------- Which timeline events have credentials ---------- */
const eventCredentialMap: Record<string, string> = {
  '发明专利一项': 'patent-welding',
  '获"优秀学生二等奖学金"': 'scholarship-2024',
  '获谷歌数字人才培养计划结业证书': 'google-digital-talent',
  '获百万同题英语写作大赛优秀作品奖': 'english-writing-2024',
  '参加全球服务设计共创节': 'service-design-jam',
  '获Prompt Engineer提示工程师认证': 'prompt-engineer',
  '获AI Agent能力认证': 'ai-agent-cert',
  '"知网杯"数字素养大赛双项三等奖': 'zhiwang-cup-team',
  '获全球AI攻防挑战赛AI守卫者称号': 'ai-defender',
  '获NVIDIA深度学习基础认证': 'nvidia-dl-cert',
  '"复兴杯"网络安全精英赛晋级复赛': 'fuxing-cup',
  '获Datawhale AI春训营结营证书': 'datawhale-spring-camp',
  '参加BoHack 2025天津黑客松': 'bohack-2025',
};

const campusTimeline = [
  {
    year: '2023',
    events: [
      {
        title: '入读天津仁爱学院',
        description: '智能交互设计专业',
        icon: GraduationCap,
        isCore: true,
      },
      {
        title: '军训优秀学生',
        description: '9月 · 校级荣誉',
        icon: Award,
        isCore: false,
      },
      {
        title: '英语演讲大赛校级三等奖',
        description: '10月 · 外研社·国才杯"理解当代中国"',
        icon: Mic,
        isCore: true,
      },
      {
        title: '加入创业实践协会',
        description: '10月 · 天津仁爱学院',
        icon: Users,
        isCore: false,
      },
      {
        title: '主持首届大学生职业规划大赛',
        description: '12月 · 天津仁爱学院',
        icon: Mic,
        isCore: false,
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
        isCore: true,
      },
      {
        title: '获百万同题英语写作大赛优秀作品奖',
        description: '6月 · 2024百万同题英语写作大赛 · 全国高等学校大学外语教学研究会',
        icon: Award,
        isCore: true,
      },
      {
        title: '主持2024届毕业生晚会',
        description: '6月 · 数智传媒与设计艺术学院"艺起向未来"',
        icon: Mic,
        isCore: false,
      },
      {
        title: '获谷歌数字人才培养计划结业证书',
        description: '8月 · Google × 中国大学MOOC · 海外数字营销系列课程',
        icon: Globe,
        isCore: true,
      },
      {
        title: '获"悦读之星"校园选拔赛三等奖',
        description: '9月13日 · 2024书香天津·校园大学生阅读活动',
        icon: BookOpen,
        isCore: false,
      },
      {
        title: '被聘为创业实践协会"实践部部长"',
        description: '9月 · 天津仁爱学院 · 任期一年',
        icon: UserCheck,
        isCore: false,
      },
      {
        title: '获"青马工程"培训班结业证书',
        description: '10月 · 机械工程学院第二期',
        icon: GraduationCap,
        isCore: false,
      },
      {
        title: '加入智交互产教融合创新实验室',
        description: '10月 · 数智传媒与设计艺术学院',
        icon: GraduationCap,
        isCore: false,
      },
      {
        title: '获"优秀学生二等奖学金"',
        description: '12月 · 天津仁爱学院2023-2024学年',
        icon: Award,
        isCore: true,
      },
      {
        title: '获第二届职业规划大赛校级三等奖',
        description: '12月16日 · 天津仁爱学院',
        icon: Award,
        isCore: false,
      },
    ],
  },
  {
    year: '2025',
    events: [
      {
        title: '参加全球服务设计共创节',
        description: '2月 · GLOBAL SERVICE JAM · 作品《一场物质的轮回演出》',
        icon: Globe,
        isCore: true,
      },
      {
        title: '获Prompt Engineer提示工程师认证',
        description: '3月 · Datawhale × 讯飞星火',
        icon: BrainCircuit,
        isCore: true,
      },
      {
        title: '获AI Agent能力认证',
        description: '6月 · Datawhale × 扣子（Coze）',
        icon: Cpu,
        isCore: true,
      },
      {
        title: '"知网杯"数字素养大赛双项三等奖',
        description: '7月 · 第三届天津高校数字素养大赛 · 个人三等奖 + 团体三等奖',
        icon: Trophy,
        isCore: true,
      },
      {
        title: '中国国际大学生创新大赛天津赛区铜奖',
        description: '7月 · 第一负责人获铜奖一项，成员身份获铜奖一项',
        icon: Award,
        isCore: true,
      },
      {
        title: '担任创业实践协会社团主席',
        description: '9月 · 天津仁爱学院',
        icon: Users,
        isCore: true,
      },
      {
        title: '担任智交互产教融合创新实验室学生负责人',
        description: '9月 · 数智传媒与设计艺术学院',
        icon: GraduationCap,
        isCore: true,
      },
      {
        title: '加入网络与信息安全微专业',
        description: '9月 · 辅修',
        icon: ShieldCheck,
        isCore: true,
      },
      {
        title: '应聘图书馆信息咨询助理馆员',
        description: '10月27日 · 天津仁爱图书馆 · 为期一年',
        icon: Briefcase,
        isCore: false,
      },
      {
        title: '发明专利一项',
        description:
          '10月 · 一种配电柜柜体的焊接装置 · ZL 2025 1 1071601.6',
        icon: FileText,
        isCore: true,
      },
      {
        title: '获全球AI攻防挑战赛AI守卫者称号',
        description: '11月 · 2025全球AI攻防挑战赛·鉴真季 · 中国图象图形学学会 × 蚂蚁集团',
        icon: ShieldCheck,
        isCore: true,
      },
      {
        title: '获NVIDIA深度学习基础认证',
        description: '11月28日 · 深度学习基础——理论与实践入门',
        icon: BrainCircuit,
        isCore: true,
      },
      {
        title: '"复兴杯"网络安全精英赛晋级复赛',
        description: '11月17日 · 网络攻防赛道 + 人工智能应用与安全赛道 · 双赛道晋级',
        icon: ShieldCheck,
        isCore: true,
      },
      {
        title: '网络安全主题演讲获二等奖',
        description: '11月 · 智算工程学院"国安强音——奏响网络安全时代华章"',
        icon: Mic,
        isCore: false,
      },
      {
        title: '获"社团活动奖""优秀学生干部"荣誉称号',
        description: '12月 · 天津仁爱学院2024-2025学年校级荣誉',
        icon: Award,
        isCore: true,
      },
      {
        title: '参加BoHack 2025天津黑客松',
        description: '12月26-28日 · 企业赛道·九安医疗 · LZY 005组 · 小程序设计与开发',
        icon: Flame,
        isCore: true,
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
        isCore: true,
      },
      {
        title: '大创项目获国家级立项',
        description:
          '5月 · 《智宠灵瑞——基于具身智能的适老化情感陪伴机器人》创新训练项目 · 为期一年',
        icon: Flame,
        isCore: true,
      },
      {
        title: '获Datawhale AI春训营结营证书',
        description: '5月24日 · 第四届世界科学智能大赛·电力市场交易赛道：储能电站收益优化',
        icon: BrainCircuit,
        isCore: true,
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

          {/* Extra links */}
          {credential.extraLinks && credential.extraLinks.length > 0 && (
            <div className="flex flex-col gap-2">
              {credential.extraLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 text-xs text-cyber-blue bg-cyber-blue/10 border border-cyber-blue/20 rounded-lg hover:bg-cyber-blue/20 hover:border-cyber-blue/40 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {link.label}
                </a>
              ))}
            </div>
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
  const [expandedYears, setExpandedYears] = useState<Record<string, boolean>>({});

  const handleCredentialClick = (credentialId: string) => {
    const cred = credentials.find((c) => c.id === credentialId);
    if (cred) {
      setActiveCredential(cred);
      setDialogOpen(true);
    }
  };

  const toggleYear = (year: string) => {
    setExpandedYears((prev) => ({ ...prev, [year]: !prev[year] }));
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
              天津仁爱学院大三在读，主修智能交互设计专业，2025年加入网络与信息安全微专业。持有发明专利一项，获NVIDIA深度学习认证、Datawhale Prompt Engineer & AI Agent认证。担任创业实践协会社团主席及智交互产教融合创新实验室学生负责人。致力于将交互设计思维与信息安全意识相融合，探索安全可信的智能交互体验。
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
                {campusTimeline.map((group) => {
                  const coreEvents = group.events.filter((e) => e.isCore);
                  const auxEvents = group.events.filter((e) => !e.isCore);
                  const hasAux = auxEvents.length > 0;
                  const isExpanded = expandedYears[group.year] ?? false;

                  return (
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

                      {/* Core events (always visible) */}
                      <div className="space-y-3 ml-6 border-l border-cyber-blue/10 pl-4">
                        {coreEvents.map((event, ei) => {
                          const Icon = event.icon;
                          const credentialId =
                            eventCredentialMap[event.title] ?? null;
                          const hasCredential = credentialId !== null;

                          return (
                            <div key={`core-${ei}`} className="relative">
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

                        {/* Auxiliary events (collapsible) */}
                        {hasAux && (
                          <div
                            className="overflow-hidden transition-all duration-500 ease-in-out"
                            style={{
                              maxHeight: isExpanded ? auxEvents.length * 80 + 50 : '0px',
                              opacity: isExpanded ? 1 : 0,
                            }}
                          >
                            {auxEvents.map((event, ei) => {
                              const Icon = event.icon;
                              const credentialId =
                                eventCredentialMap[event.title] ?? null;
                              const hasCredential = credentialId !== null;

                              return (
                                <div key={`aux-${ei}`} className="relative mt-3">
                                  <div className="absolute -left-[21px] top-1 w-[7px] h-[7px] rounded-full border border-slate-600/40 bg-[#0d1117]" />
                                  <div className="flex items-start gap-2">
                                    <div
                                      className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                        hasCredential
                                          ? 'bg-green-400/10 border border-green-400/20'
                                          : 'bg-slate-700/30 border border-slate-600/20'
                                      }`}
                                    >
                                      <Icon
                                        className={`w-3 h-3 ${
                                          hasCredential
                                            ? 'text-green-400/70'
                                            : 'text-slate-500/60'
                                        }`}
                                      />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-1.5 flex-wrap">
                                        <h4 className="text-slate-300 text-[11px] font-semibold leading-tight">
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
                        )}

                        {/* Toggle button */}
                        {hasAux && (
                          <button
                            type="button"
                            onClick={() => toggleYear(group.year)}
                            className="mt-2 flex items-center gap-1 text-[10px] text-slate-500 hover:text-cyber-blue transition-colors duration-300 cursor-pointer group/toggle"
                          >
                            <ChevronDown
                              className={`w-3 h-3 transition-transform duration-300 ${
                                isExpanded ? 'rotate-180' : ''
                              }`}
                            />
                            <span className="inline-flex items-center gap-0.5">
                              {isExpanded ? '收起' : '···查看更多'}
                              <span className="text-slate-600">({auxEvents.length})</span>
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
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

            {/* QR Codes — 微信 + 公众号 */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {/* WeChat QR */}
              <div className="rounded-lg border border-cyber-blue-dim bg-[#0d1117] p-3 flex flex-col items-center gap-2 hover:border-cyber-blue/40 transition-colors">
                <div className="w-full aspect-square rounded overflow-hidden bg-white">
                  <img
                    src="/wechat-qr.jpg"
                    alt="微信二维码"
                    width={120}
                    height={120}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <p className="text-cyber-blue text-[10px] tracking-wider font-semibold">
                    扫码加微信
                  </p>
                  <p className="text-slate-500 text-[10px] mt-0.5">
                    MrYSY2005
                  </p>
                </div>
              </div>

              {/* WeChat MP QR */}
              <div className="rounded-lg border border-cyber-blue-dim bg-[#0d1117] p-3 flex flex-col items-center gap-2 hover:border-cyber-blue/40 transition-colors">
                <div className="w-full aspect-square rounded overflow-hidden bg-white">
                  <img
                    src="/assets/wechat-mp-qr.jpg"
                    alt="公众号二维码"
                    width={120}
                    height={120}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <p className="text-cyber-blue text-[10px] tracking-wider font-semibold">
                    关注公众号
                  </p>
                  <p className="text-slate-500 text-[10px] mt-0.5">
                    酥羊九言
                  </p>
                </div>
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
