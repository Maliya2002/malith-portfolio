import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";

const BackToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!show) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      onClick={scrollTop}
      className="fixed bottom-8 left-8 z-50 w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-white/30 hover:text-white hover:border-white/15 hover:bg-white/[0.06] transition-all duration-500 hover-trigger"
    >
      <FiArrowUp size={18} />
    </motion.button>
  );
};

export default BackToTop;