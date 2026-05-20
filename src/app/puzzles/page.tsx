"use client";

/**
 * 推理阁 - 谜题列表
 */
import Link from 'next/link';
import { puzzles } from '@/lib/puzzles';

export default function PuzzleListPage() {
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
        <div className="space-y-4">
          {puzzles.map((puzzle, index) => (
            <Link
              key={puzzle.id}
              href={`/puzzles/${puzzle.id}`}
              className="block p-6 border transition-all duration-200 hover:border-neutral-800 group"
              style={{ borderColor: '#e5e5e5' }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-xs text-neutral-400 w-8">#{index + 1}</span>
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