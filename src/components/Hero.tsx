"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import Reveal from "./ui/Reveal";

const Hero = () => {
  const { theme } = useTheme();

  return (
    <section
      id="home"
      className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 pt-24 pb-12"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center">
          {/* Left — Text content */}
          <div className="space-y-7 order-2 lg:order-1">
            <Reveal>
              <p
                className="font-mono text-sm uppercase tracking-[0.2em]"
                style={{ color: theme.primary }}
              >
                Full-Stack Developer &amp; AI Enthusiast
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-slate-50">
                Akshat
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
                B.Tech DSAI student at IIT Bhilai — I build scalable backend
                systems, explore the latest in AI, and love solving hard
                problems.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="flex flex-wrap gap-4 pt-2">
                <motion.a
                  href="#projects"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-7 py-3 text-white font-semibold rounded-full transition-shadow"
                  style={{ backgroundColor: theme.primary }}
                >
                  View my work
                </motion.a>
                <motion.a
                  href="/resume.pdf"
                  download
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-7 py-3 border border-white/15 font-semibold rounded-full text-slate-200 hover:border-white/30 transition-colors"
                >
                  Resume
                </motion.a>
                <motion.a
                  href="https://github.com/Akshats-git"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-4 py-3 border border-white/15 font-semibold rounded-full text-slate-200 hover:border-white/30 transition-colors flex items-center justify-center"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                </motion.a>
              </div>
            </Reveal>

            {/* Terminal snippet */}
            <Reveal delay={0.32} className="hidden lg:block pt-4">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 max-w-md">
                <div className="flex gap-1.5 mb-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                </div>
                <pre className="text-sm font-mono leading-relaxed">
                  <span className="text-slate-500">function</span>{" "}
                  <span style={{ color: theme.primary }}>welcome</span>
                  <span className="text-slate-400">() {"{"}</span>
                  <br />
                  <span className="ml-4">
                    <span className="text-slate-500">if</span>
                    <span className="text-slate-400"> (</span>
                    <span className="text-slate-300">you</span>
                    <span className="text-slate-400">.</span>
                    <span className="text-slate-300">madeItHere</span>
                    <span className="text-slate-400">) {"{"}</span>
                  </span>
                  <br />
                  <span className="ml-8">
                    <span className="text-slate-500">return</span>{" "}
                    <span style={{ color: theme.primary }}>{'"hire me"'}</span>
                    <span className="text-slate-400">;</span>
                  </span>
                  <br />
                  <span className="ml-4 text-slate-400">{"}"}</span>
                  <br />
                  <span className="ml-4">
                    <span className="text-slate-500">return</span>{" "}
                    <span style={{ color: theme.primary }}>{'"scroll down"'}</span>
                    <span className="text-slate-400">;</span>
                  </span>
                  <br />
                  <span className="text-slate-400">{"}"}</span>
                </pre>
              </div>
            </Reveal>
          </div>

          {/* Right — Profile photo */}
          <Reveal delay={0.1} className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-3 rounded-full border border-dashed"
                style={{ borderColor: `${theme.primary}55` }}
              />
              <div
                className="relative z-10 w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden border border-white/10 shadow-2xl"
              >
                <Image
                  src="/profile.jpg"
                  alt="Akshat"
                  fill
                  priority
                  sizes="256px"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 hover:text-slate-300 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.a>
    </section>
  );
};

export default Hero;
