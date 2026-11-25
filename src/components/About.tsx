import React from 'react';
import { motion } from 'framer-motion';
import { ABOUT_DATA } from '../data/portfolioData';
import { ImagePlaceholder } from './common/ImagePlaceholder';
import { CurvedArrow, HandDrawnCircle } from './common/HandDoodles';
import { TapeStrip } from './common/TapeStrip';
import { PixelDinoScene } from './common/PixelDinoScene';

export const About: React.FC = () => {
  return (
    <section id="about" className="pt-4 sm:pt-6 md:pt-8 pb-16 md:pb-24 px-4 md:px-8 max-w-6xl mx-auto relative overflow-hidden">
      {/* Header Composition: Left Titles & Right Dino Game Scene */}
      <div className="relative mb-8 md:mb-12">
        {/* Left Column: Eyebrow and Main Title */}
        <div className="max-w-xl">
          {/* 1. Section Eyebrow */}
          <div className="flex items-center space-x-3 pt-1 mb-2 lg:mb-4">
            <span className="font-handwriting text-2xl md:text-3xl text-crayon-pink font-bold transform -rotate-3">
              {ABOUT_DATA.eyebrow}
            </span>
            <CurvedArrow direction="right" className="w-10 h-6 text-ink/60" />
          </div>

          {/* 2. Main Title with yellow ring around UP */}
          <div>
            <h2 className="font-sans text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-ink select-none">
              WHAT'S{' '}
              <span className="relative inline-block">
                <span className="relative z-10">UP</span>
                <HandDrawnCircle
                  className="absolute -top-2 sm:-top-2.5 md:-top-3 -left-3.5 sm:-left-4 md:-left-5 w-20 sm:w-24 md:w-28 h-12 sm:h-14 md:h-16 pointer-events-none z-0"
                  color="#f7c948"
                />
              </span>
            </h2>
          </div>
        </div>

        {/* 3. Dino Game Scene: Mobile = natural flow below title; Desktop = upper-right strip above WHAT'S UP */}
        <div className="mt-4 lg:mt-0 lg:absolute lg:-top-6 lg:right-0 lg:w-[54%] xl:w-[50%] flex justify-center lg:justify-end pointer-events-none sm:pointer-events-auto">
          <PixelDinoScene className="w-full max-w-[540px]" height={135} />
        </div>
      </div>

      {/* Two Column Editorial Composition */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-start">
        {/* Left Column: Editorial Manifesto & Content */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Large Editorial Text Block */}
          <div className="relative p-6 sm:p-8 bg-paper-surface border-2 border-ink rounded-sm shadow-brutal">
            <TapeStrip color="yellow" position="top-right" rotation="rotate-3" label="NOTE" />
            <p className="font-handwriting text-2xl sm:text-3xl font-bold leading-relaxed text-ink mb-4">
              "I build thoughtful things, obsess over the details, and enjoy turning complicated problems into simple experiences."
            </p>
            <div className="space-y-4 font-sans text-base md:text-lg text-ink-light leading-relaxed border-t border-ink/10 pt-4">
              {ABOUT_DATA.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          {/* Callout Card */}
          <div className="p-4 bg-crayon-tan/30 border-2 border-dashed border-ink/30 rounded-sm flex items-start space-x-3">
            <span className="font-mono text-xs uppercase px-2 py-0.5 bg-crayon-yellow border border-ink font-bold text-ink shrink-0 mt-0.5">
              CURRENT FOCUS
            </span>
            <span className="font-mono text-xs md:text-sm text-ink/80 leading-relaxed">
              {ABOUT_DATA.callout}
            </span>
          </div>

          {/* Colorful Capability / Skill Labels */}
          <div>
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-ink/60 mb-3">
              [DISCIPLINE TAGS]
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {[
                { label: 'Interaction', color: 'bg-crayon-yellow' },
                { label: 'Prototyping', color: 'bg-crayon-mint' },
                { label: 'Research', color: 'bg-crayon-pinkSoft' },
                { label: 'Motion', color: 'bg-crayon-cyan' },
                { label: 'Systems', color: 'bg-crayon-tan' },
              ].map((skill, idx) => (
                <motion.span
                  key={skill.label}
                  whileHover={{ scale: 1.08, rotate: idx % 2 === 0 ? 2 : -2 }}
                  className={`px-3 py-1.5 border-2 border-ink font-mono text-xs font-bold uppercase shadow-brutal-sm cursor-default select-none ${skill.color}`}
                >
                  {skill.label}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Three Principles Cards */}
          <div className="mt-8 space-y-4">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-ink/60">
              [CORE PRINCIPLES]
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {ABOUT_DATA.principles.map((pr) => (
                <div
                  key={pr.number}
                  className="p-3.5 bg-paper-surface border-2 border-ink rounded-sm shadow-brutal-sm hover:shadow-brutal transition-shadow"
                >
                  <span className="font-mono text-xs font-bold text-crayon-pink">
                    {pr.number} //
                  </span>
                  <h3 className="font-sans text-sm font-bold text-ink mt-1 mb-1">
                    {pr.title}
                  </h3>
                  <p className="font-sans text-xs text-ink-light leading-snug">
                    {pr.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Physical Taped Photos & Workspace Placeholders */}
        <div className="lg:col-span-5 space-y-8 flex flex-col items-center lg:items-end">
          {/* First Taped Photograph */}
          <div className="w-full max-w-sm">
            <ImagePlaceholder
              id="PHOTO_01_WORKSPACE"
              label="WORKSPACE / PHOTO 01"
              caption="my creative setup & tools"
              aspectRatio="square"
              variant="polaroid"
              tape="pink"
              tapePosition="top-left"
              rotation="rotate-2"
            />
          </div>

          {/* Second Taped Photograph */}
          <div className="w-full max-w-sm -mt-4 sm:-mt-6">
            <ImagePlaceholder
              id="PHOTO_02_STUDIO"
              label="SKETCHBOOK / PHOTO 02"
              caption="tactile notes & whiteboards"
              aspectRatio="video"
              variant="polaroid"
              tape="yellow"
              tapePosition="top-right"
              rotation="-rotate-2"
            />
          </div>

          {/* Handwritten Annotation Sticker */}
          <div className="p-3 bg-paper-surface border-2 border-ink rounded-sm shadow-brutal-sm font-handwriting text-base font-bold text-ink text-center transform rotate-1">
            ✎ "design should feel obvious even when getting there wasn't."
          </div>
        </div>
      </div>
    </section>
  );
};
