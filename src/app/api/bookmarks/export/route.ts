/**
 * 书签导出 API
 * GET /api/bookmarks/export
 * 导出为浏览器兼容的 Netscape Bookmark HTML 格式
 */
import { NextRequest, NextResponse } from 'next/server';
import { getAllBookmarks, getAllCategories } from '@/lib/db/bookmarks';
import { generateNetscapeHtml } from '@/lib/bookmark-parser';

export async function GET(request: NextRequest) {
  try {
    const result = await getAllBookmarks({ limit: 100000 });
    const categories = await getAllCategories();

    const html = generateNetscapeHtml(result.data, categories);

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Disposition': 'attachment; filename="bookmarks.html"',
      },
    });
  } catch (error) {
    console.error('导出书签失败:', error);
    return NextResponse.json({ error: '导出失败' }, { status: 500 });
  }
}