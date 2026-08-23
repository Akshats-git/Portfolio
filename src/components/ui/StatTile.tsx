"use client";

import { useTheme } from "@/context/ThemeContext";

const StatTile = ({
  value,
  label,
  loading = false,
}: {
  value: string | number;
  label: string;
  loading?: boolean;
}) => {
  const { theme } = useTheme();

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-6 text-center sm:text-left">
      {loading ? (
        <div className="h-8 w-16 mx-auto sm:mx-0 rounded bg-white/10 animate-pulse" />
      ) : (
        <p className="text-3xl font-bold font-mono" style={{ color: theme.primary }}>
          {value}
        </p>
      )}
      <p className="mt-1.5 text-xs uppercase tracking-[0.15em] text-slate-500">{label}</p>
    </div>
  );
};

export default StatTile;
