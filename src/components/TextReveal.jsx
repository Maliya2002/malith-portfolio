import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const TextReveal = ({ children, delay = 0, className = "" }) => {
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={inView ? { y: "0%", opacity: 1 } : {}}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.23, 1, 0.32, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default TextReveal;