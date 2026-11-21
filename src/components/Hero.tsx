import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { HERO_DATA } from '../data/portfolioData';
import { StickyNote } from './common/StickyNote';
import { CurvedArrow, HandDrawnStar } from './common/HandDoodles';
import { TapeStrip } from './common/TapeStrip';

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative pt-28 md:pt-36 pb-20 md:pb-28 px-4 md:px-8 max-w-6xl mx-auto min-h-[90vh] flex flex-col justify-between overflow-visible"
    >
      {/* Top Meta Tag & Availability Pin */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="inline-flex items-center space-x-2 bg-paper-surface border border-ink/40 px-3 py-1 rounded-sm shadow-brutal-sm">
          <span className="font-mono text-xs uppercase tracking-wider text-ink/70">
            STATUS:
          </span>
          <span className="font-mono text-xs font-bold text-ink">
            {HERO_DATA.availability}
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
        </div>

        <div className="font-mono text-xs text-ink/60 tracking-wider">
          {HERO_DATA.location} · 2026
        </div>
      </div>

      {/* Main Oversized Hero Composition */}
      <div className="relative my-4 md:my-8">
        {/* Handwritten Eyebrow with arrow */}
        <div className="flex items-center space-x-3 mb-2 md:mb-3">
          <span className="font-handwriting text-2xl md:text-3xl text-ink font-bold transform -rotate-2">
            {HERO_DATA.label}
          </span>
          <CurvedArrow direction="down-right" className="w-12 h-8 text-crayon-pink" />
        </div>

        {/* Central Display Name inside Hand-drawn Sketchy Frame */}
        <div className="relative inline-block w-full max-w-4xl">
          {/* Decorative Corner Tape */}
          <TapeStrip color="pink" position="top-left" rotation="-rotate-6" />
          <TapeStrip color="yellow" position="bottom-right" rotation="rotate-3" />

          {/* Handcrafted sketch box container */}
          <div
            className="relative bg-paper-surface border-4 border-ink p-6 sm:p-8 md:p-12 rounded-sm shadow-brutal-lg md:shadow-brutal-xl overflow-hidden"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(24, 21, 17, 0.08) 1.5px, transparent 1.5px)`,
              backgroundSize: '20px 20px',
            }}
          >
            {/* Background watermarked grid coordinates */}
            <div className="absolute top-2 right-3 font-mono text-[10px] text-ink/30 select-none">
              CANVAS_WORKSPACE // X: 042 Y: 108
            </div>

            {/* Giant Stacked Placeholder Name */}
            <div className="font-sans font-black tracking-tighter uppercase leading-[0.88] select-none text-ink">
              <span className="block text-6xl sm:text-7xl md:text-9xl lg:text-[10rem] text-ink hover:text-crayon-pink transition-colors">
                {HERO_DATA.nameLine1}
              </span>
              <div className="flex items-baseline space-x-3 md:space-x-6">
                <span className="block text-6xl sm:text-7xl md:text-9xl lg:text-[10rem] text-ink hover:text-crayon-blue transition-colors">
                  {HERO_DATA.nameLine2}
                </span>
                <span className="inline-block transform rotate-12 align-middle">
                  <HandDrawnStar size={48} color="#f7c948" className="animate-spin-slow" />
                </span>
              </div>
            </div>

            {/* Sub-tag inside the frame */}
            <div className="mt-4 pt-4 border-t-2 border-dashed border-ink/20 flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-xs md:text-sm uppercase tracking-widest font-bold text-ink/70">
                ROLE: {HERO_DATA.role}
              </span>
              <span className="font-handwriting text-lg md:text-xl text-ink/70 -rotate-1">
                questions before pixels ✎
              </span>
            </div>
          </div>

          {/* Floating Sticky Notes around Hero (Desktop / Tablet view) */}
          <div className="hidden lg:block absolute -top-10 -right-8 z-30">
            <StickyNote
              text="MADE THINGS"
              color="yellow"
              rotation="rotate-6"
              tag="CRAFT"
            />
          </div>

          <div className="hidden lg:block absolute -bottom-8 -left-8 z-30">
            <StickyNote
              text="SWEAT THE DETAILS"
              color="pink"
              rotation="-rotate-3"
              tag="PRINCIPLE"
            />
          </div>

          <div className="hidden xl:block absolute top-1/2 -right-20 -translate-y-1/2 z-30">
            <StickyNote
              text="CREATIVE ENGINEER"
              color="cyan"
              rotation="rotate-2"
              tag="DISCIPLINE"
            />
          </div>
        </div>

        {/* Mobile Sticky Notes (Organized as horizontal badges so they don't break viewport) */}
        <div className="flex lg:hidden flex-wrap gap-2 mt-4">
          <StickyNote text="MADE THINGS" color="yellow" rotation="-rotate-1" tag="01" />
          <StickyNote text="SWEAT THE DETAILS" color="pink" rotation="rotate-1" tag="02" />
        </div>
      </div>

      {/* Hero Headline, Subhead & Call To Action */}
      <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
        <div className="md:col-span-8 space-y-4">
          <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-ink leading-tight">
            "I DESIGN THINGS THAT GET OUT OF YOUR WAY."
          </h1>
          <p className="font-sans text-base md:text-lg text-ink-light max-w-2xl leading-relaxed">
            {HERO_DATA.subHeadline}
          </p>
        </div>

        <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-4">
          {/* Main CTA Button */}
          <motion.a
            href="#contact"
            data-cursor="open"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-ink text-paper-surface border-2 border-ink px-6 py-3.5 rounded-sm shadow-brutal hover:shadow-brutal-lg transition-all font-mono text-sm uppercase tracking-wider font-bold"
          >
            <span>CONTACT ME</span>
            <Sparkles className="w-4 h-4 text-crayon-yellow" />
          </motion.a>

          {/* Scroll Down Hint with Doodled Arrow */}
          <a
            href="#about"
            className="inline-flex items-center space-x-2 font-mono text-xs text-ink/60 hover:text-ink transition-colors"
          >
            <span>EXPLORE WORK</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </div>
      </div>

      {/* Floating Circular / Polaroid Image Placeholders */}
      <div className="mt-12 pt-8 border-t border-ink/15 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-2 border-ink bg-paper-surface overflow-hidden shadow-brutal-sm p-1">
              <img
                src="/assets/images/profilePlaceholder.svg"
                alt="Profile Placeholder"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <TapeStrip color="mint" position="top-right" rotation="rotate-12" className="scale-75" />
          </div>
          <div>
            <div className="font-mono text-xs font-bold text-ink uppercase">
              PROFILE IMAGE
            </div>
            <div className="font-handwriting text-base text-ink/70">
              replace with your personal photo later
            </div>
          </div>
        </div>

        <div className="font-mono text-xs text-ink/50 flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-crayon-yellow border border-ink"></span>
          <span>SCROLL FOR FEATURED WORKS</span>
        </div>
      </div>
    </section>
  );
};
