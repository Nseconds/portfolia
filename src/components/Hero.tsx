import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { HERO_DATA } from '../data/portfolioData';
import { StickyNote } from './common/StickyNote';
import { CurvedArrow, HandDrawnStar, HandDrawnUnderline } from './common/HandDoodles';
import { TapeStrip } from './common/TapeStrip';

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative pt-28 md:pt-36 pb-20 md:pb-28 px-4 md:px-8 max-w-6xl mx-auto min-h-[90vh] flex flex-col justify-between overflow-visible"
    >
      {/* Top Meta Tag & Availability Pin */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="inline-flex items-center space-x-2 bg-paper-surface border border-ink/40 px-3.5 py-1.5 rounded-sm shadow-brutal-sm">
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

        {/* Central Display Frame Container */}
        <div className="relative inline-block w-full max-w-5xl">
          {/* Decorative Corner Tape (Top-Left) */}
          <TapeStrip color="yellow" position="top-left" rotation="-rotate-6" />

          {/* Handcrafted sketch box container */}
          <div
            className="relative bg-paper-surface border-4 border-ink rounded-sm shadow-brutal-lg md:shadow-brutal-xl overflow-hidden"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(24, 21, 17, 0.08) 1.5px, transparent 1.5px)`,
              backgroundSize: '20px 20px',
            }}
          >
            {/* Background watermarked grid coordinates */}
            <div className="absolute top-3 right-4 font-mono text-[11px] text-ink/30 select-none z-0">
              CANVAS_WORKSPACE
            </div>

            {/* Split layout: Typography on Left, Real Photo on Right */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 items-end pt-8 sm:pt-10 md:pt-12 px-6 sm:px-8 md:px-12">
              {/* Left Column: Name Typography & Details */}
              <div className="md:col-span-7 pb-6 sm:pb-8 md:pb-10 space-y-1">
                <div className="font-sans font-black tracking-tight uppercase leading-[0.9] select-none text-ink">
                  {/* Line 1: MUHAMMAD */}
                  <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl hover:text-crayon-pink transition-colors">
                    {HERO_DATA.nameLine1}
                  </span>

                  {/* Line 2: FEROS with hand-drawn yellow underline */}
                  <div className="relative inline-block">
                    <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl hover:text-crayon-blue transition-colors">
                      {HERO_DATA.nameLine2}
                    </span>
                    <div className="w-full -mt-2 sm:-mt-3 mb-1">
                      <HandDrawnUnderline color="#f7c948" />
                    </div>
                  </div>

                  {/* Line 3: FAZALUDEEN with yellow asterisk */}
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
                      {HERO_DATA.nameLine3}
                    </span>
                    <span className="inline-block transform rotate-12">
                      <HandDrawnStar size={38} color="#f7c948" className="animate-spin-slow" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Real Muhammad Photo Cutout */}
              <div className="md:col-span-5 flex justify-center md:justify-end items-end relative overflow-visible">
                <div className="relative w-full max-w-[320px] sm:max-w-[360px] md:max-w-[420px] flex items-end justify-center">
                  <img
                    src="/assets/images/feros_portrait.png"
                    alt="Muhammad Feros Fazaludeen"
                    className="w-full h-auto max-h-[340px] sm:max-h-[400px] md:max-h-[460px] object-contain object-bottom select-none pointer-events-none drop-shadow-[0_8px_20px_rgba(24,21,17,0.14)]"
                  />
                </div>
              </div>
            </div>

            {/* Sub-tag partition bar inside the frame */}
            <div className="relative z-10 border-t-2 border-dashed border-ink/20 px-6 sm:px-8 md:px-12 py-3.5 bg-paper-surface/90 flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-xs sm:text-sm uppercase tracking-widest font-bold text-ink/80">
                ROLE: {HERO_DATA.role}
              </span>
              <span className="font-handwriting text-lg sm:text-xl text-ink/75 -rotate-1">
                questions before pixels ✎
              </span>
            </div>
          </div>

          {/* Sticky Notes around Hero (Desktop / Tablet view) */}
          {/* Top-Right: Yellow Craft Sticky Note */}
          <div className="hidden lg:block absolute -top-10 -right-6 z-30">
            <StickyNote
              text="MADE THINGS"
              color="yellow"
              rotation="rotate-3"
              tag="CRAFT"
              showPin={true}
            />
          </div>

          {/* Middle-Right: Cyan/Blue Discipline Sticky Note */}
          <div className="hidden lg:block absolute top-[45%] -right-10 -translate-y-1/2 z-30">
            <StickyNote
              text="CREATIVE ENGINEER"
              color="cyan"
              rotation="-rotate-2"
              tag="DISCIPLINE"
              showPin={true}
            />
          </div>

          {/* Bottom-Left: Pink Principle Sticky Note */}
          <div className="hidden lg:block absolute -bottom-8 -left-6 z-30">
            <StickyNote
              text="SWEAT THE DETAILS"
              color="pink"
              rotation="-rotate-3"
              tag="PRINCIPLE"
              showPin={true}
            />
          </div>
        </div>

        {/* Mobile Sticky Notes (Organized as horizontal badges so they don't break viewport) */}
        <div className="flex lg:hidden flex-wrap gap-2 mt-4">
          <StickyNote text="MADE THINGS" color="yellow" rotation="-rotate-1" tag="CRAFT" showPin={false} />
          <StickyNote text="CREATIVE ENGINEER" color="cyan" rotation="rotate-1" tag="DISCIPLINE" showPin={false} />
          <StickyNote text="SWEAT THE DETAILS" color="pink" rotation="-rotate-2" tag="PRINCIPLE" showPin={false} />
        </div>
      </div>

      {/* Hero Headline, Subhead & Call To Action */}
      <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
        <div className="md:col-span-8 space-y-4">
          <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-ink leading-tight">
            "{HERO_DATA.headline}"
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

      {/* Bottom Profile Anchor */}
      <div className="mt-12 pt-8 border-t border-ink/15 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-2 border-ink bg-paper-surface overflow-hidden shadow-brutal-sm p-1">
              <img
                src="/assets/images/feros_portrait.png"
                alt="Muhammad Feros"
                className="w-full h-full object-cover object-top rounded-full"
              />
            </div>
            <TapeStrip color="mint" position="top-right" rotation="rotate-12" className="scale-75" />
          </div>
          <div>
            <div className="font-mono text-xs font-bold text-ink uppercase">
              MUHAMMAD FEROS FAZALUDEEN
            </div>
            <div className="font-handwriting text-base text-ink/70">
              AI/ML Engineer · Creative Technologist
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
