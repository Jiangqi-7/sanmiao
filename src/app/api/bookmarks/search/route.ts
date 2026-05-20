/**
 * 搜索书签 API
 * GET /api/bookmarks/search?q=keyword
 */
import { NextRequest, NextResponse } from 'next/server';
import { searchBookmarks } from '@/lib/db/bookmarks';

const noCacheHeaders = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0',
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get('q') || '';

    if (!keyword) {
      return NextResponse.json({ error: '请提供搜索关键词' }, { status: 400, headers: noCacheHeaders });
    }

    const bookmarks = await searchBookmarks(keyword);
    return NextResponse.json(bookmarks, { headers: noCacheHeaders });
  } catch (error) {
    console.error('搜索书签失败:', error);
    return NextResponse.json({ error: '搜索失败' }, { status: 500, headers: noCacheHeaders });
  }
}