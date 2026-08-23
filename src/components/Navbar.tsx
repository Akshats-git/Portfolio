"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

const navLinks = [
  { label: "About", href: "/#about", id: "about" },
  { label: "Skills", href: "/#skills", id: "skills" },
  { label: "Projects", href: "/projects", id: "projects" },
  { label: "Coding", href: "/coding", id: "coding" },
  { label: "Blog", href: "/blog", id: "blog" },
  { label: "Contact", href: "/#contact", id: "contact" },
];

const inPageIds = ["about", "skills", "contact"];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { theme } = useTheme();
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    inPageIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHome]);

  const isActive = (link: (typeof navLinks)[number]) =>
    inPageIds.includes(link.id)
      ? isHome && activeSection === link.id
      : pathname.startsWith(link.href);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 border-b border-white/10 backdrop-blur-md transition-colors ${
        isOpen ? "bg-[#08080a]" : "bg-[#08080a]/80"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold text-slate-50">
            Akshat
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: theme.primary }}
              aria-hidden="true"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-3.5 py-2 text-sm font-medium transition-colors"
                >
                  <span className={active ? "text-slate-50" : "text-slate-400 hover:text-slate-200"}>
                    {link.label}
                  </span>
                  {active && (
                    <motion.span
                      layoutId="nav-active-underline"
                      className="absolute left-3.5 right-3.5 -bottom-px h-[1.5px] rounded-full"
                      style={{ backgroundColor: theme.primary }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
            <a
              href="/resume.pdf"
              download
              className="ml-3 rounded-full px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-105"
              style={{ backgroundColor: theme.primary }}
            >
              Resume
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="md:hidden text-slate-300"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pb-5 pt-4 flex flex-col gap-1 border-t border-white/10">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`px-2 py-2.5 text-sm font-medium transition-colors ${
                      isActive(link) ? "text-slate-50" : "text-slate-400"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <a
                  href="/resume.pdf"
                  download
                  className="mt-2 text-center rounded-full px-4 py-2.5 text-sm font-semibold text-white"
                  style={{ backgroundColor: theme.primary }}
                >
                  Resume
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
