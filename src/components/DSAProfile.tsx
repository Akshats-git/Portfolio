"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { sheets } from "@/data/dsa-data";
import type { PlatformStat, SheetProgress } from "@/data/dsa-data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const platformColors: Record<string, { bg: string; accent: string }> = {
  LeetCode: { bg: "#FFA1161a", accent: "#FFA116" },
  Codeforces: { bg: "#1890FF1a", accent: "#1890FF" },
  CodeChef: { bg: "#5B43411a", accent: "#C4A484" },
  GeeksforGeeks: { bg: "#2F8D461a", accent: "#2F8D46" },
};

function CircularProgress({
  percent,
  size = 80,
  strokeWidth = 6,
  color,
  trailColor = "rgba(255,255,255,0.08)",
  children,
}: {
  percent: number;
  size?: number;
  strokeWidth?: number;
  color: string;
  trailColor?: string;
  children?: React.ReactNode;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trailColor}
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
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

function PlatformCardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-700/30 p-5 h-48 animate-pulse bg-slate-800/30">
      <div className="flex justify-between mb-4">
        <div>
          <div className="h-5 w-24 bg-slate-700/50 rounded mb-2" />
          <div className="h-3 w-16 bg-slate-700/30 rounded" />
        </div>
        <div className="h-14 w-14 bg-slate-700/30 rounded-full" />
      </div>
      <div className="space-y-3">
        <div className="h-3 w-full bg-slate-700/30 rounded" />
        <div className="h-3 w-3/4 bg-slate-700/30 rounded" />
        <div className="h-3 w-1/2 bg-slate-700/30 rounded" />
      </div>
    </div>
  );
}

function PlatformCard({ platform, theme }: { platform: PlatformStat; theme: { primary: string; secondary: string; accent: string } }) {
  const colors = platformColors[platform.name] || { bg: `${theme.primary}1a`, accent: theme.primary };
  const solvedPercent = platform.totalProblems
    ? Math.round((platform.problemsSolved / platform.totalProblems) * 100)
    : 0;

  return (
    <motion.a
      href={platform.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      variants={itemVariants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="block group"
    >
      <div
        className="relative rounded-2xl border border-slate-700/50 p-5 h-full backdrop-blur-sm overflow-hidden transition-colors duration-300 hover:border-opacity-80"
        style={{
          background: `linear-gradient(135deg, ${colors.bg}, rgba(15,15,20,0.8))`,
          borderColor: `${colors.accent}33`,
        }}
      >
        <div
          className="absolute top-0 right-0 w-32 h-32 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at top right, ${colors.accent}, transparent 70%)`,
          }}
        />

        <div className="flex items-start justify-between mb-4">
          <div>
            <h4
              className="text-lg font-bold mb-0.5"
              style={{ color: colors.accent }}
            >
              {platform.name}
            </h4>
            <p className="text-slate-500 text-xs font-mono">@{platform.handle}</p>
          </div>
          {platform.totalProblems ? (
            <CircularProgress
              percent={solvedPercent}
              size={56}
              strokeWidth={4}
              color={colors.accent}
            >
              <span className="text-xs font-bold text-slate-200">
                {solvedPercent}%
              </span>
            </CircularProgress>
          ) : (
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: `${colors.accent}15` }}
            >
              <span className="text-2xl font-bold" style={{ color: colors.accent }}>
                {platform.problemsSolved}
              </span>
            </div>
          )}
        </div>

        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-sm">Problems Solved</span>
            <span className="text-slate-200 font-semibold text-sm">
              {platform.problemsSolved}
              {platform.totalProblems && (
                <span className="text-slate-500 font-normal"> / {platform.totalProblems}</span>
              )}
            </span>
          </div>

          {platform.rating !== undefined && (
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Rating</span>
              <span className="font-semibold text-sm" style={{ color: colors.accent }}>
                {platform.rating}
                {platform.maxRating && (
                  <span className="text-slate-500 font-normal text-xs"> (max {platform.maxRating})</span>
                )}
              </span>
            </div>
          )}

          {platform.rank && (
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Rank</span>
              <span
                className="text-sm font-semibold px-2 py-0.5 rounded-full"
                style={{ background: `${colors.accent}20`, color: colors.accent }}
              >
                {platform.rank}
              </span>
            </div>
          )}

          {platform.stars !== undefined && (
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Stars</span>
              <span style={{ color: colors.accent }} className="text-sm tracking-wider">
                {"★".repeat(platform.stars)}
                <span className="opacity-30">{"★".repeat(Math.max(0, 7 - platform.stars))}</span>
              </span>
            </div>
          )}

          {platform.contestsGiven !== undefined && (
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Contests</span>
              <span className="text-slate-200 font-semibold text-sm">{platform.contestsGiven}</span>
            </div>
          )}

          {platform.score !== undefined && (
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Score</span>
              <span className="text-slate-200 font-semibold text-sm">{platform.score}</span>
            </div>
          )}

          {platform.streak !== undefined && platform.streak > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Longest Streak</span>
              <span className="text-slate-200 font-semibold text-sm">{platform.streak} days</span>
            </div>
          )}
        </div>

        {platform.breakdown && (
          <div className="mt-4 flex gap-1.5">
            {platform.breakdown.map((b) => (
              <div key={b.label} className="flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: b.color }} />
                  <span className="text-[11px] text-slate-400">{b.label}</span>
                </div>
                <div className="text-sm font-bold text-slate-200">{b.count}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.a>
  );
}

function SheetCard({ sheet, theme }: { sheet: SheetProgress; theme: { primary: string; secondary: string; accent: string } }) {
  const percent = Math.round((sheet.solved / sheet.totalProblems) * 100);

  return (
    <motion.div variants={itemVariants} className="w-full">
      <div
        className="rounded-2xl border border-slate-700/50 p-6 backdrop-blur-sm"
        style={{
          background: `linear-gradient(135deg, ${theme.primary}08, rgba(15,15,20,0.8))`,
          borderColor: `${theme.primary}22`,
        }}
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <a
              href={sheet.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <h4 className="text-lg font-bold text-slate-100">{sheet.name}</h4>
            </a>
          </div>
          <CircularProgress
            percent={percent}
            size={64}
            strokeWidth={5}
            color={theme.primary}
          >
            <span className="text-sm font-bold text-slate-200">{percent}%</span>
          </CircularProgress>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-slate-400">Overall Progress</span>
            <span className="text-slate-200 font-semibold">
              {sheet.solved} / {sheet.totalProblems}
            </span>
          </div>
          <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`,
              }}
              initial={{ width: 0 }}
              whileInView={{ width: `${percent}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
          {sheet.topics.map((topic) => {
            const topicPercent = Math.round((topic.solved / topic.total) * 100);
            const isComplete = topic.solved === topic.total;
            return (
              <motion.div
                key={topic.name}
                className="rounded-xl px-3 py-2.5 border transition-colors duration-200"
                style={{
                  background: isComplete
                    ? `${theme.primary}12`
                    : "rgba(30,30,40,0.5)",
                  borderColor: isComplete
                    ? `${theme.primary}44`
                    : "rgba(100,100,120,0.15)",
                }}
                whileHover={{ scale: 1.03, transition: { duration: 0.15 } }}
              >
                <p className="text-xs font-semibold text-slate-300 mb-1 truncate">
                  {topic.name}
                </p>
                <div className="flex items-end justify-between gap-1">
                  <span
                    className="text-sm font-bold"
                    style={{
                      color: isComplete ? theme.primary : "rgb(203,213,225)",
                    }}
                  >
                    {topic.solved}
                    <span className="text-slate-500 font-normal text-xs">/{topic.total}</span>
                  </span>
                  <span
                    className="text-[10px] font-semibold"
                    style={{
                      color:
                        topicPercent === 100
                          ? theme.primary
                          : topicPercent >= 75
                            ? theme.secondary
                            : "rgb(148,163,184)",
                    }}
                  >
                    {topicPercent}%
                  </span>
                </div>
                <div className="mt-1.5 h-1 rounded-full bg-slate-800 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      backgroundImage: isComplete
                        ? `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`
                        : `linear-gradient(to right, ${theme.primary}99, ${theme.secondary}99)`,
                    }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${topicPercent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

function AggregateStats({
  platforms,
  theme,
}: {
  platforms: PlatformStat[];
  theme: { primary: string; secondary: string; accent: string };
}) {
  const totalSolved = platforms.reduce((sum, p) => sum + p.problemsSolved, 0);
  const totalContests = platforms.reduce((sum, p) => sum + (p.contestsGiven || 0), 0);
  const totalSheetSolved = sheets.reduce((sum, s) => sum + s.solved, 0);
  const totalSheetProblems = sheets.reduce((sum, s) => sum + s.totalProblems, 0);

  const stats = [
    { label: "Problems Solved", value: totalSolved, suffix: "+" },
    { label: "Contests Given", value: totalContests, suffix: "+" },
    { label: "Sheet Progress", value: totalSheetSolved, suffix: `/${totalSheetProblems}` },
    { label: "Active Platforms", value: platforms.length, suffix: "" },
  ];

  return (
    <motion.div
      variants={containerVariants}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
    >
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          variants={itemVariants}
          className="relative rounded-2xl border border-slate-700/40 p-5 text-center overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${theme.primary}08, ${theme.secondary}05, rgba(15,15,20,0.6))`,
          }}
        >
          <motion.div
            className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${theme.primary}10, transparent 70%)`,
            }}
          />
          <motion.p
            className="text-3xl sm:text-4xl font-black mb-1"
            style={{
              backgroundImage: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.1, type: "spring" }}
          >
            {stat.value}
            <span className="text-lg font-semibold">{stat.suffix}</span>
          </motion.p>
          <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

const DSAProfile = () => {
  const { theme } = useTheme();
  const [platforms, setPlatforms] = useState<PlatformStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dsa-stats")
      .then((res) => res.json())
      .then((data) => {
        setPlatforms(data.platforms);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section
      id="dsa"
      className="min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto w-full"
      >
        <motion.div variants={itemVariants} className="mb-14">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`,
              }}
            >
              DSA & Competitive Programming
            </span>
          </h2>
          <div
            className="h-1 w-20 rounded"
            style={{
              backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`,
            }}
          />
          <p className="text-slate-400 mt-4 max-w-2xl">
            Consistent problem solver across multiple platforms with a focus on
            data structures, algorithms, and competitive programming.
          </p>
        </motion.div>

        {!loading && platforms.length > 0 && (
          <AggregateStats platforms={platforms} theme={theme} />
        )}

        <motion.div variants={itemVariants} className="mb-6">
          <h3 className="text-xl font-bold text-slate-200 mb-1">Platforms</h3>
          <p className="text-slate-500 text-sm">Click any card to visit the profile</p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            {[0, 1, 2, 3].map((i) => (
              <PlatformCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14"
          >
            {platforms.map((p) => (
              <PlatformCard key={p.name} platform={p} theme={theme} />
            ))}
          </motion.div>
        )}

        <motion.div variants={itemVariants} className="mb-6">
          <h3 className="text-xl font-bold text-slate-200 mb-1">
            DSA & CP Sheets
          </h3>
          <p className="text-slate-500 text-sm">
            Topic-wise progress across popular problem sheets
          </p>
        </motion.div>

        <motion.div variants={containerVariants} className="space-y-6">
          {sheets.map((s) => (
            <SheetCard key={s.name} sheet={s} theme={theme} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default DSAProfile;
