"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import StatTile from "./ui/StatTile";

interface ContributionPR {
  repo: string;
}

interface PlatformStat {
  problemsSolved: number;
  rating?: number;
}

// A zero here always means the upstream fetch came back empty, never a real count.
const orDash = (n: number) => (n > 0 ? n : "—");

const ArrowIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const CodingStrip = () => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [prCount, setPrCount] = useState(0);
  const [repoCount, setRepoCount] = useState(0);
  const [problemsSolved, setProblemsSolved] = useState(0);
  const [bestRating, setBestRating] = useState<number | null>(null);

  useEffect(() => {
    Promise.allSettled([
      fetch("/api/github-prs").then((r) => r.json()),
      fetch("/api/dsa-stats").then((r) => r.json()),
    ]).then(([prsResult, dsaResult]) => {
      if (prsResult.status === "fulfilled") {
        const contributions: ContributionPR[] = prsResult.value.contributions ?? [];
        setPrCount(prsResult.value.totalCount ?? 0);
        setRepoCount(new Set(contributions.map((c) => c.repo)).size);
      }
      if (dsaResult.status === "fulfilled") {
        const platforms: PlatformStat[] = dsaResult.value.platforms ?? [];
        setProblemsSolved(platforms.reduce((sum, p) => sum + (p.problemsSolved ?? 0), 0));
        const ratings = platforms
          .map((p) => p.rating)
          .filter((r): r is number => typeof r === "number");
        setBestRating(ratings.length ? Math.max(...ratings) : null);
      }
      setLoading(false);
    });
  }, []);

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
            View full stats
            <ArrowIcon />
          </Link>
        </div>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatTile loading={loading} value={orDash(prCount)} label="Merged PRs" />
            <StatTile loading={loading} value={orDash(repoCount)} label="Repositories" />
            <StatTile loading={loading} value={orDash(problemsSolved)} label="Problems Solved" />
            <StatTile loading={loading} value={bestRating ?? "—"} label="Best CP Rating" />
          </div>
        </Reveal>

        <div className="mt-10 sm:hidden">
          <Link
            href="/coding"
            className="inline-flex items-center gap-2 text-sm font-semibold"
            style={{ color: theme.primary }}
          >
            View full stats →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CodingStrip;
