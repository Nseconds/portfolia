import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { TapeStrip } from './TapeStrip';

interface ImagePlaceholderProps {
  id: string;
  label?: string;
  caption?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'wide';
  className?: string;
  tape?: 'yellow' | 'pink' | 'mint' | 'cyan' | 'cream' | 'none';
  tapePosition?: 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right';
  variant?: 'polaroid' | 'blueprint' | 'minimal' | 'photo';
  rotation?: string;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  id,
  label = 'IMAGE PLACEHOLDER',
  caption,
  aspectRatio = 'video',
  className = '',
  tape = 'cream',
  tapePosition = 'top-right',
  variant = 'polaroid',
  rotation = '',
}) => {
  const aspectClass = {
    square: 'aspect-square',
    video: 'aspect-[16/10]',
    portrait: 'aspect-[3/4]',
    wide: 'aspect-[21/9]',
  }[aspectRatio];

  if (variant === 'polaroid') {
    return (
      <div
        className={`relative bg-paper-surface p-3 md:p-4 pb-6 md:pb-7 rounded-sm border-2 border-ink shadow-brutal ${rotation} ${className}`}
      >
        {tape !== 'none' && <TapeStrip color={tape} position={tapePosition} />}
        
        {/* Visual photo canvas area */}
        <div
          className={`w-full ${aspectClass} bg-paper-dark border-2 border-ink/40 relative overflow-hidden flex flex-col items-center justify-center p-4`}
          style={{
            backgroundImage: `radial-gradient(circle, rgba(24, 21, 17, 0.15) 1px, transparent 1px)`,
            backgroundSize: '16px 16px',
          }}
        >
          {/* Subtle architectural crosshairs */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-2 left-2 font-mono text-[9px] text-ink/40 tracking-wider">
              {id}
            </div>
            <div className="absolute bottom-2 right-2 font-mono text-[9px] text-ink/40 tracking-wider">
              [RAW_ASSET]
            </div>
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 border-t border-dashed border-ink/15"></div>
            <div className="absolute inset-y-4 left-1/2 -translate-x-1/2 border-l border-dashed border-ink/15"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center text-center space-y-2">
            <div className="w-10 h-10 rounded-full border border-ink/60 bg-paper-surface flex items-center justify-center shadow-brutal-sm">
              <ImageIcon className="w-5 h-5 text-ink/70" />
            </div>
            <span className="font-mono text-xs uppercase font-bold tracking-widest text-ink/80 px-2 py-0.5 bg-paper-surface border border-ink/40">
              {label}
            </span>
            <span className="font-handwriting text-xs md:text-sm text-ink/60">
              replace in /src/assets/
            </span>
          </div>
        </div>

        {/* Polaroid handwritten caption */}
        {caption && (
          <div className="mt-3 font-handwriting text-base font-bold text-ink text-center tracking-wide">
            {caption}
          </div>
        )}
      </div>
    );
  }

  // Minimal / Blueprint card
  return (
    <div
      className={`relative bg-paper-surface border-2 border-ink rounded-sm shadow-brutal overflow-hidden ${aspectClass} ${rotation} ${className}`}
      style={{
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(24, 21, 17, 0.03) 10px, rgba(24, 21, 17, 0.03) 20px)`,
      }}
    >
      {tape !== 'none' && <TapeStrip color={tape} position={tapePosition} />}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
        <ImageIcon className="w-8 h-8 text-ink/40 mb-2" />
        <span className="font-mono text-xs uppercase font-bold tracking-wider text-ink/75 bg-paper px-2 py-0.5 border border-ink/30 mb-1">
          {label}
        </span>
        <span className="font-mono text-[10px] text-ink/40">ID: {id}</span>
      </div>
    </div>
  );
};

