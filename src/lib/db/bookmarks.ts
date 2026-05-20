/**
 * Turso 数据库 - 书签管理
 * 使用 libsql/client 连接 Turso SQLite
 */
import { createClient, Client } from '@libsql/client';
import { Bookmark, CreateBookmarkInput } from './types';

// Turso 连接配置
const TURSO_DATABASE_URL = process.env.TURSO_DATABASE_URL || '';
const TURSO_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN || '';

// 数据库客户端（单例）
let db: Client | null = null;

/**
 * 获取数据库客户端
 */
function getDb(): Client {
  if (!db) {
    if (!TURSO_DATABASE_URL || !TURSO_AUTH_TOKEN) {
      throw new Error('Turso 环境变量未配置: TURSO_DATABASE_URL 或 TURSO_AUTH_TOKEN');
    }
    db = createClient({
      url: TURSO_DATABASE_URL,
      authToken: TURSO_AUTH_TOKEN,
    });
  }
  return db;
}

/**
 * 初始化数据库表
 */
export async function initDb(): Promise<void> {
  const client = getDb();
  await client.execute(`
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
export async function getAllBookmarks(): Promise<Bookmark[]> {
  const client = getDb();
  const result = await client.execute(
    'SELECT * FROM bookmarks ORDER BY created_at DESC'
  );
  return result.rows.map((row) => toBookmark(row as Record<string, unknown>));
}

/**
 * 根据分类获取书签
 */
export async function getBookmarksByCategory(category: string): Promise<Bookmark[]> {
  const client = getDb();
  const result = await client.execute({
    sql: 'SELECT * FROM bookmarks WHERE category = ? ORDER BY created_at DESC',
    args: [category],
  });
  return result.rows.map((row) => toBookmark(row as Record<string, unknown>));
}

/**
 * 根据ID获取书签
 */
export async function getBookmarkById(id: string): Promise<Bookmark | null> {
  const client = getDb();
  const result = await client.execute({
    sql: 'SELECT * FROM bookmarks WHERE id = ?',
    args: [id],
  });
  if (result.rows.length === 0) {
    return null;
  }
  return toBookmark(result.rows[0] as Record<string, unknown>);
}

/**
 * 搜索书签（按标题或描述）
 */
export async function searchBookmarks(keyword: string): Promise<Bookmark[]> {
  const client = getDb();
  const pattern = `%${keyword}%`;
  const result = await client.execute({
    sql: 'SELECT * FROM bookmarks WHERE title LIKE ? OR description LIKE ? ORDER BY created_at DESC',
    args: [pattern, pattern],
  });
  return result.rows.map((row) => toBookmark(row as Record<string, unknown>));
}

/**
 * 创建书签
 */
export async function createBookmark(input: CreateBookmarkInput): Promise<Bookmark> {
  const client = getDb();
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

  await client.execute({
    sql: `
      INSERT INTO bookmarks (id, title, url, category, tags, description, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    args: [
      bookmark.id,
      bookmark.title,
      bookmark.url,
      bookmark.category,
      JSON.stringify(bookmark.tags),
      bookmark.description,
      bookmark.createdAt,
      bookmark.updatedAt,
    ],
  });

  return bookmark;
}

/**
 * 更新书签
 */
export async function updateBookmark(id: string, input: Partial<CreateBookmarkInput>): Promise<Bookmark | null> {
  const client = getDb();
  const existing = await getBookmarkById(id);
  if (!existing) {
    return null;
  }

  const now = new Date().toISOString();
  const updated: Bookmark = {
    ...existing,
    title: input.title ?? existing.title,
    url: input.url ?? existing.url,
    category: input.category ?? existing.category,
    tags: input.tags ?? existing.tags,
    description: input.description ?? existing.description,
    updatedAt: now,
  };

  await client.execute({
    sql: `
      UPDATE bookmarks
      SET title = ?, url = ?, category = ?, tags = ?, description = ?, updated_at = ?
      WHERE id = ?
    `,
    args: [
      updated.title,
      updated.url,
      updated.category,
      JSON.stringify(updated.tags),
      updated.description,
      updated.updatedAt,
      id,
    ],
  });

  return updated;
}

/**
 * 删除书签
 */
export async function deleteBookmark(id: string): Promise<boolean> {
  const client = getDb();
  const result = await client.execute({
    sql: 'DELETE FROM bookmarks WHERE id = ?',
    args: [id],
  });
  return result.rowsAffected > 0;
}

/**
 * 获取所有分类
 */
export async function getAllCategories(): Promise<string[]> {
  const client = getDb();
  const result = await client.execute(
    "SELECT DISTINCT category FROM bookmarks WHERE category != ''"
  );
  return result.rows.map((row) => row.category as string);
}

/**
 * 获取所有标签
 */
export async function getAllTags(): Promise<string[]> {
  const client = getDb();
  const result = await client.execute('SELECT tags FROM bookmarks');

  const tagSet = new Set<string>();
  result.rows.forEach((row) => {
    const tags = JSON.parse((row.tags as string) || '[]');
    tags.forEach((tag: string) => tagSet.add(tag));
  });

  return Array.from(tagSet).sort();
}