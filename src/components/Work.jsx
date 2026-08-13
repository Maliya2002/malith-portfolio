import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiGithub, FiExternalLink, FiArrowUpRight } from "react-icons/fi";

const projects = [
  {
    num: "01",
    title: "Upul Stores POS",
    desc: "Enterprise-grade Smart Point of Sale system with AI insights, inventory management, multi-role authentication, and PWA support for retail businesses.",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "NextAuth"],
    github: "https://github.com/Maliya2002/upul-stores-pos",
    live: null,
    color: "#10B981",
  },
  {
    num: "02",
    title: "UNISLOT",
    desc: "University academic scheduling and resource management system.",
    tech: ["React", "Node.js", "MongoDB"],
    github: "https://github.com/kezu1003/UNISLOT---University-Academic-Scheduling-Resource-Management-System",
    live: null,
    color: "#0066FF",
  },
  {
    num: "03",
    title: "SLIIT LMS",
    desc: "Full-featured learning management system for university students and staff.",
    tech: ["React", "Node.js", "MongoDB"],
    github: "https://github.com/Maliya2002/sliit-lms",
    live: "https://sliit-lms.vercel.app/",
    color: "#8B5CF6",
  },
  {
    num: "04",
    title: "Buddhist Center",
    desc: "Official website for Boraluketiya Buddhist Center with cultural content.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Maliya2002/boraluketiya-buddhist-center",
    live: "https://boraluketiya-buddhist-center.vercel.app/",
    color: "#EC4899",
  },
  {
    num: "05",
    title: "Smart Campus",
    desc: "Digital campus management solution for university operations.",
    tech: ["React", "JavaScript", "Node.js"],
    github: "https://github.com/Maliya2002/it3030-paf-2026-smart-campus-group89",
    live: null,
    color: "#F59E0B",
  },
];

const Work = () => {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [hovered, setHovered] = useState(null);

  return (
    <section id="work" className="py-40 border-b border-white/[0.05]" ref={ref}>
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-4 mb-20"
        >
          <span className="text-blue text-xs font-mono tracking-[0.2em]">03</span>
          <div className="h-[1px] flex-1 max-w-[60px] bg-white/10" />
          <span className="text-slate-500 text-xs font-mono tracking-[0.2em] uppercase">Work</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] mb-24 text-white"
        >
          Selected<br /><span className="text-blue">projects</span>
        </motion.h2>

        {projects.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 + i * 0.1 }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="group border-t border-white/[0.06] hover-trigger relative"
          >
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{ background: `linear-gradient(90deg, ${p.color}05, transparent)` }}
            />

            <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center py-10 md:py-14">
              <div className="lg:col-span-1">
                <span className="font-mono text-slate-600 text-sm group-hover:text-blue/50 transition-colors duration-500">{p.num}</span>
              </div>

              <div className="lg:col-span-3">
                <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white group-hover:text-blue transition-colors duration-500 flex items-center gap-3">
                  {p.title}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={hovered === i ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiArrowUpRight size={20} className="text-blue" />
                  </motion.div>
                </h3>
              </div>

              <div className="lg:col-span-5">
                <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors duration-500">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {p.tech.map((t, j) => (
                    <span key={j} className="text-[10px] font-mono text-slate-500 px-3 py-1 rounded-full border border-white/[0.06] group-hover:border-white/[0.1] group-hover:text-slate-400 transition-all duration-500">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-3 flex items-center gap-5 lg:justify-end">
                {p.live && (
                  <a href={p.live} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 text-slate-500 hover:text-blue transition-colors text-sm hover-trigger">
                    <div className="relative">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 absolute inset-0 animate-ping" />
                    </div>
                    Live
                    <FiExternalLink size={13} />
                  </a>
                )}
                <a href={p.github} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm hover-trigger">
                  Code <FiGithub size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        ))}

        <div className="border-t border-white/[0.06]" />
      </div>
    </section>
  );
};

export default Work;