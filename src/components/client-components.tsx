"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from './theme-provider';

export function ClientComponents() {
  const router = useRouter();
  const { toggleTheme } = useTheme();

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Ignore if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // S key to open search
      if (e.key === 's' || e.key === 'S') {
        e.preventDefault();
        router.push('/search');
      }

      // T key to toggle theme
      if (e.key === 't' || e.key === 'T') {
        e.preventDefault();
        toggleTheme();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router, toggleTheme]);

  return null;
}