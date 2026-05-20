/**
 * 书签导入 API
 * POST /api/bookmarks/import
 * 从请求体导入书签数组
 */
import { NextRequest, NextResponse } from 'next/server';
import { createBookmark, getAllBookmarks } from '@/lib/db/bookmarks';
import { CreateBookmarkInput } from '@/lib/db/types';

/**
 * 导入书签
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!Array.isArray(body.bookmarks)) {
      return NextResponse.json({ error: '请提供 bookmarks 数组' }, { status: 400 });
    }

    // 获取已存在的书签（用于去重）
    const existing = await getAllBookmarks();
    const existingUrls = new Set(existing.map((b) => b.url));

    // 过滤掉已存在的，导入新的
    const toImport = body.bookmarks.filter((b: CreateBookmarkInput) => !existingUrls.has(b.url));

    let imported = 0;
    for (const bookmark of toImport) {
      if (bookmark.title && bookmark.url) {
        await createBookmark({
          title: bookmark.title,
          url: bookmark.url,
          category: bookmark.category || '',
          tags: bookmark.tags || [],
          description: bookmark.description || '',
        });
        imported++;
      }
    }

    return NextResponse.json({
      success: true,
      imported,
      skipped: body.bookmarks.length - imported,
    });
  } catch (error) {
    console.error('导入书签失败:', error);
    return NextResponse.json({ error: '导入失败' }, { status: 500 });
  }
}