import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { TypeAnimation } from "react-type-animation";
import { FiArrowRight, FiGithub, FiLinkedin, FiMail, FiArrowDown } from "react-icons/fi";
import MagneticLink from "./MagneticLink";
import HeroPhoto from "./HeroPhoto";

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen w-full flex items-center relative overflow-hidden"
      style={{ paddingTop: "120px", paddingBottom: "60px" }}
    >
      {/* Giant Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.02 }}
          transition={{ duration: 3, delay: 1 }}
          className="font-display font-bold text-white whitespace-nowrap"
          style={{ fontSize: "18vw" }}
        >
          DEVELOPER
        </motion.h1>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* LEFT SIDE */}
          <div className="lg:col-span-7 order-2 lg:order-1">

            {/* Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <div className="w-2 h-2 rounded-full bg-green-400 absolute inset-0 animate-ping" />
              </div>
              <span className="text-slate-400 text-[11px] font-mono tracking-[0.2em] uppercase">
                Available for Internship
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-blue text-sm font-mono tracking-[0.2em] mb-4 uppercase"
            >
              Hello, I'm
            </motion.p>

            {/* Name Line 1 */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="font-display font-bold leading-none tracking-tight mb-2 text-white"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
            >
              Malith
            </motion.h1>

            {/* Name Line 2 */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="font-display font-bold leading-none tracking-tight mb-8"
              style={{
                fontSize: "clamp(2.5rem, 7vw, 5rem)",
                color: "transparent",
                WebkitTextStroke: "2px rgba(255,255,255,0.3)",
              }}
            >
              Madushan
            </motion.h1>

            {/* Role with Type Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="flex items-center gap-4 mb-6"
            >
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
                className="text-slate-300 text-base md:text-lg"
              />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="text-slate-400 text-base md:text-lg max-w-lg leading-relaxed mb-10"
            >
              3rd Year IT Undergraduate at SLIIT, crafting immersive web experiences
              with clean code, stunning visuals, and cutting-edge technologies.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <Link to="work" smooth duration={600} offset={-80}>
                <button className="group bg-blue hover:bg-white text-white hover:text-black px-8 py-4 rounded-full text-sm font-bold flex items-center gap-3 transition-all duration-500 hover-trigger">
                  View Projects
                  <FiArrowRight className="group-hover:translate-x-1.5 transition-transform duration-300" size={16} />
                </button>
              </Link>
              <Link to="contact" smooth duration={600} offset={-80}>
                <button className="text-slate-300 hover:text-white px-8 py-4 rounded-full text-sm font-semibold border border-white/[0.1] hover:border-white/25 transition-all duration-500 hover-trigger">
                  Let's Talk
                </button>
              </Link>
              <a
                href="/Malith_Madushan_Resume.pdf"
                download
                className="text-slate-400 hover:text-blue text-sm font-mono tracking-wider transition-colors hover-trigger"
              >
                ↓ Resume
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              className="flex items-center gap-6"
            >
              <div className="w-12 h-[1px] bg-white/15" />
              <a
                href="https://github.com/maliya2002"
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-white transition-colors duration-500 hover-trigger"
              >
                <FiGithub size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/malith-madushan-a3a6b0263"
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-white transition-colors duration-500 hover-trigger"
              >
                <FiLinkedin size={18} />
              </a>
              <a
                href="mailto:malithmadushan25@gmail.com"
                className="text-slate-400 hover:text-white transition-colors duration-500 hover-trigger"
              >
                <FiMail size={18} />
              </a>
            </motion.div>
          </div>

          {/* RIGHT SIDE — Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 1 }}
            className="lg:col-span-5 h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center order-1 lg:order-2"
          >
            <HeroPhoto />
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <Link to="about" smooth duration={600} offset={-80} className="cursor-pointer hover-trigger">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="flex flex-col items-center gap-3"
          >
            <div className="w-[1px] h-10 bg-gradient-to-b from-transparent via-white/20 to-white/5" />
            <FiArrowDown className="text-slate-500" size={14} />
          </motion.div>
        </Link>
      </motion.div>

    </section>
  );
};

export default Hero;