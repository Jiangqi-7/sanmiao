"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";

interface PageTransitionContextType {
  isTransitioning: boolean;
  startTransition: (href: string) => void;
}

const PageTransitionContext = createContext<PageTransitionContextType>({
  isTransitioning: false,
  startTransition: () => {},
});

export function usePageTransition() {
  return useContext(PageTransitionContext);
}

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [destination, setDestination] = useState("");

  const startTransition = useCallback((href: string) => {
    setIsTransitioning(true);
    setDestination(href);
  }, []);

  useEffect(() => {
    if (isTransitioning && destination) {
      const timer = setTimeout(() => {
        window.location.href = destination;
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, destination]);

  return (
    <PageTransitionContext.Provider value={{ isTransitioning, startTransition }}>
      {children}
      <div
        className="page-transition"
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "var(--bg-primary)",
          zIndex: 9999,
          opacity: isTransitioning ? 1 : 0,
          pointerEvents: isTransitioning ? "all" : "none",
          transition: "opacity 0.3s ease",
        }}
      />
    </PageTransitionContext.Provider>
  );
}