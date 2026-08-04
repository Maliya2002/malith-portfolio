import React, { useState } from "react";
import Background from "./components/Background";
import Cursor from "./components/Cursor";
import Loader from "./components/Loader";
import ScrollIndicator from "./components/ScrollIndicator";
import BackToTop from "./components/BackToTop";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Skills from "./components/Skills";
import Work from "./components/Work";
import Experience from "./components/Experience";
import Testimonial from "./components/Testimonial";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <Loader onComplete={() => setLoading(false)} />
      ) : (
        <>
          <Background />
          <Cursor />
          <ScrollIndicator />
          <BackToTop />
          <Navbar />
          <main className="relative z-10">
            <Hero />
            <Marquee />
            <About />
            <Skills />
            <Work />
            <Experience />
            <Testimonial />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;