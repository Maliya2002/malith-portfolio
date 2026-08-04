import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { TypeAnimation } from "react-type-animation";
import { FiArrowRight, FiGithub, FiLinkedin, FiMail, FiArrowDown } from "react-icons/fi";
import MagneticLink from "./MagneticLink";

const Hero = () => {
  const a = (d) => ({
    initial: { opacity: 0, y: 60, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 1, delay: d, ease: [0.23, 1, 0.32, 1] },
  });

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      {/* Giant BG Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.015 }}
          transition={{ duration: 3, delay: 2 }}
          className="font-display text-[22vw] font-bold text-white whitespace-nowrap"
        >
          DEVELOPER
        </motion.h1>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7">
            {/* Status */}
            <motion.div {...a(1.8)} className="flex items-center gap-3 mb-12">
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <div className="w-2 h-2 rounded-full bg-green-400 absolute inset-0 animate-ping" />
              </div>
              <span className="text-white/30 text-[11px] font-mono tracking-[0.2em] uppercase">
                Available for Internship
              </span>
            </motion.div>

            {/* Name */}
            <motion.div {...a(2.0)}>
              <p className="text-white/20 text-sm font-mono tracking-[0.2em] mb-4 uppercase">Hello, I'm</p>
            </motion.div>

            <motion.h1 {...a(2.2)} className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.92] tracking-[-0.04em] mb-3">
              <span className="text-white">Malith</span>
            </motion.h1>

            <motion.h1 {...a(2.4)} className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.92] tracking-[-0.04em] mb-8">
              <span className="text-transparent" style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.15)" }}>
                Madushan
              </span>
            </motion.h1>

            {/* Role */}
            <motion.div {...a(2.6)} className="flex items-center gap-4 mb-8">
              <div className="w-16 h-[1px] bg-blue" />
              <TypeAnimation
                sequence={[
                  "Full Stack Developer", 3000,
                  "MERN Stack Developer", 3000,
                  "UI/UX Enthusiast", 3000,
                  "Creative Problem Solver", 3000,
                ]}
                wrapper="span"
                speed={40}
                repeat={Infinity}
                className="text-white/40 text-lg font-body"
              />
            </motion.div>

            {/* Description */}
            <motion.p {...a(2.8)} className="text-white/25 text-base md:text-lg max-w-lg leading-relaxed mb-12">
              3rd Year IT Undergraduate at SLIIT, building modern web experiences with clean code, thoughtful design, and cutting-edge technologies.
            </motion.p>

            {/* CTA */}
            <motion.div {...a(3.0)} className="flex flex-wrap items-center gap-4 mb-16">
  <MagneticLink strength={0.2}>
    <Link to="work" smooth duration={600} offset={-80}>
      <button className="group bg-blue hover:bg-white text-white hover:text-black px-8 py-4 rounded-full text-sm font-semibold flex items-center gap-3 transition-all duration-500 hover-trigger">
        View Projects
        <FiArrowRight className="group-hover:translate-x-1.5 transition-transform duration-300" size={16} />
      </button>
    </Link>
  </MagneticLink>
  <MagneticLink strength={0.2}>
    <Link to="contact" smooth duration={600} offset={-80}>
      <button className="text-white/30 hover:text-white px-8 py-4 rounded-full text-sm font-medium border border-white/[0.06] hover:border-white/15 transition-all duration-500 hover-trigger">
        Let's Talk
      </button>
    </Link>
  </MagneticLink>
  <MagneticLink strength={0.15}>
    <a href="/Malith_Madushan_Resume.pdf" download
      className="text-white/15 hover:text-blue text-sm font-mono tracking-wider transition-colors hover-trigger ml-2">
      ↓ CV
    </a>
  </MagneticLink>
</motion.div>

            {/* Social */}
            <motion.div {...a(3.2)} className="flex items-center gap-8">
              <div className="w-12 h-[1px] bg-white/8" />
              {[
                { icon: <FiGithub size={17} />, link: "https://github.com/maliya2002" },
                { icon: <FiLinkedin size={17} />, link: "https://www.linkedin.com/in/malith-madushan-a3a6b0263" },
                { icon: <FiMail size={17} />, link: "mailto:malithmadushan25@gmail.com" },
              ].map((s, i) => (
                <a key={i} href={s.link} target="_blank" rel="noreferrer"
                  className="text-white/15 hover:text-white transition-colors duration-500 hover-trigger">
                  {s.icon}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right Side — Decorative */}
          <motion.div
            className="lg:col-span-5 hidden lg:flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1.5 }}
          >
            <div className="relative w-80 h-80">
              {/* Rotating Circle */}
              <div className="absolute inset-0 border border-white/[0.04] rounded-full animate-spin" style={{ animationDuration: "25s" }} />
              <div className="absolute inset-4 border border-white/[0.03] rounded-full animate-spin" style={{ animationDuration: "35s", animationDirection: "reverse" }} />
              <div className="absolute inset-8 border border-white/[0.02] rounded-full animate-spin" style={{ animationDuration: "45s" }} />

              {/* Center Dot */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue" />

              {/* Orbiting Dots */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/20" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue/40" />
              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1 h-1 rounded-full bg-purple/40" />
              <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-pink/30" />

              {/* Tech Labels */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-white/10 text-[9px] font-mono tracking-widest">REACT</div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-white/10 text-[9px] font-mono tracking-widest">NODE</div>
              <div className="absolute top-1/2 -left-12 -translate-y-1/2 text-white/10 text-[9px] font-mono tracking-widest">MONGO</div>
              <div className="absolute top-1/2 -right-14 -translate-y-1/2 text-white/10 text-[9px] font-mono tracking-widest">EXPRESS</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <Link to="about" smooth duration={600} offset={-80} className="cursor-pointer hover-trigger">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="flex flex-col items-center gap-3"
          >
            <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/10 to-white/5" />
            <FiArrowDown className="text-white/10" size={14} />
          </motion.div>
        </Link>
      </motion.div>

      {/* Side Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block"
      >
        <p className="text-white/8 text-[10px] font-mono tracking-[0.3em] writing-mode-vertical" style={{ writingMode: "vertical-rl" }}>
          FULL STACK DEVELOPER — SLIIT — 2026
        </p>
      </motion.div>
    </section>
  );
};

export default Hero;