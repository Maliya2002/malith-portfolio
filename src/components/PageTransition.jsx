import React from "react";
import { motion } from "framer-motion";

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
  >
    {children}
  </motion.div>
);

export default PageTransition;