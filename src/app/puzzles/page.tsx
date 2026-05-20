"use client";

/**
 * 推理阁 - 谜题列表
 */
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { puzzles } from '@/lib/puzzles';

const PAGE_SIZE = 7;

export default function PuzzleListPage() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setTotalPages(Math.ceil(puzzles.length / PAGE_SIZE));
  }, []);

  const currentPuzzles = puzzles.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const startIndex = (page - 1) * PAGE_SIZE + 1;

  function getPageNumbers(): (number | '...')[] {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | '...')[] = [];
    if (page <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i);
      pages.push('...');
      pages.push(totalPages);
    } else if (page >= totalPages - 3) {
      pages.push(1);
      pages.push('...');
      for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = page - 1; i <= page + 1; i++) pages.push(i);
      pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fafafa' }}>
      {/* 顶部细线 */}
      <div className="h-px" style={{ backgroundColor: '#1a1a1a' }} />

      {/* 主内容 */}
      <main className="max-w-[900px] mx-auto px-6 py-16">
        {/* 页面标题 */}
        <header className="mb-12">
          <Link href="/" className="text-sm text-neutral-400 hover:text-neutral-600 mb-4 block">
            ← 返回
          </Link>
          <h1 className="text-4xl font-light tracking-wider" style={{ color: '#1a1a1a', fontFamily: 'serif' }}>
            推理阁
          </h1>
          <p className="text-sm text-neutral-400 mt-2">烧脑谜题，静待智者拆解</p>
        </header>

        {/* 谜题列表 */}
        <div className="space-y-4 mb-8">
          {currentPuzzles.map((puzzle, index) => (
            <Link
              key={puzzle.id}
              href={`/puzzles/${encodeURIComponent(puzzle.id)}`}
              className="block p-6 border transition-all duration-200 hover:border-neutral-800 group"
              style={{ borderColor: '#e5e5e5' }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-xs text-neutral-400 w-8">#{startIndex + index}</span>
                  <span
                    className="text-lg group-hover:text-neutral-600 transition-colors"
                    style={{ color: '#1a1a1a', fontFamily: 'serif' }}
                  >
                    {puzzle.title}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-neutral-400">{puzzle.author}</span>
                  <span className="text-neutral-300 group-hover:text-neutral-600 transition-colors">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 分页 */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page <= 1}
              className="px-3 py-1 text-sm border border-neutral-300 hover:border-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              上一页
            </button>

            {getPageNumbers().map((p, i) =>
              p === '...' ? (
                <span key={`ellipsis-${i}`} className="px-2 text-neutral-400">...</span>
              ) : (
                <button
                  key={p}
                  onClick={() => setPage(p as number)}
                  className={`px-3 py-1 text-sm border ${
                    page === p
                      ? 'bg-neutral-900 text-white border-neutral-900'
                      : 'border-neutral-300 hover:border-neutral-900'
                  }`}
                >
                  {p}
                </button>
              )
            )}

            <button
              onClick={() => setPage(page + 1)}
              disabled={page >= totalPages}
              className="px-3 py-1 text-sm border border-neutral-300 hover:border-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              下一页
            </button>
          </div>
        )}

        {/* 底部 */}
        <footer className="mt-16 pt-8 border-t" style={{ borderColor: '#e5e5e5' }}>
          <p className="text-xs text-neutral-400 text-center">
            共 {puzzles.length} 道谜题
          </p>
        </footer>
      </main>

      {/* 底部细线 */}
      <div className="h-px" style={{ backgroundColor: '#1a1a1a' }} />
    </div>
  );
}