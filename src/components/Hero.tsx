"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const Hero = () => {
  const { theme } = useTheme();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto w-full"
      >
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
          {/* Greeting */}
          <motion.div variants={itemVariants} className="space-y-3">
            <p className="font-semibold text-lg" style={{ color: theme.primary }}>
              Hi, I&apos;m Akshat
            </p>
            <h1 className="text-5xl sm:text-7xl font-bold">
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.secondary}, ${theme.accent})` }}>
                Full-Stack Developer
              </span>
            </h1>
            <h2 className="text-3xl sm:text-5xl font-bold text-slate-300">
              & AI Enthusiast
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg text-slate-400 leading-relaxed max-w-2xl"
          >
            B.Tech DSAI student at IIT Bhilai. Love problem solving!
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 text-white font-semibold rounded-lg transition-shadow block text-center"
              style={{ backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})` }}
            >
              View My Work
            </motion.a>
            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 font-semibold rounded-lg transition-colors block text-center"
              style={{ borderColor: theme.secondary, color: theme.secondary }}
            >
              Download Resume
            </motion.a>
            <motion.a
              href="https://github.com/Akshats-git"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 sm:px-4 border-2 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              style={{ borderColor: theme.secondary, color: theme.secondary }}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              GitHub
            </motion.a>
          </motion.div>

          {/* Floating Code Snippet */}
          <motion.div
            variants={itemVariants}
            className="mt-16 hidden lg:block"
          >
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 backdrop-blur-sm max-w-md">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <pre className="text-sm text-slate-300 font-mono">
                <span className="text-pink-400">function</span>{" "}
                <span style={{ color: theme.secondary }}>welcome</span>
                <span className="text-slate-300">() {"{"}</span>
                <br />
                <span className="ml-4">
                  <span className="text-pink-400">if</span>
                  <span className="text-slate-300"> (</span>
                  <span style={{ color: theme.primary }}>you</span>
                  <span className="text-slate-300">.</span>
                  <span style={{ color: theme.primary }}>madeItHere</span>
                  <span className="text-slate-300">) {"{"}</span>
                </span>
                <br />
                <span className="ml-8">
                  <span className="text-pink-400">return</span>{" "}
                  <span className="text-green-400">{'"hire me"'}</span>
                  <span className="text-slate-300">;</span>
                </span>
                <br />
                <span className="ml-4">
                  <span className="text-slate-300">{"}"}</span>
                </span>
                <br />
                <span className="ml-4">
                  <span className="text-pink-400">return</span>{" "}
                  <span className="text-green-400">{'"scroll down"'}</span>
                  <span className="text-slate-300">;</span>
                </span>
                <br />
                <span className="text-slate-300">{"}"}</span>
              </pre>
            </div>
          </motion.div>
          </div>

          {/* Profile Photo Section */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="relative">
              {/* Animated background glow */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full opacity-75 blur-lg"
                style={{ backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.secondary}, ${theme.accent})` }}
              />
              
              {/* Circular photo container */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full p-1"
                style={{ backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})` }}
              >
                <div className="rounded-full bg-slate-900 w-full h-full" />
              </motion.div>

              {/* Profile photo */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="relative z-10 w-64 h-64 rounded-full overflow-hidden border-4 border-slate-950 shadow-2xl"
              >
                <Image
                  src="/profile.jpg"
                  alt="Akshat"
                  fill
                  priority
                  sizes="256px"
                  className="object-cover object-center"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          style={{ color: theme.primary }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;