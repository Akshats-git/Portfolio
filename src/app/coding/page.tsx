"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { sheets } from "@/data/dsa-data";
import type { PlatformStat, SheetProgress } from "@/data/dsa-data";
import Footer from "@/components/Footer";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import CircularProgress from "@/components/ui/CircularProgress";
import PlatformCard from "@/components/ui/PlatformCard";
import ContributionCard from "@/components/ui/ContributionCard";
import type { ContributionPR, ThemeColors } from "@/components/ui/coding-types";

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
