"use client";

import { useEffect, useState } from 'react';

interface CommentsProps {
  title?: string;
  path?: string;
}

export function Comments({ title, path }: CommentsProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Load Giscus comments
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'Jiangqi-7/sanmiao');
    script.setAttribute('data-repo-id', 'R_kgDOO');
    script.setAttribute('data-category', 'General');
    script.setAttribute('data-category-id', 'DIC_kwDOO');
    script.setAttribute('data-mapping', 'specific');
    script.setAttribute('data-term', path || window.location.pathname);
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'preferred_color_scheme');
    script.setAttribute('data-lang', 'zh-CN');
    script.setAttribute('data-loading', 'lazy');
    script.crossOrigin = 'anonymous';
    script.async = true;

    script.onload = () => setLoaded(true);

    const container = document.getElementById('comments-container');
    if (container) {
      container.appendChild(script);
    }

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [path]);

  return (
    <div className="mt-12 pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
      <h3 className="text-sm font-medium mb-4" style={{ color: 'var(--text-primary)' }}>
        评论
      </h3>
      <div
        className="p-6 border text-center"
        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}
      >
        {!loaded && (
          <p style={{ color: 'var(--text-muted)' }}>加载评论组件...</p>
        )}
        <div id="comments-container" />
      </div>
    </div>
  );
}