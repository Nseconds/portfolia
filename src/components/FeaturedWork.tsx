import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { ProjectItem } from '../types/portfolio';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { CurvedArrow, HandDrawnStar } from './common/HandDoodles';

export const FeaturedWork: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section id="work" className="py-20 md:py-32 px-4 md:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 md:mb-16">
        <div>
          {/* Handwritten Eyebrow */}
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-handwriting text-2xl md:text-3xl text-crayon-pink font-bold transform -rotate-2">
              explore my work!
            </span>
            <CurvedArrow direction="down-right" className="w-10 h-6 text-ink/60" />
          </div>

          <h2 className="font-sans text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-ink">
            FEATURED WORKS
          </h2>
        </div>

        <div className="flex items-center space-x-3">
          <span className="font-mono text-xs uppercase tracking-widest font-bold text-ink/60 bg-paper-surface border border-ink px-3 py-1.5 rounded-sm shadow-brutal-sm">
            4 EDITORIAL CASE STUDIES
          </span>
          <HandDrawnStar size={24} color="#f7c948" className="animate-spin-slow" />
        </div>
      </div>

      {/* Editorial Asymmetric Stack of Project Cards */}
      <div className="space-y-10 md:space-y-16">
        {PROJECTS_DATA.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onSelect={setSelectedProject}
          />
        ))}
      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
