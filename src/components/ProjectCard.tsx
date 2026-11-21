import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { ProjectItem } from '../types/portfolio';
import { TapeStrip } from './common/TapeStrip';

interface ProjectCardProps {
  project: ProjectItem;
  onSelect: (project: ProjectItem) => void;
  index: number;
}

const themeStyles = {
  dark: {
    card: 'bg-ink text-paper-surface border-2 border-ink',
    eyebrow: 'text-crayon-yellow',
    date: 'text-paper-surface/60',
    title: 'text-paper-surface group-hover:text-crayon-yellow transition-colors',
    desc: 'text-paper-surface/80',
    tag: 'bg-paper-surface/10 text-paper-surface border-paper-surface/20',
    btn: 'bg-crayon-yellow text-ink border-ink hover:bg-crayon-pink hover:text-white',
    imageBg: 'bg-stone-800',
    tapeColor: 'pink' as const,
  },
  yellow: {
    card: 'bg-crayon-yellow text-ink border-2 border-ink',
    eyebrow: 'text-ink/70',
    date: 'text-ink/60',
    title: 'text-ink group-hover:text-crayon-blue transition-colors',
    desc: 'text-ink/90',
    tag: 'bg-paper-surface text-ink border-ink/40',
    btn: 'bg-ink text-paper-surface border-ink hover:bg-crayon-pink hover:text-white',
    imageBg: 'bg-amber-100',
    tapeColor: 'cyan' as const,
  },
  white: {
    card: 'bg-paper-surface text-ink border-2 border-ink',
    eyebrow: 'text-crayon-pink',
    date: 'text-ink/50',
    title: 'text-ink group-hover:text-crayon-pink transition-colors',
    desc: 'text-ink-light',
    tag: 'bg-paper text-ink border-ink/30',
    btn: 'bg-crayon-yellow text-ink border-ink hover:bg-ink hover:text-paper-surface',
    imageBg: 'bg-paper-dark',
    tapeColor: 'yellow' as const,
  },
  mint: {
    card: 'bg-[#bbf7d0] text-ink border-2 border-ink',
    eyebrow: 'text-ink/70',
    date: 'text-ink/60',
    title: 'text-ink group-hover:text-ink transition-colors',
    desc: 'text-ink/80',
    tag: 'bg-paper-surface text-ink border-ink/40',
    btn: 'bg-ink text-paper-surface border-ink hover:bg-crayon-pink hover:text-white',
    imageBg: 'bg-emerald-100',
    tapeColor: 'pink' as const,
  },
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect, index }) => {
  const theme = themeStyles[project.cardTheme];
  const isEven = index % 2 === 0;

  return (
    <motion.div
      data-cursor="view"
      onClick={() => onSelect(project)}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`group relative rounded-sm p-6 sm:p-8 md:p-10 shadow-brutal-md hover:shadow-brutal-xl transition-all cursor-pointer overflow-hidden ${theme.card} ${project.rotation}`}
    >
      {/* Corner Washi Tape */}
      <TapeStrip
        color={theme.tapeColor}
        position={isEven ? 'top-right' : 'top-left'}
        rotation={isEven ? 'rotate-6' : '-rotate-6'}
        label={project.category.split('/')[0].trim()}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Project Content & Story */}
        <div className="lg:col-span-6 space-y-4">
          {/* Metadata Row */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-current/15 pb-3">
            <span className={`font-mono text-xs uppercase font-bold tracking-widest ${theme.eyebrow}`}>
              {project.projectNumber} //
            </span>
            <span className={`font-mono text-xs tracking-wider ${theme.date}`}>
              {project.date}
            </span>
          </div>

          {/* Project Title */}
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest font-bold opacity-60 block mb-1">
              {project.category}
            </span>
            <h3 className={`font-sans text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-none ${theme.title}`}>
              {project.title}
            </h3>
          </div>

          {/* Short Description */}
          <p className={`font-sans text-sm sm:text-base leading-relaxed ${theme.desc}`}>
            {project.shortDescription}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`font-mono text-xs px-2.5 py-1 rounded-sm border font-semibold ${theme.tag}`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Key Metric Highlights if available */}
          {project.metrics && (
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-current/10">
              {project.metrics.map((m) => (
                <div key={m.label} className="p-2 bg-current/5 rounded-sm">
                  <div className="font-sans text-lg sm:text-xl font-black tracking-tight">
                    {m.value}
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-wider opacity-70">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Call to Action Button */}
          <div className="pt-4 flex items-center space-x-3">
            <span
              className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-sm border-2 font-mono text-xs font-bold uppercase tracking-wider shadow-brutal-sm group-hover:shadow-brutal transition-all ${theme.btn}`}
            >
              <span>VIEW PROJECT</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>

            <span className="font-handwriting text-base font-bold opacity-75 hidden sm:inline -rotate-2">
              click for case study ✎
            </span>
          </div>
        </div>

        {/* Right Column: Taped Image / Mockup Area */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="relative w-full max-w-lg">
            {/* Secondary Tape Accent */}
            <TapeStrip color="cream" position="top-center" rotation="-rotate-2" label="SPEC_VIEW" />

            {/* Polaroid frame wrapping the SVG placeholder */}
            <div className="bg-paper-surface p-3 sm:p-4 pb-6 sm:pb-8 border-2 border-ink rounded-sm shadow-brutal transform group-hover:rotate-1 group-hover:scale-[1.02] transition-transform duration-300">
              <div className="aspect-[16/10] w-full border-2 border-ink/40 bg-paper-dark relative overflow-hidden flex items-center justify-center">
                <img
                  src="/assets/projects/projectPlaceholder.svg"
                  alt={`${project.title} Placeholder`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Polaroid Bottom Caption */}
              <div className="mt-3 flex items-center justify-between px-1">
                <span className="font-handwriting text-base font-bold text-ink">
                  {project.title} · preview draft
                </span>
                <span className="font-mono text-[10px] text-ink/60 uppercase">
                  [FIG_0{index + 1}]
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
