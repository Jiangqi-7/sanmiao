/**
 * SQLite 数据库操作 - 书签管理
 */
import Database from 'better-sqlite3';
import path from 'path';
import { Bookmark, CreateBookmarkInput } from './types';

// 数据库文件路径
const DB_PATH = path.join(process.cwd(), 'data', 'bookmarks.db');

/**
 * 初始化数据库连接
 */
function getDb(): Database.Database {
  return new Database(DB_PATH);
}

/**
 * 初始化数据库表
 * 如果表不存在则创建
 */
export function initDb(): void {
  const db = getDb();

  db.exec(`
    CREATE TABLE IF NOT EXISTS bookmarks (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      url TEXT NOT NULL,
      category TEXT DEFAULT '',
      tags TEXT DEFAULT '[]',
      description TEXT DEFAULT '',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `);

  db.close();
}

/**
 * 生成唯一ID
 */
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

/**
 * 将数据库行转换为 Bookmark 对象
 */
function toBookmark(row: Record<string, unknown>): Bookmark {
  return {
    id: row.id as string,
    title: row.title as string,
    url: row.url as string,
    category: row.category as string,
    tags: JSON.parse((row.tags as string) || '[]'),
    description: row.description as string,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

/**
 * 获取所有书签
 */
export function getAllBookmarks(): Bookmark[] {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM bookmarks ORDER BY created_at DESC').all();
  db.close();
  return rows.map(toBookmark);
}

/**
 * 根据分类获取书签
 */
export function getBookmarksByCategory(category: string): Bookmark[] {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM bookmarks WHERE category = ? ORDER BY created_at DESC').all(category);
  db.close();
  return rows.map(toBookmark);
}

/**
 * 根据ID获取书签
 */
export function getBookmarkById(id: string): Bookmark | null {
  const db = getDb();
  const row = db.prepare('SELECT * FROM bookmarks WHERE id = ?').get(id);
  db.close();
  return row ? toBookmark(row as Record<string, unknown>) : null;
}

/**
 * 搜索书签（按标题或描述）
 */
export function searchBookmarks(keyword: string): Bookmark[] {
  const db = getDb();
  const pattern = `%${keyword}%`;
  const rows = db.prepare(
    'SELECT * FROM bookmarks WHERE title LIKE ? OR description LIKE ? ORDER BY created_at DESC'
  ).all(pattern, pattern);
  db.close();
  return rows.map(toBookmark);
}

/**
 * 创建书签
 */
export function createBookmark(input: CreateBookmarkInput): Bookmark {
  const db = getDb();
  const now = new Date().toISOString();

  const bookmark: Bookmark = {
    id: generateId(),
    title: input.title,
    url: input.url,
    category: input.category || '',
    tags: input.tags || [],
    description: input.description || '',
    createdAt: now,
    updatedAt: now,
  };

  db.prepare(`
    INSERT INTO bookmarks (id, title, url, category, tags, description, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    bookmark.id,
    bookmark.title,
    bookmark.url,
    bookmark.category,
    JSON.stringify(bookmark.tags),
    bookmark.description,
    bookmark.createdAt,
    bookmark.updatedAt
  );

  db.close();
  return bookmark;
}

/**
 * 更新书签
 */
export function updateBookmark(id: string, input: Partial<CreateBookmarkInput>): Bookmark | null {
  const db = getDb();
  const existing = db.prepare('SELECT * FROM bookmarks WHERE id = ?').get(id);

  if (!existing) {
    db.close();
    return null;
  }

  const now = new Date().toISOString();
  const current = toBookmark(existing as Record<string, unknown>);

  const updated: Bookmark = {
    ...current,
    title: input.title ?? current.title,
    url: input.url ?? current.url,
    category: input.category ?? current.category,
    tags: input.tags ?? current.tags,
    description: input.description ?? current.description,
    updatedAt: now,
  };

  db.prepare(`
    UPDATE bookmarks
    SET title = ?, url = ?, category = ?, tags = ?, description = ?, updated_at = ?
    WHERE id = ?
  `).run(
    updated.title,
    updated.url,
    updated.category,
    JSON.stringify(updated.tags),
    updated.description,
    updated.updatedAt,
    id
  );

  db.close();
  return updated;
}

/**
 * 删除书签
 */
export function deleteBookmark(id: string): boolean {
  const db = getDb();
  const result = db.prepare('DELETE FROM bookmarks WHERE id = ?').run(id);
  db.close();
  return result.changes > 0;
}

/**
 * 获取所有分类
 */
export function getAllCategories(): string[] {
  const db = getDb();
  const rows = db.prepare('SELECT DISTINCT category FROM bookmarks WHERE category != ""').all();
  db.close();
  return rows.map((row) => row.category as string);
}

/**
 * 获取所有标签
 */
export function getAllTags(): string[] {
  const db = getDb();
  const rows = db.prepare('SELECT tags FROM bookmarks').all();
  db.close();

  const tagSet = new Set<string>();
  rows.forEach((row) => {
    const tags = JSON.parse((row.tags as string) || '[]');
    tags.forEach((tag: string) => tagSet.add(tag));
  });

  return Array.from(tagSet).sort();
}