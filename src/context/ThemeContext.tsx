"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface Theme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  cardBg: string;
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

export function colorsFromHue(hue: number) {
  return {
    primary: hslToHex(hue, 70, 60),
    secondary: hslToHex((hue + 30) % 360, 75, 65),
    accent: hslToHex((hue + 200) % 360, 70, 60),
  };
}

const defaultTheme: Theme = {
  hue: 270,
  primary: "#a855f7",
  secondary: "#ec4899",
  accent: "#06b6d4",
  background: "#09090b",
  cardBg: "#18181b",
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
        // Migrate old saves that lack hue
        if (parsed.hue === undefined) parsed.hue = defaultTheme.hue;
        setThemeState(parsed);
      }
    } catch {
      setThemeState(defaultTheme);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      root.style.setProperty("--color-primary", theme.primary);
      root.style.setProperty("--color-secondary", theme.secondary);
      root.style.setProperty("--color-accent", theme.accent);
      root.style.setProperty("--color-background", theme.background);
      root.style.setProperty("--color-card-bg", theme.cardBg);
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
