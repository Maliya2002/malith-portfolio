import React from "react";
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from "react-icons/fi";
import MagneticLink from "./MagneticLink";

const Footer = () => {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="border-t border-white/[0.06] relative z-10">
      <div className="max-w-7xl mx-auto px-8 py-20 text-center">
        <p className="text-slate-500 text-xs font-mono tracking-[0.2em] mb-6 uppercase">Got a project?</p>
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] mb-8">
          <span className="text-white hover:text-blue transition-colors duration-500 cursor-pointer hover-trigger">
            Let's talk
          </span>
          <span className="text-blue">.</span>
        </h2>
        <a href="mailto:malithmadushan25@gmail.com"
          className="text-slate-400 text-sm font-mono tracking-wider hover:text-blue transition-colors hover-trigger hover-line">
          malithmadushan25@gmail.com
        </a>
      </div>

      <div className="border-t border-white/[0.06] py-8">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="font-display font-bold text-lg text-slate-400">
            M<span className="text-blue">.</span>
          </span>

          <div className="flex items-center gap-5">
            {[
              { icon: <FiGithub size={16} />, link: "https://github.com/maliya2002" },
              { icon: <FiLinkedin size={16} />, link: "https://www.linkedin.com/in/malith-madushan-a3a6b0263" },
              { icon: <FiMail size={16} />, link: "mailto:malithmadushan25@gmail.com" },
            ].map((s, i) => (
              <MagneticLink key={i} strength={0.3}>
                <a href={s.link} target="_blank" rel="noreferrer"
                  className="text-slate-500 hover:text-white transition-colors duration-500 hover-trigger">
                  {s.icon}
                </a>
              </MagneticLink>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <p className="text-slate-600 text-[10px] font-mono tracking-wider">
              © {new Date().getFullYear()} Malith Madushan
            </p>
            <button onClick={scrollTop} className="text-slate-500 hover:text-white transition-colors hover-trigger">
              <FiArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;