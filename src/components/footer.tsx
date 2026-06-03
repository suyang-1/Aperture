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
            <a
              href="#"
              className="text-slate-600 hover:text-cyber-blue transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="text-slate-600 hover:text-cyber-blue transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="text-slate-600 hover:text-cyber-blue transition-colors"
              aria-label="Calendar"
            >
              <Calendar className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
