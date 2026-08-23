"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { projects } from "@/data/portfolio-data";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import ProjectCard from "./ui/ProjectCard";

const Projects = () => {
  const { theme } = useTheme();
  const featured = projects.slice(0, 3);

  return (
    <section id="projects" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading index="03" title="Featured Projects" />
          <Link
            href="/projects"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: theme.primary }}
          >
            View all projects
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((project, idx) => (
            <Reveal key={project.id} delay={idx * 0.08} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <motion.div className="mt-10 sm:hidden">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold"
            style={{ color: theme.primary }}
          >
            View all projects →
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
