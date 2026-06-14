"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const About = () => {
  const { theme } = useTheme();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section
      id="about"
      className="min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-4xl mx-auto w-full"
      >
        {/* Section Title */}
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})` }}>
              About Me
            </span>
          </h2>
          <div className="h-1 w-20 rounded" style={{ backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})` }} />
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left - Text */}
          <motion.div variants={itemVariants} className="space-y-6">
            <p className="text-lg text-slate-300 leading-relaxed">
              I&apos;m a passionate full-stack developer with a keen eye for design
              and a love for solving complex problems. With experience in
              building scalable web applications, I focus on creating elegant
              solutions that users love.
            </p>

            <p className="text-lg text-slate-300 leading-relaxed">
              My journey in tech began with a curiosity about how things work.
              Today, I transform ideas into reality using modern technologies
              and best practices. I&apos;m constantly learning and adapting to new
              challenges.
            </p>

            <div className="pt-4">
              <h3 className="text-xl font-semibold text-slate-200 mb-4">
                Core Competencies:
              </h3>
              <ul className="space-y-2 text-slate-400">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.primary }} />
                  Full-stack web development
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.primary }} />
                  React &amp; Next.js expertise
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.primary }} />
                  UI/UX design and implementation
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.primary }} />
                  Cloud deployment & DevOps
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Right - Cards */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-6"
          >
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 transition-colors" style={{ borderColor: theme.primary }}>
              <h3 className="text-lg font-semibold text-slate-200 mb-3" style={{ color: theme.primary }}>Education</h3>
              <p className="text-slate-300 font-medium mb-1">Bachelor of Science</p>
              <p className="text-slate-400 text-sm mb-3">Computer Science</p>
              <p className="text-slate-400 text-sm mb-1">University Name</p>
              <p className="text-slate-500 text-xs">Graduated: 2022</p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 transition-colors" style={{ borderColor: theme.primary }}>
              <h3 className="text-lg font-semibold text-slate-200 mb-3" style={{ color: theme.primary }}>Achievements</h3>
              <ul className="text-slate-400 text-sm space-y-2">
                <li className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: theme.primary, flexShrink: 0 }} aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Reliance Foundation Scholar
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;