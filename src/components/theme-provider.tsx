"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "simple" | "colorful" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  cycleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "simple",
  toggleTheme: () => {},
  cycleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("simple");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme;
    if (saved) {
      setTheme(saved);
      applyTheme(saved);
    }
  }, []);

  const applyTheme = (t: Theme) => {
    document.documentElement.removeAttribute("data-theme");
    if (t === "colorful") {
      document.documentElement.setAttribute("data-theme", "colorful");
    } else if (t === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  };

  const toggleTheme = () => {
    const next: Theme = theme === "simple" ? "colorful" : "simple";
    setTheme(next);
    localStorage.setItem("theme", next);
    applyTheme(next);
  };

  const cycleTheme = () => {
    const order: Theme[] = ["simple", "colorful", "dark"];
    const currentIndex = order.indexOf(theme);
    const next = order[(currentIndex + 1) % order.length];
    setTheme(next);
    localStorage.setItem("theme", next);
    applyTheme(next);
  };

  const toggleThemeRef = { current: toggleTheme };

  useEffect(() => {
    function handleToggleEvent() {
      toggleThemeRef.current();
    }
    document.addEventListener('toggle-theme', handleToggleEvent);
    return () => document.removeEventListener('toggle-theme', handleToggleEvent);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}