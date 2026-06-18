"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { getBlogBySlug } from "@/data/blog-data";
import type { ContentBlock } from "@/data/blog-data";

function renderBlock(block: ContentBlock, index: number, theme: { primary: string; secondary: string }) {
  switch (block.type) {
    case "heading":
      return (
        <h2
          key={index}
          className="text-2xl md:text-3xl font-bold mt-10 mb-4 bg-clip-text text-transparent"
          style={{
            backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`,
          }}
        >
          {block.text}
        </h2>
      );
    case "subheading":
      return (
        <h3
          key={index}
          className="text-xl md:text-2xl font-semibold mt-8 mb-3"
          style={{ color: theme.primary }}
        >
          {block.text}
        </h3>
      );
    case "paragraph":
      return (
        <p key={index} className="text-slate-300 leading-relaxed mb-4">
          {block.text}
        </p>
      );
    case "code":
      return (
        <div key={index} className="mb-6">
          <span className="inline-block px-2 py-0.5 text-xs font-mono rounded-t-md bg-slate-700 text-slate-300">
            {block.language}
          </span>
          <pre className="bg-slate-800/50 rounded-lg rounded-tl-none p-4 overflow-x-auto">
            <code className="text-sm font-mono text-slate-200">{block.code}</code>
          </pre>
        </div>
      );
    case "list":
      return (
        <ul key={index} className="list-disc list-inside text-slate-300 space-y-2 mb-4 ml-2">
          {block.items.map((item, i) => (
            <li key={i} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      );
  }
}

export default function BlogDetailPage() {
  const params = useParams();
  const { theme } = useTheme();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return (
      <section
        className="min-h-screen flex flex-col items-center justify-center px-4"
        style={{ backgroundColor: theme.background }}
      >
        <h1 className="text-3xl font-bold text-white mb-4">Blog not found</h1>
        <p className="text-slate-400 mb-8">
          The blog post you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/#blogs"
          className="px-6 py-3 rounded-lg text-white font-semibold transition-all hover:opacity-90"
          style={{
            backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`,
          }}
        >
          Back to all posts
        </Link>
      </section>
    );
  }

  return (
    <section
      className="relative min-h-screen overflow-hidden py-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: theme.background }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle at top, ${theme.primary}22, transparent 42%), radial-gradient(circle at bottom right, ${theme.secondary}18, transparent 36%)`,
        }}
      />

      <div className="relative max-w-3xl mx-auto pt-8">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/#blogs"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to all posts
          </Link>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent"
          style={{
            backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`,
          }}
        >
          {blog.title}
        </motion.h1>

        {/* Metadata */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center gap-4 mb-6"
        >
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white"
            style={{
              backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`,
            }}
          >
            {blog.category}
          </span>
          <span className="text-slate-500 text-sm">{blog.date}</span>
          <span className="text-slate-500 text-sm">{blog.readTime} read</span>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {blog.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs px-3 py-1 rounded-md bg-slate-800/50 text-slate-300"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="h-px mb-10 origin-left"
          style={{
            backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.secondary}, transparent)`,
          }}
        />

        {/* Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {blog.content.map((block, index) => renderBlock(block, index, theme))}
        </motion.article>

        {/* Bottom navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 pt-8 border-t border-slate-700/50"
        >
          <Link
            href="/#blogs"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to all posts
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
