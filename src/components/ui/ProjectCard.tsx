"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import type { Project, ProjectDomain } from "@/data/portfolio-data";
import Tag from "./Tag";

const domainIcon: Record<string, ReactNode> = {
  ML: (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" /><path d="M12 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
      <path d="M4.93 4.93a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" /><path d="M19.07 15.07a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
      <path d="M2 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0z" /><path d="M18 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0z" />
      <path d="M4.93 15.07a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" /><path d="M19.07 4.93a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
      <path d="m12 6 0 2M12 16l0 2M6 12l2 0M16 12l2 0" />
    </svg>
  ),
  "Data Analysis": (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 3v18h18" /><path d="M7 16l4-4 4 4 4-6" />
    </svg>
  ),
  "Full Stack": (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /><line x1="19" y1="12" x2="5" y2="12" />
    </svg>
  ),
  "Agentic AI": (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" />
      <path d="M12 7v4M8 15h.01M12 15h.01M16 15h.01" />
    </svg>
  ),
};

const fallbackIcon = (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 9h6M9 12h6M9 15h4" />
  </svg>
);

function ProjectIcon({ domains }: { domains: ProjectDomain[] }) {
  const icon = domains.map((d) => domainIcon[d]).find(Boolean) ?? fallbackIcon;
  return <>{icon}</>;
}

const GitHubIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .5C5.649.5.5 5.78.5 12.311c0 5.22 3.438 9.647 8.207 11.21.6.113.82-.27.82-.6 0-.296-.01-1.08-.015-2.12-3.338.744-4.042-1.66-4.042-1.66-.546-1.425-1.333-1.804-1.333-1.804-1.09-.768.083-.752.083-.752 1.205.087 1.84 1.274 1.84 1.274 1.07 1.888 2.807 1.343 3.492 1.028.107-.794.42-1.343.764-1.652-2.665-.31-5.467-1.372-5.467-6.105 0-1.35.465-2.454 1.23-3.319-.124-.31-.533-1.557.118-3.247 0 0 1.003-.328 3.29 1.267a11.14 11.14 0 0 1 3-.416c1.018.005 2.044.141 3 .416 2.285-1.595 3.285-1.267 3.285-1.267.653 1.69.244 2.937.12 3.247.766.865 1.228 1.969 1.228 3.319 0 4.744-2.807 5.791-5.48 6.096.43.378.815 1.12.815 2.257 0 1.63-.015 2.942-.015 3.34 0 .332.217.719.825.597C20.065 21.952 23.5 17.526 23.5 12.311 23.5 5.78 18.35.5 12 .5Z" />
  </svg>
);

const LiveIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const ProjectCard = ({ project }: { project: Project }) => {
  const { theme } = useTheme();

  return (
    <motion.div whileHover={{ y: -6 }} className="group h-full">
      <div className="relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 group-hover:border-white/20">
        <div
          className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10"
          style={{ color: theme.primary }}
        >
          <ProjectIcon domains={project.domains} />
        </div>

        <h3 className="text-lg font-bold text-slate-50 mb-2">{project.title}</h3>

        <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-white/10">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 transition-colors hover:text-white"
            aria-label={`Open ${project.title} GitHub repository`}
          >
            <GitHubIcon />
            Code
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold transition-colors"
              style={{ color: theme.primary }}
              aria-label={`Live demo of ${project.title}`}
            >
              <LiveIcon />
              Live demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
