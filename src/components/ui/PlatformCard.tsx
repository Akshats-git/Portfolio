"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import type { PlatformStat } from "@/data/dsa-data";
import CircularProgress from "./CircularProgress";
import { platformAccents, type ThemeColors } from "./coding-types";

const PlatformCard = ({
  platform,
  theme,
}: {
  platform: PlatformStat;
  theme: ThemeColors;
}) => {
  const accent = platformAccents[platform.name] ?? theme.primary;
  const solvedPercent = platform.totalProblems
    ? Math.round((platform.problemsSolved / platform.totalProblems) * 100)
    : 0;

  const rows: { label: string; value: ReactNode }[] = [];

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
  if (platform.contestsGiven !== undefined) {
    rows.push({ label: "Contests", value: platform.contestsGiven });
  }
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
              <span className="text-[11px] font-bold font-mono text-slate-200">
                {solvedPercent}%
              </span>
            </CircularProgress>
          ) : null}
        </div>

        <div className="mb-4">
          <p className="text-3xl font-bold font-mono text-slate-50">
            {platform.problemsSolved}
            {platform.totalProblems && (
              <span className="text-slate-600 text-base font-normal">
                {" "}
                / {platform.totalProblems}
              </span>
            )}
          </p>
          <p className="text-[11px] uppercase tracking-[0.15em] text-slate-500 mt-1">
            Problems solved
          </p>
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
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: b.color }}
                  />
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
};

export default PlatformCard;
