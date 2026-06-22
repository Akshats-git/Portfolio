"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

const Contact = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const contactCards = [
    {
      label: "Email",
      value: "akshatgupta1204@gmail.com",
      href: "mailto:akshatgupta1204@gmail.com",
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
    {
      label: "GitHub",
      value: "github.com/Akshats-git",
      href: "https://github.com/Akshats-git",
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="white">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/akshat-gupta-b3ab332a2",
      href: "https://www.linkedin.com/in/akshat-gupta-b3ab332a2/",
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="white">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ];

  const inputClass = (name: string) =>
    `w-full bg-slate-900/60 rounded-xl px-4 py-3.5 text-slate-100 placeholder-slate-600 outline-none transition-all duration-300 border`;

  const inputStyle = (name: string) => ({
    borderColor: focused === name ? theme.primary : "rgba(148,163,184,0.15)",
    boxShadow: focused === name ? `0 0 0 3px ${theme.primary}22` : "none",
  });

  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-center py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Ambient background blobs */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full blur-[120px] opacity-20"
        style={{ background: `radial-gradient(circle, ${theme.primary}, transparent 70%)` }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 w-[480px] h-[480px] rounded-full blur-[120px] opacity-15"
        style={{ background: `radial-gradient(circle, ${theme.secondary}, transparent 70%)` }}
      />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-[100px] opacity-10"
        style={{ background: `radial-gradient(circle, ${theme.accent}, transparent 70%)` }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="relative max-w-5xl mx-auto w-full"
      >
        {/* Section header */}
        <motion.div variants={itemVariants} className="mb-16 text-center">
          <p
            className="text-sm font-semibold tracking-[0.25em] uppercase mb-4"
            style={{ color: theme.primary }}
          >
            Contact
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-5">
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}
            >
              Get In Touch
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            Have a project in mind, or just want to say hello?
            <br className="hidden sm:block" /> My inbox is always open.
          </p>
          <div
            className="h-px w-32 mx-auto mt-8 opacity-60"
            style={{ background: `linear-gradient(to right, transparent, ${theme.primary}, ${theme.secondary}, transparent)` }}
          />
        </motion.div>

        {/* Contact cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
          {contactCards.map((card) => (
            <motion.a
              key={card.label}
              href={card.href}
              target={card.href.startsWith("http") ? "_blank" : undefined}
              rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex flex-col items-center gap-3 rounded-2xl p-7 text-center cursor-pointer overflow-hidden"
              style={{
                background: "rgba(15,23,42,0.7)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(148,163,184,0.12)",
              }}
            >
              {/* Card glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{ background: `radial-gradient(ellipse at top, ${theme.primary}18, transparent 70%)` }}
              />
              <div
                className="relative z-10 w-13 h-13 w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg"
                style={{ backgroundImage: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}
              >
                {card.icon}
              </div>
              <div className="relative z-10">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">
                  {card.label}
                </p>
                <p
                  className="text-sm font-medium break-all transition-colors duration-200"
                  style={{ color: theme.secondary }}
                >
                  {card.value}
                </p>
              </div>
              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 group-hover:w-2/3 transition-all duration-500 rounded-full"
                style={{ background: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})` }}
              />
            </motion.a>
          ))}
        </motion.div>

        {/* Contact form */}
        <motion.div
          variants={itemVariants}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: "rgba(15,23,42,0.75)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(148,163,184,0.1)",
            boxShadow: `0 0 80px ${theme.primary}12, 0 25px 50px rgba(0,0,0,0.4)`,
          }}
        >
          {/* Top gradient bar */}
          <div
            className="h-1 w-full"
            style={{ backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.secondary}, ${theme.accent})` }}
          />

          <form onSubmit={handleSubmit} className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  required
                  className={inputClass("name")}
                  style={inputStyle("name")}
                  placeholder="Your name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  required
                  className={inputClass("email")}
                  style={inputStyle("email")}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-5">
              <label htmlFor="subject" className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                onFocus={() => setFocused("subject")}
                onBlur={() => setFocused(null)}
                required
                className={inputClass("subject")}
                style={inputStyle("subject")}
                placeholder="Subject"
              />
            </div>

            <div className="flex flex-col gap-2 mb-8">
              <label htmlFor="message" className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                required
                rows={6}
                className={`${inputClass("message")} resize-none`}
                style={inputStyle("message")}
                placeholder="Your message..."
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={submitted}
              className="relative w-full py-4 font-semibold rounded-xl text-white overflow-hidden transition-all duration-300"
              style={
                submitted
                  ? { background: "#22c55e", boxShadow: "0 0 30px #22c55e44" }
                  : {
                      backgroundImage: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                      boxShadow: `0 4px 30px ${theme.primary}55`,
                    }
              }
            >
              {/* Shine sweep on hover */}
              {!submitted && (
                <span
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)" }}
                />
              )}
              {submitted ? (
                <span className="flex items-center justify-center gap-2">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Message Sent!
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Send Message
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              )}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
