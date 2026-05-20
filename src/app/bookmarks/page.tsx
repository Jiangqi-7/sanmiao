"use client";

/**
 * 书签收藏页面
 */
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bookmark } from '@/lib/db/types';

interface PaginatedBookmarks {
  data: Bookmark[];
  total: number;
  hasMore: boolean;
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

  // 新书签表单
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newTags, setNewTags] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const limit = 10;
  const totalPages = Math.ceil(total / limit);

  // 获取书签列表
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

  useEffect(() => {
    fetchBookmarks(1);
  }, []);

  // 创建书签
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

  // 删除书签
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

  // 导入书签
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

  // 导出书签
  function handleExport() {
    window.open('/api/bookmarks/export', '_blank');
  }

  // 筛选
  const filteredBookmarks = bookmarks.filter((b) => {
    const matchCategory = category === 'all' || b.category === category;
    const matchSearch = b.title.includes(searchKeyword) || b.description.includes(searchKeyword);
    return matchCategory && matchSearch;
  });

  // 获取所有分类
  const categories = Array.from(new Set(bookmarks.map((b) => b.category).filter(Boolean)));

  // 生成分页页码
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
            书签收藏
          </h1>
          <p className="text-sm text-neutral-400 mt-2">记录有用的链接和资源</p>
        </header>

        {/* 工具栏 */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b" style={{ borderColor: '#e5e5e5' }}>
          {/* 搜索 */}
          <input
            type="text"
            placeholder="搜索书签..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="px-4 py-2 text-sm border w-64"
            style={{ borderColor: '#e5e5e5', backgroundColor: '#fff' }}
          />

          {/* 分类筛选 */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCategory('all')}
              className={`px-3 py-1 text-xs ${category === 'all' ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:text-neutral-700'}`}
            >
              全部
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1 text-xs ${category === cat ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:text-neutral-700'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 添加按钮 */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 text-sm border border-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors"
            >
              {showAddForm ? '取消' : '+ 添加'}
            </button>
            <button
              onClick={handleExport}
              className="px-4 py-2 text-sm border border-neutral-300 hover:border-neutral-900 transition-colors"
            >
              导出
            </button>
            <label className="px-4 py-2 text-sm border border-neutral-300 hover:border-neutral-900 transition-colors cursor-pointer">
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
          <form onSubmit={handleCreateBookmark} className="mb-8 p-6 border" style={{ borderColor: '#e5e5e5' }}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="标题"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="px-4 py-2 text-sm border"
                style={{ borderColor: '#e5e5e5' }}
                required
              />
              <input
                type="url"
                placeholder="链接"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                className="px-4 py-2 text-sm border"
                style={{ borderColor: '#e5e5e5' }}
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
                style={{ borderColor: '#e5e5e5' }}
              />
              <input
                type="text"
                placeholder="标签（逗号分隔）"
                value={newTags}
                onChange={(e) => setNewTags(e.target.value)}
                className="px-4 py-2 text-sm border"
                style={{ borderColor: '#e5e5e5' }}
              />
            </div>
            <textarea
              placeholder="描述（可选）"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className="w-full px-4 py-2 text-sm border mb-4"
              style={{ borderColor: '#e5e5e5' }}
              rows={2}
            />
            <button type="submit" className="px-6 py-2 text-sm bg-neutral-900 text-white hover:bg-neutral-800">
              保存书签
            </button>
          </form>
        )}

        {/* 书签列表 */}
        {loading && bookmarks.length === 0 ? (
          <p className="text-center text-neutral-400 py-12">加载中...</p>
        ) : filteredBookmarks.length === 0 ? (
          <p className="text-center text-neutral-400 py-12">
            {bookmarks.length === 0 ? '暂无书签' : '没有找到匹配的书签'}
          </p>
        ) : (
          <div className="space-y-4">
            {filteredBookmarks.map((bookmark) => (
              <div
                key={bookmark.id}
                className="p-5 border hover:border-neutral-400 transition-colors"
                style={{ borderColor: '#e5e5e5' }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <a
                      href={bookmark.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg hover:text-neutral-600"
                      style={{ color: '#1a1a1a' }}
                    >
                      {bookmark.title}
                    </a>
                    <p className="text-sm text-neutral-500 mt-1">{bookmark.url}</p>
                    {bookmark.description && (
                      <p className="text-sm text-neutral-400 mt-2">{bookmark.description}</p>
                    )}
                    <div className="flex items-center gap-3 mt-3">
                      {bookmark.category && (
                        <span className="text-xs px-2 py-1 bg-neutral-100 text-neutral-600">
                          {bookmark.category}
                        </span>
                      )}
                      {bookmark.tags.map((tag) => (
                        <span key={tag} className="text-xs text-neutral-400">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(bookmark.id)}
                    className="text-xs text-neutral-400 hover:text-red-500 ml-4"
                  >
                    删除
                  </button>
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
                  onClick={() => fetchBookmarks(p as number)}
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
              onClick={() => fetchBookmarks(page + 1)}
              disabled={page >= totalPages || loading}
              className="px-3 py-1 text-sm border border-neutral-300 hover:border-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              下一页
            </button>
          </div>
        )}

        {/* 底部 */}
        <footer className="mt-16 pt-8 border-t" style={{ borderColor: '#e5e5e5' }}>
          <p className="text-xs text-neutral-400 text-center">
            共 {total} 个书签
          </p>
        </footer>
      </main>

      {/* 底部细线 */}
      <div className="h-px" style={{ backgroundColor: '#1a1a1a' }} />
    </div>
  );
}