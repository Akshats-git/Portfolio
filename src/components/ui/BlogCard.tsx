"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import type { BlogPost } from "@/data/blog-data";
import Tag from "./Tag";

const BlogCard = ({ blog }: { blog: BlogPost }) => {
  const { theme } = useTheme();

  return (
    <motion.div whileHover={{ y: -6 }} className="h-full">
      <Link href={`/blog/${blog.slug}`} className="block h-full">
        <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-white/20">
          <div className="flex items-center justify-between mb-4">
            <span
              className="font-mono text-xs uppercase tracking-wider"
              style={{ color: theme.primary }}
            >
              {blog.category}
            </span>
            <span className="text-slate-500 text-xs">{blog.date}</span>
          </div>

          <h3 className="text-lg font-bold text-slate-50 mb-2.5 leading-snug">
            {blog.title}
          </h3>

          <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
            {blog.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            {blog.tags.slice(0, 3).map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10 text-sm">
            <span className="text-slate-500">{blog.readTime} read</span>
            <span className="font-medium" style={{ color: theme.primary }}>
              Read more →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
