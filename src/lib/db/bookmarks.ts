/**
 * JSON 文件存储 - 书签管理
 * 数据存在 /tmp 目录（Vercel 允许写入）
 */
import fs from 'fs';
import path from 'path';
import { Bookmark, CreateBookmarkInput } from './types';

// Vercel serverless 环境允许写入 /tmp
// 本地开发环境用 process.cwd()/data
const isVercel = process.env.VERCEL === 'true';
const DATA_DIR = isVercel ? '/tmp/sanmiao-data' : path.join(process.cwd(), 'data');
const DB_PATH = path.join(DATA_DIR, 'bookmarks.json');

/**
 * 确保数据目录存在
 */
function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

/**
 * 读取所有书签
 */
function readAll(): Bookmark[] {
  ensureDataDir();
  if (!fs.existsSync(DB_PATH)) {
    return [];
  }
  const data = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(data);
}

/**
 * 写入所有书签
 */
function writeAll(bookmarks: Bookmark[]): void {
  ensureDataDir();
  fs.writeFileSync(DB_PATH, JSON.stringify(bookmarks, null, 2), 'utf-8');
}

/**
 * 生成唯一ID
 */
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

/**
 * 获取所有书签
 */
export function getAllBookmarks(): Bookmark[] {
  return readAll().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

/**
 * 根据分类获取书签
 */
export function getBookmarksByCategory(category: string): Bookmark[] {
  return readAll().filter((b) => b.category === category);
}

/**
 * 根据ID获取书签
 */
export function getBookmarkById(id: string): Bookmark | null {
  const bookmarks = readAll();
  return bookmarks.find((b) => b.id === id) || null;
}

/**
 * 搜索书签（按标题或描述）
 */
export function searchBookmarks(keyword: string): Bookmark[] {
  const lowerKeyword = keyword.toLowerCase();
  return readAll().filter(
    (b) =>
      b.title.toLowerCase().includes(lowerKeyword) ||
      b.description.toLowerCase().includes(lowerKeyword)
  );
}

/**
 * 创建书签
 */
export function createBookmark(input: CreateBookmarkInput): Bookmark {
  const bookmarks = readAll();
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

  bookmarks.push(bookmark);
  writeAll(bookmarks);
  return bookmark;
}

/**
 * 更新书签
 */
export function updateBookmark(id: string, input: Partial<CreateBookmarkInput>): Bookmark | null {
  const bookmarks = readAll();
  const index = bookmarks.findIndex((b) => b.id === id);

  if (index === -1) {
    return null;
  }

  const now = new Date().toISOString();
  const existing = bookmarks[index];

  const updated: Bookmark = {
    ...existing,
    title: input.title ?? existing.title,
    url: input.url ?? existing.url,
    category: input.category ?? existing.category,
    tags: input.tags ?? existing.tags,
    description: input.description ?? existing.description,
    updatedAt: now,
  };

  bookmarks[index] = updated;
  writeAll(bookmarks);
  return updated;
}

/**
 * 删除书签
 */
export function deleteBookmark(id: string): boolean {
  const bookmarks = readAll();
  const index = bookmarks.findIndex((b) => b.id === id);

  if (index === -1) {
    return false;
  }

  bookmarks.splice(index, 1);
  writeAll(bookmarks);
  return true;
}

/**
 * 获取所有分类
 */
export function getAllCategories(): string[] {
  const bookmarks = readAll();
  const categories = new Set(bookmarks.map((b) => b.category).filter(Boolean));
  return Array.from(categories);
}

/**
 * 获取所有标签
 */
export function getAllTags(): string[] {
  const bookmarks = readAll();
  const tagSet = new Set<string>();
  bookmarks.forEach((b) => b.tags.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}