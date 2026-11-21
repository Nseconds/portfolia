import React from 'react';

interface TapeStripProps {
  color?: 'yellow' | 'pink' | 'mint' | 'cyan' | 'cream';
  position?: 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right';
  className?: string;
  rotation?: string;
  label?: string;
}

const colorMap = {
  yellow: 'bg-yellow-200/80 border-t border-b border-yellow-400/40',
  pink: 'bg-pink-200/80 border-t border-b border-pink-400/40',
  mint: 'bg-emerald-200/80 border-t border-b border-emerald-400/40',
  cyan: 'bg-sky-200/80 border-t border-b border-sky-400/40',
  cream: 'bg-amber-100/80 border-t border-b border-amber-300/40',
};

const positionMap = {
  'top-left': '-top-3 -left-3 rotate-[-12deg]',
  'top-right': '-top-3 -right-3 rotate-[14deg]',
  'top-center': '-top-3 left-1/2 -translate-x-1/2 rotate-[-1deg]',
  'bottom-left': '-bottom-3 -left-3 rotate-[8deg]',
  'bottom-right': '-bottom-3 -right-3 rotate-[-10deg]',
};

export const TapeStrip: React.FC<TapeStripProps> = ({
  color = 'cream',
  position = 'top-center',
  className = '',
  rotation,
  label,
}) => {
  const chosenPos = positionMap[position];
  const chosenColor = colorMap[color];

  return (
    <div
      className={`absolute z-20 h-6 px-4 flex items-center justify-center tape-polygon-1 shadow-tape backdrop-blur-[1px] pointer-events-none select-none ${chosenColor} ${rotation || chosenPos} ${className}`}
      style={{
        minWidth: label ? 'auto' : '5rem',
      }}
    >
      {label && (
        <span className="font-mono text-[10px] tracking-widest uppercase font-semibold text-ink/75">
          {label}
        </span>
      )}
    </div>
  );
};

