import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiTerminal, FiX, FiMinimize2, FiMaximize2 } from "react-icons/fi";

const commands = {
  help: `Available commands:
  about     - About me
  skills    - Technical skills
  projects  - View projects
  contact   - Contact information
  resume    - Download resume
  social    - Social links
  clear     - Clear terminal
  whoami    - Who am I?`,

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
Website:  malithmadushan.vercel.app`,

  resume: `Downloading resume...
File: Malith_Madushan_Resume.pdf`,

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
    { type: "system", text: "Welcome to Malith's Terminal v1.0" },
    { type: "system", text: "Type 'help' to see available commands" },
    { type: "system", text: "" },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.toLowerCase().trim();
    const newHistory = [...history, { type: "input", text: input }];

    if (cmd === "clear") {
      setHistory([
        { type: "system", text: "Welcome to Malith's Terminal v1.0" },
        { type: "system", text: "" },
      ]);
    } else if (cmd === "resume") {
      newHistory.push({ type: "output", text: commands.resume });
      setHistory(newHistory);
      const link = document.createElement("a");
      link.href = "/Malith_Madushan_Resume.pdf";
      link.download = "Malith_Madushan_Resume.pdf";
      link.click();
    } else if (commands[cmd]) {
      newHistory.push({ type: "output", text: commands[cmd] });
      setHistory(newHistory);
    } else {
      newHistory.push({
        type: "error",
        text: `Command not found: ${cmd}. Type 'help' for available commands.`,
      });
      setHistory(newHistory);
    }

    setInput("");
  };

  return (
    <section className="py-20 border-b border-white/[0.05]" ref={ref}>
      <div className="max-w-4xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-4 mb-8"
        >
          <FiTerminal size={20} className="text-blue" />
          <h3 className="font-display text-2xl font-bold text-white">Try My Terminal</h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Terminal Header */}
          <div className="bg-white/[0.03] px-4 py-3 flex items-center justify-between border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28C840]" />
            </div>
            <span className="text-slate-500 text-xs font-mono">malith@portfolio: ~</span>
            <div className="flex items-center gap-2 text-slate-500">
              <FiMinimize2 size={12} />
              <FiMaximize2 size={12} />
              <FiX size={12} />
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 font-mono text-sm h-96 overflow-y-auto">
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
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent outline-none text-white"
                autoFocus
                placeholder="Type a command..."
              />
              <span className="w-2 h-4 bg-blue animate-pulse" />
            </form>

            <div ref={bottomRef} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Terminal;