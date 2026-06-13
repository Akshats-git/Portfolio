"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

const Contact = () => {
  const { theme } = useTheme();
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
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})` }}
            >
              Get In Touch
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Have a project in mind or just want to chat? Feel free to reach out!
          </p>
          <div className="h-1 w-20 rounded mx-auto mt-4" style={{ backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})` }} />
        </motion.div>

        {/* Contact Grid (cards) */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Email */}
          <motion.a
            variants={itemVariants}
            href="mailto:contact@example.com"
            whileHover={{ scale: 1.02 }}
            className="group text-center"
          >
            <div
              className="rounded-lg p-8 transition-transform transform hover:-translate-y-1 shadow-sm hover:shadow-lg mx-2"
              style={{ backgroundColor: 'rgba(15,23,42,0.65)', border: `1px solid ${theme.primary}` }}
            >
              <div
                className="w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-4"
                style={{ backgroundImage: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`, color: '#fff' }}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-100 mb-2">Email</h3>
              <p className="text-sm" style={{ color: theme.secondary, fontWeight: 600 }}>
                contact@example.com
              </p>
            </div>
          </motion.a>

          {/* Phone */}
          <motion.a
            variants={itemVariants}
            href="tel:+1234567890"
            whileHover={{ scale: 1.02 }}
            className="group text-center"
          >
            <div
              className="rounded-lg p-8 transition-transform transform hover:-translate-y-1 shadow-sm hover:shadow-lg mx-2"
              style={{ backgroundColor: 'rgba(15,23,42,0.65)', border: `1px solid ${theme.primary}` }}
            >
              <div
                className="w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-4"
                style={{ backgroundImage: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`, color: '#fff' }}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="14" height="20" x="5" y="2" rx="2" />
                  <path d="M12 18h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-100 mb-2">Phone</h3>
              <p className="text-sm" style={{ color: theme.secondary, fontWeight: 600 }}>
                +1 (234) 567-890
              </p>
            </div>
          </motion.a>

          {/* Location */}
          <motion.div variants={itemVariants} className="group text-center">
            <div
              className="rounded-lg p-8 transition-transform transform hover:-translate-y-1 shadow-sm hover:shadow-lg mx-2"
              style={{ backgroundColor: 'rgba(15,23,42,0.65)', border: `1px solid ${theme.primary}` }}
            >
              <div
                className="w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-4"
                style={{ backgroundImage: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`, color: '#fff' }}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-100 mb-2">Location</h3>
              <p className="text-sm" style={{ color: theme.secondary, fontWeight: 600 }}>
                San Francisco, CA
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          variants={itemVariants}
          onSubmit={handleSubmit}
          className="bg-slate-800/50 border rounded-lg p-8 md:p-12"
          style={{ borderColor: theme.primary }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-slate-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-slate-900/60 border rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none transition-colors"
                style={{ borderColor: theme.primary }}
                placeholder="Your name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-slate-900/60 border rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none transition-colors"
                style={{ borderColor: theme.primary }}
                placeholder="your@email.com"
              />
            </div>
          </div>

          {/* Subject Field */}
          <div className="mb-6">
            <label htmlFor="subject" className="block text-sm font-semibold text-slate-300 mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full bg-slate-900/60 border rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none transition-colors"
              style={{ borderColor: theme.primary }}
              placeholder="Project inquiry"
            />
          </div>

          {/* Message Field */}
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-semibold text-slate-300 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full bg-slate-900/60 border rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none transition-colors resize-none"
              style={{ borderColor: theme.primary }}
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
              submitted ? "bg-green-500 text-white" : "text-white"
            }`}
            style={submitted ? undefined : { backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})` }}
          >
            {submitted ? (
              <span className="flex items-center justify-center gap-2">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Message Sent!
              </span>
            ) : "Send Message"}
          </motion.button>
        </motion.form>
      </motion.div>
    </section>
  );
};

export default Contact;