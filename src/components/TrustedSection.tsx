import React from 'react';
import { TapeStrip } from './common/TapeStrip';

export const TrustedSection: React.FC = () => {
  const logos = [
    { id: 'LOGO 01', type: 'TECH CLIENT' },
    { id: 'LOGO 02', type: 'DESIGN STUDIO' },
    { id: 'LOGO 03', type: 'CONSUMER APP' },
    { id: 'LOGO 04', type: 'FINTECH LAB' },
    { id: 'LOGO 05', type: 'MOBILITY BRAND' },
    { id: 'LOGO 06', type: 'VENTURE FUND' },
  ];

  return (
    <section className="py-12 md:py-16 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="relative bg-paper-surface border-2 border-ink p-6 md:p-8 rounded-sm shadow-brutal">
        {/* Decorative Tape Strip */}
        <TapeStrip color="mint" position="top-center" rotation="rotate-1" label="CLIENT MARKS" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="shrink-0 text-center md:text-left">
            <span className="font-handwriting text-xl font-bold text-crayon-pink block transform -rotate-2">
              social proof
            </span>
            <span className="font-mono text-xs uppercase tracking-widest font-bold text-ink">
              [TRUSTED BY]
            </span>
          </div>

          {/* Logo Blocks Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 w-full">
            {logos.map((logo) => (
              <div
                key={logo.id}
                className="h-14 bg-paper border border-ink/40 rounded-sm flex flex-col items-center justify-center p-2 text-center hover:bg-crayon-yellowLight/50 hover:border-ink transition-colors group"
              >
                <span className="font-mono text-xs font-bold tracking-wider text-ink group-hover:text-crayon-pink transition-colors">
                  {logo.id}
                </span>
                <span className="font-mono text-[9px] text-ink/40 uppercase tracking-widest">
                  {logo.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
