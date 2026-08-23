"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

const contactCards = [
  {
    label: "Email",
    value: "akshatgupta1204@gmail.com",
    href: "mailto:akshatgupta1204@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: "Akshats-git",
    href: "https://github.com/Akshats-git",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "akshat-gupta",
    href: "https://www.linkedin.com/in/akshat-gupta-b3ab332a2/",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

const Contact = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed to send message.");
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const inputClass =
    "w-full bg-white/[0.03] rounded-xl px-4 py-3.5 text-slate-100 placeholder-slate-600 outline-none transition-all duration-200 border";

  const inputStyle = (name: string) => ({
    borderColor: focused === name ? theme.primary : "rgba(255,255,255,0.1)",
    boxShadow: focused === name ? `0 0 0 3px ${theme.primary}1f` : "none",
  });

  return (
    <section id="contact" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto w-full">
        <div className="mb-14 text-center">
          <SectionHeading
            index="06"
            title="Get In Touch"
            description="Have a project in mind, or just want to say hello? Feel free to reach out."
            align="center"
          />
        </div>

        {/* Contact cards */}
        <Reveal delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {contactCards.map((card) => (
              <motion.a
                key={card.label}
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                whileHover={{ y: -4 }}
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-white/20"
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10"
                  style={{ color: theme.primary }}
                >
                  {card.icon}
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500">
                    {card.label}
                  </p>
                  <p className="text-sm font-medium text-slate-200 truncate">{card.value}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </Reveal>

        {/* Contact form */}
        <Reveal delay={0.2}>
          <div className="relative rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden">
            <div
              className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-72 w-[36rem] rounded-full blur-[120px] opacity-[0.12]"
              style={{ background: theme.primary }}
            />

            <form onSubmit={handleSubmit} className="relative p-7 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-500">
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
                    className={inputClass}
                    style={inputStyle("name")}
                    placeholder="Your name"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-500">
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
                    className={inputClass}
                    style={inputStyle("email")}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 mb-5">
                <label htmlFor="subject" className="font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-500">
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
                  className={inputClass}
                  style={inputStyle("subject")}
                  placeholder="Subject"
                />
              </div>

              <div className="flex flex-col gap-2 mb-7">
                <label htmlFor="message" className="font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-500">
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
                  className={`${inputClass} resize-none`}
                  style={inputStyle("message")}
                  placeholder="Your message..."
                />
              </div>

              <motion.button
                whileHover={sending || submitted ? undefined : { y: -2 }}
                whileTap={sending || submitted ? undefined : { scale: 0.98 }}
                type="submit"
                disabled={sending || submitted}
                className="w-full py-3.5 font-semibold rounded-xl text-white transition-colors duration-300 disabled:cursor-not-allowed"
                style={
                  submitted
                    ? { backgroundColor: "#22c55e" }
                    : { backgroundColor: theme.primary, opacity: sending ? 0.7 : 1 }
                }
              >
                {submitted ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Message sent
                  </span>
                ) : sending ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Send message
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                )}
              </motion.button>

              {error && <p className="mt-4 text-sm text-red-400 text-center">{error}</p>}
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
