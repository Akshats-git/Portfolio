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

            {/* Achievements */}
            <div className="pt-2">
              <h3 className="text-xl font-semibold text-slate-200 mb-4">Achievements</h3>
              <div className="space-y-3">
                {[
                  { title: "Reliance Foundation Scholar", issuer: "Reliance Foundation" },
                ].map((ach) => (
                  <div key={ach.title} className="flex items-center gap-4">
                    {/* Trophy icon with glow */}
                    <div
                      className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, ${theme.primary}22, ${theme.secondary}22)`, border: `1px solid ${theme.primary}44` }}
                    >
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color: theme.primary }} aria-hidden="true">
                        <path d="M6 9H3V4h18v5h-3" />
                        <path d="M12 15c-3.314 0-6-2.686-6-6V4h12v5c0 3.314-2.686 6-6 6z" />
                        <path d="M12 15v4" />
                        <path d="M8 19h8" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-sm bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})` }}>
                        {ach.title}
                      </p>
                      <p className="text-slate-500 text-xs mt-0.5">{ach.issuer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - Cards */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-6"
          >
            <div>
              <h3 className="text-lg font-semibold mb-6" style={{ color: theme.primary }}>Education</h3>
              <div className="relative">
                {/* Vertical line */}
                <div
                  className="absolute left-[7px] top-2 bottom-2 w-px"
                  style={{ background: `linear-gradient(to bottom, ${theme.primary}, ${theme.secondary}, ${theme.accent})` }}
                />

                <div className="space-y-8">
                  {[
                    { year: "2019", label: "10th Grade", school: "School Name", detail: "State Board" },
                    { year: "2021", label: "12th Grade", school: "School Name", detail: "Science Stream" },
                    { year: "2025", label: "B.Tech", school: "University Name", detail: "Computer Science & Engineering" },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.15 }}
                      className="flex gap-5 items-start"
                    >
                      {/* Dot */}
                      <div className="relative z-10 mt-1 flex-shrink-0">
                        <motion.div
                          animate={{ boxShadow: [`0 0 0 0 ${theme.primary}55`, `0 0 0 6px ${theme.primary}00`] }}
                          transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.4 }}
                          className="w-3.5 h-3.5 rounded-full border-2"
                          style={{ backgroundColor: theme.primary, borderColor: theme.primary }}
                        />
                      </div>

                      {/* Content */}
                      <div>
                        <span className="text-xs font-mono" style={{ color: theme.secondary }}>{item.year}</span>
                        <p className="text-slate-200 font-semibold leading-tight">{item.label}</p>
                        <p className="text-slate-400 text-sm">{item.school}</p>
                        <p className="text-slate-500 text-xs mt-0.5">{item.detail}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;