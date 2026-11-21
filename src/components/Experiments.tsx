import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { EXPERIMENTS_DATA } from '../data/portfolioData';
import { TapeStrip } from './common/TapeStrip';
import { HandDrawnStar } from './common/HandDoodles';

export const Experiments: React.FC = () => {
  return (
    <section id="playground" className="py-20 md:py-28 px-4 md:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 pb-4 border-b-2 border-ink/20">
        <div>
          <span className="font-handwriting text-2xl md:text-3xl font-bold text-crayon-pink block transform -rotate-1">
            playground & prototypes
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-black uppercase text-ink mt-1">
            MORE THINGS // ARCHIVE
          </h2>
        </div>
        <div className="font-mono text-xs uppercase font-bold text-ink/60 flex items-center space-x-2">
          <span>CREATIVE LAB EXPLORATIONS</span>
          <HandDrawnStar size={20} color="#ff4d8d" />
        </div>
      </div>

      {/* Grid of 4 Small Experiment Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {EXPERIMENTS_DATA.map((exp, idx) => (
          <motion.div
            key={exp.id}
            data-cursor="view"
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            className={`relative p-5 bg-paper-surface border-2 border-ink rounded-sm shadow-brutal hover:shadow-brutal-lg transition-all flex flex-col justify-between ${exp.rotation}`}
          >
            {/* Washi Tape */}
            <TapeStrip
              color={idx % 2 === 0 ? 'yellow' : 'pink'}
              position={idx % 2 === 0 ? 'top-right' : 'top-left'}
              rotation={idx % 2 === 0 ? 'rotate-6' : '-rotate-6'}
            />

            <div>
              {/* Card Meta */}
              <div className="flex items-center justify-between border-b border-ink/10 pb-2 mb-3">
                <span className="font-mono text-[10px] font-bold text-crayon-pink uppercase tracking-widest">
                  LAB {exp.number} //
                </span>
                <span className="font-mono text-[10px] text-ink/50">
                  {exp.year}
                </span>
              </div>

              {/* Title & Category */}
              <h3 className="font-sans text-xl font-bold uppercase tracking-tight text-ink mb-1">
                {exp.title}
              </h3>
              <p className="font-mono text-[10px] uppercase tracking-wider text-ink/60 mb-4">
                {exp.category}
              </p>

              {/* Mockup Canvas Placeholder Area */}
              <div className="w-full aspect-video bg-paper-dark border border-ink/30 rounded-sm mb-4 flex flex-col items-center justify-center p-2 text-center">
                <Sparkles className="w-5 h-5 text-ink/40 mb-1" />
                <span className="font-mono text-[9px] uppercase font-bold text-ink/70">
                  [INTERACTIVE CANVAS]
                </span>
              </div>
            </div>

            {/* Bottom Note & Action */}
            <div className="pt-2 border-t border-dashed border-ink/20 flex items-center justify-between">
              <span className="font-handwriting text-sm text-ink/75">
                "{exp.note}"
              </span>
              <ArrowUpRight className="w-4 h-4 text-ink shrink-0" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
