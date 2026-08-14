import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { TypeAnimation } from "react-type-animation";
import { FiArrowRight, FiGithub, FiLinkedin, FiMail, FiArrowDown } from "react-icons/fi";
import MagneticLink from "./MagneticLink";
import HeroPhoto from "./HeroPhoto";

const Hero = () => {
  const a = (d) => ({
    initial: { opacity: 0, y: 60, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 1, delay: d, ease: [0.23, 1, 0.32, 1] },
  });

  return (
    <section
      id="home"
      className="min-h-screen w-full flex items-center relative overflow-hidden pt-32 pb-20 lg:pt-24 lg:pb-16"
    >
      {/* Giant Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.02 }}
          transition={{ duration: 3, delay: 2 }}
          className="font-display text-[18vw] font-bold text-white whitespace-nowrap"
        >
          DEVELOPER
        </motion.h1>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">

          {/* LEFT — Text Content */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            {/* Status Badge */}
            <motion.div {...a(1.8)} className="flex items-center gap-3 mb-8">
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <div className="w-2 h-2 rounded-full bg-green-400 absolute inset-0 animate-ping" />
              </div>
              <span className="text-slate-400 text-[11px] font-mono tracking-[0.2em] uppercase">
                Available for Internship
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.div {...a(2.0)}>
              <p className="text-blue text-sm font-mono tracking-[0.2em] mb-4 uppercase">
                Hello, I'm
              </p>
            </motion.div>

            {/* Name — First Line */}
            <motion.h1
              {...a(2.2)}
              className="font-display font-bold leading-[0.95] tracking-[-0.04em] mb-2"
              style={{
                fontSize: "clamp(3rem, 8vw, 5.5rem)",
              }}
            >
              <span className="text-white block">Malith</span>
            </motion.h1>

            {/* Name — Second Line */}
            <motion.h1
              {...a(2.4)}
              className="font-display font-bold leading-[0.95] tracking-[-0.04em] mb-8"
              style={{
                fontSize: "clamp(3rem, 8vw, 5.5rem)",
              }}
            >
              <span
                className="text-transparent block"
                style={{
                  WebkitTextStroke: "2px rgba(255,255,255,0.2)",
                }}
              >
                Madushan
              </span>
            </motion.h1>

            {/* Role */}
            <motion.div {...a(2.6)} className="flex items-center gap-4 mb-6">
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
                className="text-slate-300 text-base md:text-lg font-body"
              />
            </motion.div>

            {/* Description */}
            <motion.p
              {...a(2.8)}
              className="text-slate-400 text-base md:text-lg max-w-lg leading-relaxed mb-10"
            >
              3rd Year IT Undergraduate at SLIIT, crafting immersive web experiences
              with clean code, stunning visuals, and cutting-edge technologies.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div {...a(3.0)} className="flex flex-wrap items-center gap-4 mb-12">
              <MagneticLink strength={0.2}>
                <Link to="work" smooth duration={600} offset={-80}>
                  <button className="group bg-blue hover:bg-white text-white hover:text-black px-8 py-4 rounded-full text-sm font-bold flex items-center gap-3 transition-all duration-500 hover-trigger">
                    View Projects
                    <FiArrowRight
                      className="group-hover:translate-x-1.5 transition-transform duration-300"
                      size={16}
                    />
                  </button>
                </Link>
              </MagneticLink>
              <MagneticLink strength={0.2}>
                <Link to="contact" smooth duration={600} offset={-80}>
                  <button className="text-slate-300 hover:text-white px-8 py-4 rounded-full text-sm font-semibold border border-white/[0.08] hover:border-white/20 transition-all duration-500 hover-trigger">
                    Let's Talk
                  </button>
                </Link>
              </MagneticLink>
              <MagneticLink strength={0.15}>
                <a
                  href="/Malith_Madushan_Resume.pdf"
                  download
                  className="text-slate-400 hover:text-blue text-sm font-mono tracking-wider transition-colors hover-trigger ml-2"
                >
                  ↓ Resume
                </a>
              </MagneticLink>
            </motion.div>

            {/* Social Links */}
            <motion.div {...a(3.2)} className="flex items-center gap-8">
              <div className="w-12 h-[1px] bg-white/10" />
              {[
                { icon: <FiGithub size={18} />, link: "https://github.com/maliya2002" },
                { icon: <FiLinkedin size={18} />, link: "https://www.linkedin.com/in/malith-madushan-a3a6b0263" },
                { icon: <FiMail size={18} />, link: "mailto:malithmadushan25@gmail.com" },
              ].map((s, i) => (
                <MagneticLink key={i} strength={0.3}>
                  <a
                    href={s.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-white transition-colors duration-500 hover-trigger"
                  >
                    {s.icon}
                  </a>
                </MagneticLink>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Photo */}
          <motion.div
            className="lg:col-span-5 h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.5, duration: 1.5 }}
          >
            <HeroPhoto />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <Link to="about" smooth duration={600} offset={-80} className="cursor-pointer hover-trigger">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="flex flex-col items-center gap-3"
          >
            <div className="w-[1px] h-10 bg-gradient-to-b from-transparent via-white/15 to-white/5" />
            <FiArrowDown className="text-slate-500" size={14} />
          </motion.div>
        </Link>
      </motion.div>

      {/* Side Vertical Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block"
      >
        <p
          className="text-slate-600 text-[10px] font-mono tracking-[0.3em]"
          style={{ writingMode: "vertical-rl" }}
        >
          FULL STACK DEVELOPER — SLIIT — 2026
        </p>
      </motion.div>
    </section>
  );
};

export default Hero;