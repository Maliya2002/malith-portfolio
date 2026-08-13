import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Loader = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setCount((p) => {
        if (p >= 100) {
          clearInterval(t);
          setTimeout(() => setExit(true), 200);
          setTimeout(() => onComplete(), 800);
          return 100;
        }
        return p + 2;
      });
    }, 15);
    return () => clearInterval(t);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex items-center justify-center"
      style={{ background: "#050505" }}
      animate={exit ? { y: "-100%" } : { y: "0%" }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute font-display text-[25vw] font-bold text-white/[0.02] select-none"
      >
        {String(count).padStart(3, "0")}
      </motion.span>

      <div className="relative z-10 text-center">
        <div className="w-48 mx-auto mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-slate-500 text-[10px] font-mono tracking-[0.3em]">LOADING</span>
            <span className="text-slate-400 text-[10px] font-mono">{count}%</span>
          </div>
          <div className="h-[1px] bg-white/[0.06] overflow-hidden">
            <div className="h-full bg-blue transition-all duration-100" style={{ width: `${count}%` }} />
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h1 className="font-display text-xl font-bold text-slate-200 tracking-tight mb-1">Malith Madushan</h1>
          <p className="text-slate-500 text-[9px] font-mono tracking-[0.4em] uppercase">Portfolio</p>
        </motion.div>
      </div>

      <div className="absolute top-6 left-6 text-slate-600 text-[9px] font-mono">2026</div>
      <div className="absolute bottom-6 right-6 text-slate-600 text-[9px] font-mono">SLIIT</div>
    </motion.div>
  );
};

export default Loader;