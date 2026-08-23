"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTheme, colorsFromHue } from "@/context/ThemeContext";

const ThemePanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, resetTheme } = useTheme();
  const hue = theme.hue ?? 270;

  const handleHue = (newHue: number) => {
    setTheme({ ...theme, hue: newHue, ...colorsFromHue(newHue) });
  };

  return (
    <>
      {/* Trigger button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        onClick={() => setIsOpen(true)}
        title="Customize accent color"
        className="fixed right-5 bottom-5 z-40 w-11 h-11 rounded-full border border-white/15 bg-[#0c0c0e]/90 backdrop-blur-md shadow-lg hover:border-white/30 transition-colors flex items-center justify-center"
      >
        <span
          className="h-3.5 w-3.5 rounded-full"
          style={{ backgroundColor: theme.primary }}
          aria-hidden="true"
        />
        <span className="sr-only">Customize accent color</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, x: 320 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 320 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 h-full w-72 bg-[#0a0a0c] border-l border-white/10 z-40 flex flex-col"
            >
              {/* Header */}
              <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                <span className="text-slate-100 font-semibold text-sm">Accent color</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-500 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-500">Hue</span>
                    <span
                      className="w-4 h-4 rounded-full border border-white/20"
                      style={{ backgroundColor: theme.primary }}
                    />
                  </div>

                  <div className="relative h-5 flex items-center">
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background:
                          "linear-gradient(to right, #f00, #ff0 16.6%, #0f0 33.3%, #0ff 50%, #00f 66.6%, #f0f 83.3%, #f00)",
                      }}
                    />
                    <input
                      type="range"
                      min={0}
                      max={359}
                      value={hue}
                      onChange={(e) => handleHue(Number(e.target.value))}
                      className="hue-slider relative w-full"
                    />
                  </div>

                  <div
                    className="h-11 rounded-xl mt-4 border border-white/10"
                    style={{ backgroundColor: theme.primary }}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="px-5 py-4 border-t border-white/10">
                <button
                  onClick={resetTheme}
                  className="w-full py-2.5 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] text-slate-300 hover:text-white text-sm transition-colors"
                >
                  Reset to default
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ThemePanel;
