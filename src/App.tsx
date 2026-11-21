import React from 'react';
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
      {/* Desktop Spring Custom Cursor */}
      <CustomCursor />

      {/* Floating Compact Navigation Bar */}
      <Navbar />

      {/* Main Portfolio Sections */}
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

      {/* Minimal Editorial Footer */}
      <Footer />
    </div>
  );
};

export default App;
