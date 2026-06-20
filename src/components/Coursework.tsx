"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const coursework = [
  {
    category: "Computer Science",
    courses: [
      "Data Structures & Algorithms",
      "Object Oriented Programming",
      "Database Management Systems",
      "Operating Systems",
      "Computer Networks",
      "Software Engineering",
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
      "Probability & Statistics",
      "Data Mining",
      "Statistical Learning",
      "Data Visualization",
    ],
  },
  {
    category: "Mathematics",
    courses: [
      "Linear Algebra",
      "Discrete Mathematics",
      "Calculus & Differential Equations",
      "Optimization Techniques",
    ],
  },
];

const Coursework = () => {
  const { theme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
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

  return (
    <section
      id="coursework"
      className="min-h-fit flex items-center py-20 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto w-full"
      >
        <motion.div variants={itemVariants} className="mb-14">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coursework.map((group, gi) => (
            <motion.div
              key={group.category}
              variants={itemVariants}
              className="rounded-xl border p-5"
              style={{
                backgroundColor: `${theme.primary}06`,
                borderColor: `${theme.primary}20`,
              }}
            >
              <h3
                className="text-base font-semibold uppercase tracking-wider mb-4"
                style={{ color: theme.primary }}
              >
                {group.category}
              </h3>
              <ul className="space-y-2.5">
                {group.courses.map((course, ci) => (
                  <motion.li
                    key={course}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: gi * 0.08 + ci * 0.05 }}
                    className="flex items-start gap-2.5 text-base text-slate-300"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                      }}
                    />
                    {course}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Coursework;
