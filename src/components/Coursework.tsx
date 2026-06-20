"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { useMemo } from "react";

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

function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49311;
  return x - Math.floor(x);
}

const Coursework = () => {
  const { theme } = useTheme();

  const allCourses = useMemo(() => {
    const flat: { course: string; categoryIndex: number; globalIndex: number }[] = [];
    let idx = 0;
    coursework.forEach((group, gi) => {
      group.courses.forEach((course) => {
        flat.push({ course, categoryIndex: gi, globalIndex: idx++ });
      });
    });
    // Shuffle deterministically
    const shuffled = [...flat];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(seededRandom(i + 42) * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  const getRotation = (idx: number) => {
    const r = seededRandom(idx * 7 + 13);
    return (r - 0.5) * 5; // -2.5 to 2.5 degrees
  };

  const getScale = (idx: number) => {
    const r = seededRandom(idx * 3 + 77);
    return 0.95 + r * 0.12; // 0.95 to 1.07
  };

  const categoryColors = [
    { border: theme.primary, bg: theme.primary },
    { border: theme.secondary, bg: theme.secondary },
    { border: theme.accent, bg: theme.accent },
    { border: theme.primary, bg: theme.secondary },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04 },
    },
  };

  const chipVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 200, damping: 15 },
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
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

        {/* Category legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-5 mb-10"
        >
          {coursework.map((group, gi) => (
            <div key={group.category} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{
                  background: `linear-gradient(135deg, ${categoryColors[gi].border}, ${categoryColors[gi].bg})`,
                }}
              />
              <span className="text-sm text-slate-400 font-medium">
                {group.category}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Scattered course cloud */}
        <motion.div
          variants={containerVariants}
          className="flex flex-wrap gap-3 items-center"
        >
          {allCourses.map(({ course, categoryIndex, globalIndex }, i) => {
            const color = categoryColors[categoryIndex];
            const rotation = getRotation(globalIndex);
            const scale = getScale(globalIndex);

            return (
              <motion.span
                key={course}
                variants={chipVariants}
                whileHover={{
                  scale: 1.12,
                  rotate: 0,
                  y: -4,
                  transition: { duration: 0.2 },
                }}
                className="cursor-default rounded-full px-5 py-2.5 font-medium text-slate-200 border backdrop-blur-sm transition-shadow duration-300 select-none"
                style={{
                  borderColor: `${color.border}35`,
                  backgroundColor: `${color.bg}10`,
                  rotate: `${rotation}deg`,
                  scale,
                  fontSize: `${0.85 + seededRandom(globalIndex * 11 + 3) * 0.2}rem`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = `${color.border}90`;
                  el.style.backgroundColor = `${color.bg}20`;
                  el.style.boxShadow = `0 0 25px ${color.border}25, 0 4px 20px ${color.bg}15`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = `${color.border}35`;
                  el.style.backgroundColor = `${color.bg}10`;
                  el.style.boxShadow = "none";
                }}
              >
                {course}
              </motion.span>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Coursework;
