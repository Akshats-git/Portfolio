"use client";

import { motion } from "framer-motion";
import type { ContributionPR, ThemeColors } from "./coding-types";

function MergeIcon({ color }: { color: string }) {
  return (
    <svg className="h-4 w-4 shrink-0 mt-0.5" viewBox="0 0 16 16" fill={color} aria-hidden="true">
      <path d="M5 3.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm0 2.122a2.25 2.25 0 1 0-1.5 0v6.256a2.25 2.25 0 1 0 1.5 0V8.878a2.03 2.03 0 0 0 .577.483c.473.267 1.093.439 1.923.439h4.318a2.25 2.25 0 1 0 0-1.5H7.5c-.573 0-.949-.121-1.198-.26a1.02 1.02 0 0 1-.404-.404C5.759 7.49 5.5 7.114 5.5 6.5V5.372ZM3.75 12.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm8.5-4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
    </svg>
  );
}

const ContributionCard = ({ pr, theme }: { pr: ContributionPR; theme: ThemeColors }) => {
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
          <span className="font-mono text-xs font-semibold truncate text-slate-400">{pr.repo}</span>
          {mergedDate && <span className="text-[11px] text-slate-600 shrink-0">{mergedDate}</span>}
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
};

export default ContributionCard;
