"use client";

import { useTheme } from "@/context/ThemeContext";
import Reveal from "./Reveal";

const SectionHeading = ({
  index,
  title,
  description,
  align = "left",
}: {
  index: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) => {
  const { theme } = useTheme();
  const centered = align === "center";

  return (
    <Reveal className={centered ? "text-center" : ""}>
      <div className={`flex items-center gap-3 mb-5 ${centered ? "justify-center" : ""}`}>
        <span className="font-mono text-sm tracking-wider" style={{ color: theme.primary }}>
          {index}
        </span>
        <span className="h-px w-10 bg-white/15" />
      </div>
      <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-slate-50 tracking-tight">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-slate-400 text-lg leading-relaxed max-w-2xl ${centered ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
};

export default SectionHeading;
