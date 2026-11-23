import React from 'react';
import { AmbientGrid } from './components/common/AmbientGrid';
import { CursorGrid } from './components/common/CursorGrid';
import { CustomCursor } from './components/common/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Capabilities } from './components/Capabilities';
import { FeaturedWork } from './components/FeaturedWork';
import { TrustedSection } from './components/TrustedSection';
import { Experiments } from './components/Experiments';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* 1. Ambient Background Grid Layer (subtle isolated breathing clusters) */}
      <AmbientGrid />

      {/* 2. Cursor Activation Grid Layer (smoothly tracking square grid window) */}
      <CursorGrid />

      {/* 3. Desktop Spring Custom Cursor */}
      <CustomCursor />

      {/* 4. Floating Navigation Bar */}
      <Navbar />

      {/* 5. Main Portfolio Content Sections */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Capabilities />
        <FeaturedWork />
        <TrustedSection />
        <Experiments />
        <Skills />
        <Contact />
      </main>

      {/* 6. Minimal Editorial Footer */}
      <Footer />
    </div>
  );
};

export default App;
