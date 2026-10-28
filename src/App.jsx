import React, { useState, useEffect, useCallback } from "react";
import {
  lockScroll,
  unlockScroll,
  forceScrollTop,
  pinTopUntilStable,
} from "./utils/scrollControl";
import Scene3D from "./components/Scene3D";
import { MotionConfig } from "framer-motion";
import Loader from "./components/Loader";
import ScrollIndicator from "./components/ScrollIndicator";
import BackToTop from "./components/BackToTop";
import CommandPalette from "./components/CommandPalette";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import SkillsGlobe from "./components/SkillsGlobe";
import Work from "./components/Work";
import Experience from "./components/Experience";
import Certifications from "./components/Certifications";
import Terminal from "./components/Terminal";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  const [loading, setLoading] = useState(true);

  // Every visit starts on the hero, never on a restored / anchored position.
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (window.location.hash) {
      window.history.replaceState(null, null, window.location.pathname + window.location.search);
    }

    lockScroll();
    forceScrollTop();

    return unlockScroll;
  }, []);

  const handleLoaderComplete = useCallback(() => {
    unlockScroll();
    forceScrollTop();

    // Reveal the page. The sections mount in this tick and then settle while
    // images decode and the in-view animations fire, so the viewport is held at
    // the top until the layout stops moving.
    setLoading(false);
    pinTopUntilStable();
  }, []);

  if (loading) {
    return <Loader onComplete={handleLoaderComplete} />;
  }

  return (
    <MotionConfig reducedMotion="user"><div className="relative">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Scene3D />

      <ScrollIndicator />
      <BackToTop />

      <Navbar />
      <main id="main-content" tabIndex={-1} className="relative z-10">
        <Hero />
        <Work />
        <About />
        <Skills />
        <SkillsGlobe />
        <Experience />
        <Certifications />
        <Contact />
        <Terminal />
      </main>
      <div className="flex justify-center py-8 relative z-20"><CommandPalette /></div>
      <Footer />
    </div></MotionConfig>
  );
}

export default App;
