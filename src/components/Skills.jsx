import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const skillData = [
  { title: "Frontend", color: "#0066FF", skills: [
    { name: "React", level: 85 },
    { name: "Next.js", level: 78 },     // ← NEW
    { name: "JavaScript", level: 88 },
    { name: "TypeScript", level: 75 },  // ← UP
    { name: "Tailwind CSS", level: 82 },
    { name: "HTML / CSS", level: 92 },
  ]},
  { title: "Backend", color: "#8B5CF6", skills: [
    { name: "Node.js", level: 82 },
    { name: "Express.js", level: 80 },
    { name: "PHP", level: 68 },
    { name: "REST API", level: 78 },
    { name: "Prisma ORM", level: 70 },  // ← NEW
  ]},
  { title: "Database", color: "#EC4899", skills: [
    { name: "MongoDB", level: 80 },
    { name: "MySQL", level: 74 },
    { name: "PostgreSQL", level: 70 },  // ← NEW
  ]},
  { title: "Tools", color: "#F59E0B", skills: [
    { name: "Git / GitHub", level: 88 },
    { name: "VS Code", level: 92 },
    { name: "Figma", level: 68 },
    { name: "Postman", level: 82 },
    { name: "Vercel", level: 78 },
  ]},
];

const Skills = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="skills" className="py-40 border-b border-white/[0.05] section-alt" ref={ref}>
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-4 mb-20"
        >
          <span className="text-blue text-xs font-mono tracking-[0.2em]">02</span>
          <div className="h-[1px] flex-1 max-w-[60px] bg-white/10" />
          <span className="text-slate-500 text-xs font-mono tracking-[0.2em] uppercase">Skills</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] mb-20 text-white"
        >
          Technologies I<br /><span className="text-blue">work with</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {skillData.map((group, gi) => (
            <motion.div
              key={gi}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + gi * 0.1 }}
              className="skill-card group hover-trigger"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-2 rounded-full" style={{ background: group.color }} />
                <h3 className="font-display text-lg font-bold text-white group-hover:text-blue transition-colors">{group.title}</h3>
                <div className="flex-1 h-[1px] bg-white/[0.06]" />
                <span className="text-slate-500 text-[10px] font-mono">{group.skills.length} skills</span>
              </div>

              <div className="space-y-5">
                {group.skills.map((skill, si) => (
                  <div key={si}>
                    <div className="flex justify-between mb-2.5">
                      <span className="text-slate-300 text-sm">{skill.name}</span>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.5 + gi * 0.1 + si * 0.05 }}
                        className="text-slate-500 text-[11px] font-mono"
                      >
                        {skill.level}%
                      </motion.span>
                    </div>
                    <div className="progress-bar">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1.5, delay: 0.3 + gi * 0.1 + si * 0.06, ease: [0.23, 1, 0.32, 1] }}
                        className="progress-fill"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;