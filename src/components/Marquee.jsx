import React from "react";
import { motion } from "framer-motion";

const items = ["REACT", "NODE.JS", "MONGODB", "TYPESCRIPT", "TAILWIND", "EXPRESS", "JAVASCRIPT", "MYSQL", "GIT", "FIGMA"];

const Marquee = () => (
  <div className="py-24 border-y border-white/[0.04] overflow-hidden relative">
    {/* Fade edges */}
    <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-[#050505] to-transparent z-10" />
    <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-[#050505] to-transparent z-10" />

    <motion.div
      animate={{ x: [0, -2400] }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      className="flex whitespace-nowrap"
    >
      {[...items, ...items, ...items].map((item, i) => (
        <span key={i} className="font-display text-7xl md:text-9xl font-bold text-white/[0.02] mx-6 select-none hover:text-white/[0.06] transition-colors duration-700">
          {item}
          <span className="text-blue/10 mx-8">✦</span>
        </span>
      ))}
    </motion.div>
  </div>
);

export default Marquee;