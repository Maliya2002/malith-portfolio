import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const timeline = [
  {
    year: "2023 — Present",
    title: "3rd Year IT Undergraduate",
    place: "SLIIT — Sri Lanka",
    desc: "Focusing on full stack web development, software engineering, and building real-world applications.",
    color: "#0066FF",
  },
  {
    year: "2024",
    title: "MERN Stack Development",
    place: "Self-taught + Academic",
    desc: "Built multiple applications using MongoDB, Express, React, and Node.js including LMS and scheduling systems.",
    color: "#8B5CF6",
  },
  {
    year: "2023",
    title: "Web Development Journey",
    place: "Started Learning",
    desc: "Began learning HTML, CSS, JavaScript and exploring web technologies. Built first projects and portfolio.",
    color: "#EC4899",
  },
];

const Experience = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="py-40 border-b border-white/[0.04]" ref={ref}>
      <div className="max-w-7xl mx-auto px-8">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-4 mb-20"
        >
          <span className="text-blue text-xs font-mono tracking-[0.2em]">04</span>
          <div className="h-[1px] flex-1 max-w-[60px] bg-white/10" />
          <span className="text-white/20 text-xs font-mono tracking-[0.2em] uppercase">Journey</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl md:text-5xl font-bold tracking-[-0.03em] mb-24"
        >
          My <span className="text-blue">journey</span>
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/[0.04] -translate-x-1/2" />

          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.15 }}
              className={`relative grid md:grid-cols-2 gap-8 mb-20 ${
                i % 2 === 0 ? "" : "md:direction-rtl"
              }`}
            >
              {/* Dot */}
              <div className="absolute left-0 md:left-1/2 top-2 -translate-x-1/2 z-10">
                <div className="w-3 h-3 rounded-full border-2 bg-[#050505]" style={{ borderColor: item.color }} />
              </div>

              {/* Content */}
              <div className={`${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:col-start-2 md:pl-16"}`}>
                <span className="text-white/15 text-xs font-mono tracking-[0.15em] mb-3 block">{item.year}</span>
                <h3 className="font-display text-xl font-bold text-white/80 mb-2">{item.title}</h3>
                <p className="text-white/30 text-sm mb-3">{item.place}</p>
                <p className="text-white/15 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;