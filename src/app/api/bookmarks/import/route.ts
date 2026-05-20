/**
 * 书签导入 API
 * POST /api/bookmarks/import
 * 支持浏览器导出的 Netscape Bookmark HTML 格式
 */
import { NextRequest, NextResponse } from 'next/server';
import { createBookmark, getAllBookmarks } from '@/lib/db/bookmarks';
import { CreateBookmarkInput } from '@/lib/db/types';
import { parseNetscapeHtml } from '@/lib/bookmark-parser';

const noCacheHeaders = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0',
};

/**
 * 导入书签（支持浏览器 HTML 格式）
 */
export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';
    const rawBody = await request.text();

    let bookmarks: CreateBookmarkInput[];
    if (contentType.includes('text/html') || rawBody.includes('<DT><A')) {
      // 浏览器 HTML 格式
      bookmarks = parseNetscapeHtml(rawBody);
    } else {
      // JSON 格式
      const body = JSON.parse(rawBody);
      if (!Array.isArray(body.bookmarks)) {
        return NextResponse.json({ error: '请提供 bookmarks 数组' }, { status: 400, headers: noCacheHeaders });
      }
      bookmarks = body.bookmarks as CreateBookmarkInput[];
    }

    // 获取已存在的书签（用于去重）
    const existingResult = await getAllBookmarks({ limit: 100000 });
    const existingUrls = new Set(existingResult.data.map((b) => b.url));

    // 过滤掉已存在的，导入新的
    const toImport = bookmarks.filter((b: CreateBookmarkInput) => !existingUrls.has(b.url));

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
      skipped: bookmarks.length - imported,
    }, { headers: noCacheHeaders });
  } catch (error) {
    console.error('导入书签失败:', error);
    return NextResponse.json({ error: '导入失败' }, { status: 500, headers: noCacheHeaders });
  }
}