"use client";

/**
 * 推理阁 - 谜题详情
 */
import { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { puzzles } from '@/lib/puzzles';

interface Props {
  params: Promise<{ id: string }>;
}

export default function PuzzleDetailPage({ params }: Props) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);

  // Resolve params on client side
  params.then((p) => setResolvedParams(p));

  if (!resolvedParams) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#fafafa' }}>
        <p className="text-neutral-400">加载中...</p>
      </div>
    );
  }

  const puzzle = puzzles.find((p) => p.id === resolvedParams.id);

  if (!puzzle) {
    notFound();
  }

  const currentIndex = puzzles.findIndex((p) => p.id === puzzle.id);
  const prevPuzzle = currentIndex > 0 ? puzzles[currentIndex - 1] : null;
  const nextPuzzle = currentIndex < puzzles.length - 1 ? puzzles[currentIndex + 1] : null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fafafa' }}>
      {/* 顶部细线 */}
      <div className="h-px" style={{ backgroundColor: '#1a1a1a' }} />

      {/* 主内容 */}
      <main className="max-w-[900px] mx-auto px-6 py-16">
        {/* 页面标题 */}
        <header className="mb-12">
          <Link href="/puzzles" className="text-sm text-neutral-400 hover:text-neutral-600 mb-4 block">
            ← 返回列表
          </Link>
          <div className="flex items-baseline gap-3">
            <h1 className="text-4xl font-light tracking-wider" style={{ color: '#1a1a1a', fontFamily: 'serif' }}>
              {puzzle.title}
            </h1>
            <span className="text-sm text-neutral-400">—— {puzzle.author}</span>
          </div>
        </header>

        {/* 谜题内容 */}
        <article className="mb-12">
          <div
            className="whitespace-pre-wrap"
            style={{ color: '#4a4a4a', lineHeight: '1.8' }}
          >
            {puzzle.content.trim().split('\n').map((paragraph, i) => {
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return (
                  <p key={i} className="font-medium mt-6 mb-2 text-lg" style={{ color: '#1a1a1a' }}>
                    {paragraph.replace(/\*\*/g, '')}
                  </p>
                );
              }
              if (paragraph.trim() === '') {
                return <br key={i} />;
              }
              return (
                <p key={i} className="mb-3">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </article>

        {/* 解答区域 */}
        <div className="mb-12">
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="flex items-center gap-2 px-6 py-3 text-sm border transition-colors"
            style={{
              borderColor: showAnswer ? '#1a1a1a' : '#e5e5e5',
              backgroundColor: showAnswer ? '#1a1a1a' : '#fff',
              color: showAnswer ? '#fff' : '#666',
            }}
          >
            <span
              className="transition-transform duration-200"
              style={{
                transform: showAnswer ? 'rotate(90deg)' : 'rotate(0deg)',
              }}
            >
              ▶
            </span>
            {showAnswer ? '收起解答' : '查看解答'}
          </button>

          {/* 解答内容 */}
          {showAnswer && (
            <div
              className="mt-6 p-8 border"
              style={{
                borderColor: '#e5e5e5',
                backgroundColor: '#fff',
              }}
            >
              <div
                className="whitespace-pre-wrap"
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
                    <p key={i} className="mb-3">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 上下篇导航 */}
        <nav className="flex items-center justify-between pt-8 border-t" style={{ borderColor: '#e5e5e5' }}>
          {prevPuzzle ? (
            <Link
              href={`/puzzles/${prevPuzzle.id}`}
              className="text-sm text-neutral-500 hover:text-neutral-800 transition-colors"
            >
              ← {prevPuzzle.title}
            </Link>
          ) : (
            <span />
          )}
          {nextPuzzle ? (
            <Link
              href={`/puzzles/${nextPuzzle.id}`}
              className="text-sm text-neutral-500 hover:text-neutral-800 transition-colors"
            >
              {nextPuzzle.title} →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </main>

      {/* 底部细线 */}
      <div className="h-px" style={{ backgroundColor: '#1a1a1a' }} />
    </div>
  );
}