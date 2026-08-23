"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const PageHeader = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-14"
    >
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors mb-8"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back to home
      </Link>

      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-50">
        {title}
      </h1>
      {description && (
        <p className="mt-5 text-lg text-slate-400 leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default PageHeader;
