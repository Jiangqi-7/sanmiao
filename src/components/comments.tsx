"use client";

import { useEffect, useState } from 'react';

interface CommentsProps {
  path?: string;
}

export function Comments({ path }: CommentsProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const container = document.getElementById('comments-container');
    if (!container) return;

    // Clear previous comments
    container.innerHTML = '';

    // Create Giscus script
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'Jiangqi-7/sanmiao');
    script.setAttribute('data-repo-id', 'R_kgDOSY4Fag');
    script.setAttribute('data-category', 'Announcements');
    script.setAttribute('data-category-id', 'DIC_kwDOSY4Fas4C9ihm');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'preferred_color_scheme');
    script.setAttribute('data-lang', 'zh-CN');
    script.crossOrigin = 'anonymous';
    script.async = true;

    script.onload = () => setLoaded(true);

    container.appendChild(script);
  }, [path]);

  return (
    <div className="mt-12 pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
      <h3 className="text-sm font-medium mb-4" style={{ color: 'var(--text-primary)' }}>
        评论
      </h3>
      <div
        className="p-6 border"
        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}
      >
        {!loaded && (
          <p style={{ color: 'var(--text-muted)' }}>加载评论...</p>
        )}
        <div id="comments-container" />
      </div>
    </div>
  );
}