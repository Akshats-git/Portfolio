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
        title="Customize theme"
        className="fixed right-5 bottom-5 z-40 w-12 h-12 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
        style={{ backgroundImage: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="13.5" cy="6.5" r=".5" fill="white"/>
          <circle cx="17.5" cy="10.5" r=".5" fill="white"/>
          <circle cx="8.5"  cy="7.5"  r=".5" fill="white"/>
          <circle cx="6.5"  cy="12.5" r=".5" fill="white"/>
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
        </svg>
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
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, x: 320 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 320 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 h-full w-72 bg-slate-950 border-l border-slate-800 z-40 flex flex-col"
            >
              {/* Header */}
              <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
                <span className="text-white font-semibold tracking-wide">Theme</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-500 hover:text-white transition-colors text-lg leading-none"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto px-5 py-6 space-y-7">

                {/* Color slider */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-slate-400">Color</span>
                    <span
                      className="w-5 h-5 rounded-full border-2 border-slate-700"
                      style={{ backgroundColor: theme.primary }}
                    />
                  </div>

                  {/* Rainbow track + range input */}
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

                  {/* Live preview of the single derived color */}
                  <div
                    className="h-12 rounded-lg mt-4"
                    style={{ backgroundImage: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="px-5 py-4 border-t border-slate-800">
                <button
                  onClick={resetTheme}
                  className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-sm transition-colors"
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
