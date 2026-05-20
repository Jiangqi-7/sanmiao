/**
 * 解析 Netscape Bookmark HTML 格式
 * 这是浏览器导出书签的标准格式
 */
import { CreateBookmarkInput, Bookmark } from './db/types';

interface ParseNode {
  tagName?: string;
  text: string;
  getAttribute: (name: string) => string | null;
  nextSibling?: ParseNode;
  parentNode?: ParseNode;
}

function parseNetscapeHtml(html: string): CreateBookmarkInput[] {
  const bookmarks: CreateBookmarkInput[] = [];

  // 简单的正则解析（不用 node-html-parser，避免模块问题）
  // 匹配 <DT><A href="..." ...>title</A>
  const linkRegex = /<DT><A\s+href="([^"]+)"[^>]*>([^<]*(?:<(?!<\/A>)[^<]*)*)<\/A>/gi;
  // 获取描述：DD 跟在 A 后面的
  const ddRegex = /<DD>([^<\n]+)/gi;

  const links: Array<{ href: string; title: string; description: string }> = [];
  let match;

  while ((match = linkRegex.exec(html)) !== null) {
    links.push({
      href: match[1],
      title: decodeHtmlEntities(match[2].trim()),
      description: '',
    });
  }

  // 获取所有 DD 描述
  const dds: string[] = [];
  while ((match = ddRegex.exec(html)) !== null) {
    dds.push(decodeHtmlEntities(match[1].trim()));
  }

  // 简单关联：描述数量通常少于链接，按顺序分配给没有分类的链接
  let ddIndex = 0;
  for (const link of links) {
    // 尝试从周围文本获取更多信息（简化处理）
    bookmarks.push({
      title: link.title,
      url: link.href,
      category: '',
      tags: [],
      description: link.description,
    });
  }

  return bookmarks;
}

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, num) => String.fromCharCode(parseInt(num)));
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function generateNetscapeHtml(bookmarks: Bookmark[], categories: string[]): string {
  const lines = [
    '<!DOCTYPE NETSCAPE-Bookmark-file-1>',
    '<!-- This is an automatically generated file.',
    '     It will be read and overwritten.',
    '     DO NOT EDIT! -->',
    '<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">',
    '<TITLE>Bookmarks</TITLE>',
    '<H1>Bookmarks</H1>',
    '<DL><p>',
  ];

  // 按分类分组
  const byCategory = new Map<string, Bookmark[]>();
  for (const b of bookmarks) {
    const cat = b.category || '未分类';
    if (!byCategory.has(cat)) byCategory.set(cat, []);
    byCategory.get(cat)!.push(b);
  }

  for (const cat of categories) {
    const catBookmarks = byCategory.get(cat) || [];
    if (catBookmarks.length === 0) continue;

    lines.push(`    <DT><H3>${escapeHtml(cat)}</H3>`);
    lines.push('    <DL><p>');

    for (const b of catBookmarks) {
      lines.push(`        <DT><A href="${escapeHtml(b.url)}" add_date="${Math.floor(new Date(b.createdAt).getTime() / 1000)}">${escapeHtml(b.title)}</A>`);
      if (b.description) {
        lines.push(`        <DD>${escapeHtml(b.description)}`);
      }
    }

    lines.push('    </DL><p>');
  }

  lines.push('</DL><p>');
  return lines.join('\n');
}

export { parseNetscapeHtml, generateNetscapeHtml };