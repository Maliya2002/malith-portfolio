import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { sendContactMessage, contactErrorMessage, contactMailto } from "../utils/contactDelivery";
import { FiSend, FiMail, FiLinkedin, FiGithub, FiCheck, FiArrowUpRight, FiAlertCircle, FiLock } from "react-icons/fi";

const Contact = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const sendingRef = useRef(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [deliveryDetails, setDeliveryDetails] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sendingRef.current) return;
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrorMessage("Please enter your name, email and message."); setStatus("error"); return;
    }
    sendingRef.current = true;
    setErrorMessage("");
    setDeliveryDetails("");
    setStatus("sending");

    try {
      await sendContactMessage(form);

      setStatus("sent");
      setForm({ name: "", email: "", message: "" });

    } catch (error) {
      console.error("Contact delivery failed:", { status: error?.status, text: error?.text || error?.message });
      setErrorMessage(contactErrorMessage(error));
      setDeliveryDetails([error?.status, error?.text || error?.message].filter(Boolean).join(" — ").slice(0, 300));
      setStatus("error");
    } finally {
      sendingRef.current = false;
    }
  };

  const a = (d) => ({
    initial: { opacity: 0, y: 40 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, delay: d, ease: [0.23, 1, 0.32, 1] },
  });

  const socials = [
    { icon: <FiMail size={20} />, label: "Email", value: "malithmadushan25@gmail.com", href: "mailto:malithmadushan25@gmail.com", color: "#a6ff00" },
    { icon: <FiLinkedin size={20} />, label: "LinkedIn", value: "Malith Madushan", href: "https://www.linkedin.com/in/malith-madushan-a3a6b0263", color: "#c0f65c" },
    { icon: <FiGithub size={20} />, label: "GitHub", value: "maliya2002", href: "https://github.com/maliya2002", color: "#ec4899" },
  ];

  return (
    <section id="contact" className="py-40 section-alt" ref={ref}>
      <div className="max-w-7xl mx-auto px-8">
        <motion.div {...a(0)} className="flex items-center gap-4 mb-20">
          <span className="text-blue text-xs font-mono tracking-[0.2em]">06</span>
          <div className="h-[1px] flex-1 max-w-[60px] bg-white/10" />
          <span className="text-slate-500 text-xs font-mono tracking-[0.2em] uppercase">Contact</span>
        </motion.div>

        <motion.h2 {...a(0.1)} className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] mb-6 text-white">
          Let's work<br /><span className="text-blue">together</span>
        </motion.h2>

        <motion.p {...a(0.2)} className="text-slate-400 text-lg max-w-lg mb-20 leading-relaxed">
          Have an internship opportunity or project in mind? Send me a message directly!
        </motion.p>

        <div className="grid lg:grid-cols-5 gap-16">
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
                  style={{ background: `${s.color}10`, color: s.color }}>
                  {s.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-500 text-[10px] font-mono tracking-[0.2em] uppercase mb-1">{s.label}</p>
                  <p className="text-slate-200 text-sm font-semibold truncate group-hover:text-white transition-colors flex items-center gap-2">
                    {s.value}
                    <FiArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all flex-shrink-0" />
                  </p>
                </div>
              </motion.a>
            ))}

            <motion.div {...a(0.6)} className="grid grid-cols-2 gap-4 mt-8">
              <div className="filled-card rounded-xl p-5 text-center hover-trigger">
                <div className="font-display text-2xl font-bold text-white mb-1">24h</div>
                <div className="text-slate-500 text-[10px] font-mono tracking-wider">AVG REPLY</div>
              </div>
              <div className="filled-card rounded-xl p-5 text-center hover-trigger">
                <div className="flex justify-center text-blue mb-2">
                  <FiCheck size={20} />
                </div>
                <div className="text-slate-500 text-[10px] font-mono tracking-wider">AVAILABLE</div>
              </div>
            </motion.div>
          </div>

          <motion.div {...a(0.4)} className="lg:col-span-3">
            <div className="filled-card rounded-2xl p-8 md:p-10 corner-decoration">
              <h3 className="font-display text-xl font-bold text-white mb-2">Send a message</h3>
              <p className="text-slate-400 text-sm mb-8 flex items-center gap-2">
                <FiMail size={14} className="text-blue shrink-0" />
                Your message goes directly to my inbox
              </p>

              {status === "sent" && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} role="status" className="text-center py-6">
                  <div className="w-16 h-16 rounded-full border border-green/20 bg-green/5 flex items-center justify-center mx-auto mb-6">
                    <FiCheck size={28} className="text-green" />
                  </div>
                  <h4 className="font-display text-xl font-bold text-white mb-2">Message sent</h4>
                  <p className="text-slate-400 text-sm">Thanks! Your message was accepted by the email service.</p>
                  <button type="button" onClick={() => setStatus("idle")} className="mt-5 text-blue underline">Send another message</button>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} role="alert" className="text-center py-6">
                  <div className="w-16 h-16 rounded-full border border-red-500/20 bg-red-500/5 flex items-center justify-center mx-auto mb-6">
                    <FiAlertCircle size={28} className="text-red-400" />
                  </div>
                  <h4 className="font-display text-xl font-bold text-white mb-2">Couldn't send</h4>
                  <p className="text-slate-400 text-sm">{errorMessage}</p>
                  {deliveryDetails && <details className="mt-3 text-xs text-slate-400 break-words"><summary className="cursor-pointer">Delivery details</summary><p className="mt-2">{deliveryDetails}</p></details>}
                </motion.div>
              )}

              {(status !== "sent") && (
                <form onSubmit={handleSubmit} aria-busy={status === "sending"} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-name" className="text-slate-500 text-[10px] font-mono tracking-[0.2em] mb-3 block uppercase">Name</label>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your name"
                        readOnly={status === "sending"}
                      required
                        className="form-field hover-trigger"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="text-slate-500 text-[10px] font-mono tracking-[0.2em] mb-3 block uppercase">Email</label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="your@email.com"
                        readOnly={status === "sending"}
                        required
                        className="form-field hover-trigger"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="text-slate-500 text-[10px] font-mono tracking-[0.2em] mb-3 block uppercase">Message</label>
                    <textarea
                      id="contact-message"
                        name="message"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell me about your opportunity..."
                      required
                      className="form-field hover-trigger"
                      readOnly={status === "sending"}
                      rows={5}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="bg-blue hover:bg-white text-white hover:text-black w-full py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-3 transition-all duration-500 hover-trigger disabled:opacity-50"
                  >
                    {status === "sending" ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                  <a href={contactMailto(form)} className="flex items-center justify-center gap-2 text-sm text-blue underline py-3"><FiMail /> Open in my email app</a>
                  <p className="text-slate-600 text-[10px] font-mono text-center tracking-wider mt-4 flex items-center justify-center gap-1.5">
                    <FiLock size={11} />
                    Sent securely via EmailJS
                  </p>
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
