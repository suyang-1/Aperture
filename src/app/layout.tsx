import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'YUAN SUYANG | 智能交互设计 & 网络安全',
  description:
    '袁苏洋 — 本科大三在读，智能交互设计专业 & 网络与信息安全微专业，发明专利一项。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="dark">
      <body className="antialiased">{children}</body>
    </html>
  );
}
