"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

interface SkillCategory {
  name: string;
  skills: string[];
}

const Skills = () => {
  const { theme } = useTheme();
  const skillCategories: SkillCategory[] = [
    {
      name: "Frontend",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Redux"],
    },
    {
      name: "Backend",
      skills: ["Node.js", "Express", "Python", "FastAPI", "Django"],
    },
    {
      name: "Databases",
      skills: ["PostgreSQL", "MongoDB", "Firebase", "Redis", "MySQL", "DynamoDB"],
    },
    {
      name: "Tools & Platforms",
      skills: ["Git", "Docker", "AWS", "Vercel", "GitHub Actions", "VS Code"],
    },
    {
      name: "UI/UX & Design",
      skills: ["Figma", "Shadcn UI", "Material-UI", "Web Design", "Responsive Design", "Accessibility"],
    },
    {
      name: "Agentic Frameworks",
      skills: ["LangChain", "AutoGen", "CrewAI", "Hugging Face", "RAG Systems", "OpenAI API"],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
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

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  return (
    <section
      id="skills"
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
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})` }}>
              Technical Skills
            </span>
          </h2>
          <div className="h-1 w-20 rounded" style={{ backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})` }} />
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {skillCategories.map((category, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              {/* Category Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-4">
                  <span style={{ color: theme.primary }}>{category.name}</span>
                </h3>

                {/* Skills */}
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <motion.div
                      key={skill}
                      variants={skillVariants}
                      whileHover="hover"
                      className="cursor-pointer"
                    >
                      <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 transition-colors" style={{ borderColor: theme.primary }}>
                        <span className="text-slate-200 font-semibold text-sm">
                          {skill}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Proficiency Bars */}
        <motion.div variants={itemVariants} className="mt-16 pt-16 border-t border-slate-700">
          <h3 className="text-2xl font-bold mb-8 text-slate-200">Proficiency</h3>
          
          <div className="space-y-6">
            {[
              { name: "React & Next.js", percentage: 95 },
              { name: "TypeScript", percentage: 90 },
              { name: "Full Stack Development", percentage: 88 },
              { name: "UI/UX Design", percentage: 85 },
            ].map((skill) => (
              <motion.div key={skill.name} variants={itemVariants}>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-300 font-semibold">{skill.name}</span>
                  <span className="font-semibold" style={{ color: theme.primary }}>{skill.percentage}%</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="h-full rounded-full"
                    style={{ backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;