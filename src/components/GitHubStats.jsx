import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiGithub, FiGitBranch, FiUsers, FiCode } from "react-icons/fi";

const GitHubStats = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [chartFailed, setChartFailed] = useState(false);
  const [stats, setStats] = useState({ repos: null, followers: null, following: null });

  useEffect(() => {
    fetch("https://api.github.com/users/maliya2002")
      .then((res) => { if (!res.ok) throw new Error("GitHub unavailable"); return res.json(); })
      .then((data) => {
        setStats((prev) => ({
          ...prev,
          repos: data.public_repos ?? null,
          followers: data.followers ?? null,
          following: data.following ?? null,
        }));
      })
      .catch(() => {});
  }, []);

  const items = [
    { icon: <FiCode />, label: "Repositories", value: stats.repos, suffix: "", color: "#a6ff00" },
    { icon: <FiUsers />, label: "Followers", value: stats.followers, suffix: "", color: "#c0f65c" },
    { icon: <FiGitBranch />, label: "Following", value: stats.following, suffix: "", color: "#ec4899" },
  ];

  return (
    <section className="py-20 border-b border-white/[0.05]" ref={ref}>
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-wrap gap-4 items-center justify-between mb-10"
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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
              <div className="font-display text-3xl font-bold text-white mb-1">
                {item.value ?? "—"}
                {item.suffix}
              </div>
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
          {/* Reserved height keeps the page from jumping when the chart loads. */}
          <div className="min-h-[132px] flex items-center justify-center">
            {chartFailed ? (
              <a
                href="https://github.com/maliya2002"
                target="_blank"
                rel="noreferrer"
                className="text-slate-500 hover:text-blue text-xs font-mono tracking-wider transition-colors hover-trigger"
              >
                Contribution chart unavailable — view it on GitHub →
              </a>
            ) : (
              <img
                src="https://ghchart.rshah.org/0066FF/maliya2002"
                alt="GitHub contribution chart for maliya2002"
                className="w-full rounded-lg"
                loading="lazy"
                onError={() => setChartFailed(true)}
              />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubStats;
