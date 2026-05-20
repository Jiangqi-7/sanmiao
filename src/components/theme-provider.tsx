"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "simple" | "colorful";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "simple",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("simple");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved === "colorful" ? "colorful" : "");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "simple" ? "colorful" : "simple";
    setTheme(next);
    localStorage.setItem("theme", next);
    if (next === "colorful") {
      document.documentElement.setAttribute("data-theme", "colorful");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}