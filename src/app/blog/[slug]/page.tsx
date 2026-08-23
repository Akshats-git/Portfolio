"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { getBlogBySlug } from "@/data/blog-data";
import type { ContentBlock } from "@/data/blog-data";
import Footer from "@/components/Footer";
import Tag from "@/components/ui/Tag";

const INLINE_PATTERN = /\*\*([^*]+)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)/g;

function renderInline(text: string, theme: { primary: string; secondary: string }) {
  const nodes: React.ReactNode[] = [];
  let cursor = 0;

  for (const match of text.matchAll(INLINE_PATTERN)) {
    const [raw, bold, code, linkText, href] = match;
    const start = match.index ?? 0;

    if (start > cursor) {
      nodes.push(text.slice(cursor, start));
    }

    if (bold) {
      nodes.push(
        <strong key={start} className="font-semibold text-white">
          {bold}
        </strong>
      );
    } else if (code) {
      nodes.push(
        <code
          key={start}
          className="px-1.5 py-0.5 rounded bg-slate-800/70 text-sm font-mono text-slate-200"
        >
          {code}
        </code>
      );
    } else {
      nodes.push(
        <a
          key={start}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 transition-opacity hover:opacity-80"
          style={{ color: theme.primary }}
        >
          {linkText}
        </a>
      );
    }

    cursor = start + raw.length;
  }

  if (cursor < text.length) {
    nodes.push(text.slice(cursor));
  }

  return nodes;
}

function renderBlock(block: ContentBlock, index: number, theme: { primary: string; secondary: string }) {
  switch (block.type) {
    case "heading":
      return (
        <h2
          key={index}
          className="text-2xl md:text-3xl font-bold mt-12 mb-4 text-slate-50 tracking-tight"
        >
          {block.text}
        </h2>
      );
    case "subheading":
      return (
        <h3 key={index} className="text-lg md:text-xl font-semibold mt-8 mb-3 text-slate-100">
          {block.text}
        </h3>
      );
    case "paragraph":
      return (
        <p key={index} className="text-slate-300 leading-[1.8] mb-5">
          {renderInline(block.text, theme)}
        </p>
      );
    case "code":
      return (
        <div key={index} className="mb-6 rounded-xl border border-white/10 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/10 bg-white/[0.03]">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
              {block.language}
            </span>
          </div>
          <pre className="bg-white/[0.02] p-4 overflow-x-auto">
            <code className="text-sm font-mono text-slate-200">{block.code}</code>
          </pre>
        </div>
      );
    case "list":
      return (
        <ul key={index} className="text-slate-300 space-y-2.5 mb-5 ml-1">
          {block.items.map((item, i) => (
            <li key={i} className="leading-[1.8] flex gap-3">
              <span
                className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full"
                style={{ backgroundColor: theme.primary }}
                aria-hidden="true"
              />
              <span>{renderInline(item, theme)}</span>
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div key={index} className="mb-6 overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                {block.headers.map((header, i) => (
                  <th
                    key={i}
                    className="py-3 px-4 font-mono text-[11px] uppercase tracking-wider text-slate-400 font-semibold"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-b border-white/[0.06] last:border-0">
                  {row.map((cell, j) => (
                    <td key={j} className="py-3 px-4 text-slate-300">
                      {renderInline(cell, theme)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
      <section className="min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-bold text-slate-50 mb-4">Post not found</h1>
        <p className="text-slate-400 mb-8">
          The blog post you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/blog"
          className="px-6 py-3 rounded-full text-white font-semibold transition-opacity hover:opacity-90"
          style={{ backgroundColor: theme.primary }}
        >
          Back to all posts
        </Link>
      </section>
    );
  }

  return (
    <main>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors mb-10"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <line x1="19" y1="12" x2="5" y2="12" strokeLinecap="round" />
              <polyline points="12 19 5 12 12 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All posts
          </Link>
        </motion.div>

        {/* Metadata */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="flex flex-wrap items-center gap-3 mb-5 font-mono text-xs uppercase tracking-wider"
        >
          <span style={{ color: theme.primary }}>{blog.category}</span>
          <span className="text-slate-700">/</span>
          <span className="text-slate-500">{blog.date}</span>
          <span className="text-slate-700">/</span>
          <span className="text-slate-500">{blog.readTime} read</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold mb-6 text-slate-50 tracking-tight leading-[1.15]"
        >
          {blog.title}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-lg text-slate-400 leading-relaxed mb-7"
        >
          {blog.description}
        </motion.p>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-10 pb-10 border-b border-white/10"
        >
          {blog.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          {blog.content.map((block, index) => renderBlock(block, index, theme))}
        </motion.div>

        {/* Bottom navigation */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-100 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <line x1="19" y1="12" x2="5" y2="12" strokeLinecap="round" />
              <polyline points="12 19 5 12 12 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to all posts
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  );
}
