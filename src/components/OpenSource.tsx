"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

interface ContributionPR {
  id: number;
  title: string;
  number: number;
  url: string;
  repo: string;
  repoUrl: string;
  mergedAt: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function MergeIcon({ color }: { color: string }) {
  return (
    <svg
      className="h-4 w-4 shrink-0"
      viewBox="0 0 16 16"
      fill={color}
      aria-hidden="true"
    >
      <path d="M5 3.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm0 2.122a2.25 2.25 0 1 0-1.5 0v6.256a2.25 2.25 0 1 0 1.5 0V8.878a2.03 2.03 0 0 0 .577.483c.473.267 1.093.439 1.923.439h4.318a2.25 2.25 0 1 0 0-1.5H7.5c-.573 0-.949-.121-1.198-.26a1.02 1.02 0 0 1-.404-.404C5.759 7.49 5.5 7.114 5.5 6.5V5.372ZM3.75 12.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm8.5-4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
    </svg>
  );
}

function ContributionCardSkeleton() {
  return (
    <div className="rounded-xl border border-slate-700/30 p-4 h-24 animate-pulse bg-slate-800/30">
      <div className="h-3 w-32 bg-slate-700/40 rounded mb-3" />
      <div className="h-4 w-full bg-slate-700/30 rounded mb-2" />
      <div className="h-3 w-20 bg-slate-700/20 rounded" />
    </div>
  );
}

function ContributionCard({
  pr,
  theme,
}: {
  pr: ContributionPR;
  theme: { primary: string; secondary: string; accent: string };
}) {
  const mergedDate = pr.mergedAt
    ? new Date(pr.mergedAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <motion.a
      href={pr.url}
      target="_blank"
      rel="noopener noreferrer"
      variants={itemVariants}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="block group"
    >
      <div
        className="rounded-xl border p-4 h-full backdrop-blur-sm transition-colors duration-300"
        style={{
          background: "rgba(15,15,20,0.6)",
          borderColor: `${theme.primary}22`,
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <span
            className="text-xs font-mono font-semibold truncate"
            style={{ color: theme.secondary }}
          >
            {pr.repo}
          </span>
          {mergedDate && (
            <span className="text-[11px] text-slate-500 shrink-0 ml-2">
              {mergedDate}
            </span>
          )}
        </div>

        <div className="flex items-start gap-2">
          <MergeIcon color={theme.primary} />
          <p className="text-sm text-slate-200 font-medium leading-snug group-hover:text-white transition-colors">
            {pr.title}
            <span className="text-slate-500 font-normal"> #{pr.number}</span>
          </p>
        </div>
      </div>
    </motion.a>
  );
}

const OpenSource = () => {
  const { theme } = useTheme();
  const [contributions, setContributions] = useState<ContributionPR[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/github-prs")
      .then((res) => res.json())
      .then((data) => {
        setContributions(data.contributions ?? []);
        setTotalCount(data.totalCount ?? 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const repoCount = new Set(contributions.map((c) => c.repo)).size;

  return (
    <section
      id="opensource"
      className="min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto w-full"
      >
        <motion.div variants={itemVariants} className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`,
                }}
              >
                Open Source Contributions
              </span>
            </h2>
            <div
              className="h-1 w-20 rounded"
              style={{
                backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`,
              }}
            />
            <p className="text-slate-400 mt-4 max-w-2xl">
              Merged pull requests to projects outside my own repositories.
            </p>
          </div>

          {!loading && totalCount > 0 && (
            <div className="flex gap-6">
              <div className="text-center">
                <p
                  className="text-3xl font-bold"
                  style={{ color: theme.primary }}
                >
                  {totalCount}
                </p>
                <p className="text-xs text-slate-500 uppercase tracking-wide">
                  Merged PRs
                </p>
              </div>
              <div className="text-center">
                <p
                  className="text-3xl font-bold"
                  style={{ color: theme.secondary }}
                >
                  {repoCount}
                </p>
                <p className="text-xs text-slate-500 uppercase tracking-wide">
                  Repositories
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <ContributionCardSkeleton key={i} />
            ))}
          </div>
        ) : contributions.length > 0 ? (
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {contributions.map((pr) => (
              <ContributionCard key={pr.id} pr={pr} theme={theme} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            variants={itemVariants}
            className="rounded-xl border border-slate-700/40 p-8 text-center text-slate-400"
          >
            No external merged pull requests found yet.
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default OpenSource;
