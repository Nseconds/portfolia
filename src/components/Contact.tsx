import React from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { CONTACT_DATA } from '../data/portfolioData';
import { TapeStrip } from './common/TapeStrip';
import { CurvedArrow, PushPin } from './common/HandDoodles';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 md:py-32 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="relative bg-paper-surface border-4 border-ink p-6 sm:p-10 md:p-16 rounded-sm shadow-brutal-xl overflow-hidden">
        {/* Decorative Tape Pieces */}
        <TapeStrip color="pink" position="top-left" rotation="-rotate-6" label="INBOX" />
        <TapeStrip color="yellow" position="bottom-right" rotation="rotate-3" label="REPLY_24H" />

        {/* Large Decorative Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          {/* Handwritten Eyebrow */}
          <div className="inline-flex items-center space-x-3">
            <span className="font-handwriting text-3xl sm:text-4xl md:text-5xl font-bold text-crayon-pink transform -rotate-2">
              "{CONTACT_DATA.eyebrow}"
            </span>
            <CurvedArrow direction="down-right" className="w-12 h-8 text-ink/70" />
          </div>

          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-ink">
            {CONTACT_DATA.heading}
          </h2>

          <p className="font-sans text-base sm:text-lg text-ink-light leading-relaxed max-w-2xl mx-auto">
            {CONTACT_DATA.body}
          </p>
        </div>

        {/* Interactive Contact Actions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-4xl mx-auto">
          {/* Left Column: Email Button & Drop a Line Card */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Email Card */}
            <div className="p-6 bg-crayon-yellow border-2 border-ink rounded-sm shadow-brutal space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase font-bold text-ink/70 tracking-widest">
                  DIRECT EMAIL INBOX
                </span>
                <PushPin color="#ff4d8d" />
              </div>

              <div className="font-sans text-xl sm:text-2xl font-black text-ink select-all break-all">
                {CONTACT_DATA.email}
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <motion.a
                  href={`mailto:${CONTACT_DATA.email}`}
                  data-cursor="open"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center space-x-2 bg-ink text-paper-surface border-2 border-ink px-5 py-2.5 rounded-sm shadow-brutal-sm hover:shadow-brutal font-mono text-xs uppercase font-bold tracking-wider transition-all"
                >
                  <Mail className="w-4 h-4 text-crayon-yellow" />
                  <span>DROP A LINE</span>
                </motion.a>

                <button
                  onClick={() => navigator.clipboard.writeText(CONTACT_DATA.email)}
                  className="px-4 py-2.5 bg-paper-surface border-2 border-ink rounded-sm shadow-brutal-sm font-mono text-xs uppercase font-bold text-ink hover:bg-paper transition-colors"
                >
                  COPY EMAIL
                </button>
              </div>
            </div>

            {/* Quick Status Info */}
            <div className="p-4 bg-paper border border-ink/30 rounded-sm flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-ink/70">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-crayon-pink" />
                <span>{CONTACT_DATA.location}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-bold text-ink">{CONTACT_DATA.availability}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Profile Image Placeholder & Socials */}
          <div className="lg:col-span-5 flex flex-col items-center text-center space-y-4">
            {/* Taped Profile Polaroid */}
            <div className="relative p-3 pb-5 bg-paper-surface border-2 border-ink rounded-sm shadow-brutal transform rotate-2 max-w-[220px]">
              <TapeStrip color="mint" position="top-right" rotation="rotate-12" />
              <div className="w-36 h-36 mx-auto bg-paper-dark border border-ink/40 rounded-sm overflow-hidden flex items-center justify-center">
                <img
                  src="/assets/images/profilePlaceholder.svg"
                  alt="Contact Profile Placeholder"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-2 font-handwriting text-sm font-bold text-ink">
                YOUR NAME · 2026
              </div>
            </div>

            {/* Social Links List */}
            <div className="w-full pt-2">
              <div className="font-mono text-[10px] uppercase font-bold tracking-widest text-ink/50 mb-2">
                [CONNECT WITH ME ELSEWHERE]
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {CONTACT_DATA.socials.map((soc) => (
                  <a
                    key={soc.name}
                    href={soc.url}
                    className="font-mono text-xs px-2.5 py-1 bg-paper border border-ink/40 rounded-sm hover:bg-crayon-yellow hover:border-ink font-bold text-ink transition-colors flex items-center space-x-1"
                  >
                    <span>{soc.name}</span>
                    <ArrowRight className="w-3 h-3 text-ink/50" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
