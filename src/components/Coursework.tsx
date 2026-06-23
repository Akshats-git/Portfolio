"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const coursework = [
  {
    category: "Computer Science",
    courses: [
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Operating Systems",
      "Computer Networks",
      "Information Security",
      "Formal Verification",
      "Computer Organization & Architecture",
    ],
  },
  {
    category: "AI & Machine Learning",
    courses: [
      "Machine Learning",
      "Deep Learning",
      "Natural Language Processing",
      "Computer Vision",
      "Artificial Intelligence",
    ],
  },
  {
    category: "Data Science",
    courses: [
      "Mathematical Foundations for Data Science",
      "Data Analytics & Visualization",
      "Big Data Analytics",
    ],
  },
  {
    category: "Mathematics",
    courses: [
      "Linear Algebra",
      "Discrete Mathematics",
      "Calculus & Differential Equations",
      "Real Analysis",
      "Probability & Statistics",
    ],
  },
];

const Coursework = () => {
  const { theme } = useTheme();

  const categoryColors = [
    theme.primary,
    theme.secondary,
    theme.accent,
    theme.primary,
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const chipVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section
      id="coursework"
      className="min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto w-full"
      >
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 flex items-center gap-4">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`,
              }}
            >
              Coursework
            </span>
            <a
              href="https://github.com/Akshats-git/College-Courses"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center text-slate-400 hover:text-slate-200 transition-colors"
              aria-label="Coursework GitHub repository"
            >
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .5C5.649.5.5 5.78.5 12.311c0 5.22 3.438 9.647 8.207 11.21.6.113.82-.27.82-.6 0-.296-.01-1.08-.015-2.12-3.338.744-4.042-1.66-4.042-1.66-.546-1.425-1.333-1.804-1.333-1.804-1.09-.768.083-.752.083-.752 1.205.087 1.84 1.274 1.84 1.274 1.07 1.888 2.807 1.343 3.492 1.028.107-.794.42-1.343.764-1.652-2.665-.31-5.467-1.372-5.467-6.105 0-1.35.465-2.454 1.23-3.319-.124-.31-.533-1.557.118-3.247 0 0 1.003-.328 3.29 1.267a11.14 11.14 0 0 1 3-.416c1.018.005 2.044.141 3 .416 2.285-1.595 3.285-1.267 3.285-1.267.653 1.69.244 2.937.12 3.247.766.865 1.228 1.969 1.228 3.319 0 4.744-2.807 5.791-5.48 6.096.43.378.815 1.12.815 2.257 0 1.63-.015 2.942-.015 3.34 0 .332.217.719.825.597C20.065 21.952 23.5 17.526 23.5 12.311 23.5 5.78 18.35.5 12 .5Z" />
              </svg>
            </a>
          </h2>
          <div
            className="h-1 w-20 rounded"
            style={{
              backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`,
            }}
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {coursework.map((group, gi) => (
            <motion.div key={group.category} variants={itemVariants}>
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-4">
                  <span style={{ color: categoryColors[gi] }}>
                    {group.category}
                  </span>
                </h3>

                <div className="flex flex-wrap gap-3">
                  {group.courses.map((course) => (
                    <motion.div
                      key={course}
                      variants={chipVariants}
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.2 },
                      }}
                      className="cursor-default"
                    >
                      <div
                        className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-200 border transition-all duration-300"
                        style={{
                          borderColor: categoryColors[gi],
                          backgroundColor: `${categoryColors[gi]}15`,
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget;
                          el.style.backgroundColor = `${categoryColors[gi]}30`;
                          el.style.boxShadow = `0 0 20px ${categoryColors[gi]}25`;
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget;
                          el.style.backgroundColor = `${categoryColors[gi]}15`;
                          el.style.boxShadow = "none";
                        }}
                      >
                        {course}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Coursework;
