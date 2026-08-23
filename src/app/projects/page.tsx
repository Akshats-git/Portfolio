"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { projects } from "@/data/portfolio-data";
import Footer from "@/components/Footer";
import PageHeader from "@/components/ui/PageHeader";
import ProjectCard from "@/components/ui/ProjectCard";
import { gridColsForCount } from "@/components/ui/grid";

const projectFilters = ["All", "Data Analysis", "Agentic AI", "ML", "Full Stack"] as const;

type ProjectFilter = (typeof projectFilters)[number];

export default function ProjectsPage() {
  const { theme } = useTheme();
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("All");

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.domains.includes(activeFilter));

  return (
    <main>
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <PageHeader
          title="Projects"
          description="Everything I've built — full-stack applications, ML systems, agentic AI tools, and data analysis work."
        />

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 flex flex-wrap gap-2"
        >
          {projectFilters.map((filter) => {
            const isActive = filter === activeFilter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`relative rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? "border-transparent text-white"
                    : "border-white/10 bg-white/[0.03] text-slate-400 hover:text-slate-200 hover:border-white/20"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="project-filter-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: theme.primary }}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{filter}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Grid */}
        <motion.div
          key={activeFilter}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
          }}
          className={`grid gap-6 ${gridColsForCount(filteredProjects.length)}`}
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="h-full"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="rounded-2xl border border-white/10 p-10 text-center text-slate-400">
            No projects in this category yet.
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
