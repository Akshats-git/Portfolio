"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

const ThemePanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, resetTheme } = useTheme();

  const handleColorChange = (key: keyof typeof theme, value: string) => {
    setTheme({
      ...theme,
      [key]: value,
    });
  };

  const colorOptions = [
    { key: "primary", label: "Primary Color" },
    { key: "secondary", label: "Secondary Color" },
    { key: "accent", label: "Accent Color" },
    { key: "background", label: "Background Color" },
    { key: "cardBg", label: "Card Background" },
  ];

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-6 bottom-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center text-white text-xl"
        title="Open theme customizer"
      >
        🎨
      </motion.button>

      {/* Theme Panel */}
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
              initial={{ opacity: 0, x: 400 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 400 }}
              transition={{ duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-full sm:w-96 bg-slate-900 border-l border-slate-700 shadow-xl z-40 overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-slate-900/95 backdrop-blur border-b border-slate-700 p-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>🎨</span> Theme Customizer
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Color Pickers */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Colors</h3>
                  {colorOptions.map((option) => (
                    <motion.div
                      key={option.key}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3"
                    >
                      <label className="flex-1 text-slate-300 text-sm">
                        {option.label}
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={theme[option.key as keyof typeof theme]}
                          onChange={(e) =>
                            handleColorChange(
                              option.key as keyof typeof theme,
                              e.target.value
                            )
                          }
                          className="w-12 h-10 rounded cursor-pointer border-2 border-slate-700 hover:border-blue-500 transition-colors"
                        />
                        <input
                          type="text"
                          value={theme[option.key as keyof typeof theme]}
                          onChange={(e) =>
                            handleColorChange(
                              option.key as keyof typeof theme,
                              e.target.value
                            )
                          }
                          className="w-24 px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded border border-slate-700 focus:border-blue-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Preview */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white">Preview</h3>
                  <div className="space-y-2">
                    <div
                      className="w-full h-12 rounded-lg transition-all"
                      style={{ backgroundColor: theme.primary }}
                      title="Primary color"
                    />
                    <div className="flex gap-2">
                      <div
                        className="flex-1 h-8 rounded transition-all"
                        style={{ backgroundColor: theme.secondary }}
                        title="Secondary color"
                      />
                      <div
                        className="flex-1 h-8 rounded transition-all"
                        style={{ backgroundColor: theme.accent }}
                        title="Accent color"
                      />
                    </div>
                  </div>
                </div>

                {/* Reset Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={resetTheme}
                  className="w-full py-2 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium text-sm"
                >
                  Reset to Default
                </motion.button>

                {/* Info */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-xs text-slate-400 space-y-1">
                  <p>✓ Colors are saved to your browser</p>
                  <p>✓ They persist across sessions</p>
                  <p>✓ Use hex values or the color picker</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ThemePanel;
