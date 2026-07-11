"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface Theme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  hue: number;
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

// All colors are derived from a single hue as shades of the same color,
// so the whole portfolio stays monochromatic and changes with one slider.
export function colorsFromHue(hue: number) {
  return {
    primary: hslToHex(hue, 70, 60),
    secondary: hslToHex(hue, 75, 70),
    accent: hslToHex(hue, 65, 50),
  };
}

const DEFAULT_HUE = 270;

const defaultTheme: Theme = {
  hue: DEFAULT_HUE,
  ...colorsFromHue(DEFAULT_HUE),
  background: "#09090b",
};

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);

  useEffect(() => {
    try {
      const saved = typeof window !== "undefined" && localStorage.getItem("portfolioTheme");
      if (saved) {
        const parsed = JSON.parse(saved);
        const hue = parsed.hue ?? defaultTheme.hue;
        // Always re-derive colors from the hue so a single slider drives everything.
        setThemeState({ ...defaultTheme, ...parsed, hue, ...colorsFromHue(hue) });
      }
    } catch {
      setThemeState(defaultTheme);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolioTheme", JSON.stringify(theme));
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => setThemeState(newTheme);
  const resetTheme = () => setThemeState(defaultTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
