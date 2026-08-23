"use client";

import { motion } from "framer-motion";
import { blogPosts } from "@/data/blog-data";
import Footer from "@/components/Footer";
import PageHeader from "@/components/ui/PageHeader";
import BlogCard from "@/components/ui/BlogCard";
import { gridColsForCount } from "@/components/ui/grid";

export default function BlogIndexPage() {
  return (
    <main>
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <PageHeader
          title="Writing"
          description="Long-form notes on the systems I build — machine learning, backend engineering, and the messy parts in between."
        />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
          className={`grid gap-6 ${gridColsForCount(blogPosts.length)}`}
        >
          {blogPosts.map((blog) => (
            <motion.div
              key={blog.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="h-full"
            >
              <BlogCard blog={blog} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
