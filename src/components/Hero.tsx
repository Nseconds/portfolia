import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Layers, Zap, Box } from 'lucide-react';
import ferosPortrait from '../assets/images/feros_portrait.png';
import { StickyNote } from './common/StickyNote';
import {
  CurvedArrow,
  HandDrawnStar,
  HandDrawnUnderline,
  DoodleRays,
  DoodleReturnArrow,
} from './common/HandDoodles';
import { TapeStrip } from './common/TapeStrip';

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative pt-20 sm:pt-24 pb-8 px-4 sm:px-6 max-w-5xl mx-auto flex flex-col justify-center min-h-[92vh] overflow-visible"
    >
      {/* 1. Sub-Header Status Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        {/* Status Pill */}
        <div className="inline-flex items-center space-x-2 bg-paper-surface border-2 border-ink px-3 py-1 rounded-sm shadow-brutal-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-[#45C98A] border border-ink animate-pulse"></span>
          <span className="font-mono text-[11px] font-bold text-ink tracking-wider uppercase">
            STATUS: OPEN TO NEW WORK
          </span>
        </div>

        {/* Location & Year */}
        <div className="font-mono text-[11px] font-bold text-ink/75 flex items-center space-x-1.5 tracking-wider">
          <span>📍</span>
          <span>KOZHIKODE, INDIA · 2026</span>
        </div>
      </div>

      {/* 2. "my name is" Handwritten Eyebrow */}
      <div className="flex items-center space-x-2 mb-1.5 ml-2">
        <span className="font-handwriting text-2xl text-ink font-bold transform -rotate-1">
          my name is
        </span>
        <CurvedArrow direction="down-right" className="w-10 h-6 text-[#FF8FCB]" />
      </div>

      {/* 3. Main Hero Frame */}
      <div className="relative w-full">
        {/* Yellow Washi Tape on Top-Left */}
        <TapeStrip color="yellow" position="top-left" rotation="-rotate-6" className="w-24 z-30" />

        {/* Main Canvas Box */}
        <div
          className="relative bg-paper-surface/85 backdrop-blur-[2px] border-[3px] border-ink rounded-sm shadow-brutal-md overflow-hidden"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(24, 21, 17, 0.08) 1.5px, transparent 1.5px)`,
            backgroundSize: '20px 20px',
          }}
        >
          {/* Main Content: Two Columns (Left Content, Right Portrait) */}
          <div className="grid grid-cols-1 md:grid-cols-12 items-end pt-6 sm:pt-8 md:pt-10 px-6 sm:px-8 md:px-10 pb-0 relative">
            {/* Left Column (~55% width) */}
            <div className="md:col-span-7 z-20 space-y-3 pb-6 md:pb-8">
              {/* Name Typography */}
              <div className="space-y-0.5 select-none">
                <h1 className="font-sans font-black text-4xl sm:text-5xl lg:text-[3.9rem] text-ink uppercase tracking-tight leading-[0.92]">
                  MUHAMMAD
                </h1>

                <div className="relative inline-block">
                  <h1 className="font-sans font-black text-4xl sm:text-5xl lg:text-[3.9rem] text-ink uppercase tracking-tight leading-[0.92]">
                    FEROS
                  </h1>
                  {/* Yellow hand-drawn underline under FEROS */}
                  <div className="w-full -mt-1 sm:-mt-2 mb-1">
                    <HandDrawnUnderline color="#FFD33D" />
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <h1 className="font-sans font-black text-4xl sm:text-5xl lg:text-[3.9rem] text-ink uppercase tracking-tight leading-[0.92]">
                    FAZALUDEEN
                  </h1>
                  {/* Yellow star/sparkle */}
                  <HandDrawnStar size={34} color="#FFD33D" className="animate-spin-slow" />
                </div>
              </div>

              {/* Role Line */}
              <div className="flex items-center space-x-2.5 pt-2">
                <span className="bg-[#FFD33D] text-ink font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-sm border border-ink shadow-brutal-sm tracking-wider uppercase">
                  AI/ML ENGINEER
                </span>
                <span className="font-mono text-xs text-ink/40 font-bold">|</span>
                <span className="font-mono text-[11px] font-bold text-ink uppercase tracking-wider">
                  CREATIVE ENGINEER
                </span>
              </div>

              {/* Short Introduction (approx 2 lines) */}
              <p className="font-sans text-xs sm:text-sm text-ink-light leading-relaxed max-w-md pt-1">
                I build AI-powered solutions, automate real-world workflows, and turn ideas into useful products that create impact.
              </p>

              {/* CTA Action Buttons */}
              <div className="flex items-center space-x-3 pt-3">
                <motion.a
                  href="#work"
                  data-cursor="open"
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center space-x-2 bg-ink text-paper-surface border-2 border-ink px-4 py-2 rounded-sm shadow-brutal-sm hover:bg-[#FF8FCB] hover:shadow-brutal transition-all font-mono text-xs font-bold uppercase tracking-wider"
                >
                  <span>VIEW MY WORK</span>
                  <span>→</span>
                </motion.a>

                <div className="flex items-center space-x-2">
                  <motion.a
                    href="#about"
                    whileHover={{ scale: 1.04, y: -1 }}
                    whileTap={{ scale: 0.96 }}
                    className="inline-flex items-center space-x-1.5 bg-paper-surface text-ink border-2 border-ink px-4 py-2 rounded-sm shadow-brutal-sm hover:bg-paper transition-all font-mono text-xs font-bold uppercase tracking-wider"
                  >
                    <span className="text-[10px]">▶</span>
                    <span>ABOUT ME</span>
                  </motion.a>

                  {/* Pink doodle rays next to about button */}
                  <div className="pointer-events-none">
                    <DoodleRays color="#FF8FCB" size={18} angle={35} />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (~45% width): Real Muhammad Portrait with Yellow Aura */}
            <div className="md:col-span-5 flex justify-center md:justify-end items-end relative overflow-visible z-10">
              <div className="relative w-full max-w-[300px] sm:max-w-[340px] md:max-w-[380px] flex items-end justify-center">
                {/* Yellow organic background aura blob */}
                <div
                  className="absolute bottom-2 right-4 sm:right-6 w-[230px] sm:w-[280px] md:w-[310px] h-[220px] sm:h-[260px] md:h-[290px] rounded-[55%_45%_50%_50%/60%_50%_50%_40%] bg-[#FFD33D] -z-0 opacity-95 transform rotate-3"
                ></div>

                {/* Doodle action lines around hair */}
                <div className="absolute top-2 left-6 z-10 pointer-events-none">
                  <DoodleRays color="#181511" size={18} angle={-45} />
                </div>
                <div className="absolute top-4 right-8 z-10 pointer-events-none">
                  <DoodleRays color="#181511" size={20} angle={40} />
                </div>

                {/* Muhammad's authentic photo cutout */}
                <img
                  src={ferosPortrait}
                  alt="Muhammad Feros Fazaludeen"
                  className="relative z-10 w-full h-auto max-h-[320px] sm:max-h-[380px] md:max-h-[430px] object-contain object-bottom select-none pointer-events-none drop-shadow-[0_6px_14px_rgba(24,21,17,0.12)]"
                />
              </div>
            </div>
          </div>

          {/* Bottom Horizontal Capability Strip */}
          <div className="relative z-20 border-t-2 border-ink/20 bg-paper-surface/85 px-4 sm:px-8 py-3 grid grid-cols-2 sm:grid-cols-5 items-center gap-3 text-ink">
            {/* 1. 4+ Projects */}
            <div className="flex items-center space-x-2">
              <Code2 className="w-4 h-4 text-ink shrink-0" />
              <div className="font-mono text-[11px] leading-tight">
                <span className="font-black block">4+</span>
                <span className="text-ink/60">Projects</span>
              </div>
            </div>

            {/* 2. AI/ML Solutions */}
            <div className="flex items-center space-x-2 sm:border-l sm:border-ink/15 sm:pl-3">
              <Layers className="w-4 h-4 text-ink shrink-0" />
              <div className="font-mono text-[11px] leading-tight">
                <span className="font-black block">AI/ML</span>
                <span className="text-ink/60">Solutions</span>
              </div>
            </div>

            {/* 3. Automation Workflows */}
            <div className="flex items-center space-x-2 border-l border-ink/15 pl-3">
              <Zap className="w-4 h-4 text-ink shrink-0" />
              <div className="font-mono text-[11px] leading-tight">
                <span className="font-black block">Automation</span>
                <span className="text-ink/60">Workflows</span>
              </div>
            </div>

            {/* 4. Product Building */}
            <div className="flex items-center space-x-2 border-l border-ink/15 pl-3">
              <Box className="w-4 h-4 text-ink shrink-0" />
              <div className="font-mono text-[11px] leading-tight">
                <span className="font-black block">Product</span>
                <span className="text-ink/60">Building</span>
              </div>
            </div>

            {/* 5. questions before pixels ↘ */}
            <div className="col-span-2 sm:col-span-1 flex items-center justify-end space-x-1 sm:border-l sm:border-ink/15 sm:pl-3">
              <span className="font-handwriting text-base font-bold text-ink/75">
                questions before pixels
              </span>
              <span className="font-handwriting text-base font-bold text-ink/75">↘</span>
            </div>
          </div>
        </div>

        {/* 4. Sticky Notes Around the Frame */}
        {/* Top-Right Yellow Sticky Note */}
        <div className="hidden lg:block absolute -top-8 -right-6 z-30">
          <StickyNote
            text="MADE THINGS"
            color="yellow"
            rotation="rotate-3"
            tag="CRAFT"
            showPin={true}
          />
        </div>

        {/* Middle-Right Blue/Cyan Sticky Note + Return Arrow */}
        <div className="hidden lg:block absolute top-[44%] -right-10 -translate-y-1/2 z-30">
          <div className="flex flex-col items-start space-y-1">
            <StickyNote
              text="AI/ML ENGINEER"
              color="cyan"
              rotation="-rotate-2"
              tag="DISCIPLINE"
              showPin={true}
            />
            <div className="pl-4 pointer-events-none">
              <DoodleReturnArrow color="#181511" />
            </div>
          </div>
        </div>

        {/* Bottom-Left Pink Sticky Note */}
        <div className="hidden lg:block absolute -bottom-6 -left-6 z-30">
          <StickyNote
            text="SWEAT THE DETAILS"
            color="pink"
            rotation="-rotate-3"
            tag="PRINCIPLE"
            showPin={true}
          />
        </div>
      </div>

      {/* Mobile Sticky Notes (Organized cleanly below the frame to prevent horizontal scroll) */}
      <div className="flex lg:hidden flex-wrap gap-2 mt-4 justify-center">
        <StickyNote text="MADE THINGS" color="yellow" rotation="-rotate-1" tag="CRAFT" showPin={false} />
        <StickyNote text="AI/ML ENGINEER" color="cyan" rotation="rotate-1" tag="DISCIPLINE" showPin={false} />
        <StickyNote text="SWEAT THE DETAILS" color="pink" rotation="-rotate-2" tag="PRINCIPLE" showPin={false} />
      </div>

      {/* 5. "SCROLL TO EXPLORE" Indicator */}
      <div className="mt-5 flex flex-col items-center justify-center space-y-1 select-none pointer-events-none">
        <span className="font-handwriting text-sm font-bold text-ink/65 tracking-wider">
          scroll to explore
        </span>
        <div className="w-4 h-6 rounded-full border-[1.5px] border-ink flex items-start justify-center p-0.5 shadow-brutal-sm">
          <span className="w-1 h-1.5 rounded-full bg-ink animate-bounce"></span>
        </div>
        <span className="text-ink/60 text-[10px] -mt-1 font-bold">↓</span>
      </div>
    </section>
  );
};
