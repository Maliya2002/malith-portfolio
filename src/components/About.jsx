import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const About = () => {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });

  const a = (d) => ({
    initial: { opacity: 0, y: 50 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.9, delay: d, ease: [0.23, 1, 0.32, 1] },
  });

 const stats = [
  { num: "07+", label: "Projects", color: "#0066FF" },   // ← 6 → 7
  { num: "140+", label: "Commits", color: "#8B5CF6" },
  { num: "12+", label: "Tech Stack", color: "#EC4899" }, // ← 10 → 12
  { num: "02", label: "Live Apps", color: "#10B981" },
];

  return (
    <section id="about" className="py-40 border-b border-white/[0.05] relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-8">
        <motion.div {...a(0)} className="flex items-center gap-4 mb-20">
          <span className="text-blue text-xs font-mono tracking-[0.2em]">01</span>
          <div className="h-[1px] flex-1 max-w-[60px] bg-white/10" />
          <span className="text-slate-500 text-xs font-mono tracking-[0.2em] uppercase">About</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-24">
          <div>
            <motion.h2 {...a(0.1)} className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-[-0.03em] mb-10 text-white">
              I design &<br />build things<br />for the <span className="text-blue">web</span>
            </motion.h2>

            <motion.div {...a(0.2)} className="space-y-6 mb-14">
              <p className="text-slate-300 text-lg leading-relaxed">
                I'm a passionate <span className="text-white font-semibold">3rd Year IT Undergraduate</span> at SLIIT, Sri Lanka. I love creating digital experiences that are both beautiful and functional.
              </p>
              <p className="text-slate-400 leading-relaxed">
                From scheduling systems to learning platforms, I've built real applications that solve real problems. Every line of code I write is driven by a passion for excellence and attention to detail.
              </p>
            </motion.div>

            <motion.div {...a(0.3)} className="grid grid-cols-4 gap-6">
              {stats.map((s, i) => (
                <div key={i} className="group hover-trigger">
                  <div className="font-display text-3xl font-bold text-white mb-1 group-hover:text-blue transition-colors duration-500">
                    {s.num}
                  </div>
                  <div className="text-slate-500 text-[10px] font-mono tracking-[0.15em] uppercase">{s.label}</div>
                  <div className="w-full h-[1px] mt-3 bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: "100%" } : {}}
                      transition={{ duration: 1.2, delay: 0.5 + i * 0.15, ease: "easeOut" }}
                      className="h-full"
                      style={{ background: s.color }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div {...a(0.3)}>
            <div className="bg-white/[0.025] border border-white/[0.06] rounded-2xl p-8 font-mono text-[13px] relative overflow-hidden hover:border-white/[0.1] transition-colors duration-700">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue/5 rounded-full blur-[80px]" />
              <div className="flex items-center gap-2 mb-8 pb-4 border-b border-white/[0.06]">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                </div>
                <span className="ml-auto text-slate-500 text-[11px]">developer.ts</span>
              </div>

              <pre className="leading-[2] relative z-10">
                <code>
                  <span className="text-purple">const</span>{" "}
                  <span className="text-blue">malith</span>{" "}
                  <span className="text-slate-500">=</span>{" "}
                  <span className="text-slate-500">{"{"}</span>{"\n"}
                  {"  "}
                  <span className="text-slate-300">name</span>
                  <span className="text-slate-500">: </span>
                  <span className="text-green">
                    "Malith Madushan"
                  </span>
                  <span className="text-slate-500">,</span>
                  {"\n  "}
                  <span className="text-slate-300">role</span>
                  <span className="text-slate-500">: </span>
                  <span className="text-green">
                    "Full Stack Developer"
                  </span>
                  <span className="text-slate-500">,</span>
                  {"\n  "}
                  <span className="text-slate-300">university</span>
                  <span className="text-slate-500">: </span>
                  <span className="text-green">"SLIIT"</span>
                  <span className="text-slate-500">,</span>
                  {"\n  "}
                  <span className="text-slate-300">stack</span>
                  <span className="text-slate-500">: [</span>
                  {"\n    "}
                  <span className="text-green">"React"</span>
                  <span className="text-slate-500">, </span>
                  <span className="text-green">"Node.js"</span>
                  <span className="text-slate-500">,</span>
                  {"\n    "}
                  <span className="text-green">"MongoDB"</span>
                  <span className="text-slate-500">, </span>
                  <span className="text-green">"TypeScript"</span>
                  {"\n  "}
                  <span className="text-slate-500">],</span>
                  {"\n  "}
                  <span className="text-slate-300">passion</span>
                  <span className="text-slate-500">: </span>
                  <span className="text-green">"Clean code &"</span>
                  {"\n            "}
                  <span className="text-green">"beautiful UI"</span>
                  {"\n"}
                  <span className="text-slate-500">{"}"}</span>
                  <span className="text-slate-500">;</span>
                </code>
              </pre>

              <div className="mt-8 pt-4 border-t border-white/[0.06] flex justify-between">
                <span className="text-slate-500 text-[10px] font-mono">TypeScript</span>
                <span className="text-slate-500 text-[10px] font-mono">UTF-8</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;