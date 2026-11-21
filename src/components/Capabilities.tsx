import React from 'react';
import { motion } from 'framer-motion';
import { CAPABILITIES_DATA } from '../data/portfolioData';
import { HandDrawnStar } from './common/HandDoodles';

export const Capabilities: React.FC = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 max-w-6xl mx-auto">
      {/* Header with playful label */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-4 border-b-2 border-ink/20">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest font-bold text-ink/60">
            [CAPABILITIES MATRIX]
          </span>
          <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-black uppercase text-ink mt-1">
            WHAT I BRING TO THE TABLE
          </h2>
        </div>
        <div className="font-handwriting text-xl text-ink/70 flex items-center space-x-2">
          <span>tactile paper strips</span>
          <HandDrawnStar size={20} color="#ff4d8d" />
        </div>
      </div>

      {/* Irregular Colored Paper Strips Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {CAPABILITIES_DATA.map((cap) => (
          <motion.div
            key={cap.number}
            whileHover={{ scale: 1.04, rotate: 0, y: -4 }}
            transition={{ type: 'spring', stiffness: 350, damping: 18 }}
            className={`relative p-5 rounded-sm border-2 shadow-brutal hover:shadow-brutal-lg transition-shadow cursor-default select-none ${cap.accentColor} ${cap.rotation}`}
          >
            {/* Top punch-hole / tape accent */}
            <div className="w-2.5 h-2.5 rounded-full bg-paper-surface border border-ink absolute top-3 right-3"></div>

            <div className="font-mono text-xs font-bold opacity-75 tracking-wider mb-2">
              CAPABILITY {cap.number}
            </div>

            <h3 className="font-sans text-3xl font-black tracking-tight mb-2 uppercase">
              {cap.title}
            </h3>

            <p className="font-sans text-xs sm:text-sm font-medium leading-relaxed opacity-90 border-t border-ink/20 pt-3">
              {cap.tagline}
            </p>

            <div className="mt-4 font-mono text-[10px] uppercase tracking-widest font-bold opacity-60">
              // READY TO SHIP
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
