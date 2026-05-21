"use client";

/**
 * 推理阁 - 谜题详情
 */
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { puzzles } from '@/lib/puzzles';

interface Props {
  params: Promise<{ id: string }>;
}

export default function PuzzleDetailPage({ params }: Props) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [puzzleId, setPuzzleId] = useState<string>('');

  useEffect(() => {
    params.then((p) => {
      const decodedId = decodeURIComponent(p.id);
      setPuzzleId(decodedId);
    });
  }, [params]);

  const puzzle = useMemo(() => {
    if (!puzzleId) return null;
    return puzzles.find((p) => p.id === puzzleId) || null;
  }, [puzzleId]);

  if (!puzzleId) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <p style={{ color: 'var(--text-muted)' }}>加载中...</p>
      </div>
    );
  }

  if (!puzzle) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="text-center">
          <p style={{ color: 'var(--text-muted)' }} mb-4>谜题不存在</p>
          <Link href="/puzzles" style={{ color: 'var(--text-secondary)' }} className="text-sm hover:opacity-70">
            返回列表
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = puzzles.findIndex((p) => p.id === puzzle.id);
  const prevPuzzle = currentIndex > 0 ? puzzles[currentIndex - 1] : null;
  const nextPuzzle = currentIndex < puzzles.length - 1 ? puzzles[currentIndex + 1] : null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* 顶部细线 */}
      <div className="h-px" style={{ backgroundColor: 'var(--border)' }} />

      {/* 主内容 */}
      <main className="max-w-[900px] mx-auto px-6 py-16">
        {/* 页面标题 */}
        <header className="mb-12">
          <Link href="/puzzles" style={{ color: 'var(--text-muted)' }} className="text-sm hover:opacity-70 mb-4 block">
            ← 返回列表
          </Link>
          <div className="flex items-baseline gap-3">
            <h1 className="text-4xl font-light tracking-wider" style={{ color: 'var(--text-primary)', fontFamily: 'serif' }}>
              {puzzle.title}
            </h1>
            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>—— {puzzle.author}</span>
          </div>
        </header>

        {/* 谜题内容 */}
        <article className="mb-12">
          <div
            className="whitespace-pre-wrap"
            style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}
          >
            {puzzle.content.trim().split('\n').map((line, i) => {
              // 处理图片
              const imageMatch = line.match(/!\[([^\]]*)\]\(([^)]+)\)/);
              if (imageMatch) {
                return (
                  <img
                    key={i}
                    src={imageMatch[2]}
                    alt={imageMatch[1]}
                    className="my-4 max-w-full"
                    style={{ maxHeight: '400px' }}
                  />
                );
              }
              if (line.startsWith('**') && line.endsWith('**')) {
                return (
                  <p key={i} className="font-medium mt-6 mb-2 text-lg" style={{ color: 'var(--text-primary)' }}>
                    {line.replace(/\*\*/g, '')}
                  </p>
                );
              }
              if (line.trim() === '') {
                return <br key={i} />;
              }
              return (
                <p key={i} className="mb-3">
                  {line}
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
              borderColor: 'var(--border)',
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-primary)',
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
                borderColor: 'var(--border)',
                backgroundColor: 'var(--bg-card)',
              }}
            >
              <div
                className="whitespace-pre-wrap"
                style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}
              >
                {puzzle.solution.trim().split('\n').map((line, i) => {
                  const imageMatch = line.match(/!\[([^\]]*)\]\(([^)]+)\)/);
                  if (imageMatch) {
                    return (
                      <img
                        key={i}
                        src={imageMatch[2]}
                        alt={imageMatch[1]}
                        className="my-4 max-w-full"
                        style={{ maxHeight: '400px' }}
                      />
                    );
                  }
                  if (line.startsWith('**') && line.endsWith('**')) {
                    return (
                      <p key={i} className="font-medium mt-4 mb-2" style={{ color: 'var(--text-primary)' }}>
                        {line.replace(/\*\*/g, '')}
                      </p>
                    );
                  }
                  if (line.trim() === '') {
                    return <br key={i} />;
                  }
                  return (
                    <p key={i} className="mb-3">
                      {line}
                    </p>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 上下篇导航 */}
        <nav className="flex items-center justify-between pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
          {prevPuzzle ? (
            <Link
              href={`/puzzles/${encodeURIComponent(prevPuzzle.id)}`}
              className="text-sm transition-colors"
              style={{ color: 'var(--text-secondary)' }}
            >
              ← {prevPuzzle.title}
            </Link>
          ) : (
            <span />
          )}
          {nextPuzzle ? (
            <Link
              href={`/puzzles/${encodeURIComponent(nextPuzzle.id)}`}
              className="text-sm transition-colors"
              style={{ color: 'var(--text-secondary)' }}
            >
              {nextPuzzle.title} →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </main>

      {/* 底部细线 */}
      <div className="h-px" style={{ backgroundColor: 'var(--border)' }} />
    </div>
  );
}