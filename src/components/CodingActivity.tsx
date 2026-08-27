"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { sheets } from "@/data/dsa-data";
import type { PlatformStat } from "@/data/dsa-data";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import StatTile from "./ui/StatTile";
import PlatformCard from "./ui/PlatformCard";
import ContributionCard from "./ui/ContributionCard";
import type { ContributionPR } from "./ui/coding-types";

// A zero here always means the upstream fetch came back empty, never a real count.
const orDash = (n: number) => (n > 0 ? n : "—");

const PR_PREVIEW_COUNT = 6;

const ArrowIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

function CardSkeleton({ className = "h-44" }: { className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/[0.02] p-5 animate-pulse ${className}`}>
      <div className="h-4 w-24 bg-white/10 rounded mb-4" />
      <div className="h-3 w-full bg-white/[0.06] rounded mb-2.5" />
      <div className="h-3 w-3/4 bg-white/[0.06] rounded" />
    </div>
  );
}

function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-mono uppercase tracking-wider text-slate-500 mb-5">{children}</h3>
  );
}

const CodingActivity = () => {
  const { theme } = useTheme();
  const [contributions, setContributions] = useState<ContributionPR[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [platforms, setPlatforms] = useState<PlatformStat[]>([]);
  // Tracked separately so a slow judge API never holds back the GitHub cards, or vice versa.
  const [prsLoading, setPrsLoading] = useState(true);
  const [dsaLoading, setDsaLoading] = useState(true);

  useEffect(() => {
    fetch("/api/github-prs")
      .then((r) => r.json())
      .then((data) => {
        setContributions(data.contributions ?? []);
        setTotalCount(data.totalCount ?? 0);
      })
      .catch(() => undefined)
      .finally(() => setPrsLoading(false));

    fetch("/api/dsa-stats")
      .then((r) => r.json())
      .then((data) => setPlatforms(data.platforms ?? []))
      .catch(() => undefined)
      .finally(() => setDsaLoading(false));
  }, []);

  const repoCount = new Set(contributions.map((c) => c.repo)).size;
  const problemsSolved = platforms.reduce((sum, p) => sum + (p.problemsSolved ?? 0), 0);
  const ratings = platforms
    .map((p) => p.rating)
    .filter((r): r is number => typeof r === "number");
  const bestRating = ratings.length ? Math.max(...ratings) : null;

  return (
    <section id="coding" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            index="04"
            title="Coding Activity"
            description="Open-source contributions and competitive programming, tracked live."
          />
          <Link
            href="/coding"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: theme.primary }}
          >
            Full breakdown
            <ArrowIcon />
          </Link>
        </div>

        {/* Summary stats */}
        <Reveal delay={0.05}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            <StatTile loading={prsLoading} value={orDash(totalCount)} label="Merged PRs" />
            <StatTile loading={prsLoading} value={orDash(repoCount)} label="Repositories" />
            <StatTile loading={dsaLoading} value={orDash(problemsSolved)} label="Problems Solved" />
            <StatTile loading={dsaLoading} value={bestRating ?? "—"} label="Best CP Rating" />
          </div>
        </Reveal>

        {/* Platforms */}
        <div className="mb-16">
          <Reveal>
            <SubLabel>Platforms</SubLabel>
          </Reveal>

          {dsaLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[0, 1, 2, 3].map((i) => (
                <CardSkeleton key={i} className="h-60" />
              ))}
            </div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {platforms.map((p) => (
                <motion.div
                  key={p.name}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                  }}
                  className="h-full"
                >
                  <PlatformCard platform={p} theme={theme} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Problem sheets — summary bars only; full topic grids live on /coding */}
        <div className="mb-16">
          <Reveal>
            <SubLabel>Problem Sheets</SubLabel>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sheets.map((sheet, idx) => {
              const percent = Math.round((sheet.solved / sheet.totalProblems) * 100);
              return (
                <Reveal key={sheet.name} delay={idx * 0.08}>
                  <a
                    href={sheet.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-white/20"
                  >
                    <div className="flex items-baseline justify-between gap-4 mb-3">
                      <h4 className="font-bold text-slate-50">{sheet.name}</h4>
                      <span className="font-mono text-sm shrink-0" style={{ color: theme.primary }}>
                        {percent}%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden mb-2.5">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: theme.primary }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                      />
                    </div>
                    <p className="font-mono text-xs text-slate-500">
                      {sheet.solved} / {sheet.totalProblems} solved
                    </p>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Open source */}
        <div>
          <Reveal>
            <SubLabel>Recent Open Source</SubLabel>
          </Reveal>

          {prsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <CardSkeleton key={i} className="h-28" />
              ))}
            </div>
          ) : contributions.length > 0 ? (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {contributions.slice(0, PR_PREVIEW_COUNT).map((pr) => (
                <motion.div
                  key={pr.id}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                  }}
                  className="h-full"
                >
                  <ContributionCard pr={pr} theme={theme} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="rounded-2xl border border-white/10 p-8 text-center text-slate-400">
              No external merged pull requests found yet.
            </div>
          )}
        </div>

        <div className="mt-12">
          <Link
            href="/coding"
            className="inline-flex items-center gap-2 text-sm font-semibold"
            style={{ color: theme.primary }}
          >
            {totalCount > PR_PREVIEW_COUNT
              ? `View all ${totalCount} contributions & full sheet breakdown`
              : "View full breakdown"}
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CodingActivity;
