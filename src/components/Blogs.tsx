"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { blogPosts } from "@/data/blog-data";

const Blogs = () => {
  const { theme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      id="blogs"
      className="relative min-h-screen overflow-hidden py-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: theme.background }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle at top, ${theme.primary}22, transparent 42%), radial-gradient(circle at bottom right, ${theme.secondary}18, transparent 36%)`,
        }}
      />
      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})` }}>
            Blog Posts
          </h2>
          <p className="text-slate-400 text-lg">
            Articles on web development, machine learning, and the things I build.
          </p>
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {blogPosts.map((blog) => (
            <motion.div
              key={blog.id}
              variants={itemVariants}
              whileHover={{ translateY: -8 }}
              className="group cursor-pointer"
            >
              <Link href={`/blog/${blog.slug}`} className="block h-full">
                <div className="relative h-full border border-slate-800 rounded-xl p-6 bg-slate-900/30 backdrop-blur-sm transition-all duration-300 overflow-hidden" style={{ borderColor: theme.primary }}>
                  {/* Background gradient */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{ backgroundImage: `linear-gradient(to bottom right, ${theme.primary}, ${theme.secondary}, ${theme.accent})` }}
                  />

                  <div className="relative z-10">
                    {/* Category and Date */}
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white"
                        style={{ backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})` }}
                      >
                        {blog.category}
                      </span>
                      <span className="text-slate-500 text-xs">{blog.date}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3 transition-colors" style={{ color: theme.primary }}>
                      {blog.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-400 mb-4 line-clamp-3">
                      {blog.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 rounded-md bg-slate-800/50 text-slate-300 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Read Time and CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                      <span className="text-sm text-slate-500">{blog.readTime} read</span>
                      <span
                        className="transition-colors text-sm font-medium"
                        style={{ color: theme.primary }}
                      >
                        Read More →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/#blogs">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-block px-8 py-3 rounded-lg text-white font-semibold transition-all"
              style={{ backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})` }}
            >
              View All Articles
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Blogs;
