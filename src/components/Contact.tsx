"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

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
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-4xl mx-auto w-full"
      >
        {/* Section Title */}
        <motion.div variants={itemVariants} className="mb-12 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Have a project in mind or just want to chat? Feel free to reach out!
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-cyan-400 rounded mx-auto mt-4" />
        </motion.div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Email */}
          <motion.a
            variants={itemVariants}
            href="mailto:contact@example.com"
            whileHover={{ scale: 1.05 }}
            className="group text-center"
          >
            <div className="bg-slate-800/50 border border-slate-700 group-hover:border-blue-400 rounded-lg p-8 transition-colors">
              <div className="text-4xl mb-4">✉️</div>
              <h3 className="text-xl font-semibold text-slate-200 mb-2">Email</h3>
              <p className="text-blue-400 group-hover:text-cyan-400 transition-colors">
                contact@example.com
              </p>
            </div>
          </motion.a>

          {/* Phone */}
          <motion.a
            variants={itemVariants}
            href="tel:+1234567890"
            whileHover={{ scale: 1.05 }}
            className="group text-center"
          >
            <div className="bg-slate-800/50 border border-slate-700 group-hover:border-blue-400 rounded-lg p-8 transition-colors">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold text-slate-200 mb-2">Phone</h3>
              <p className="text-blue-400 group-hover:text-cyan-400 transition-colors">
                +1 (234) 567-890
              </p>
            </div>
          </motion.a>

          {/* Location */}
          <motion.div
            variants={itemVariants}
            className="group text-center"
          >
            <div className="bg-slate-800/50 border border-slate-700 group-hover:border-blue-400 rounded-lg p-8 transition-colors">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-xl font-semibold text-slate-200 mb-2">Location</h3>
              <p className="text-blue-400 group-hover:text-cyan-400 transition-colors">
                San Francisco, CA
              </p>
            </div>
          </motion.div>
        </div>

        {/* Contact Form */}
        <motion.form
          variants={itemVariants}
          onSubmit={handleSubmit}
          className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 md:p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-slate-300 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-colors"
                placeholder="Your name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-300 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-colors"
                placeholder="your@email.com"
              />
            </div>
          </div>

          {/* Subject Field */}
          <div className="mb-6">
            <label
              htmlFor="subject"
              className="block text-sm font-semibold text-slate-300 mb-2"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-colors"
              placeholder="Project inquiry"
            />
          </div>

          {/* Message Field */}
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-slate-300 mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-colors resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={submitted}
            className={`w-full py-3 font-semibold rounded-lg transition-all ${
              submitted
                ? "bg-green-500 text-white"
                : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/50"
            }`}
          >
            {submitted ? "✓ Message Sent!" : "Send Message"}
          </motion.button>
        </motion.form>
      </motion.div>
    </section>
  );
};

export default Contact;