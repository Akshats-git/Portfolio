"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const About = () => {
  const { theme } = useTheme();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
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

  const education = [
    { year: "2020", label: "10th Grade", school: "Douglas Memorial Higher Secondary School", detail: "ICSE Board — 97%" },
    { year: "2022", label: "12th Grade", school: "Douglas Memorial Higher Secondary School", detail: "ISC Board — 95.5%" },
    { year: "2026", label: "B.Tech DSAI", school: "Indian Institute of Technology Bhilai", detail: "CGPA 7.86" },
  ];

  const achievements = [
    { title: "Reliance Foundation Scholar", issuer: "Reliance Foundation" },
  ];

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
        className="max-w-6xl mx-auto w-full"
      >
        {/* Section Title */}
        <motion.div variants={itemVariants} className="mb-14">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})` }}
            >
              About Me
            </span>
          </h2>
          <div
            className="h-1 w-20 rounded"
            style={{ backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})` }}
          />
        </motion.div>

        {/* grid: bio spans 2 cols, education and achievements 1 each */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 items-start">

          {/* Col 1+2 — Bio */}
          <motion.div variants={itemVariants} className="space-y-5 lg:col-span-2">
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
          </motion.div>

          {/* Col 2 — Education Timeline */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-7" style={{ color: theme.primary }}>
              Education
            </h3>
            <div className="relative">
              <div
                className="absolute left-[7px] top-2 bottom-2 w-px"
                style={{
                  background: `linear-gradient(to bottom, ${theme.primary}, ${theme.secondary}, ${theme.accent})`,
                }}
              />
              <div className="space-y-8">
                {education.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                    className="flex gap-5 items-start"
                  >
                    <div className="relative z-10 mt-1 flex-shrink-0">
                      <motion.div
                        animate={{
                          boxShadow: [
                            `0 0 0 0 ${theme.primary}55`,
                            `0 0 0 6px ${theme.primary}00`,
                          ],
                        }}
                        transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.4 }}
                        className="w-3.5 h-3.5 rounded-full border-2"
                        style={{ backgroundColor: theme.primary, borderColor: theme.primary }}
                      />
                    </div>
                    <div>
                      <span className="text-xs font-mono" style={{ color: theme.secondary }}>
                        {item.year}
                      </span>
                      <p className="text-slate-200 font-semibold leading-tight">{item.label}</p>
                      <p className="text-slate-400 text-sm">{item.school}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{item.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Col 3 — Achievements */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-slate-200 mb-7">Achievements</h3>
            <div className="space-y-4">
              {achievements.map((ach) => (
                <div key={ach.title} className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center mt-0.5"
                    style={{
                      background: `linear-gradient(135deg, ${theme.primary}22, ${theme.secondary}22)`,
                      border: `1px solid ${theme.primary}44`,
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ color: theme.primary }}
                      aria-hidden="true"
                    >
                      <path d="M6 9H3V4h18v5h-3" />
                      <path d="M12 15c-3.314 0-6-2.686-6-6V4h12v5c0 3.314-2.686 6-6 6z" />
                      <path d="M12 15v4" />
                      <path d="M8 19h8" />
                    </svg>
                  </div>
                  <div>
                    <p
                      className="font-semibold text-sm bg-clip-text text-transparent"
                      style={{ backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})` }}
                    >
                      {ach.title}
                    </p>
                    <p className="text-slate-500 text-xs mt-0.5">{ach.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>


        </div>
      </motion.div>
    </section>
  );
};

export default About;
