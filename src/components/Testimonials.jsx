import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const testimonials = [
  {
    text: "Malith is an incredibly talented developer with a strong grasp of modern web technologies. His attention to detail and commitment to quality is impressive.",
    author: "Team Lead",
    role: "Smart Campus Project",
    color: "#0066FF",
  },
  {
    text: "Working with Malith on the SLIIT LMS was a great experience. He delivered clean, efficient code and was always willing to help team members.",
    author: "Project Collaborator",
    role: "SLIIT LMS",
    color: "#8B5CF6",
  },
  {
    text: "Malith's dedication to learning and building real-world projects makes him stand out. His portfolio showcases both technical skill and creativity.",
    author: "Fellow Developer",
    role: "Peer Review",
    color: "#EC4899",
  },
];

const Testimonials = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-32 border-b border-white/[0.05]" ref={ref}>
      <div className="max-w-4xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <p className="text-blue text-xs font-mono tracking-[0.2em] uppercase mb-4">Testimonials</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
            What people <span className="text-blue">say</span>
          </h2>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="filled-card rounded-2xl p-10 md:p-14 text-center relative overflow-hidden"
            >
              {/* Color glow */}
              <div
                className="absolute inset-0 opacity-10"
                style={{ background: `radial-gradient(circle at center, ${testimonials[current].color}, transparent 70%)` }}
              />

              <div className="relative z-10">
                <div className="text-blue text-5xl mb-6 font-display">"</div>
                <p className="text-slate-200 text-lg md:text-xl leading-relaxed mb-8 font-body">
                  {testimonials[current].text}
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-8 h-[1px] bg-white/15" />
                  <div>
                    <p className="text-white font-semibold text-sm">{testimonials[current].author}</p>
                    <p className="text-slate-500 text-xs font-mono">{testimonials[current].role}</p>
                  </div>
                  <div className="w-8 h-[1px] bg-white/15" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 transition-all hover-trigger"
            >
              <FiChevronLeft size={16} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all hover-trigger ${
                    i === current ? "w-8 bg-blue" : "w-1.5 bg-white/20"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 transition-all hover-trigger"
            >
              <FiChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;