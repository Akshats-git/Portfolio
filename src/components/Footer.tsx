"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { id: "twitter", icon: "𝕏", label: "Twitter", href: "https://twitter.com" },
    { id: "linkedin", icon: "💼", label: "LinkedIn", href: "https://linkedin.com" },
    { id: "github", icon: "🐙", label: "GitHub", href: "https://github.com" },
    { id: "email", icon: "📧", label: "Email", href: "mailto:contact@example.com" },
  ];

  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
        >
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              Akshat
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              A passionate full-stack developer crafting modern web experiences
              with clean code and beautiful design.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-slate-200 font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-blue-400 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-slate-200 font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.id}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-blue-400 hover:text-cyan-400 transition-colors"
                  title={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-slate-800 my-8" />

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm"
        >
          <p>
            © {currentYear} Akshat. All rights reserved.
          </p>
          <p>
            Built with{" "}
            <span className="text-red-400">♥</span>
            {" "}using Next.js, Tailwind CSS, Shadcn UI & Framer Motion
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;