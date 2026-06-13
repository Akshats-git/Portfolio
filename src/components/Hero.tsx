"use client";

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
              Welcome to my portfolio
            </p>
            <h1 className="text-5xl sm:text-7xl font-bold">
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.secondary}, ${theme.accent})` }}>
                Creative Developer
              </span>
            </h1>
            <h2 className="text-3xl sm:text-5xl font-bold text-slate-300">
              & Digital Creator
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg text-slate-400 leading-relaxed max-w-2xl"
          >
            I craft modern, responsive web applications with cutting-edge
            technologies. Specializing in Next.js, React, and full-stack
            development with a passion for clean code and intuitive design.
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
                <span className="text-pink-400">const</span>{" "}
                <span style={{ color: theme.secondary }}>developer</span> = {"{"}
                <br />
                <span className="ml-4">
                  <span className="text-slate-500">{`// Building amazing experiences`}</span>
                </span>
                <br />
                <span className="ml-4">
                  <span style={{ color: theme.primary }}>skills</span>:
                  <span className="text-green-400">
                    {`["React", "Next.js", "TypeScript"]`}
                  </span>
                </span>
                <br />
                {"}"}
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

              {/* Photo placeholder */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="relative z-10 w-64 h-64 rounded-full overflow-hidden border-4 border-slate-950 shadow-2xl"
              >
                <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500" aria-hidden="true">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                </div>
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