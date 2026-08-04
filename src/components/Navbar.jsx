import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import MagneticLink from "./MagneticLink";
import CurrentTime from "./CurrentTime";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["home", "about", "skills", "work", "contact"];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.2 }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.04]" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
        {/* Logo */}
        <MagneticLink strength={0.2}>
          <Link to="home" smooth className="hover-trigger cursor-pointer">
            <span className="font-display font-bold text-xl text-white">
              M<span className="text-blue">.</span>
            </span>
          </Link>
        </MagneticLink>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <CurrentTime />
          <div className="w-[1px] h-4 bg-white/[0.06] hidden lg:block" />
          {links.map((l) => (
            <MagneticLink key={l} strength={0.15}>
              <Link
                to={l}
                smooth
                spy
                duration={600}
                offset={-80}
                activeClass="!text-white"
                className="text-white/20 text-[12px] font-medium uppercase tracking-[0.15em] cursor-pointer hover:text-white transition-colors duration-500 hover-trigger"
              >
                {l}
              </Link>
            </MagneticLink>
          ))}
          <MagneticLink strength={0.2}>
            <a
              href="/Malith_Madushan_Resume.pdf"
              download
              className="bg-blue text-white text-[12px] font-semibold px-6 py-2.5 rounded-full hover:bg-white hover:text-black transition-all duration-500 hover-trigger"
            >
              Resume
            </a>
          </MagneticLink>
        </div>

        {/* Mobile */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-white hover-trigger">
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#0A0A0A] border-t border-white/[0.04] px-8 py-8"
        >
          {links.map((l) => (
            <Link
              key={l}
              to={l}
              smooth
              duration={600}
              offset={-80}
              onClick={() => setOpen(false)}
              className="block text-white/30 text-lg py-3 uppercase tracking-wider hover:text-white transition-colors hover-trigger"
            >
              {l}
            </Link>
          ))}
          <a href="/Malith_Madushan_Resume.pdf" download
            className="block mt-4 bg-blue text-white text-sm font-semibold px-6 py-3 rounded-full text-center hover-trigger">
            Resume
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;