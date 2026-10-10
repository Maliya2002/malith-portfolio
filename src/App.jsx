import React, { useState, useEffect, useCallback } from "react";
import {
  lockScroll,
  unlockScroll,
  forceScrollTop,
  pinTopUntilStable,
} from "./utils/scrollControl";
import Scene3D from "./components/Scene3D";
import MouseTrail from "./components/MouseTrail";
import Cursor from "./components/Cursor";
import Loader from "./components/Loader";
import ScrollIndicator from "./components/ScrollIndicator";
import BackToTop from "./components/BackToTop";
import CommandPalette from "./components/CommandPalette";
import ThemeToggle from "./components/ThemeToggle";
import MusicPlayer from "./components/MusicPlayer";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Skills from "./components/Skills";
import Work from "./components/Work";
import Experience from "./components/Experience";
import GitHubStats from "./components/GitHubStats";
import SkillsGlobe from "./components/SkillsGlobe";
import Certifications from "./components/Certifications";
import Testimonials from "./components/Testimonials";
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
      window.history.replaceState(null, null, window.location.pathname);
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
    <div className="relative">
      <Scene3D />
      <MouseTrail />
      <Cursor />
      <ScrollIndicator />
      <BackToTop />
      <CommandPalette />
      <ThemeToggle />
      <MusicPlayer />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <SkillsGlobe />
        <Work />
        <Experience />
        <GitHubStats />
        <Certifications />
        <Testimonials />
        <Terminal />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
