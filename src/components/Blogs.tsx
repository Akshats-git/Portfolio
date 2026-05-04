"use client";

import { motion } from "framer-motion";

interface Blog {
  id: number;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  color: string;
}

const Blogs = () => {
  const blogs: Blog[] = [
    {
      id: 1,
      title: "Getting Started with Next.js 15",
      description:
        "A comprehensive guide to building modern web applications with Next.js 15, covering App Router, Server Components, and performance optimization.",
      date: "March 15, 2024",
      readTime: "8 min",
      category: "Web Development",
      tags: ["Next.js", "React", "Web Development"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      title: "Machine Learning Model Deployment",
      description:
        "Learn how to deploy machine learning models to production, covering containerization, scaling, and monitoring strategies.",
      date: "March 10, 2024",
      readTime: "12 min",
      category: "Machine Learning",
      tags: ["ML", "DevOps", "Python"],
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      title: "Advanced TypeScript Patterns",
      description:
        "Explore advanced TypeScript patterns including generics, conditional types, and utility types for writing type-safe applications.",
      date: "March 5, 2024",
      readTime: "10 min",
      category: "TypeScript",
      tags: ["TypeScript", "Best Practices"],
      color: "from-orange-500 to-red-500",
    },
    {
      id: 4,
      title: "Building Real-time Applications",
      description:
        "Discover how to build real-time applications using WebSocket, socket.io, and Firebase for instant data synchronization.",
      date: "February 28, 2024",
      readTime: "9 min",
      category: "Web Development",
      tags: ["WebSocket", "Real-time", "Backend"],
      color: "from-green-500 to-emerald-500",
    },
  ];

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
      className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Blog Posts
          </h2>
          <p className="text-slate-400 text-lg">
            Insights and articles about web development, machine learning, and technology
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
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              variants={itemVariants}
              whileHover={{ translateY: -8 }}
              className="group cursor-pointer"
            >
              <div className="relative h-full border border-slate-800 rounded-xl p-6 bg-slate-900/30 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300 overflow-hidden">
                {/* Background gradient */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br ${blog.color}`}
                />

                <div className="relative z-10">
                  {/* Category and Date */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${blog.color} text-white`}
                    >
                      {blog.category}
                    </span>
                    <span className="text-slate-500 text-xs">{blog.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
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
                        className="text-xs px-2 py-1 rounded-md bg-slate-800/50 text-slate-300 hover:bg-slate-700 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read Time and CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                    <span className="text-sm text-slate-500">{blog.readTime} read</span>
                    <motion.a
                      href="#"
                      whileHover={{ x: 4 }}
                      className="text-blue-400 hover:text-cyan-400 transition-colors text-sm font-medium"
                    >
                      Read More →
                    </motion.a>
                  </div>
                </div>
              </div>
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
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            className="inline-block px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all"
          >
            View All Articles
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Blogs;
