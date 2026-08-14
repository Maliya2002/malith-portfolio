import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiHome, FiUser, FiCode, FiBriefcase, FiMail, FiGithub, FiLinkedin, FiDownload, FiExternalLink } from "react-icons/fi";

const commands = [
  { icon: <FiHome />, label: "Go to Home", action: "scroll", target: "home", shortcut: "H" },
  { icon: <FiUser />, label: "About Me", action: "scroll", target: "about", shortcut: "A" },
  { icon: <FiCode />, label: "View Skills", action: "scroll", target: "skills", shortcut: "S" },
  { icon: <FiBriefcase />, label: "See My Work", action: "scroll", target: "work", shortcut: "W" },
  { icon: <FiMail />, label: "Contact Me", action: "scroll", target: "contact", shortcut: "C" },
  { icon: <FiDownload />, label: "Download Resume", action: "link", target: "/Malith_Madushan_Resume.pdf", shortcut: "R" },
  { icon: <FiGithub />, label: "Visit GitHub", action: "link", target: "https://github.com/maliya2002", shortcut: "G" },
  { icon: <FiLinkedin />, label: "Visit LinkedIn", action: "link", target: "https://linkedin.com/in/malith-madushan-a3a6b0263", shortcut: "L" },
  { icon: <FiExternalLink />, label: "Live: SLIIT LMS", action: "link", target: "https://sliit-lms.vercel.app" },
  { icon: <FiExternalLink />, label: "Live: Buddhist Center", action: "link", target: "https://boraluketiya-buddhist-center.vercel.app" },
];

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const handleKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(search.toLowerCase())
  );

  const execute = (cmd) => {
    if (cmd.action === "scroll") {
      document.getElementById(cmd.target)?.scrollIntoView({ behavior: "smooth" });
    } else if (cmd.action === "link") {
      window.open(cmd.target, "_blank");
    }
    setOpen(false);
    setSearch("");
  };

  useEffect(() => {
    const handleArrows = (e) => {
      if (!open) return;
      if (e.key === "ArrowDown") setSelected((s) => Math.min(s + 1, filtered.length - 1));
      if (e.key === "ArrowUp") setSelected((s) => Math.max(s - 1, 0));
      if (e.key === "Enter" && filtered[selected]) execute(filtered[selected]);
    };
    window.addEventListener("keydown", handleArrows);
    return () => window.removeEventListener("keydown", handleArrows);
  }, [open, selected, filtered]);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-8 right-8 z-40 bg-[#0A0A0A] border border-white/10 hover:border-blue/50 rounded-full px-4 py-3 flex items-center gap-3 shadow-2xl hover-trigger group transition-all"
      >
        <FiSearch size={14} className="text-slate-400 group-hover:text-blue transition-colors" />
        <span className="text-slate-400 text-xs font-mono">Search</span>
        <div className="flex items-center gap-1 ml-2">
          <kbd className="bg-white/[0.05] border border-white/[0.08] text-slate-500 text-[10px] px-1.5 py-0.5 rounded font-mono">⌘</kbd>
          <kbd className="bg-white/[0.05] border border-white/[0.08] text-slate-500 text-[10px] px-1.5 py-0.5 rounded font-mono">K</kbd>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-sm flex items-start justify-center pt-32"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Search Input */}
              <div className="flex items-center gap-3 p-5 border-b border-white/[0.06]">
                <FiSearch size={18} className="text-slate-500" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Type to search commands..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setSelected(0); }}
                  className="flex-1 bg-transparent outline-none text-white text-sm placeholder:text-slate-600"
                />
                <kbd className="bg-white/[0.05] border border-white/[0.08] text-slate-500 text-[10px] px-2 py-1 rounded font-mono">ESC</kbd>
              </div>

              {/* Commands List */}
              <div className="max-h-96 overflow-y-auto p-2">
                {filtered.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 text-sm">No results found</div>
                ) : (
                  filtered.map((cmd, i) => (
                    <button
                      key={i}
                      onClick={() => execute(cmd)}
                      onMouseEnter={() => setSelected(i)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                        selected === i ? "bg-blue/10 text-white" : "text-slate-400 hover:bg-white/[0.03]"
                      }`}
                    >
                      <span className={selected === i ? "text-blue" : "text-slate-500"}>{cmd.icon}</span>
                      <span className="flex-1 text-sm">{cmd.label}</span>
                      {cmd.shortcut && (
                        <kbd className="bg-white/[0.05] border border-white/[0.08] text-slate-500 text-[10px] px-1.5 py-0.5 rounded font-mono">
                          {cmd.shortcut}
                        </kbd>
                      )}
                    </button>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-white/[0.06] px-4 py-2.5 flex items-center justify-between text-[10px] text-slate-600 font-mono">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="bg-white/[0.05] border border-white/[0.08] px-1 rounded">↑↓</kbd> navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="bg-white/[0.05] border border-white/[0.08] px-1 rounded">↵</kbd> select
                  </span>
                </div>
                <span>Malith Portfolio</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CommandPalette;