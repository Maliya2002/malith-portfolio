import { downloadResume } from "../utils/resume";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { runCommand, commandNames } from "../utils/terminalCommands";
import { FiTerminal } from "react-icons/fi";

export const terminalInfo = {
  help: `Available commands:
  about     - About me
  skills    - Technical skills
  projects  - View projects
  contact   - Contact information
  resume    - Download resume
  social    - Social links
  clear     - Clear terminal
  whoami    - Who am I?
  ls / dir  - List portfolio files
  cat FILE  - Read about.txt, skills.txt, projects.txt, contact.txt
  pwd       - Show virtual directory
  date      - Current local date and time
  echo TEXT - Print text
  history   - Previous commands
  open NAME - github, linkedin, website, lms, buddhist
  goto NAME - home, about, skills, work, contact
  Tab       - Complete command; Up/Down - command history`,

  about: `Malith Madushan
3rd Year IT Undergraduate at SLIIT
Full Stack Web Developer
Location: Sri Lanka
Available for internships!`,

  skills: `Frontend: React, Next.js, TypeScript, Tailwind CSS
Backend:  Node.js, Express, PHP
Database: MongoDB, MySQL, PostgreSQL
Tools:    Git, GitHub, VS Code, Figma`,

  projects: `1. Upul Stores POS - Enterprise POS System
2. UNISLOT - University Scheduling
3. SLIIT LMS - Learning Management (Live)
4. Buddhist Center - Community Website (Live)
5. Smart Campus - Campus Management`,

  contact: `Email:    malithmadushan25@gmail.com
GitHub:   github.com/maliya2002
LinkedIn: linkedin.com/in/malith-madushan-a3a6b0263
Website:  malithmadushan.site`,

  resume: `Downloading resume...
File: Malith_Madushan_CV.pdf`,

  social: `→ GitHub:   github.com/maliya2002
→ LinkedIn: linkedin.com/in/malith-madushan-a3a6b0263
→ Email:    malithmadushan25@gmail.com`,

  whoami: `malith@portfolio:~$
  Role: Full Stack Developer
  Status: Available for hire
  Motto: "Turning ideas into digital reality"`,
};

const Terminal = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [history, setHistory] = useState([
    { type: "system", text: "Welcome to Malith's Terminal v2.0" },
    { type: "system", text: "Type 'help' to see available commands" },
    { type: "system", text: "" },
  ]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const historyIndex = useRef(0);
  const draft = useRef("");
  const logRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll only the terminal's own log box. Using scrollIntoView() here walks up
  // every scrollable ancestor, including the page itself, which dragged the
  // whole site down to this section the moment the intro loader finished.
  useEffect(() => {
    const log = logRef.current;
    if (!log) return;
    log.scrollTo({ top: log.scrollHeight, behavior: "auto" });
  }, [history]);

  const focusInput = () => inputRef.current?.focus({ preventScroll: true });

  const handleCommand = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const entered = input.trim();
    const nextCommands = [...commandHistory, entered];
    setCommandHistory(nextCommands);
    historyIndex.current = nextCommands.length;
    draft.current = "";
    const result = runCommand(entered, { info: terminalInfo, history: nextCommands });
    if (result.clear) setHistory([]);
    else setHistory(previous => [...previous, { type: "input", text: entered }, { type: result.error ? "error" : "output", text: result.text }].slice(-200));
    if (result.url) window.open(result.url, "_blank", "noopener,noreferrer");
    if (result.section) document.getElementById(result.section)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    if (result.download) {
      downloadResume();
    }
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex.current === commandHistory.length) draft.current = input;
      historyIndex.current = Math.max(0, Math.min(commandHistory.length, historyIndex.current + (e.key === "ArrowUp" ? -1 : 1)));
      setInput(commandHistory[historyIndex.current] ?? draft.current);
    } else if (e.key === "Tab" && input.trim() && !input.includes(" ")) {
      const matches = commandNames.filter(name => name.startsWith(input.toLowerCase()));
      if (matches.length === 1) { e.preventDefault(); setInput(matches[0] + " "); }
    } else if (e.ctrlKey && e.key.toLowerCase() === "l") { e.preventDefault(); setHistory([]); }
  };

  return (
    <section className="py-20 border-b border-white/[0.05]" ref={ref}>
      <div className="max-w-4xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-4 mb-8"
        >
          <span className="text-blue text-xs font-mono tracking-[0.2em]">07</span>
          <FiTerminal size={20} className="text-blue" />
          <h3 className="font-display text-2xl font-bold text-white">Try My Terminal</h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="bg-[#060908] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Terminal Header */}
          <div className="bg-white/[0.03] px-4 py-3 flex items-center justify-between border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#b6ff2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <span className="text-slate-500 text-xs font-mono">malith@portfolio: ~</span>

          </div>

          <p className="px-6 pt-4 text-slate-400 text-xs">Browser portfolio terminal · Try help, ls, date or open github. No server shell access.</p>
          {/* Terminal Body */}
          <div
            ref={logRef}
            onClick={focusInput}
            className="p-4 sm:p-6 font-mono text-xs sm:text-sm h-96 overflow-y-auto break-words"
          >
            {history.map((line, i) => (
              <div key={i} className="mb-1">
                {line.type === "input" && (
                  <div className="flex items-start gap-2">
                    <span className="text-green">malith@portfolio:~$</span>
                    <span className="text-white">{line.text}</span>
                  </div>
                )}
                {line.type === "output" && (
                  <pre className="text-slate-300 whitespace-pre-wrap ml-0 mt-1 mb-3">{line.text}</pre>
                )}
                {line.type === "system" && (
                  <div className="text-slate-500">{line.text}</div>
                )}
                {line.type === "error" && (
                  <div className="text-red-400">{line.text}</div>
                )}
              </div>
            ))}

            {/* Input Line */}
            <form onSubmit={handleCommand} className="flex items-center gap-2">
              <span className="text-green">malith@portfolio:~$</span>
              <input
                aria-label="Terminal command"
                autoComplete="off"
                spellCheck={false}
                onKeyDown={handleKeyDown}
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-w-0 flex-1 bg-transparent text-white"
                placeholder="Type a command..."
              />
              <span className="w-2 h-4 bg-blue animate-pulse" />
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Terminal;
