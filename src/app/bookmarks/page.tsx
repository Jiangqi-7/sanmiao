"use client";

/**
 * 书签收藏页面
 */
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BAGUA } from '@/lib/design-system';
import { Bookmark } from '@/lib/db/types';

interface PaginatedBookmarks {
  data: Bookmark[];
  total: number;
  hasMore: boolean;
}

const COLORS = ["vermilion", "gold", "peacock", "sky", "thunder"];

function LightningEffect() {
  const [bolts, setBolts] = useState<Array<{ id: number; x: number; delay: number; angle: number; length: number }>>([]);

  useEffect(() => {
    const newBolts = [];
    for (let i = 0; i < 5; i++) {
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
      <div className="lightning-fork" />
    </div>
  );
}

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newTags, setNewTags] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const limit = 12;
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    fetchBookmarks(1);
    setLoaded(true);
  }, []);

  async function fetchBookmarks(pageNum: number = 1) {
    try {
      setLoading(true);
      const res = await fetch(`/api/bookmarks?page=${pageNum}&limit=${limit}`);
      const data: PaginatedBookmarks = await res.json();

      setBookmarks(data.data);
      setHasMore(data.hasMore);
      setTotal(data.total);
      setPage(pageNum);
    } catch (error) {
      console.error('获取书签失败:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateBookmark(e: React.FormEvent) {
    e.preventDefault();

    if (!newTitle || !newUrl) {
      alert('标题和链接不能为空');
      return;
    }

    try {
      const res = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          url: newUrl,
          category: newCategory,
          tags: newTags.split(',').map((t) => t.trim()).filter(Boolean),
          description: newDesc,
        }),
      });

      if (res.ok) {
        setShowAddForm(false);
        setNewTitle('');
        setNewUrl('');
        setNewCategory('');
        setNewTags('');
        setNewDesc('');
        fetchBookmarks(1);
      }
    } catch (error) {
      console.error('创建书签失败:', error);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('确定删除这个书签？')) return;

    try {
      const res = await fetch(`/api/bookmarks/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchBookmarks(page);
      }
    } catch (error) {
      console.error('删除书签失败:', error);
    }
  }

  async function handleImport(file: File) {
    try {
      const text = await file.text();
      const res = await fetch('/api/bookmarks/import', {
        method: 'POST',
        headers: { 'Content-Type': 'text/html' },
        body: text,
      });

      if (res.ok) {
        const data = await res.json();
        alert(`导入成功：新增 ${data.imported} 个，跳过 ${data.skipped} 个`);
        fetchBookmarks(1);
      }
    } catch (error) {
      console.error('导入书签失败:', error);
    }
  }

  function handleExport() {
    window.open('/api/bookmarks/export', '_blank');
  }

  const filteredBookmarks = bookmarks.filter((b) => {
    const matchCategory = category === 'all' || b.category === category;
    const matchSearch = b.title.includes(searchKeyword) || b.description.includes(searchKeyword);
    return matchCategory && matchSearch;
  });

  const categories = Array.from(new Set(bookmarks.map((b) => b.category).filter(Boolean)));

  function getPageNumbers(): (number | '...')[] {
    const pages: (number | '...')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
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
    }
    return pages;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }}>
      <LightningEffect />
      <div className="h-px gradient-border" />

      <main className="max-w-[900px] mx-auto px-6 py-20">
        {/* 页面标题 */}
        <header className="mb-16 text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center gap-3" style={{ top: "-20px" }}>
            {COLORS.map((c, i) => (
              <div key={c} className={`color-dot ${c}`} style={{ animationDelay: `${i * 0.3}s` }} />
            ))}
          </div>

          <h1
            className={`text-5xl font-light mb-4 tracking-[0.3em] transition-all duration-1000 thunder-glow ${loaded ? "opacity-100" : "opacity-0"}`}
            style={{ color: "var(--text-primary)", fontFamily: "serif" }}
          >
            书签收藏
          </h1>
          <p
            className={`text-sm tracking-[0.5em] transition-all duration-1000 delay-200 ${loaded ? "opacity-100" : "opacity-0"}`}
            style={{ color: "var(--text-muted)" }}
          >
            记录有用的链接和资源
          </p>

          <div className={`flex items-center justify-center gap-8 mt-12 transition-all duration-1000 delay-400 ${loaded ? "opacity-100" : "opacity-0"}`}>
            <div className="w-16 h-px" style={{ backgroundColor: "var(--border)" }} />
            <div className="flex items-center gap-6">
              {["☰", "☯", "☷"].map((s, i) => (
                <span key={i} className={`text-xl ${i === 1 ? 'thunder-glow' : ''}`} style={{ fontFamily: "serif", color: "var(--text-muted)" }}>{s}</span>
              ))}
            </div>
            <div className="w-16 h-px" style={{ backgroundColor: "var(--border)" }} />
          </div>
        </header>

        {/* 工具栏 */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b" style={{ borderColor: "var(--border)" }}>
          <input
            type="text"
            placeholder="搜索书签..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="px-4 py-2 text-sm border w-48"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)", color: "var(--text-primary)" }}
          />

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setCategory('all')}
              className={`px-3 py-1.5 text-xs ${category === 'all' ? 'bg-[var(--accent)] text-white' : 'text-[var(--text-muted)] hover:bg-[var(--bg-secondary)]'}`}
            >
              全部
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 text-xs ${category === cat ? 'bg-[var(--accent)] text-white' : 'text-[var(--text-muted)] hover:bg-[var(--bg-secondary)]'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 text-sm border transition-colors hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)]"
              style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
            >
              {showAddForm ? '取消' : '+ 添加'}
            </button>
            <button
              onClick={handleExport}
              className="px-4 py-2 text-sm border transition-colors hover:bg-[var(--bg-secondary)]"
              style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
            >
              导出
            </button>
            <label className="px-4 py-2 text-sm border transition-colors hover:bg-[var(--bg-secondary)] cursor-pointer" style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>
              导入
              <input
                type="file"
                accept=".html"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImport(file);
                }}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* 添加表单 */}
        {showAddForm && (
          <form onSubmit={handleCreateBookmark} className="mb-8 p-6 border" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="标题"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="px-4 py-2 text-sm border"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
                required
              />
              <input
                type="url"
                placeholder="链接"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                className="px-4 py-2 text-sm border"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="分类"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="px-4 py-2 text-sm border"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
              />
              <input
                type="text"
                placeholder="标签（逗号分隔）"
                value={newTags}
                onChange={(e) => setNewTags(e.target.value)}
                className="px-4 py-2 text-sm border"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
              />
            </div>
            <textarea
              placeholder="描述（可选）"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className="w-full px-4 py-2 text-sm border mb-4"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
              rows={2}
            />
            <button type="submit" className="px-6 py-2 text-sm border transition-colors hover:bg-[var(--accent)] hover:text-white" style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>
              保存书签
            </button>
          </form>
        )}

        {/* 书签列表 */}
        {loading && bookmarks.length === 0 ? (
          <p className="text-center py-12" style={{ color: "var(--text-muted)" }}>加载中...</p>
        ) : filteredBookmarks.length === 0 ? (
          <p className="text-center py-12" style={{ color: "var(--text-muted)" }}>
            {bookmarks.length === 0 ? '暂无书签' : '没有找到匹配的书签'}
          </p>
        ) : (
          <div className="space-y-4">
            {filteredBookmarks.map((bookmark) => (
              <div
                key={bookmark.id}
                className="p-5 border hover:shadow-md transition-all"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <a
                      href={bookmark.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-medium hover:text-[var(--accent)] transition-colors block truncate"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {bookmark.title}
                    </a>
                    <a
                      href={bookmark.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:text-[var(--accent)] block truncate mt-1"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {bookmark.url}
                    </a>
                    {bookmark.description && (
                      <p className="text-sm mt-2" style={{ color: "var(--text-secondary)" }}>{bookmark.description}</p>
                    )}
                    <div className="flex items-center gap-3 mt-3 flex-wrap">
                      {bookmark.category && (
                        <span className="text-xs px-2 py-1" style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-muted)" }}>
                          {bookmark.category}
                        </span>
                      )}
                      {bookmark.tags.map((tag) => (
                        <span key={tag} className="text-xs" style={{ color: "var(--text-muted)" }}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <a
                      href={bookmark.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs px-3 py-1 border hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] transition-colors"
                      style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
                    >
                      访问
                    </a>
                    <button
                      onClick={() => handleDelete(bookmark.id)}
                      className="text-xs px-3 py-1 border hover:border-red-500 hover:text-red-500 transition-colors"
                      style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
                    >
                      删除
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 分页 */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => fetchBookmarks(page - 1)}
              disabled={page <= 1 || loading}
              className="px-3 py-1 text-sm border hover:bg-[var(--bg-secondary)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
            >
              上一页
            </button>

            {getPageNumbers().map((p, i) =>
              p === '...' ? (
                <span key={`ellipsis-${i}`} className="px-2" style={{ color: "var(--text-muted)" }}>...</span>
              ) : (
                <button
                  key={p}
                  onClick={() => fetchBookmarks(p as number)}
                  className={`px-3 py-1 text-sm border ${
                    page === p ? 'bg-[var(--accent)] text-white border-[var(--accent)]' : 'hover:bg-[var(--bg-secondary)]'
                  }`}
                  style={{ borderColor: "var(--border)", color: page === p ? "white" : "var(--text-secondary)" }}
                >
                  {p}
                </button>
              )
            )}

            <button
              onClick={() => fetchBookmarks(page + 1)}
              disabled={page >= totalPages || loading}
              className="px-3 py-1 text-sm border hover:bg-[var(--bg-secondary)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
            >
              下一页
            </button>
          </div>
        )}

        {/* 底部 */}
        <footer className="mt-20 pt-8 text-center border-t" style={{ borderColor: "var(--border)" }}>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            共 {total} 个书签
          </p>
        </footer>
      </main>

      <div className="h-px gradient-border" />
    </div>
  );
}