"use client";

import { motion } from "framer-motion";

const About = () => {
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
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-cyan-400 rounded" />
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
                  <span className="w-2 h-2 bg-blue-400 rounded-full" />
                  Full-stack web development
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-blue-400 rounded-full" />
                  React &amp; Next.js expertise
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-blue-400 rounded-full" />
                  UI/UX design and implementation
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-blue-400 rounded-full" />
                  Cloud deployment & DevOps
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Right - Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-6"
          >
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2"
              >
                50+
              </motion.div>
              <p className="text-slate-400">Projects Completed</p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent mb-2"
              >
                5+
              </motion.div>
              <p className="text-slate-400">Years Experience</p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent mb-2"
              >
                100%
              </motion.div>
              <p className="text-slate-400">Client Satisfaction</p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2"
              >
                20+
              </motion.div>
              <p className="text-slate-400">Technologies</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;