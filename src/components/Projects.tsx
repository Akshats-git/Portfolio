"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  domains: Array<"Agentic AI" | "ML" | "Full Stack">;
  githubUrl: string;
  image: string;
  color: string;
}

const projectFilters = ["All", "Agentic AI", "ML", "Full Stack"] as const;

type ProjectFilter = (typeof projectFilters)[number];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("All");

  const projects: Project[] = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "A full-featured e-commerce platform built with Next.js and Stripe integration for seamless payment processing.",
      tags: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS"],
      domains: ["Full Stack"],
      githubUrl: "https://github.com",
      image: "🛍️",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      title: "Task Management App",
      description:
        "Real-time collaborative task management application with drag-and-drop functionality and team collaboration features.",
      tags: ["React", "Firebase", "Framer Motion", "Tailwind CSS"],
      domains: ["Full Stack"],
      githubUrl: "https://github.com",
      image: "✓",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      title: "Analytics Dashboard",
      description:
        "Interactive dashboard displaying real-time analytics with charts, graphs, and data visualization components.",
      tags: ["Next.js", "Chart.js", "TypeScript", "PostgreSQL"],
      domains: ["ML", "Full Stack"],
      githubUrl: "https://github.com",
      image: "📊",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: 4,
      title: "Social Media App",
      description:
        "Full-stack social media application with user authentication, posts, comments, and real-time notifications.",
      tags: ["React", "Node.js", "MongoDB", "Socket.io"],
      domains: ["Full Stack"],
      githubUrl: "https://github.com",
      image: "👥",
      color: "from-orange-500 to-red-500",
    },
    {
      id: 5,
      title: "AI Chat Assistant",
      description:
        "Intelligent chat application powered by AI with natural language processing and context-aware responses.",
      tags: ["Next.js", "OpenAI API", "TypeScript", "Tailwind CSS"],
      domains: ["Agentic AI", "Full Stack"],
      githubUrl: "https://github.com",
      image: "🤖",
      color: "from-teal-500 to-cyan-500",
    },
    {
      id: 6,
      title: "Portfolio Generator",
      description:
        "Automated portfolio generator that creates beautiful portfolios from user data with customizable templates.",
      tags: ["React", "Node.js", "Express", "PostgreSQL"],
      domains: ["Full Stack"],
      githubUrl: "https://github.com",
      image: "🎨",
      color: "from-indigo-500 to-purple-500",
    },
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.domains.includes(activeFilter));

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

  return (
    <section
      id="projects"
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
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-cyan-400 rounded" />
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          variants={itemVariants}
          className="mb-10 flex flex-wrap gap-3 rounded-2xl border border-slate-700/80 bg-slate-900/40 p-3 backdrop-blur-sm"
        >
          {projectFilters.map((filter) => {
            const isActive = filter === activeFilter;

            return (
              <motion.button
                key={filter}
                type="button"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25"
                    : "border border-slate-700 bg-slate-900/70 text-slate-300 hover:border-blue-400 hover:text-blue-300"
                }`}
              >
                {filter}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative cursor-pointer"
            >
              <div
                className="absolute inset-0 rounded-lg blur opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(135deg, ${project.color})`,
                }}
              />
              <div className="relative bg-slate-800/90 border border-slate-700 rounded-lg p-6 h-full hover:border-blue-400 transition-colors">
                {/* Icon */}
                <div className="text-5xl mb-4">{project.image}</div>

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all">
                  {project.title}
                </h3>

                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-slate-700/50 text-blue-300 px-3 py-1 rounded-full border border-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-3">
                  {/* Link */}
                  <motion.a
                    href="#"
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-cyan-400 transition-colors text-sm font-semibold"
                  >
                    View Project →
                  </motion.a>

                  {/* GitHub */}
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-600 px-3 py-2 text-xs font-semibold text-slate-200 transition-colors hover:border-blue-400 hover:text-blue-300"
                    aria-label={`Open ${project.title} GitHub repository`}
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 .5C5.649.5.5 5.78.5 12.311c0 5.22 3.438 9.647 8.207 11.21.6.113.82-.27.82-.6 0-.296-.01-1.08-.015-2.12-3.338.744-4.042-1.66-4.042-1.66-.546-1.425-1.333-1.804-1.333-1.804-1.09-.768.083-.752.083-.752 1.205.087 1.84 1.274 1.84 1.274 1.07 1.888 2.807 1.343 3.492 1.028.107-.794.42-1.343.764-1.652-2.665-.31-5.467-1.372-5.467-6.105 0-1.35.465-2.454 1.23-3.319-.124-.31-.533-1.557.118-3.247 0 0 1.003-.328 3.29 1.267a11.14 11.14 0 0 1 3-.416c1.018.005 2.044.141 3 .416 2.285-1.595 3.285-1.267 3.285-1.267.653 1.69.244 2.937.12 3.247.766.865 1.228 1.969 1.228 3.319 0 4.744-2.807 5.791-5.48 6.096.43.378.815 1.12.815 2.257 0 1.63-.015 2.942-.015 3.34 0 .332.217.719.825.597C20.065 21.952 23.5 17.526 23.5 12.311 23.5 5.78 18.35.5 12 .5Z" />
                    </svg>
                    GitHub
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Projects;