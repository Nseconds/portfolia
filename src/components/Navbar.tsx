import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', href: '#hero' },
    { label: 'ABOUT', href: '#about' },
    { label: 'WORK', href: '#work' },
    { label: 'PLAYGROUND', href: '#playground' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-3 md:px-6 py-3 md:py-4 pointer-events-none">
        <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
          {/* Logo / Personal Stamp */}
          <motion.a
            href="#hero"
            whileHover={{ scale: 1.04, rotate: -2 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center space-x-2 bg-paper-surface border-2 border-ink px-3 py-1.5 rounded-sm shadow-brutal-sm group"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-crayon-pink border border-ink animate-pulse"></span>
            <span className="font-mono text-xs md:text-sm font-bold tracking-wider text-ink">
              MUHAMMAD FEROS
            </span>
            <span className="hidden sm:inline font-handwriting text-xs text-ink/60 -rotate-2">
              (portfolio)
            </span>
          </motion.a>

          {/* Desktop Compact Horizontal Navigation Card */}
          <nav
            className={`hidden md:flex items-center space-x-1 lg:space-x-2 px-3 py-1.5 rounded-full border-2 border-ink bg-paper-surface/95 backdrop-blur-sm transition-all duration-300 ${
              isScrolled ? 'shadow-brutal' : 'shadow-brutal-sm'
            }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative px-3 py-1 font-mono text-xs font-bold tracking-widest text-ink/80 hover:text-ink transition-colors group"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-crayon-pink scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </a>
            ))}
          </nav>

          {/* Right Status Pill & CTA */}
          <div className="flex items-center space-x-2">
            <motion.a
              href="#contact"
              data-cursor="open"
              whileHover={{ scale: 1.04, rotate: 1 }}
              whileTap={{ scale: 0.96 }}
              className="hidden sm:flex items-center space-x-1.5 bg-crayon-yellow border-2 border-ink px-3.5 py-1.5 rounded-sm shadow-brutal-sm hover:shadow-brutal transition-shadow"
            >
              <Sparkles className="w-3.5 h-3.5 text-ink" />
              <span className="font-mono text-xs font-bold tracking-wider text-ink">
                LET'S TALK
              </span>
              <ArrowUpRight className="w-3 h-3 text-ink" />
            </motion.a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 rounded-sm bg-paper-surface border-2 border-ink shadow-brutal-sm focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-ink" /> : <Menu className="w-5 h-5 text-ink" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-3 top-16 z-50 md:hidden bg-paper-surface border-2 border-ink p-5 rounded-sm shadow-brutal-lg"
          >
            <div className="flex flex-col space-y-3 font-mono text-sm font-bold tracking-widest">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 border-b border-ink/10 hover:bg-crayon-yellow/30 transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="font-handwriting text-base font-normal text-ink/60">visit →</span>
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 py-2.5 text-center bg-crayon-pink text-white border-2 border-ink rounded-sm shadow-brutal-sm font-mono text-xs tracking-wider"
              >
                CONTACT / GET IN TOUCH →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
