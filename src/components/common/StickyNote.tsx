import React from 'react';
import { motion } from 'framer-motion';
import { PushPin } from './HandDoodles';

interface StickyNoteProps {
  text: string;
  color?: 'yellow' | 'pink' | 'mint' | 'cyan' | 'purple';
  rotation?: string;
  className?: string;
  tag?: string;
  showPin?: boolean;
}

const colorStyles = {
  yellow: 'bg-[#fef08a] text-ink border-[#ca8a04]',
  pink: 'bg-[#fbcfe8] text-ink border-[#db2777]',
  mint: 'bg-[#bbf7d0] text-ink border-[#16a34a]',
  cyan: 'bg-[#bae6fd] text-ink border-[#0284c7]',
  purple: 'bg-[#e9d5ff] text-ink border-[#9333ea]',
};

export const StickyNote: React.FC<StickyNoteProps> = ({
  text,
  color = 'yellow',
  rotation = 'rotate-1',
  className = '',
  tag,
  showPin = true,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 350, damping: 15 }}
      className={`relative p-3.5 md:p-4 rounded-sm border-2 shadow-brutal font-handwriting select-none ${colorStyles[color]} ${rotation} ${className}`}
    >
      {showPin && (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10">
          <PushPin color={color === 'pink' ? '#f59e0b' : '#ff4d8d'} />
        </div>
      )}
      {tag && (
        <div className="font-mono text-[9px] uppercase tracking-wider text-ink/60 mb-1 font-bold">
          [{tag}]
        </div>
      )}
      <div className="text-base md:text-lg font-bold leading-snug tracking-wide">
        {text}
      </div>
    </motion.div>
  );
};

