import React from "react";
import { useReducedMotion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

export default function AnimatedRole() {
  const reducedMotion = useReducedMotion();
  return <div className="hero-role">
    <span className="role-prompt" aria-hidden="true">&gt;_</span>
    <span className="sr-only">Full-stack Developer, UI/UX Enthusiast, React Developer, Creative Problem Solver.</span>
    <span aria-hidden="true" className="role-text">
      {reducedMotion ? 'Full-stack Developer' : <TypeAnimation sequence={['Full-stack Developer', 2200, 'UI/UX Enthusiast', 2200, 'React Developer', 2200, 'Creative Problem Solver', 2200]} speed={45} deletionSpeed={65} repeat={Infinity} wrapper="span" />}
    </span>
  </div>;
}
