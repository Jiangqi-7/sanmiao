"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/components/theme-provider';

export function useKeyboardShortcuts() {
  const router = useRouter();

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
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);
}

export function ThemeToggleListener() {
  const { toggleTheme } = useTheme();

  useEffect(() => {
    function handleToggleEvent() {
      toggleTheme();
    }
    document.addEventListener('toggle-theme', handleToggleEvent);
    return () => document.removeEventListener('toggle-theme', handleToggleEvent);
  }, [toggleTheme]);

  return null;
}