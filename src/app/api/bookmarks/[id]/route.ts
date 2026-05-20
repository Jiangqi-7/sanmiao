/**
 * 单个书签操作 API
 * GET/PUT/DELETE /api/bookmarks/[id]
 */
import { NextRequest, NextResponse } from 'next/server';
import { getBookmarkById, updateBookmark, deleteBookmark } from '@/lib/db/bookmarks';

/**
 * 获取单个书签
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const bookmark = await getBookmarkById(id);

    if (!bookmark) {
      return NextResponse.json({ error: '书签不存在' }, { status: 404 });
    }

    return NextResponse.json(bookmark);
  } catch (error) {
    console.error('获取书签失败:', error);
    return NextResponse.json({ error: '获取失败' }, { status: 500 });
  }
}

/**
 * 更新书签
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updated = await updateBookmark(id, {
      title: body.title,
      url: body.url,
      category: body.category,
      tags: body.tags,
      description: body.description,
    });

    if (!updated) {
      return NextResponse.json({ error: '书签不存在' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error('更新书签失败:', error);
    return NextResponse.json({ error: '更新失败' }, { status: 500 });
  }
}

/**
 * 删除书签
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = await deleteBookmark(id);

    if (!deleted) {
      return NextResponse.json({ error: '书签不存在' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('删除书签失败:', error);
    return NextResponse.json({ error: '删除失败' }, { status: 500 });
  }
}