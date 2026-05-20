/**
 * 书签列表 API
 * GET /api/bookmarks - 获取所有书签
 * POST /api/bookmarks - 创建新书签
 */
import { NextRequest, NextResponse } from 'next/server';
import { getAllBookmarks, createBookmark } from '@/lib/db/bookmarks';
import { CreateBookmarkInput } from '@/lib/db/types';

/**
 * 获取所有书签
 */
export async function GET() {
  try {
    const bookmarks = await getAllBookmarks();
    return NextResponse.json(bookmarks);
  } catch (error) {
    console.error('获取书签失败:', error);
    return NextResponse.json({ error: '获取失败' }, { status: 500 });
  }
}

/**
 * 创建书签
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

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

    const bookmark = await createBookmark(input);
    return NextResponse.json(bookmark, { status: 201 });
  } catch (error) {
    console.error('创建书签失败:', error);
    return NextResponse.json({ error: '创建失败' }, { status: 500 });
  }
}