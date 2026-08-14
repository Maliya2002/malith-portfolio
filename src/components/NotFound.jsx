import React from "react";
import { motion } from "framer-motion";
import { FiHome } from "react-icons/fi";

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-bg">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <h1 className="font-display text-[15vw] font-bold gradient-text mb-6">404</h1>
      <p className="text-slate-400 text-lg mb-8">Page not found</p>
      <a href="/" className="btn-primary inline-flex items-center gap-2">
        <FiHome /> Go Home
      </a>
    </motion.div>
  </div>
);

export default NotFound;