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

  // FORCE SCROLL TO TOP - RUNS IMMEDIATELY
  useEffect(() => {
    // Disable scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Remove any hash
    if (window.location.hash) {
      window.history.replaceState(null, null, window.location.pathname);
    }

    // Prevent scroll during loading
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = "0";
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.bottom = "0";

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.bottom = "";
    };
  }, []);

  const handleLoaderComplete = () => {
    // Remove all scroll restrictions
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.bottom = "";

    // Force scroll to absolute top
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Now show the content
    setLoading(false);

    // Force top again after render
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
      }, 100);

      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 300);

      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 600);
    });
  };

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