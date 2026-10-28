import React from "react";
import AnimatedRole from "./AnimatedRole";
import { FiArrowUpRight, FiDownload, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

export default function Hero() {
  const tilt = (event) => {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--spot-x", ((event.clientX - rect.left) / rect.width * 100) + "%");
    card.style.setProperty("--spot-y", ((event.clientY - rect.top) / rect.height * 100) + "%");
    card.style.setProperty("--tilt-x", ((event.clientY - rect.top) / rect.height - 0.5) * -7 + "deg");
    card.style.setProperty("--tilt-y", ((event.clientX - rect.left) / rect.width - 0.5) * 7 + "deg");
  };
  const resetTilt = (event) => { event.currentTarget.style.setProperty("--tilt-x", "0deg"); event.currentTarget.style.setProperty("--tilt-y", "0deg"); };
  return (
    <section id="home" className="recruiter-hero">
      <div className="hero-aura" aria-hidden="true" /><div className="hero-crosshair" aria-hidden="true">+</div>
      <span className="hero-watermark" aria-hidden="true">MALITH</span>
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <div className="availability"><span /> Seeking a Software Engineer / Full-stack Internship</div>
          <p className="hero-eyebrow">MALITH MADUSHAN · SRI LANKA</p>
          <h1 className="hero-heading">Ideas to code.<br /><span className="hero-heading-accent">Built for people.</span></h1>
          <AnimatedRole />
          <p className="hero-intro">I'm Malith, a third-year IT undergraduate at SLIIT. I turn complex problems into intuitive full-stack applications—from retail tools to university platforms.</p>
          <div className="hero-actions">
            <a href="#work" className="primary-action">Explore my projects <FiArrowUpRight /></a>
            <a href="/Malith_Madushan_CV.pdf" download className="secondary-action"><FiDownload /> Download CV</a>
          </div>
          <div className="hero-proof"><span><b>⚛</b> React / Next.js</span><span><b>JS</b> Node / Express</span><span><b>▤</b> SQL / MongoDB</span></div>
          <div className="hero-socials">
            <a href="mailto:malithmadushan25@gmail.com"><FiMail /> Let's talk</a>
            <a href="https://github.com/maliya2002" target="_blank" rel="noreferrer"><FiGithub /> GitHub</a>
            <a href="https://www.linkedin.com/in/malith-madushan-a3a6b0263" target="_blank" rel="noreferrer"><FiLinkedin /> LinkedIn</a>
          </div>
        </div>
        <div className="lg:col-span-5 portrait-stage">
        <div className="portrait-orbit orbit-one" aria-hidden="true" /><div className="portrait-orbit orbit-two" aria-hidden="true" />
        <span className="portrait-coordinate" aria-hidden="true">BASED IN SRI LANKA</span>
        <div className="hero-profile" onPointerMove={tilt} onPointerLeave={resetTilt}>
          <div className="profile-tech-badge badge-react" aria-hidden="true">⚛ <span>React</span></div>
          <div className="profile-tech-badge badge-node" aria-hidden="true">&lt;/&gt; <span>Full-stack</span></div>
          <div className="profile-image"><img src="/malith.png" alt="Malith Madushan" width="640" height="720" fetchpriority="high" /></div>
          <div className="profile-caption"><div><strong>Malith Madushan</strong><span>Full-stack developer · IT undergraduate</span></div><span className="profile-mark" aria-hidden="true">&lt;/&gt;</span></div>
        </div>
        <div className="portrait-code" aria-hidden="true"><div><i /><i /><i /><span>developer.ts</span></div><code><span>const</span> developer = &#123;<br />&nbsp; name: <b>"Malith"</b>,<br />&nbsp; focus: <b>"Full-stack"</b>,<br />&nbsp; next: <b>"Your team"</b><br />&#125;;</code></div>
        <div className="portrait-label" aria-hidden="true"><span>BUILD. LEARN. REPEAT.</span><b>↗</b></div>
        </div>
      </div>
      <div className="hero-showcase max-w-7xl mx-auto px-6 md:px-8">
        <div className="showcase-heading"><span>A FEW THINGS I'VE BUILT</span><a href="#work">Explore the work <FiArrowUpRight /></a></div>
        <div className="showcase-grid">
          <a className="showcase-card" href="https://github.com/Maliya2002/upul-stores-pos" target="_blank" rel="noreferrer">
            <div className="showcase-art art-pos" aria-hidden="true"><i /><div><b /><b /><b /></div><span>POS</span></div>
            <div><small>01 / RETAIL SOFTWARE</small><strong>Upul Stores POS</strong><span>Next.js · PostgreSQL</span></div><FiArrowUpRight />
          </a>
          <a className="showcase-card" href="https://github.com/kezu1003/UNISLOT---University-Academic-Scheduling-Resource-Management-System" target="_blank" rel="noreferrer">
            <div className="showcase-art art-schedule" aria-hidden="true"><i /><i /><i /><i /><i /><i /><span>UNI</span></div>
            <div><small>02 / UNIVERSITY PLATFORM</small><strong>UNISLOT</strong><span>React · Node.js</span></div><FiArrowUpRight />
          </a>
          <a className="showcase-card" href="https://sliit-lms.vercel.app/" target="_blank" rel="noreferrer">
            <div className="showcase-art art-learning" aria-hidden="true"><i>▶</i><span>LMS</span></div>
            <div><small>03 / LEARNING PLATFORM</small><strong>SLIIT LMS</strong><span><em /> Explore live demo</span></div><FiArrowUpRight />
          </a>
        </div>
      </div>
    </section>
  );
}
