import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiGithub, FiStar, FiGitBranch, FiUsers, FiCode } from "react-icons/fi";

const GitHubStats = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [stats, setStats] = useState({
    repos: 21,
    followers: 1,
    following: 2,
    stars: 1,
    contributions: 140,
  });

  useEffect(() => {
    fetch("https://api.github.com/users/maliya2002")
      .then((res) => res.json())
      .then((data) => {
        setStats((prev) => ({
          ...prev,
          repos: data.public_repos || 21,
          followers: data.followers || 1,
          following: data.following || 2,
        }));
      })
      .catch(() => {});
  }, []);

  const items = [
    { icon: <FiCode />, label: "Repositories", value: stats.repos, color: "#0066FF" },
    { icon: <FiUsers />, label: "Followers", value: stats.followers, color: "#8B5CF6" },
    { icon: <FiGitBranch />, label: "Contributions", value: stats.contributions, color: "#EC4899" },
    { icon: <FiStar />, label: "Achievements", value: 2, color: "#F59E0B" },
  ];

  return (
    <section className="py-20 border-b border-white/[0.05]" ref={ref}>
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center justify-between mb-10"
        >
          <div className="flex items-center gap-4">
            <FiGithub size={20} className="text-blue" />
            <h3 className="font-display text-2xl font-bold text-white">GitHub Activity</h3>
          </div>
          <a
            href="https://github.com/maliya2002"
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-blue text-sm font-mono transition-colors hover-trigger"
          >
            @maliya2002 →
          </a>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="filled-card rounded-2xl p-6 hover-trigger"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${item.color}15`, color: item.color }}
              >
                {item.icon}
              </div>
              <div className="font-display text-3xl font-bold text-white mb-1">{item.value}+</div>
              <div className="text-slate-500 text-xs font-mono tracking-wider uppercase">{item.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Contribution Graph */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-6 filled-card rounded-2xl p-6"
        >
          <img
            src="https://ghchart.rshah.org/0066FF/maliya2002"
            alt="GitHub Contributions"
            className="w-full rounded-lg"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubStats;