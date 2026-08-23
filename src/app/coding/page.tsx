"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { sheets } from "@/data/dsa-data";
import type { PlatformStat, SheetProgress } from "@/data/dsa-data";
import Footer from "@/components/Footer";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";

interface ContributionPR {
  id: number;
  title: string;
  number: number;
  url: string;
  repo: string;
  repoUrl: string;
  mergedAt: string;
}

type ThemeColors = { primary: string; secondary: string; accent: string };

const platformAccents: Record<string, string> = {
  LeetCode: "#FFA116",
  Codeforces: "#1890FF",
  CodeChef: "#C4A484",
  GeeksforGeeks: "#2F8D46",
};

/* ── Shared bits ─────────────────────────────────────────────────────────── */

function SubHeading({ index, title, note }: { index: string; title: string; note?: string }) {
  const { theme } = useTheme();
  return (
    <Reveal className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-sm tracking-wider" style={{ color: theme.primary }}>
          {index}
        </span>
        <span className="h-px w-10 bg-white/15" />
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight">{title}</h2>
      {note && <p className="mt-2.5 text-slate-400">{note}</p>}
    </Reveal>
  );
}

function CircularProgress({
  percent,
  size = 80,
  strokeWidth = 6,
  color,
  children,
}: {
  percent: number;
  size?: number;
  strokeWidth?: number;
  color: string;
  children?: React.ReactNode;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
}

function CardSkeleton({ className = "h-44" }: { className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/[0.02] p-5 animate-pulse ${className}`}>
      <div className="h-4 w-24 bg-white/10 rounded mb-4" />
      <div className="h-3 w-full bg-white/[0.06] rounded mb-2.5" />
      <div className="h-3 w-3/4 bg-white/[0.06] rounded mb-2.5" />
      <div className="h-3 w-1/2 bg-white/[0.06] rounded" />
    </div>
  );
}

/* ── Open source ─────────────────────────────────────────────────────────── */

function MergeIcon({ color }: { color: string }) {
  return (
    <svg className="h-4 w-4 shrink-0 mt-0.5" viewBox="0 0 16 16" fill={color} aria-hidden="true">
      <path d="M5 3.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm0 2.122a2.25 2.25 0 1 0-1.5 0v6.256a2.25 2.25 0 1 0 1.5 0V8.878a2.03 2.03 0 0 0 .577.483c.473.267 1.093.439 1.923.439h4.318a2.25 2.25 0 1 0 0-1.5H7.5c-.573 0-.949-.121-1.198-.26a1.02 1.02 0 0 1-.404-.404C5.759 7.49 5.5 7.114 5.5 6.5V5.372ZM3.75 12.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm8.5-4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
    </svg>
  );
}

function ContributionCard({ pr, theme }: { pr: ContributionPR; theme: ThemeColors }) {
  const mergedDate = pr.mergedAt
    ? new Date(pr.mergedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })
    : null;

  return (
    <motion.a
      href={pr.url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -4 }}
      className="group block h-full"
    >
      <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors group-hover:border-white/20">
        <div className="flex items-center justify-between mb-3 gap-2">
          <span className="font-mono text-xs font-semibold truncate text-slate-400">
            {pr.repo}
          </span>
          {mergedDate && (
            <span className="text-[11px] text-slate-600 shrink-0">{mergedDate}</span>
          )}
        </div>

        <div className="flex items-start gap-2.5">
          <MergeIcon color={theme.primary} />
          <p className="text-sm text-slate-200 font-medium leading-snug group-hover:text-white transition-colors">
            {pr.title}
            <span className="text-slate-600 font-normal"> #{pr.number}</span>
          </p>
        </div>
      </div>
    </motion.a>
  );
}

/* ── DSA platform ────────────────────────────────────────────────────────── */

function PlatformCard({ platform, theme }: { platform: PlatformStat; theme: ThemeColors }) {
  const accent = platformAccents[platform.name] ?? theme.primary;
  const solvedPercent = platform.totalProblems
    ? Math.round((platform.problemsSolved / platform.totalProblems) * 100)
    : 0;

  const rows: { label: string; value: React.ReactNode }[] = [];

  if (platform.rating !== undefined) {
    rows.push({
      label: "Rating",
      value: (
        <span style={{ color: accent }}>
          {platform.rating}
          {platform.maxRating ? (
            <span className="text-slate-600 font-normal text-xs"> (max {platform.maxRating})</span>
          ) : null}
        </span>
      ),
    });
  }
  if (platform.rank) rows.push({ label: "Rank", value: platform.rank });
  if (platform.stars !== undefined) {
    rows.push({
      label: "Stars",
      value: (
        <span style={{ color: accent }} className="tracking-wider">
          {"★".repeat(platform.stars)}
          <span className="opacity-25">{"★".repeat(Math.max(0, 7 - platform.stars))}</span>
        </span>
      ),
    });
  }
  if (platform.contestsGiven !== undefined) rows.push({ label: "Contests", value: platform.contestsGiven });
  if (platform.score !== undefined) rows.push({ label: "Score", value: platform.score });
  if (platform.streak) rows.push({ label: "Longest streak", value: `${platform.streak} days` });

  return (
    <motion.a
      href={platform.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -4 }}
      className="group block h-full"
    >
      <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors group-hover:border-white/20">
        <div className="flex items-start justify-between mb-5 gap-3">
          <div className="min-w-0">
            <h4 className="text-base font-bold mb-0.5" style={{ color: accent }}>
              {platform.name}
            </h4>
            <p className="text-slate-500 text-xs font-mono truncate">@{platform.handle}</p>
          </div>
          {platform.totalProblems ? (
            <CircularProgress percent={solvedPercent} size={52} strokeWidth={4} color={accent}>
              <span className="text-[11px] font-bold font-mono text-slate-200">{solvedPercent}%</span>
            </CircularProgress>
          ) : null}
        </div>

        <div className="mb-4">
          <p className="text-3xl font-bold font-mono text-slate-50">
            {platform.problemsSolved}
            {platform.totalProblems && (
              <span className="text-slate-600 text-base font-normal"> / {platform.totalProblems}</span>
            )}
          </p>
          <p className="text-[11px] uppercase tracking-[0.15em] text-slate-500 mt-1">Problems solved</p>
        </div>

        <div className="space-y-2 text-sm mt-auto">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-3">
              <span className="text-slate-500">{row.label}</span>
              <span className="font-semibold text-slate-200 text-right">{row.value}</span>
            </div>
          ))}
        </div>

        {platform.breakdown && (
          <div className="mt-5 pt-4 border-t border-white/10 flex gap-4">
            {platform.breakdown.map((b) => (
              <div key={b.label}>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: b.color }} />
                  <span className="text-[11px] text-slate-500">{b.label}</span>
                </div>
                <div className="text-sm font-bold font-mono text-slate-200">{b.count}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.a>
  );
}

/* ── DSA sheets ──────────────────────────────────────────────────────────── */

function SheetCard({ sheet, theme }: { sheet: SheetProgress; theme: ThemeColors }) {
  const percent = Math.round((sheet.solved / sheet.totalProblems) * 100);

  return (
    <Reveal>
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <div className="flex items-center justify-between gap-4 mb-5">
          <div>
            <a
              href={sheet.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-bold text-slate-50 hover:opacity-80 transition-opacity"
            >
              {sheet.name}
            </a>
            <p className="text-sm text-slate-500 mt-1 font-mono">
              {sheet.solved} / {sheet.totalProblems} solved
            </p>
          </div>
          <CircularProgress percent={percent} size={60} strokeWidth={5} color={theme.primary}>
            <span className="text-xs font-bold font-mono text-slate-200">{percent}%</span>
          </CircularProgress>
        </div>

        <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden mb-6">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: theme.primary }}
            initial={{ width: 0 }}
            whileInView={{ width: `${percent}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          {sheet.topics.map((topic) => {
            const topicPercent = Math.round((topic.solved / topic.total) * 100);
            const isComplete = topic.solved === topic.total;
            return (
              <div
                key={topic.name}
                className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5"
              >
                <p className="text-xs font-medium text-slate-400 mb-1.5 truncate">{topic.name}</p>
                <div className="flex items-end justify-between gap-1 mb-1.5">
                  <span
                    className="text-sm font-bold font-mono"
                    style={{ color: isComplete ? theme.primary : "rgb(226,232,240)" }}
                  >
                    {topic.solved}
                    <span className="text-slate-600 font-normal text-xs">/{topic.total}</span>
                  </span>
                </div>
                <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: isComplete ? theme.primary : `${theme.primary}80` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${topicPercent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */

export default function CodingPage() {
  const { theme } = useTheme();
  const [contributions, setContributions] = useState<ContributionPR[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [prsLoading, setPrsLoading] = useState(true);
  const [platforms, setPlatforms] = useState<PlatformStat[]>([]);
  const [dsaLoading, setDsaLoading] = useState(true);

  useEffect(() => {
    fetch("/api/github-prs")
      .then((res) => res.json())
      .then((data) => {
        setContributions(data.contributions ?? []);
        setTotalCount(data.totalCount ?? 0);
      })
      .catch(() => undefined)
      .finally(() => setPrsLoading(false));

    fetch("/api/dsa-stats")
      .then((res) => res.json())
      .then((data) => setPlatforms(data.platforms ?? []))
      .catch(() => undefined)
      .finally(() => setDsaLoading(false));
  }, []);

  const repoCount = new Set(contributions.map((c) => c.repo)).size;

  return (
    <main>
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <PageHeader
          title="Coding Activity"
          description="Open-source contributions and competitive programming progress, pulled live from GitHub, LeetCode, Codeforces, CodeChef and GeeksforGeeks."
        />

        {/* Open source */}
        <section className="mb-24">
          <SubHeading
            index="01"
            title="Open Source"
            note={
              prsLoading
                ? "Merged pull requests to projects outside my own repositories."
                : `${totalCount} merged pull requests across ${repoCount} repositories outside my own.`
            }
          />

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
              {contributions.map((pr) => (
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
            <div className="rounded-2xl border border-white/10 p-10 text-center text-slate-400">
              No external merged pull requests found yet.
            </div>
          )}
        </section>

        {/* Platforms */}
        <section className="mb-24">
          <SubHeading
            index="02"
            title="Platforms"
            note="Live stats from the judges I solve on. Click any card to open the profile."
          />

          {dsaLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[0, 1, 2, 3].map((i) => (
                <CardSkeleton key={i} className="h-64" />
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
        </section>

        {/* Sheets */}
        <section>
          <SubHeading
            index="03"
            title="Problem Sheets"
            note="Topic-wise progress across the sheets I'm working through."
          />

          <div className="space-y-6">
            {sheets.map((s) => (
              <SheetCard key={s.name} sheet={s} theme={theme} />
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
