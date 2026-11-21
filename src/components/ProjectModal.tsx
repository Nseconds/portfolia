import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, CheckCircle2, Layers, Cpu, BarChart3 } from 'lucide-react';
import { ProjectItem } from '../types/portfolio';
import { TapeStrip } from './common/TapeStrip';
import { StickyNote } from './common/StickyNote';

interface ProjectModalProps {
  project: ProjectItem;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock background body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-ink/75 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-paper border-4 border-ink rounded-sm shadow-brutal-xl overflow-y-auto z-10 my-auto"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(24, 21, 17, 0.08) 1.5px, transparent 1.5px)`,
            backgroundSize: '24px 24px',
          }}
        >
          {/* Top Decorative Tape */}
          <TapeStrip color="yellow" position="top-center" rotation="-rotate-1" label="CASE_STUDY_DOSSIER" />

          {/* Sticky Header with Close Button */}
          <div className="sticky top-0 z-30 bg-paper-surface/95 backdrop-blur-sm border-b-2 border-ink px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-crayon-pink border border-ink animate-pulse"></span>
              <span className="font-mono text-xs uppercase font-bold tracking-widest text-ink">
                {project.projectNumber} · {project.category}
              </span>
            </div>

            <button
              onClick={onClose}
              data-cursor="open"
              aria-label="Close case study modal"
              className="p-1.5 bg-crayon-yellow border-2 border-ink rounded-sm shadow-brutal-sm hover:shadow-brutal hover:bg-crayon-pink hover:text-white transition-all focus:outline-none"
            >
              <X className="w-5 h-5 text-ink hover:text-white" />
            </button>
          </div>

          {/* Case Study Editorial Content */}
          <div className="p-6 sm:p-10 space-y-10">
            {/* Title & Metadata Hero */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs uppercase tracking-wider text-ink/60">
                  DATE: {project.date} // STATUS: SHIPPED
                </span>
                <span className="font-handwriting text-lg text-crayon-pink font-bold -rotate-1">
                  editorial deep dive ✎
                </span>
              </div>

              <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-ink">
                {project.title}
              </h1>

              <p className="font-sans text-lg sm:text-xl text-ink-light leading-relaxed max-w-3xl">
                {project.shortDescription}
              </p>
            </div>

            {/* Large Visual Placeholder Hero */}
            <div className="relative bg-paper-surface p-4 sm:p-6 border-2 border-ink rounded-sm shadow-brutal">
              <TapeStrip color="pink" position="top-left" rotation="-rotate-6" />
              <div className="aspect-[16/9] w-full border-2 border-ink/40 bg-paper-dark flex items-center justify-center overflow-hidden">
                <img
                  src="/assets/projects/projectPlaceholder.svg"
                  alt={`${project.title} Hero View`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-3 flex items-center justify-between font-mono text-xs text-ink/70">
                <span>[RAW PROJECT ASSET PLACEHOLDER]</span>
                <span>ASPECT: 16:9 // SCALE: 100%</span>
              </div>
            </div>

            {/* Quick Facts Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-paper-surface border-2 border-ink rounded-sm shadow-brutal-sm">
              <div>
                <div className="font-mono text-[10px] uppercase text-ink/60 font-bold">ROLE</div>
                <div className="font-sans text-sm font-bold text-ink">Lead Designer & Prototyper</div>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase text-ink/60 font-bold">TIMELINE</div>
                <div className="font-sans text-sm font-bold text-ink">4 Months (2026)</div>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase text-ink/60 font-bold">TEAM</div>
                <div className="font-sans text-sm font-bold text-ink">3 Eng, 1 PM, Myself</div>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase text-ink/60 font-bold">PLATFORM</div>
                <div className="font-sans text-sm font-bold text-ink">Desktop & Mobile Web</div>
              </div>
            </div>

            {/* Problem & Approach (Editorial Two Column) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* The Problem */}
              <div className="p-6 bg-paper-surface border-2 border-ink rounded-sm shadow-brutal space-y-3">
                <div className="font-mono text-xs uppercase font-bold text-crayon-pink">
                  // 01 THE CHALLENGE
                </div>
                <h3 className="font-sans text-xl font-bold text-ink">
                  Untangling confusing user friction
                </h3>
                <p className="font-sans text-sm text-ink-light leading-relaxed">
                  {project.problem}
                </p>
                <div className="p-3 bg-red-50 border border-red-200 text-xs font-mono text-red-700">
                  ⚠️ FRICTION: Fragmented flows caused high abandonment rates on the core task.
                </div>
              </div>

              {/* The Approach */}
              <div className="p-6 bg-paper-surface border-2 border-ink rounded-sm shadow-brutal space-y-3">
                <div className="font-mono text-xs uppercase font-bold text-crayon-blue">
                  // 02 MY APPROACH
                </div>
                <h3 className="font-sans text-xl font-bold text-ink">
                  Grounding design in user context
                </h3>
                <p className="font-sans text-sm text-ink-light leading-relaxed">
                  {project.approach}
                </p>
                <div className="p-3 bg-blue-50 border border-blue-200 text-xs font-mono text-blue-700">
                  💡 SOLUTION: Built a shared component architecture with zero cognitive clutter.
                </div>
              </div>
            </div>

            {/* Process Checklist */}
            <div className="p-6 bg-paper-surface border-2 border-ink rounded-sm shadow-brutal">
              <div className="font-mono text-xs uppercase font-bold text-ink/60 mb-4">
                // 03 DISCOVERY & EXECUTION PIPELINE
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.process.map((step, idx) => (
                  <div key={idx} className="flex items-center space-x-3 p-3 bg-paper border border-ink/20 rounded-sm">
                    <CheckCircle2 className="w-5 h-5 text-crayon-mint shrink-0" />
                    <span className="font-mono text-xs font-bold text-ink">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Results & Business Metrics */}
            {project.metrics && (
              <div className="p-6 bg-crayon-yellow border-2 border-ink rounded-sm shadow-brutal">
                <div className="font-mono text-xs uppercase font-bold text-ink/70 mb-2">
                  // 04 MEASURED IMPACT & RESULTS
                </div>
                <h3 className="font-sans text-2xl font-black text-ink mb-4">
                  {project.result}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="p-4 bg-paper-surface border-2 border-ink rounded-sm shadow-brutal-sm">
                      <div className="font-sans text-3xl font-black text-ink">{m.value}</div>
                      <div className="font-mono text-xs font-bold text-ink/70 uppercase">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technology Stack Pills */}
            <div>
              <div className="font-mono text-xs uppercase font-bold text-ink/60 mb-3">
                // 05 ARCHITECTURAL TOOLING & STACK
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-xs px-3 py-1.5 bg-paper-surface border-2 border-ink rounded-sm font-bold text-ink shadow-brutal-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Close Button / Bottom CTA */}
            <div className="pt-6 border-t-2 border-ink/20 flex flex-wrap items-center justify-between gap-4">
              <span className="font-handwriting text-xl text-ink font-bold">
                end of case study dossier ✎
              </span>

              <button
                onClick={onClose}
                className="px-6 py-3 bg-ink text-paper-surface border-2 border-ink font-mono text-xs font-bold uppercase tracking-wider rounded-sm shadow-brutal hover:bg-crayon-pink transition-colors"
              >
                CLOSE DOSSIER [ESC]
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
