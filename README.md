# portfolia — Creative Artsy Portfolio & Visual Design System

A handcrafted, editorial, digital-scrapbook portfolio website built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Framer Motion**.

This project recreates the tactile visual language, notebook aesthetics, and interaction style of the **Portfoliofy "Creative Artsy" (Crayon)** template while remaining completely original and populated exclusively with **clean placeholder content** ready for Phase 2 data insertion.

---

## 🎨 Design System & Aesthetic Principles

* **Tactile Paper Canvas:** Warm off-white background (`#f5f3ed`) rendered with ultra-subtle horizontal notebook lines (`repeating-linear-gradient`), soft left margin guide lines, and technical dot grid coordinates.
* **Neobrutalist Material Language:** Solid ink borders (`border-2 border-ink`), hard offset drop shadows (`shadow-brutal`), and paper-card elevations.
* **Washi / Masking Tape Accents:** Organic washi tape strips clipped via CSS polygons (`tape-polygon-1`, `tape-polygon-2`) in pastel yellow, pink, mint, cyan, and cream with realistic paper-tape shadows.
* **Hand-Drawn Sketches & Doodles:** Handcrafted SVG arrows, starbursts, sketchy highlight circles, and imperfect framing boxes.
* **Typography Pairing:**
  * **Main Sans:** `Space Grotesk` (clean, bold neo-grotesque for titles and headlines)
  * **Handwritten Accent:** `Caveat` & `Kalam` (organic handwritten notes, sticky annotations, and doodle labels)
  * **Technical Mono:** `Space Mono` (metadata, tags, dates, and architectural coordinates)
* **Custom Spring Cursor (Desktop):** Fluid spring-physics cursor with hover transformations (`default`, `hover`, `VIEW`, `OPEN`, `EXPLORE`), automatically disabled on mobile/touch screens.

---

## 📂 Project Structure

```
PORTFOLIO/
├── index.html                    # HTML entry point with Google Fonts preconnected
├── package.json                  # Dependencies (React, Framer Motion, Tailwind, Lucide)
├── tsconfig.json                 # TypeScript compiler configuration (ESNext, Bundler, React-JSX)
├── vite.config.ts                # Vite configuration with @/ alias
├── tailwind.config.js            # Custom color tokens, brutal shadows & keyframe animations
├── postcss.config.js             # PostCSS plugins (Tailwind, Autoprefixer)
│
├── public/                       # Static public assets (mirrored for instant serving)
│   └── assets/
│       ├── images/               # imagePlaceholder.svg, profilePlaceholder.svg
│       ├── projects/             # projectPlaceholder.svg
│       └── icons/                # logoPlaceholder.svg
│
└── src/
    ├── assets/                   # Vector SVGs & asset blueprints
    │   ├── images/               # Profile and photo placeholders
    │   ├── projects/             # Project mockup placeholders
    │   ├── icons/                # Logo and brand mark placeholders
    │   └── textures/             # Paper texture notes & overlays
    │
    ├── components/               # Modular UI Components
    │   ├── common/
    │   │   ├── CustomCursor.tsx  # Spring-physics custom cursor (Desktop only)
    │   │   ├── HandDoodles.tsx   # Hand-drawn arrows, stars, circles, pins, underlines
    │   │   ├── ImagePlaceholder.tsx # Polaroid & blueprint framed asset placeholder
    │   │   ├── StickyNote.tsx    # Interactive tilted post-it notes with pushpins
    │   │   └── TapeStrip.tsx     # Washi masking tape strips with polygon clipping
    │   │
    │   ├── Navbar.tsx            # Floating compact navigation & mobile drawer
    │   ├── Hero.tsx              # Oversized name, sketchy box, sticky notes & CTA
    │   ├── About.tsx             # Editorial manifesto, taped polaroids, principles
    │   ├── Capabilities.tsx      # Irregular colored paper strips with hover tilt
    │   ├── FeaturedWork.tsx      # Editorial asymmetric project stack
    │   ├── ProjectCard.tsx       # Horizontal project card (dark, yellow, white, mint)
    │   ├── ProjectModal.tsx      # Magazine-style full case study dossier
    │   ├── TrustedSection.tsx    # "Trusted by" logo marks board
    │   ├── Experiments.tsx       # Playground & creative prototype archive
    │   ├── Skills.tsx            # Categorized skills matrix (zero progress bars)
    │   ├── Contact.tsx           # "LET'S TALK" inbox card, email, & social links
    │   └── Footer.tsx            # Minimal footer with "Made with curiosity" stamp
    │
    ├── data/
    │   └── portfolioData.ts      # ⭐ ALL PLACEHOLDER CONTENT STORED HERE ⭐
    │
    ├── styles/
    │   └── index.css             # Tailwind directives, notebook lines, tape clip paths
    │
    ├── types/
    │   └── portfolio.ts          # TypeScript interfaces for projects, skills & items
    │
    ├── App.tsx                   # Main layout container
    └── main.tsx                  # React 18 root mounting
```

---

## 🧭 How to Customize (Phase 2 Guide)

### 1. Where Placeholder Content Is Stored
All textual content, headlines, case study narratives, capabilities, and links are cleanly isolated in a single file:
👉 `src/data/portfolioData.ts`

To personalize your portfolio, simply open that file and update:
* `HERO_DATA`: Your name, main headline, role, availability status, and sticky note phrases.
* `ABOUT_DATA`: Your bio, story paragraphs, current focus callout, and core principles.
* `CAPABILITIES_DATA`: Your four core disciplines.
* `PROJECTS_DATA`: Your 4 case studies (problem, approach, process, metrics, and tech stack).
* `EXPERIMENTS_DATA`: Side projects and playground experiments.
* `SKILLS_DATA`: Your skills grouped into four distinct categories.
* `CONTACT_DATA`: Your real email address, location, and social links.

### 2. Where to Put Real Images & Assets
Place your real screenshots and photos in:
* **Your Profile Photo:** Save as `public/assets/images/profilePlaceholder.svg` or drop a `.png`/`.jpg` into `public/assets/images/` and update the `src` attribute in `Hero.tsx` and `Contact.tsx`.
* **Project Screenshots & Mockups:** Drop your 16:9 or 16:10 mockups into `public/assets/projects/` and reference them in `portfolioData.ts`.
* **Client / Tool Logos:** Drop vector SVGs into `public/assets/icons/` and update `TrustedSection.tsx`.

---

## 🚀 Running the Project

### Development Server
```bash
npm run dev
```
Starts the Vite dev server at `http://localhost:5173` with instant Hot Module Replacement (HMR).

### Production Build & Preview
```bash
npm run build
npm run preview
```
Compiles TypeScript, processes Tailwind CSS, bundles assets with Vite, and serves the optimized production build at `http://localhost:4173`.
