"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface Theme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  cardBg: string;
}

const defaultTheme: Theme = {
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
  // Load theme from localStorage on mount
  useEffect(() => {
    try {
      const savedTheme = typeof window !== "undefined" && localStorage.getItem("portfolioTheme");
      if (savedTheme) {
        setThemeState(JSON.parse(savedTheme));
      }
    } catch (e) {
      setThemeState(defaultTheme);
    }
  }, []);

  // Apply theme to CSS variables
  useEffect(() => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      root.style.setProperty("--color-primary", theme.primary);
      root.style.setProperty("--color-secondary", theme.secondary);
      root.style.setProperty("--color-accent", theme.accent);
      root.style.setProperty("--color-background", theme.background);
      root.style.setProperty("--color-card-bg", theme.cardBg);

      // Save to localStorage
      localStorage.setItem("portfolioTheme", JSON.stringify(theme));
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const resetTheme = () => {
    setThemeState(defaultTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
