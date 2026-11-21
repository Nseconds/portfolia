import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t-2 border-ink/20 bg-paper-surface/80 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Column: Monogram & Identity */}
        <div className="text-center md:text-left space-y-1">
          <div className="font-mono text-sm font-bold tracking-wider text-ink uppercase">
            YOUR NAME
          </div>
          <div className="font-mono text-xs text-ink/60 uppercase tracking-widest">
            CREATIVE PROFESSIONAL
          </div>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-mono text-xs font-bold tracking-wider text-ink/75">
          <a href="#about" className="hover:text-crayon-pink transition-colors">
            ABOUT
          </a>
          <a href="#work" className="hover:text-crayon-pink transition-colors">
            CASE STUDY
          </a>
          <a href="#playground" className="hover:text-crayon-pink transition-colors">
            PLAYGROUND
          </a>
          <a href="#contact" className="hover:text-crayon-pink transition-colors">
            CONTACT
          </a>
        </div>

        {/* Right Column: Handwritten Note & Scroll to Top */}
        <div className="flex items-center space-x-4">
          <span className="font-handwriting text-lg text-ink/70 -rotate-2">
            "made with curiosity" ✎
          </span>

          <span className="font-mono text-xs text-ink/50">
            © 2026
          </span>

          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="p-2 bg-crayon-yellow border-2 border-ink rounded-sm shadow-brutal-sm hover:shadow-brutal transition-all focus:outline-none"
          >
            <ArrowUp className="w-4 h-4 text-ink" />
          </button>
        </div>
      </div>
    </footer>
  );
};
