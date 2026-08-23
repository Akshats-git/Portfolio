"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { skillCategories } from "@/data/portfolio-data";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import Tag from "./ui/Tag";

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
    courses: ["Machine Learning", "Deep Learning", "Natural Language Processing", "Computer Vision", "Artificial Intelligence"],
  },
  {
    category: "Data Science",
    courses: ["Mathematical Foundations for Data Science", "Data Analytics & Visualization", "Big Data Analytics"],
  },
  {
    category: "Mathematics",
    courses: ["Linear Algebra", "Discrete Mathematics", "Calculus & Differential Equations", "Real Analysis", "Probability & Statistics"],
  },
];

type Tab = "skills" | "coursework";

const Skills = () => {
  const { theme } = useTheme();
  const [tab, setTab] = useState<Tab>("skills");

  return (
    <section id="skills" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading index="02" title="Skills & Coursework" />

          <div className="flex gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1">
            {(
              [
                ["skills", "Technical Skills"],
                ["coursework", "Coursework"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className="relative rounded-full px-4 py-2 text-sm font-semibold transition-colors"
                style={{ color: tab === key ? "#fff" : "#94a3b8" }}
              >
                {tab === key && (
                  <motion.span
                    layoutId="skills-tab-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: theme.primary }}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {tab === "skills" ? (
          <motion.div
            key="skills"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8"
          >
            {skillCategories.map((category, idx) => (
              <Reveal key={category.name} delay={idx * 0.05}>
                <h3 className="text-sm font-mono uppercase tracking-wider text-slate-500 mb-4">
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill) => (
                    <Tag key={skill}>{skill}</Tag>
                  ))}
                </div>
              </Reveal>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="coursework"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8"
          >
            {coursework.map((group, idx) => (
              <Reveal key={group.category} delay={idx * 0.05}>
                <h3 className="text-sm font-mono uppercase tracking-wider text-slate-500 mb-4">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {group.courses.map((course) => (
                    <Tag key={course}>{course}</Tag>
                  ))}
                </div>
              </Reveal>
            ))}

            <a
              href="https://github.com/Akshats-git/College-Courses"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors md:col-span-2"
              style={{ color: theme.primary }}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .5C5.649.5.5 5.78.5 12.311c0 5.22 3.438 9.647 8.207 11.21.6.113.82-.27.82-.6 0-.296-.01-1.08-.015-2.12-3.338.744-4.042-1.66-4.042-1.66-.546-1.425-1.333-1.804-1.333-1.804-1.09-.768.083-.752.083-.752 1.205.087 1.84 1.274 1.84 1.274 1.07 1.888 2.807 1.343 3.492 1.028.107-.794.42-1.343.764-1.652-2.665-.31-5.467-1.372-5.467-6.105 0-1.35.465-2.454 1.23-3.319-.124-.31-.533-1.557.118-3.247 0 0 1.003-.328 3.29 1.267a11.14 11.14 0 0 1 3-.416c1.018.005 2.044.141 3 .416 2.285-1.595 3.285-1.267 3.285-1.267.653 1.69.244 2.937.12 3.247.766.865 1.228 1.969 1.228 3.319 0 4.744-2.807 5.791-5.48 6.096.43.378.815 1.12.815 2.257 0 1.63-.015 2.942-.015 3.34 0 .332.217.719.825.597C20.065 21.952 23.5 17.526 23.5 12.311 23.5 5.78 18.35.5 12 .5Z" />
              </svg>
              View syllabus repository
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Skills;
