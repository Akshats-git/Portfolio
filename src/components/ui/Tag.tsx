import type { ReactNode } from "react";

const Tag = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-slate-300 ${className}`}
    >
      {children}
    </span>
  );
};

export default Tag;
