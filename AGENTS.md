# 项目上下文

### 项目名称
ZHAO YI 个人作品集网站 - 全栈设计工程师个人展示页

### 版本技术栈

- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **UI 组件**: shadcn/ui (基于 Radix UI)
- **Styling**: Tailwind CSS 4
- **Icons**: lucide-react

## 目录结构

```
├── public/                 # 静态资源
├── scripts/                # 构建与启动脚本
├── src/
│   ├── app/                # 页面路由与布局
│   │   ├── globals.css     # 全局样式（赛博暗黑主题）
│   │   ├── layout.tsx      # 根布局（dark 模式）
│   │   ├── page.tsx        # 进入页（星河 + 太阳系，点击地球进入主站）
│   │   └── portfolio/
│   │       └── page.tsx    # 作品集主页（组装所有 Section）
│   ├── components/         # 业务组件
│   │   ├── ui/             # Shadcn UI 组件库
│   │   ├── intro/
│   │   │   └── solar-system.tsx # 进入页太阳系组件（可点击的地球）
│   │   ├── effects/        # 动画/特效组件（流星、代码雨、粒子拖尾）
│   │   ├── floating-mascot.tsx # 右下角浮动智能体
│   │   ├── navbar.tsx      # 导航栏（固定顶部、毛玻璃效果）
│   │   ├── hero.tsx        # 首屏区域（左文字+右科技视觉）
│   │   ├── capabilities.tsx # 核心能力（4列卡片网格）
│   │   ├── projects.tsx    # 项目展示（2x2卡片网格）
│   │   ├── process.tsx     # 工作流程（6步骤+引用）
│   │   ├── about.tsx       # 关于与联系（3列布局）
│   │   ├── skills.tsx      # 专业技能与资格证书
│   │   ├── hobbies.tsx     # 兴趣爱好（篆刻/写字/羽毛球/乒乓球）
│   │   └── footer.tsx      # 页脚
│   ├── hooks/              # 自定义 Hooks
│   └── lib/                # 工具库
├── DESIGN.md               # 设计规范文档
├── next.config.ts          # Next.js 配置
├── package.json            # 项目依赖管理
└── tsconfig.json           # TypeScript 配置
```

- 项目文件默认初始化到 `src/` 目录下。

## 包管理规范

**仅允许使用 pnpm** 作为包管理器，**严禁使用 npm 或 yarn**。
**常用命令**：
- 安装依赖：`pnpm add <package>`
- 安装开发依赖：`pnpm add -D <package>`
- 安装所有依赖：`pnpm install`
- 移除依赖：`pnpm remove <package>`

## 开发规范

### 编码规范

- 默认按 TypeScript `strict` 心智写代码；优先复用当前作用域已声明的变量、函数、类型和导入，禁止引用未声明标识符或拼错变量名。
- 禁止隐式 `any` 和 `as any`；函数参数、返回值、解构项、事件对象、`catch` 错误在使用前应有明确类型或先完成类型收窄，并清理未使用的变量和导入。

### 主题与配色

- 主题为赛博暗黑风格，以 `#06080f` 为主背景色，`#00d4ff` 为电光蓝强调色
- 所有 CSS 变量在 `globals.css` 中统一定义，禁止硬编码颜色值
- 使用 `cyber-blue` 系列 CSS 变量保持一致性：`--color-cyber-blue`, `--color-cyber-blue-dim`, `--color-cyber-blue-glow`

### next.config 配置规范

- 配置的路径不要写死绝对路径，必须使用 path.resolve(__dirname, ...)、import.meta.dirname 或 process.cwd() 动态拼接。

### Hydration 问题防范

1. 严禁在 JSX 渲染逻辑中直接使用 typeof window、Date.now()、Math.random() 等动态数据。必须使用 'use client' 并配合 useEffect + useState 确保动态内容仅在客户端挂载后渲染；同时严禁非法 HTML 嵌套。
2. 禁止使用 head 标签，优先使用 metadata。

### 组件规范

- 每个区块为独立组件，通过 `page.tsx` 组装
- 客户端交互组件使用 `'use client'` 指令
- 使用 IntersectionObserver 实现滚动动画，避免全局滚动监听
- 所有 hover 效果使用 CSS transition，禁止 JS 直接操作样式

## UI 设计与组件规范

- 模板默认预装核心组件库 `shadcn/ui`，位于 `src/components/ui/` 目录下
- 业务组件位于 `src/components/` 根目录
- 图标统一使用 `lucide-react`，保持视觉风格一致

## 常见修改指南

| 修改内容 | 涉及文件 |
|----------|----------|
| 修改进入页（太阳系/地球点击） | `src/components/intro/solar-system.tsx` |
| 修改个人信息 | `src/components/hero.tsx`, `src/components/about.tsx` |
| 修改项目展示 | `src/components/projects.tsx` |
| 修改能力列表 | `src/components/capabilities.tsx` |
| 修改工作流程 | `src/components/process.tsx` |
| 修改导航链接 | `src/components/navbar.tsx` |
| 修改兴趣爱好 | `src/components/hobbies.tsx` |
| 修改技能/证书 | `src/components/skills.tsx` |
| 修改配色方案 | `src/app/globals.css` + `DESIGN.md` |
| 添加新区域 | 创建新组件 + 在 `src/app/portfolio/page.tsx` 中引入 |
