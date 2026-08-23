"use client";

import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { blogPosts } from "@/data/blog-data";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import BlogCard from "./ui/BlogCard";
import { gridColsForCount } from "./ui/grid";

const Blogs = () => {
  const { theme } = useTheme();
  const latest = blogPosts.slice(0, 3);

  return (
    <section id="blogs" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            index="05"
            title="Writing"
            description="Articles on web development, machine learning, and the things I build."
          />
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: theme.primary }}
          >
            View all articles
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        <div className={`grid gap-6 ${gridColsForCount(latest.length)}`}>
          {latest.map((blog, idx) => (
            <Reveal key={blog.id} delay={idx * 0.08} className="h-full">
              <BlogCard blog={blog} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 sm:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold"
            style={{ color: theme.primary }}
          >
            View all articles →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
