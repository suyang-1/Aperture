import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ZHAO YI | Full-Stack Design Engineer',
  description:
    '设计驱动创新，工程实现价值，安全守护未来。全栈设计工程师个人网站。',
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
