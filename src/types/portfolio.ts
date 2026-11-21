export interface ProjectItem {
  id: string;
  projectNumber: string;
  title: string;
  category: string;
  date: string;
  shortDescription: string;
  cardTheme: 'dark' | 'yellow' | 'white' | 'mint';
  rotation: string;
  tags: string[];
  metrics?: { label: string; value: string }[];
  overview: string;
  problem: string;
  approach: string;
  process: string[];
  result: string;
  technologies: string[];
  imagePlaceholderId: string;
}

export interface ExperimentItem {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  note: string;
  rotation: string;
}

export interface SkillCategory {
  categoryName: string;
  accentColor: string;
  skills: string[];
}

export interface CapabilityItem {
  number: string;
  title: string;
  tagline: string;
  accentColor: string;
  rotation: string;
}

