"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  const navItems = [
    { label: "Home", href: "/#home" },
    { label: "About", href: "/#about" },
    { label: "Coursework", href: "/#coursework" },
    { label: "Skills", href: "/#skills" },
    { label: "Projects", href: "/#projects" },
    { label: "DSA & CP", href: "/#dsa" },
    { label: "Blogs", href: "/#blogs" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md z-50 border-b border-slate-800"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xl font-bold bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`,
            }}
          >
            Akshat
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            {navItems.map((item, idx) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                className="text-slate-300 transition-colors"
                whileHover={{ color: theme.primary }}
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-300"
            whileHover={{ color: theme.primary }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4 flex flex-col gap-3"
          >
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="text-slate-300 transition-colors"
                whileHover={{ color: theme.primary }}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;