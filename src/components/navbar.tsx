'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Shield, Moon } from 'lucide-react';

const navLinks = [
  { label: 'HOME', href: '#home' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'THINKING', href: '#process' },
  { label: 'ABOUT', href: '#about' },
  { label: 'HOBBIES', href: '#hobbies' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#06080f]/80 backdrop-blur-xl border-b border-cyber-blue-dim'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-md border border-cyber-blue/50 flex items-center justify-center bg-cyber-blue/10 group-hover:bg-cyber-blue/20 transition-colors">
              <span className="text-cyber-blue font-bold text-sm">Y</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-sm tracking-wider leading-tight">
                YUAN SUYANG
              </span>
              <span className="text-slate-500 text-[10px] tracking-widest">
                INTERACTION & SECURITY
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-slate-400 hover:text-cyber-blue text-xs tracking-widest btn-elastic inline-block"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-4">
            <button
              className="text-slate-400 hover:text-cyber-blue transition-colors"
              aria-label="Toggle theme"
            >
              <Moon className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full border border-green-500/30 bg-green-500/10">
              <Shield className="w-3 h-3 text-green-500" />
              <span className="text-green-500 text-[10px] font-medium tracking-wider">
                SECURE
              </span>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-slate-400 hover:text-cyber-blue transition-colors"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileOpen && (
        <div className="md:hidden bg-[#06080f]/95 backdrop-blur-xl border-b border-cyber-blue-dim">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block text-slate-400 hover:text-cyber-blue text-sm tracking-widest transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
