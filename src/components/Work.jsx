import React from "react";
import { FiGithub, FiExternalLink, FiArrowUpRight } from "react-icons/fi";

const projects = [
  {
    num: "01",
    title: "Upul Stores POS",
    preview: "upul-pos",
    previewAlt: "Actual Upul Stores POS mobile dashboard with New sale, Add product and View reports actions",
    desc: "Enterprise-grade Smart Point of Sale system with AI insights, inventory management, multi-role authentication, and PWA support for retail businesses.",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "NextAuth"],
    github: "https://github.com/Maliya2002/upul-stores-pos",
    live: null,
    color: "#10b981",
  },
  {
    num: "02",
    title: "Cricavo",
    preview: "cricavo",
    previewAlt: "Cricavo overview with match navigation, Start a match button and match totals",
    desc: "A Sinhala/English cricket scoring app with ball-by-ball scoring, scorecards, match history and offline browser storage. Includes undo and JSON backup/restore for locally saved matches.",
    tech: ["JavaScript", "IndexedDB", "PWA", "Supabase"],
    github: "https://github.com/Maliya2002/cricavo",
    live: "https://cricavo.vercel.app",
    color: "#beff3e",
  },
  {
    num: "03",
    title: "UNISLOT",
    desc: "University academic scheduling and resource management system.",
    tech: ["React", "Node.js", "MongoDB"],
    github: "https://github.com/kezu1003/UNISLOT---University-Academic-Scheduling-Resource-Management-System",
    live: null,
    color: "#a6ff00",
  },
  {
    num: "04",
    title: "SLIIT LMS",
    preview: "sliit-lms",
    previewAlt: "SLIIT LMS public homepage with learning platform introduction and sign-in links",
    desc: "Full-featured learning management system for university students and staff.",
    tech: ["React", "Node.js", "MongoDB"],
    github: "https://github.com/Maliya2002/sliit-lms",
    live: "https://sliit-lms.vercel.app/",
    color: "#c0f65c",
  },
  {
    num: "05",
    title: "Buddhist Center",
    preview: "buddhist-center",
    previewAlt: "Boraluketiya Buddhist Center public website homepage and navigation",
    desc: "Official website for Boraluketiya Buddhist Center with cultural content.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Maliya2002/boraluketiya-buddhist-center",
    live: "https://boraluketiya-buddhist-center.vercel.app/",
    color: "#ec4899",
  },
  {
    num: "06",
    title: "Smart Campus",
    desc: "Digital campus management solution for university operations.",
    tech: ["React", "JavaScript", "Node.js"],
    github: "https://github.com/Maliya2002/it3030-paf-2026-smart-campus-group89",
    live: null,
    color: "#a3f50b",
  },
  {
    num: "07",
    title: "GoldenStar Sports Club",
    preview: "goldenstar",
    previewAlt: "GoldenStar Sports Club public homepage with club navigation and cricket club introduction",
    desc: "A website for GoldenStar Sports Club with player profiles, match fixtures, results, announcements and an admin area for club content.",
    tech: ["Next.js", "TypeScript", "MongoDB", "NextAuth"],
    github: "https://github.com/Maliya2002/GoldenStar-Sports-Club",
    live: "https://golden-star-sports-club.vercel.app",
    color: "#e5bd60",
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
            {p.preview && <a className="project-preview" href={p.live || "/projects/" + p.preview + "-1440.webp"} target="_blank" rel="noreferrer" aria-label={p.live ? "Explore " + p.title + " live website" : "View " + p.title + " screenshot"}>
              <img src={"/projects/" + p.preview + "-720.webp"} srcSet={"/projects/" + p.preview + "-720.webp 720w, /projects/" + p.preview + "-1440.webp 1440w"} sizes="(max-width: 767px) calc(100vw - 98px), (max-width: 1280px) calc(50vw - 102px), 538px" width="1440" height="900" loading="lazy" decoding="async" alt={p.previewAlt} />
              <span className="project-preview-caption">{p.live ? "Live website preview" : "Local app preview · Mobile dashboard"} <FiArrowUpRight aria-hidden="true" /></span>
            </a>}
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
