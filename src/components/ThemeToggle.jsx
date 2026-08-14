import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle = () => {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      setDark(false);
      document.documentElement.classList.add("light-mode");
    }
  }, []);

  const toggle = () => {
    const newDark = !dark;
    setDark(newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");

    if (newDark) {
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
    }
  };

  return (
    <motion.button
      onClick={toggle}
      className="fixed top-24 right-8 z-40 w-12 h-12 rounded-full bg-[#0A0A0A] border border-white/10 flex items-center justify-center text-slate-400 hover:text-blue hover:border-blue/50 transition-all shadow-2xl hover-trigger"
      whileTap={{ scale: 0.9, rotate: 180 }}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.div
        key={dark ? "moon" : "sun"}
        initial={{ opacity: 0, rotate: -90 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 0.3 }}
      >
        {dark ? <FiMoon size={16} /> : <FiSun size={16} />}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;