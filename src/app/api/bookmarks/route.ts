/**
 * 创建书签 API
 * POST /api/bookmarks
 */
import { NextRequest, NextResponse } from 'next/server';
import { initDb, createBookmark } from '@/lib/db/bookmarks';
import { CreateBookmarkInput } from '@/lib/db/types';

initDb();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 参数校验
    if (!body.title || !body.url) {
      return NextResponse.json({ error: '标题和链接不能为空' }, { status: 400 });
    }

    const input: CreateBookmarkInput = {
      title: body.title,
      url: body.url,
      category: body.category,
      tags: body.tags || [],
      description: body.description || '',
    };

    const bookmark = createBookmark(input);
    return NextResponse.json(bookmark, { status: 201 });
  } catch (error) {
    console.error('创建书签失败:', error);
    return NextResponse.json({ error: '创建失败' }, { status: 500 });
  }
}