import React from "react";
import { FiGithub, FiExternalLink, FiArrowUpRight } from "react-icons/fi";

import { projects } from "../data/projects";

const Work = () => (
  <section id="work" className="py-40 border-b border-white/[0.05]">
    <div className="max-w-7xl mx-auto px-6 md:px-8">
      <div className="work-intro"><div><p className="hero-eyebrow">01 / SELECTED WORK</p><h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight">Ideas turned into<br /><span className="text-blue">working applications.</span></h2></div><p>Explore the code, technologies and live demos behind my projects.</p></div>
      <div className="project-grid">
        {projects.map((p, i) => (
          <article key={p.num} className={i === 0 ? "project-card project-featured" : "project-card"}>
            <div className="project-top"><span>{i === 0 ? "FEATURED PROJECT" : "PROJECT " + p.num}</span><span className="project-status">{p.live ? "Live demo available" : "Source code available"}</span></div>
            {p.preview && <a className="project-preview" href={p.live || "/projects/" + p.preview + "-1440.webp"} target="_blank" rel="noreferrer" aria-label={p.live ? "Explore " + p.title + " live website" : "View " + p.title + " project artwork"}>
              <img src={"/projects/" + p.preview + "-720.webp"} srcSet={"/projects/" + p.preview + "-720.webp 720w, /projects/" + p.preview + "-1440.webp 1440w"} sizes={i === 0 ? "(max-width: 767px) calc(100vw - 98px), (max-width: 1023px) calc(100vw - 126px), 660px" : "(max-width: 767px) calc(100vw - 98px), (max-width: 1280px) calc(50vw - 102px), 538px"} width="1440" height="900" loading="lazy" decoding="async" alt={p.previewAlt} />
              <span className="project-preview-caption">{p.previewCaption || "Live website preview"} <FiArrowUpRight aria-hidden="true" /></span>
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
