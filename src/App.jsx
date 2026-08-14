import React, { useState, useEffect } from "react";
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

  // Force scroll to top on mount
  useEffect(() => {
    // Disable browser scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Force to top
    window.scrollTo(0, 0);

    // Prevent scroll during loading
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleLoaderComplete = () => {
    setLoading(false);

    // Multiple scroll attempts to ensure top
    document.body.style.overflow = "auto";
    window.scrollTo(0, 0);

    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, 50);

    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, 200);
  };

  return (
    <>
      {loading ? (
        <Loader onComplete={handleLoaderComplete} />
      ) : (
        <>
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
        </>
      )}
    </>
  );
}

export default App;