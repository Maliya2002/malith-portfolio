import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Testimonial = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section className="py-40 relative overflow-hidden" ref={ref}>
      {/* Background Quote */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="font-display text-[25vw] font-bold text-white/[0.01] select-none">"</span>
      </div>

      <div className="max-w-4xl mx-auto px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <div className="text-blue text-4xl mb-10 font-display">"</div>
          <p className="font-display text-2xl md:text-3xl lg:text-4xl font-medium text-white/60 leading-relaxed mb-10 tracking-tight">
            Code is not just about solving problems. It's about creating experiences 
            that make people's lives <span className="text-blue">better</span> and <span className="text-purple">easier</span>.
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-[1px] bg-white/10" />
            <span className="text-white/20 text-sm font-mono tracking-wider">Malith Madushan</span>
            <div className="w-8 h-[1px] bg-white/10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonial;