"use client";

/**
 * 推理阁 - 谜题收藏
 */
import { useState } from 'react';
import Link from 'next/link';
import { puzzles } from '@/lib/puzzles';

export default function PuzzlePage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleAnswer = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

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
        <div className="space-y-8">
          {puzzles.map((puzzle, index) => (
            <article
              key={puzzle.id}
              className="border-b pb-8"
              style={{ borderColor: '#e5e5e5' }}
            >
              {/* 标题 */}
              <div className="mb-4">
                <span className="text-xs text-neutral-400 mr-3">第 {index + 1} 题</span>
                <span className="text-lg font-medium" style={{ color: '#1a1a1a', fontFamily: 'serif' }}>
                  {puzzle.title}
                </span>
                <span className="text-xs text-neutral-400 ml-3">—— {puzzle.author}</span>
              </div>

              {/* 谜题内容 */}
              <div
                className="prose prose-sm max-w-none mb-6 whitespace-pre-wrap"
                style={{ color: '#4a4a4a', lineHeight: '1.8' }}
              >
                {puzzle.content.trim().split('\n').map((paragraph, i) => {
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return (
                      <p key={i} className="font-medium mt-4" style={{ color: '#1a1a1a' }}>
                        {paragraph.replace(/\*\*/g, '')}
                      </p>
                    );
                  }
                  if (paragraph.trim() === '') {
                    return <br key={i} />;
                  }
                  return (
                    <p key={i} className="mb-2">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* 解答区域 */}
              <div className="mt-6">
                <button
                  onClick={() => toggleAnswer(puzzle.id)}
                  className="flex items-center gap-2 px-4 py-2 text-sm border transition-colors"
                  style={{
                    borderColor: expandedId === puzzle.id ? '#1a1a1a' : '#e5e5e5',
                    backgroundColor: expandedId === puzzle.id ? '#1a1a1a' : '#fff',
                    color: expandedId === puzzle.id ? '#fff' : '#666',
                  }}
                >
                  <span
                    className="transition-transform duration-200"
                    style={{
                      transform: expandedId === puzzle.id ? 'rotate(90deg)' : 'rotate(0deg)',
                    }}
                  >
                    ▶
                  </span>
                  {expandedId === puzzle.id ? '收起解答' : '查看解答'}
                </button>

                {/* 解答内容 */}
                {expandedId === puzzle.id && (
                  <div
                    className="mt-4 p-6 border animate-fadeIn"
                    style={{
                      borderColor: '#e5e5e5',
                      backgroundColor: '#fff',
                    }}
                  >
                    <div
                      className="prose prose-sm max-w-none whitespace-pre-wrap"
                      style={{ color: '#4a4a4a', lineHeight: '1.8' }}
                    >
                      {puzzle.solution.trim().split('\n').map((paragraph, i) => {
                        if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                          return (
                            <p key={i} className="font-medium mt-4 mb-2" style={{ color: '#1a1a1a' }}>
                              {paragraph.replace(/\*\*/g, '')}
                            </p>
                          );
                        }
                        if (paragraph.trim() === '') {
                          return <br key={i} />;
                        }
                        return (
                          <p key={i} className="mb-2">
                            {paragraph}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </article>
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