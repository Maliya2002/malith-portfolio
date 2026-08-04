import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiSend, FiMail, FiLinkedin, FiGithub, FiCheck, FiArrowUpRight } from "react-icons/fi";

const Contact = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    const subject = `Portfolio Message from ${form.name}`;
    const body = `Name: ${form.name}%0AEmail: ${form.email}%0A%0A${form.message}`;
    window.open(`mailto:malithmadushan25@gmail.com?subject=${subject}&body=${body}`);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    }, 800);
  };

  const a = (d) => ({
    initial: { opacity: 0, y: 40 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, delay: d, ease: [0.23, 1, 0.32, 1] },
  });

  const socials = [
    { icon: <FiMail size={20} />, label: "Email", value: "malithmadushan25@gmail.com", href: "mailto:malithmadushan25@gmail.com", color: "#0066FF" },
    { icon: <FiLinkedin size={20} />, label: "LinkedIn", value: "Malith Madushan", href: "https://www.linkedin.com/in/malith-madushan-a3a6b0263", color: "#8B5CF6" },
    { icon: <FiGithub size={20} />, label: "GitHub", value: "maliya2002", href: "https://github.com/maliya2002", color: "#EC4899" },
  ];

  return (
    <section id="contact" className="py-40 section-alt" ref={ref}>
      <div className="max-w-7xl mx-auto px-8">
        {/* Label */}
        <motion.div {...a(0)} className="flex items-center gap-4 mb-20">
          <span className="text-blue text-xs font-mono tracking-[0.2em]">05</span>
          <div className="h-[1px] flex-1 max-w-[60px] bg-white/10" />
          <span className="text-white/20 text-xs font-mono tracking-[0.2em] uppercase">Contact</span>
        </motion.div>

        <motion.h2 {...a(0.1)} className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] mb-6">
          Let's work<br /><span className="text-blue">together</span>
        </motion.h2>

        <motion.p {...a(0.2)} className="text-white/20 text-lg max-w-lg mb-20 leading-relaxed">
          Have an internship opportunity or project in mind? I'd love to hear from you.
        </motion.p>

        <div className="grid lg:grid-cols-5 gap-16">
          {/* Social Cards */}
          <div className="lg:col-span-2 space-y-4">
            {socials.map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                {...a(0.3 + i * 0.1)}
                className="filled-card rounded-2xl p-6 flex items-center gap-5 group hover-trigger"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                  style={{ background: `${s.color}08`, color: s.color }}>
                  {s.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/15 text-[10px] font-mono tracking-[0.2em] uppercase mb-1">{s.label}</p>
                  <p className="text-white/60 text-sm font-medium truncate group-hover:text-white transition-colors flex items-center gap-2">
                    {s.value}
                    <FiArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all flex-shrink-0" />
                  </p>
                </div>
              </motion.a>
            ))}

            {/* Mini Stats */}
            <motion.div {...a(0.6)} className="grid grid-cols-2 gap-4 mt-8">
              <div className="filled-card rounded-xl p-5 text-center hover-trigger">
                <div className="font-display text-2xl font-bold text-white/80 mb-1">24h</div>
                <div className="text-white/15 text-[10px] font-mono tracking-wider">AVG REPLY</div>
              </div>
              <div className="filled-card rounded-xl p-5 text-center hover-trigger">
                <div className="font-display text-2xl font-bold text-blue mb-1">✓</div>
                <div className="text-white/15 text-[10px] font-mono tracking-wider">AVAILABLE</div>
              </div>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div {...a(0.4)} className="lg:col-span-3">
            <div className="filled-card rounded-2xl p-8 md:p-10 corner-decoration">
              <h3 className="font-display text-xl font-bold text-white/80 mb-2">Send a message</h3>
              <p className="text-white/15 text-sm mb-8">I'll get back to you within 24 hours.</p>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-16 h-16 rounded-full border border-green/20 bg-green/5 flex items-center justify-center mx-auto mb-6">
                    <FiCheck size={28} className="text-green" />
                  </div>
                  <h4 className="font-display text-xl font-bold text-white mb-2">Sent!</h4>
                  <p className="text-white/20 text-sm">Thanks for reaching out.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-white/15 text-[10px] font-mono tracking-[0.2em] mb-3 block uppercase">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your name"
                        required
                        className="form-field hover-trigger"
                      />
                    </div>
                    <div>
                      <label className="text-white/15 text-[10px] font-mono tracking-[0.2em] mb-3 block uppercase">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="your@email.com"
                        required
                        className="form-field hover-trigger"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-white/15 text-[10px] font-mono tracking-[0.2em] mb-3 block uppercase">Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell me about your opportunity..."
                      required
                      className="form-field hover-trigger"
                      rows={5}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="bg-blue hover:bg-white text-white hover:text-black w-full py-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-3 transition-all duration-500 hover-trigger disabled:opacity-50"
                  >
                    {sending ? (
                      <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                    ) : (
                      <><FiSend size={16} /> Send Message</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;