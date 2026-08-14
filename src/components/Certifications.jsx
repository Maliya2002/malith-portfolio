import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiAward, FiExternalLink } from "react-icons/fi";

const certs = [
  { name: "Python for Beginners", org: "University of Moratuwa (CODL)", year: "2024", color: "#0066FF" },
  { name: "Career Skills in Software Dev", org: "LinkedIn Learning", year: "2024", color: "#8B5CF6" },
  { name: "Learning Git and GitHub", org: "LinkedIn Learning", year: "2024", color: "#EC4899" },
  { name: "English Course", org: "British Way English Academy", year: "2023", color: "#10B981" },
  { name: "Computer Course", org: "Digital Link Computer Training", year: "2022", color: "#F59E0B" },
];

const Certifications = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="py-32 border-b border-white/[0.05]" ref={ref}>
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-4 mb-20"
        >
          <span className="text-blue text-xs font-mono tracking-[0.2em]">06</span>
          <div className="h-[1px] flex-1 max-w-[60px] bg-white/10" />
          <span className="text-slate-500 text-xs font-mono tracking-[0.2em] uppercase">Certifications</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl md:text-5xl font-bold tracking-[-0.03em] mb-16 text-white"
        >
          Certifications & <span className="text-blue">Learning</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {certs.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="filled-card rounded-2xl p-6 group hover-trigger"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${cert.color}15`, color: cert.color }}
              >
                <FiAward size={22} />
              </div>
              <h3 className="text-white font-semibold text-base mb-2 group-hover:text-blue transition-colors">
                {cert.name}
              </h3>
              <p className="text-slate-400 text-sm mb-3">{cert.org}</p>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-xs font-mono tracking-wider">{cert.year}</span>
                <FiExternalLink size={14} className="text-slate-600 group-hover:text-blue transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;