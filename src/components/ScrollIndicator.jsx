import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ScrollIndicator = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[100] bg-white/[0.03]">
        <motion.div
          className="h-full bg-blue"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Side progress */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col items-center gap-4">
        <div className="w-[1px] h-24 bg-white/[0.04] relative overflow-hidden rounded-full">
          <motion.div
            className="w-full bg-blue absolute top-0 rounded-full"
            style={{ height: `${progress}%` }}
          />
        </div>
        <span className="text-white/10 text-[9px] font-mono">{Math.round(progress)}%</span>
      </div>
    </>
  );
};

export default ScrollIndicator;