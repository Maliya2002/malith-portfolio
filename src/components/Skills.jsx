import React from "react";
import { FiCode, FiServer, FiDatabase, FiTool, FiArrowUpRight, FiLayers } from "react-icons/fi";

const groups = [
  { title: "Frontend", label: "THE EXPERIENCE", icon: FiCode, color: "#c4fa60", description: "From responsive layouts to interactive applications.", skills: ["React", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS", "HTML / CSS"] },
  { title: "Backend", label: "THE LOGIC", icon: FiServer, color: "#d3fa8b", description: "APIs and services that connect the application.", skills: ["Node.js", "Express.js", "PHP", "REST API", "Prisma ORM"] },
  { title: "Databases", label: "THE DATA", icon: FiDatabase, color: "#34d399", description: "Relational and document databases behind my projects.", skills: ["MongoDB", "MySQL", "PostgreSQL"] },
  { title: "Design & workflow", label: "THE PROCESS", icon: FiTool, color: "#b0fb24", description: "Tools for designing, collaborating, testing APIs and deploying.", skills: ["Git / GitHub", "VS Code", "Figma", "Postman", "Vercel"] },
];

export default function Skills() {
  return (
    <section id="skills" className="toolkit-section section-alt" aria-labelledby="toolkit-title">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="toolkit-heading">
          <div><p className="hero-eyebrow">03 / TECHNICAL SKILLS</p><h2 id="toolkit-title" className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight">My development <span className="text-blue">toolkit.</span></h2></div>
          <p>The tools behind the interfaces, APIs and databases I build. Explore how they come together in my projects.</p>
        </div>
        <div className="toolkit-grid">
          {groups.map(({ title, label, icon: Icon, color, description, skills }, index) => (
            <article className="toolkit-card" key={title} style={{ "--toolkit-accent": color }}>
              <div className="toolkit-card-top"><span className="toolkit-icon"><Icon aria-hidden="true" /></span><span>{label}</span><span className="toolkit-number">0{index + 1}</span></div>
              <h3>{title}</h3><p>{description}</p>
              <ul className="toolkit-tags" aria-label={`${title} technologies`}>{skills.map(skill => <li key={skill}><span aria-hidden="true" />{skill}</li>)}</ul>
            </article>
          ))}
        </div>
        <div className="toolkit-proof">
          <div className="toolkit-proof-intro"><FiLayers aria-hidden="true" /><div><span>PUTTING IT TOGETHER</span><h3>One stack. A working product.</h3><p>Inside my Upul Stores POS project</p></div></div>
          <ol className="toolkit-stack" aria-label="Upul Stores POS stack"><li><small>INTERFACE</small><strong>Next.js</strong></li><li><small>APPLICATION</small><strong>TypeScript</strong></li><li><small>DATA ACCESS</small><strong>Prisma</strong></li><li><small>DATABASE</small><strong>PostgreSQL</strong></li></ol>
          <a href="https://github.com/Maliya2002/upul-stores-pos" target="_blank" rel="noreferrer">Explore the code <FiArrowUpRight aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
