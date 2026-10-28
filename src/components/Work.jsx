import React from "react";
import { FiGithub, FiExternalLink, FiArrowUpRight } from "react-icons/fi";

const projects = [
  {
    num: "01",
    title: "Upul Stores POS",
    desc: "Enterprise-grade Smart Point of Sale system with AI insights, inventory management, multi-role authentication, and PWA support for retail businesses.",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "NextAuth"],
    github: "https://github.com/Maliya2002/upul-stores-pos",
    live: null,
    color: "#10b981",
  },
  {
    num: "02",
    title: "UNISLOT",
    desc: "University academic scheduling and resource management system.",
    tech: ["React", "Node.js", "MongoDB"],
    github: "https://github.com/kezu1003/UNISLOT---University-Academic-Scheduling-Resource-Management-System",
    live: null,
    color: "#a6ff00",
  },
  {
    num: "03",
    title: "SLIIT LMS",
    desc: "Full-featured learning management system for university students and staff.",
    tech: ["React", "Node.js", "MongoDB"],
    github: "https://github.com/Maliya2002/sliit-lms",
    live: "https://sliit-lms.vercel.app/",
    color: "#c0f65c",
  },
  {
    num: "04",
    title: "Buddhist Center",
    desc: "Official website for Boraluketiya Buddhist Center with cultural content.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Maliya2002/boraluketiya-buddhist-center",
    live: "https://boraluketiya-buddhist-center.vercel.app/",
    color: "#ec4899",
  },
  {
    num: "05",
    title: "Smart Campus",
    desc: "Digital campus management solution for university operations.",
    tech: ["React", "JavaScript", "Node.js"],
    github: "https://github.com/Maliya2002/it3030-paf-2026-smart-campus-group89",
    live: null,
    color: "#a3f50b",
  },
];

const Work = () => (
  <section id="work" className="py-40 border-b border-white/[0.05]">
    <div className="max-w-7xl mx-auto px-6 md:px-8">
      <div className="work-intro"><div><p className="hero-eyebrow">01 / SELECTED WORK</p><h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight">Ideas turned into<br /><span className="text-blue">working applications.</span></h2></div><p>Explore the code, technologies and live demos behind my projects.</p></div>
      <div className="project-grid">
        {projects.map((p, i) => (
          <article key={p.num} className={i === 0 ? "project-card project-featured" : "project-card"}>
            <div className="project-top"><span>{i === 0 ? "FEATURED PROJECT" : "PROJECT " + p.num}</span><span className="project-status">{p.live ? "Live demo available" : "Source code available"}</span></div>
            {i === 0 && <div className="project-system" aria-hidden="true"><div><span>01 / INTERFACE</span><strong>Next.js</strong><small>Retail dashboard</small></div><b>→</b><div><span>02 / APPLICATION</span><strong>TypeScript</strong><small>Inventory & roles</small></div><b>→</b><div><span>03 / DATA</span><strong>PostgreSQL</strong><small>Prisma ORM</small></div></div>}
            <h3>{p.title}</h3><p className="project-description">{p.desc}</p>
            <ul className="project-tags" aria-label="Technologies">{p.tech.map(t => <li key={t}>{t}</li>)}</ul>
            <div className="project-links">
              <a href={p.github} target="_blank" rel="noreferrer" aria-label={"View " + p.title + " source on GitHub"}><FiGithub /> View source <FiArrowUpRight /></a>
              {p.live && <a href={p.live} target="_blank" rel="noreferrer" aria-label={"Open " + p.title + " live demo"}>Live demo <FiExternalLink /></a>}
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
export default Work;
