"use client";

import { useEffect, useState } from 'react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progressPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setProgress(progressPercent);
      setVisible(scrollTop > 300);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-2">
      {/* Progress bar */}
      <div
        className="absolute -top-12 w-1 h-12 overflow-hidden rounded-full bg-[var(--bg-secondary)]"
        style={{ display: visible ? 'block' : 'none' }}
      >
        <div
          className="w-full bg-[var(--accent)] transition-all duration-150"
          style={{ height: `${progress}%`, position: 'absolute', bottom: 0 }}
        />
      </div>

      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className="w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:scale-110"
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border)",
          color: "var(--text-secondary)",
          display: visible ? 'flex' : 'none',
        }}
        title="返回顶部"
      >
        <span className="text-lg">↑</span>
      </button>
    </div>
  );
}