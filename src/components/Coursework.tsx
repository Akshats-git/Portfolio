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
      "Information Security",
      "Data Analytics & Visualization",
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
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`,
              }}
            >
              Coursework
            </span>
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
