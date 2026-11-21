import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS_DATA } from '../data/portfolioData';
import { TapeStrip } from './common/TapeStrip';

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 md:py-28 px-4 md:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-12 pb-4 border-b-2 border-ink/20 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="font-handwriting text-2xl md:text-3xl font-bold text-crayon-blue block transform -rotate-1">
            capabilities & craft
          </span>
          <h2 className="font-sans text-4xl sm:text-5xl font-black uppercase text-ink mt-1">
            SKILLS & TOOLING
          </h2>
        </div>
        <div className="font-mono text-xs text-ink/60">
          // ZERO PERCENTAGE BARS. ONLY PROVEN DISCIPLINES.
        </div>
      </div>

      {/* Categorized Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {SKILLS_DATA.map((cat, idx) => (
          <div
            key={cat.categoryName}
            className="relative p-6 sm:p-8 bg-paper-surface border-2 border-ink rounded-sm shadow-brutal"
          >
            {/* Washi Tape */}
            <TapeStrip
              color={idx === 0 ? 'yellow' : idx === 1 ? 'mint' : idx === 2 ? 'pink' : 'cyan'}
              position="top-right"
              rotation={idx % 2 === 0 ? 'rotate-3' : '-rotate-3'}
              label={`GRP_0${idx + 1}`}
            />

            {/* Category Title */}
            <div className="mb-6 pb-3 border-b border-ink/15">
              <span className="font-mono text-xs uppercase font-bold text-ink/60 tracking-wider">
                CATEGORY 0{idx + 1} //
              </span>
              <h3 className="font-sans text-2xl font-black uppercase text-ink mt-0.5">
                {cat.categoryName}
              </h3>
            </div>

            {/* Skills Pills / Tags */}
            <div className="flex flex-wrap gap-2.5">
              {cat.skills.map((skill) => (
                <motion.span
                  key={skill}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={`px-3.5 py-1.5 rounded-sm border-2 font-mono text-xs font-bold uppercase tracking-wider text-ink shadow-brutal-sm cursor-default select-none ${cat.accentColor}`}
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            {/* Bottom Annotation */}
            <div className="mt-6 pt-3 border-t border-dashed border-ink/20 flex items-center justify-between font-mono text-[10px] text-ink/50 uppercase">
              <span>TAGGED FOR EXCELLENCE</span>
              <span>READY TO DEPLOY</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
