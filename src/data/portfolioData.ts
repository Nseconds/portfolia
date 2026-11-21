import { ProjectItem, ExperimentItem, SkillCategory, CapabilityItem } from '../types/portfolio';

export const HERO_DATA = {
  label: "my name is",
  nameLine1: "YOUR",
  nameLine2: "NAME",
  headline: "I DESIGN THINGS THAT GET OUT OF YOUR WAY.",
  subHeadline: "I design, build, and prototype thoughtful software that balances creative exploration with rigorous product craft.",
  role: "YOUR ROLE",
  location: "CITY, COUNTRY",
  availability: "OPEN TO NEW WORK",
  stickyNotes: [
    { text: "MADE THINGS", color: "yellow", rotation: "-rotate-3", position: "top-left" },
    { text: "SWEAT THE DETAILS", color: "pink", rotation: "rotate-2", position: "top-right" },
    { text: "OPEN TO NEW WORK", color: "mint", rotation: "-rotate-2", position: "bottom-left" },
    { text: "GOOD PROBLEMS", color: "cyan", rotation: "rotate-3", position: "bottom-right" },
  ]
};

export const ABOUT_DATA = {
  eyebrow: "about me!",
  title: "what's up",
  lead: "I'm a creative professional who enjoys turning complicated ideas into simple experiences.",
  paragraphs: [
    "Most days are spent sitting at the intersection of creative editorial design, interactive systems, and deliberate product architecture. I believe the best digital work feels tactile, human, and immediately obvious—even when the engineering beneath it was anything but.",
    "Rather than treating software like disposable wireframes, I approach each interface like a physical publication: prioritizing clear hierarchy, typography rhythm, deliberate motion, and resilient craft."
  ],
  callout: "Currently exploring high-polish web experiences, generative tooling, and expressive design systems.",
  tags: [
    "Interaction",
    "Prototyping",
    "Research",
    "Motion",
    "Systems"
  ],
  principles: [
    {
      number: "01",
      title: "Questions before pixels",
      body: "Before opening a canvas or writing code, understand who it serves and what problem genuinely matters."
    },
    {
      number: "02",
      title: "Design for real stress",
      body: "Interfaces should remain calm and effortless when users are distracted, rushed, or on spotty connections."
    },
    {
      number: "03",
      title: "Craft in the open",
      body: "Great products emerge from cross-disciplinary experiments, honest feedback loops, and shared curiosity."
    }
  ]
};

export const CAPABILITIES_DATA: CapabilityItem[] = [
  {
    number: "01",
    title: "DESIGN",
    tagline: "Interaction systems, editorial art direction & typography",
    accentColor: "bg-crayon-yellow text-ink border-ink",
    rotation: "-rotate-1"
  },
  {
    number: "02",
    title: "BUILD",
    tagline: "Component architectures, modern web apps & micro-animations",
    accentColor: "bg-crayon-mint text-ink border-ink",
    rotation: "rotate-2"
  },
  {
    number: "03",
    title: "THINK",
    tagline: "Product strategy, user empathy, rapid validation & scope clarity",
    accentColor: "bg-crayon-pink text-ink border-ink",
    rotation: "-rotate-2"
  },
  {
    number: "04",
    title: "SOLVE",
    tagline: "Edge cases, messy legacy flows, state handling & accessibility",
    accentColor: "bg-crayon-cyan text-ink border-ink",
    rotation: "rotate-1"
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "project-01",
    projectNumber: "PROJECT 01",
    title: "PROJECT NAME ONE",
    category: "PRODUCT DESIGN / WEB APPLICATION",
    date: "JAN 12, 2026",
    shortDescription: "A comprehensive design system and modular user platform built for frictionless daily interaction.",
    cardTheme: "dark",
    rotation: "-rotate-1",
    tags: ["Interaction Design", "Design Systems", "Web App"],
    metrics: [
      { label: "Completion Rate", value: "+46%" },
      { label: "Flow Redundancy", value: "−50%" },
      { label: "Adoption", value: "Global Rollout" }
    ],
    overview: "This project tackled complex customer workflows by stripping away decorative noise and introducing a crisp, tactile UI hierarchy.",
    problem: "Users were navigating fragmented screens with inconsistent navigation and cognitive fatigue across multi-step processes.",
    approach: "Audited every touchpoint, drafted physical wireframes, and introduced a cohesive component system with clear focal points.",
    process: [
      "Discovery & Workflow Mapping",
      "Tactile Paper Prototyping",
      "Interactive High-Fidelity Specs",
      "Front-End Engineering Sync & Delivery"
    ],
    result: "Reduced task completion times by 46% while eliminating duplicate steps across the core workflow.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Figma"],
    imagePlaceholderId: "IMG_PROJ_01"
  },
  {
    id: "project-02",
    projectNumber: "PROJECT 02",
    title: "PROJECT NAME TWO",
    category: "FINTECH / CONSUMER PLATFORM",
    date: "FEB 04, 2026",
    shortDescription: "Transforming ambiguous financial management into an approachable, transparent daily ritual.",
    cardTheme: "yellow",
    rotation: "rotate-1",
    tags: ["Mobile UX", "Data Visualization", "Strategy"],
    metrics: [
      { label: "User Retention", value: "+38%" },
      { label: "Active Usage", value: "2.4×" },
      { label: "Sentiment", value: "4.9 / 5.0" }
    ],
    overview: "An editorial-first consumer app designed to help users track shared finances without stress or spreadsheet fatigue.",
    problem: "Most financial tools feel like tedious accounting ledgers, discouraging casual users and causing abandonment.",
    approach: "Centered the interface on a singular 'at-a-glance' balance card with immediate actions and plain-language summaries.",
    process: [
      "User Diary Studies",
      "Typography & Contrast Exploration",
      "Micro-interaction & Feedback Tuning",
      "Production Deployment"
    ],
    result: "Boosted 90-day retention by 38% and significantly increased organic referrals.",
    technologies: ["React Native", "TypeScript", "Tailwind", "SVG Charts"],
    imagePlaceholderId: "IMG_PROJ_02"
  },
  {
    id: "project-03",
    projectNumber: "PROJECT 03",
    title: "PROJECT NAME THREE",
    category: "DEV TOOLS / WORKSPACE EXPERIENCE",
    date: "MAR 10, 2025",
    shortDescription: "An onboarding pipeline and documentation suite that empowers new team members to ship on day one.",
    cardTheme: "white",
    rotation: "-rotate-1",
    tags: ["Dev Experience", "Information Architecture"],
    metrics: [
      { label: "Setup Velocity", value: "+62%" },
      { label: "Support Tickets", value: "−44%" },
      { label: "Self-Serve", value: "94%" }
    ],
    overview: "Rethought the developer onboarding sequence into a guided, gamified checklist with real-time status indicators.",
    problem: "New developers encountered outdated wikis, broken environments, and prolonged onboarding friction.",
    approach: "Designed a clean browser workbench that verifies environment health and highlights the immediate next step.",
    process: [
      "Internal Developer Interviews",
      "CLI to UI State Mapping",
      "Interactive Prototype Testing",
      "Documentation Architecture"
    ],
    result: "Average time-to-first-commit dropped from five days to under four hours.",
    technologies: ["Vite", "React", "Node.js", "Design Tokens"],
    imagePlaceholderId: "IMG_PROJ_03"
  },
  {
    id: "project-04",
    projectNumber: "PROJECT 04",
    title: "PROJECT NAME FOUR",
    category: "DATA VISUALIZATION / EDITORIAL TOOL",
    date: "NOV 18, 2025",
    shortDescription: "Synthesizing complex metrics into clean, human-scale summaries for creative decision makers.",
    cardTheme: "mint",
    rotation: "rotate-2",
    tags: ["Creative Direction", "Analytics", "Prototyping"],
    metrics: [
      { label: "Weekly Visits", value: "3.1×" },
      { label: "Insights Generated", value: "10k+" },
      { label: "Clarity Score", value: "98%" }
    ],
    overview: "A bespoke analytics dashboard that presents high-dimensional creative metrics with editorial clarity.",
    problem: "Excessive metrics and unformatted raw tables caused executive decision paralysis.",
    approach: "Structured data into magazine-style summary cards with progressive disclosure for deep-dive explorers.",
    process: [
      "Information Hierarchy Audit",
      "Color-Coded Semantic Signals",
      "Component Library Integration",
      "Performance Optimization"
    ],
    result: "Tripled active weekly engagement and transformed complex data into actionable creative takeaways.",
    technologies: ["React", "TypeScript", "D3 / Canvas", "Tailwind CSS"],
    imagePlaceholderId: "IMG_PROJ_04"
  }
];

export const EXPERIMENTS_DATA: ExperimentItem[] = [
  {
    id: "exp-01",
    number: "01",
    title: "EXPERIMENT 01",
    category: "PHYSICAL COMPUTING / CANVAS",
    year: "2026",
    note: "tactile physics sandbox",
    rotation: "-rotate-2"
  },
  {
    id: "exp-02",
    number: "02",
    title: "EXPERIMENT 02",
    category: "GENERATIVE TYPOGRAPHY",
    year: "2026",
    note: "algorithmic variable letterforms",
    rotation: "rotate-1"
  },
  {
    id: "exp-03",
    number: "03",
    title: "EXPERIMENT 03",
    category: "MICRO-INTERACTIONS",
    year: "2025",
    note: "spring physics toggle states",
    rotation: "-rotate-1"
  },
  {
    id: "exp-04",
    number: "04",
    title: "EXPERIMENT 04",
    category: "CREATIVE SOUND DESIGN",
    year: "2025",
    note: "web audio interface feedback",
    rotation: "rotate-2"
  }
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    categoryName: "DESIGN CRAFT",
    accentColor: "border-crayon-yellow bg-crayon-yellowLight/50",
    skills: [
      "Visual Design",
      "Interaction Design",
      "Design Systems",
      "Typography & Layout",
      "Prototyping",
      "Motion Design"
    ]
  },
  {
    categoryName: "ENGINEERING",
    accentColor: "border-crayon-mint bg-crayon-mint/20",
    skills: [
      "TypeScript & React",
      "Tailwind CSS",
      "Modern Web APIs",
      "Framer Motion",
      "Component Architecture",
      "Performance & a11y"
    ]
  },
  {
    categoryName: "PRODUCT & STRATEGY",
    accentColor: "border-crayon-pink bg-crayon-pinkSoft/50",
    skills: [
      "User Research",
      "User Journey Mapping",
      "Rapid Prototyping",
      "Information Architecture",
      "Usability Testing",
      "Problem Framing"
    ]
  },
  {
    categoryName: "TOOLS & ENVIRONMENT",
    accentColor: "border-crayon-cyan bg-crayon-cyan/20",
    skills: [
      "Figma & FigJam",
      "Vite & Node.js",
      "Git & GitHub",
      "Storybook",
      "Chrome DevTools",
      "Terminal Craft"
    ]
  }
];

export const CONTACT_DATA = {
  eyebrow: "LET'S TALK",
  heading: "Got a project, a hard problem, or just want to say hi?",
  body: "Tell me what you're building. Whether you need end-to-end design direction, an interactive prototype, or help unknotting a messy product problem—let's make something thoughtful.",
  email: "hello@yourdomain.com",
  location: "CITY, COUNTRY (UTC+0)",
  availability: "AVAILABLE FOR SELECT PROJECTS",
  socials: [
    { name: "GITHUB", url: "#" },
    { name: "TWITTER / X", url: "#" },
    { name: "LINKEDIN", url: "#" },
    { name: "READ.CV", url: "#" }
  ]
};

