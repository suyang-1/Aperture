'use client';

import { Github, Linkedin, Calendar } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative py-8 bg-[#06080f] border-t border-cyber-blue-dim">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-slate-600 text-xs">
            &copy; 2026 YUAN SUYANG. All rights reserved.
          </p>

          {/* Tagline */}
          <p className="text-slate-500 text-xs">
            Design with <span className="text-red-400">&hearts;</span> and Code
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="text-slate-600 hover:text-cyber-blue transition-colors"
              aria-label="LinkedIn"
              onClick={(e) => e.preventDefault()}
            >
              <Linkedin className="w-4 h-4" />
            </button>
            <a
              href="https://github.com/suyang-1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-cyber-blue transition-colors"
              aria-label="GitHub @suyang-1"
              title="GitHub @suyang-1"
            >
              <Github className="w-4 h-4" />
            </a>
            <button
              type="button"
              className="text-slate-600 hover:text-cyber-blue transition-colors"
              aria-label="Calendar"
              onClick={(e) => e.preventDefault()}
            >
              <Calendar className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
