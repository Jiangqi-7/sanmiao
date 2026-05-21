"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { BAGUA } from '@/lib/design-system';
import { Bookmark } from '@/lib/db/types';

const COLORS = ["vermilion", "gold", "peacock", "sky", "thunder"];

interface SearchResult {
  type: 'bookmark' | 'prompt' | 'puzzle' | 'creature';
  id: string;
  title: string;
  description?: string;
  category?: string;
  url?: string;
  href: string;
}

function LightningEffect() {
  const [bolts, setBolts] = useState<Array<{ id: number; x: number; delay: number; angle: number; length: number }>>([]);

  useEffect(() => {
    const newBolts = [];
    for (let i = 0; i < 3; i++) {
      newBolts.push({
        id: i,
        x: 5 + Math.random() * 90,
        delay: Math.random() * 15,
        angle: Math.random() * 20 - 10,
        length: 30 + Math.random() * 50,
      });
    }
    setBolts(newBolts);
  }, []);

  return (
    <div className="lightning-container">
      {bolts.map((bolt) => (
        <div
          key={bolt.id}
          className="lightning-bolt"
          style={{
            left: `${bolt.x}%`,
            animationDelay: `${bolt.delay}s`,
            transform: `rotate(${bolt.angle}deg)`,
            height: `${bolt.length}vh`,
          }}
        />
      ))}
    </div>
  );
}

const TYPE_LABELS: Record<string, string> = {
  bookmark: '书签',
  prompt: '提示词',
  puzzle: '谜题',
  creature: '异兽',
};

const TYPE_ICONS: Record<string, string> = {
  bookmark: '🔗',
  prompt: '💡',
  puzzle: '🧩',
  creature: '🦄',
};

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const search = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      // Search bookmarks
      const bookmarkRes = await fetch(`/api/bookmarks/search?q=${encodeURIComponent(q)}`);
      const bookmarkData = await bookmarkRes.json();

      const bookmarkResults: SearchResult[] = (bookmarkData.data || []).map((b: Bookmark) => ({
        type: 'bookmark' as const,
        id: b.id,
        title: b.title,
        description: b.description,
        category: b.category,
        url: b.url,
        href: b.url,
      }));

      // Search prompts (local search for now)
      const promptsRes = await fetch('/prompts');
      const promptsText = await promptsRes.text();
      const promptMatches = searchInText(promptsText, q);

      // Search puzzles
      const puzzlesRes = await fetch('/api/puzzles');
      const puzzlesData = await puzzlesRes.json();
      const puzzleResults: SearchResult[] = (puzzlesData.puzzles || [])
        .filter((p: { title: string; id: string }) =>
          p.title.toLowerCase().includes(q.toLowerCase())
        )
        .slice(0, 5)
        .map((p: { title: string; id: string }) => ({
          type: 'puzzle' as const,
          id: p.id,
          title: p.title,
          href: `/puzzles/${encodeURIComponent(p.id)}`,
        }));

      // Search creatures
      const creaturesRes = await fetch('/shan-hai-jing');
      const creaturesText = await creaturesRes.text();
      const creatureMatches = searchInText(creaturesText, q);

      setResults([...bookmarkResults, ...promptMatches, ...puzzleResults, ...creatureMatches]);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      search(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, search]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }}>
      <LightningEffect />
      <div className="h-px gradient-border" />

      <main className="max-w-[800px] mx-auto px-6 py-20">
        {/* 页面标题 */}
        <header className="mb-12 text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center gap-3" style={{ top: "-20px" }}>
            {COLORS.map((c, i) => (
              <div key={c} className={`color-dot ${c}`} style={{ animationDelay: `${i * 0.3}s` }} />
            ))}
          </div>

          <h1
            className={`text-5xl font-light mb-4 tracking-[0.3em] transition-all duration-1000 thunder-glow ${loaded ? "opacity-100" : "opacity-0"}`}
            style={{ color: "var(--text-primary)", fontFamily: "serif" }}
          >
            搜索
          </h1>
          <p
            className={`text-sm tracking-[0.5em] transition-all duration-1000 delay-200 ${loaded ? "opacity-100" : "opacity-0"}`}
            style={{ color: "var(--text-muted)" }}
          >
            全站内容检索
          </p>
        </header>

        {/* 搜索框 */}
        <div className="mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="输入关键词搜索..."
            className="w-full px-6 py-4 text-lg border rounded-xl"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--bg-card)",
              color: "var(--text-primary)",
            }}
            autoFocus
          />
        </div>

        {/* 搜索结果 */}
        <div className="space-y-4">
          {loading && (
            <p className="text-center py-12" style={{ color: "var(--text-muted)" }}>搜索中...</p>
          )}

          {!loading && query && results.length === 0 && (
            <p className="text-center py-12" style={{ color: "var(--text-muted)" }}>
              没有找到 "{query}" 相关内容
            </p>
          )}

          {!loading && results.length > 0 && (
            <>
              <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                找到 {results.length} 个结果
              </p>
              <div className="space-y-3">
                {results.map((result, index) => (
                  <a
                    key={`${result.type}-${result.id}-${index}`}
                    href={result.url || result.href}
                    target={result.url ? "_blank" : undefined}
                    rel={result.url ? "noopener noreferrer" : undefined}
                    className="block p-4 border rounded-lg hover:shadow-md transition-all"
                    style={{
                      borderColor: "var(--border)",
                      backgroundColor: "var(--bg-card)",
                    }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-lg">{TYPE_ICONS[result.type]}</span>
                      <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-muted)" }}>
                        {TYPE_LABELS[result.type]}
                      </span>
                      {result.category && (
                        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                          {result.category}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-medium" style={{ color: "var(--text-primary)" }}>
                      {result.title}
                    </h3>
                    {result.description && (
                      <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                        {result.description}
                      </p>
                    )}
                  </a>
                ))}
              </div>
            </>
          )}

          {!query && (
            <div className="text-center py-12">
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                开始输入关键词搜索书签、提示词、谜题、异兽等内容
              </p>
              <p className="text-xs mt-4" style={{ color: "var(--text-muted)" }}>
                按 <kbd className="px-2 py-1 border rounded" style={{ borderColor: "var(--border)" }}>S</kbd> 随时打开搜索
              </p>
            </div>
          )}
        </div>

        {/* 底部 */}
        <footer className="mt-20 pt-8 text-center border-t" style={{ borderColor: "var(--border)" }}>
          <Link href="/" className="text-sm" style={{ color: "var(--text-muted)" }}>
            ← 返回首页
          </Link>
        </footer>
      </main>

      <div className="h-px gradient-border" />
    </div>
  );
}

// Simple text search helper
function searchInText(text: string, query: string): SearchResult[] {
  const results: SearchResult[] = [];
  const lowerQuery = query.toLowerCase();

  // Simple pattern matching for titles
  const titleMatches = text.match(/<h[1-3][^>]*>([^<]+)<\/h[1-3]>/gi) || [];
  titleMatches.forEach((match, i) => {
    const title = match.replace(/<[^>]+>/g, '');
    if (title.toLowerCase().includes(lowerQuery)) {
      results.push({
        type: 'prompt',
        id: `prompt-${i}`,
        title: title,
        href: '/prompts',
      });
    }
  });

  return results.slice(0, 10);
}