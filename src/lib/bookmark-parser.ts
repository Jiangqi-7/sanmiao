/**
 * 解析 Netscape Bookmark HTML 格式
 * 浏览器导出书签的标准格式
 */
import { CreateBookmarkInput, Bookmark } from './db/types';

/**
 * 解析 Netscape Bookmark HTML
 * 结构: <DL><p><DT><H3>分类名</H3><DL><p><DT><A href="...">标题</A><DD>描述
 */
function parseNetscapeHtml(html: string): CreateBookmarkInput[] {
  const bookmarks: CreateBookmarkInput[] = [];

  // 解析所有 H3 分类
  const h3Regex = /<H3>([^<]*(?:<(?!<\/H3>)[^<]*)*)<\/H3>/gi;
  // 解析所有链接及其后的 DD
  const linkRegex = /<DT><A\s+href="([^"]+)"[^>]*>([^<]*(?:<(?!<\/A>)[^<]*)*)<\/A>/gi;
  // 解析 DD 描述
  const ddRegex = /<DD>([^<\n]+)/gi;

  // 获取所有 H3 分类及其位置
  const h3Matches: Array<{ name: string; index: number }> = [];
  let match;
  while ((match = h3Regex.exec(html)) !== null) {
    h3Matches.push({
      name: decodeHtmlEntities(match[1].trim()),
      index: match.index,
    });
  }

  // 获取所有链接及其位置
  const linkMatches: Array<{ href: string; title: string; index: number }> = [];
  while ((match = linkRegex.exec(html)) !== null) {
    linkMatches.push({
      href: match[1],
      title: decodeHtmlEntities(match[2].trim()),
      index: match.index,
    });
  }

  // 获取所有 DD 描述
  const ddMatches: Array<{ text: string; index: number }> = [];
  while ((match = ddRegex.exec(html)) !== null) {
    ddMatches.push({
      text: decodeHtmlEntities(match[1].trim()),
      index: match.index,
    });
  }

  // 为每个链接确定分类：找到包含此链接的最近的上级 H3
  for (const link of linkMatches) {
    let category = '';
    for (const h3 of h3Matches) {
      if (h3.index < link.index) {
        category = h3.name;
      } else {
        break;
      }
    }

    // 找到链接之后的最近 DD
    let description = '';
    for (const dd of ddMatches) {
      if (dd.index > link.index) {
        description = dd.text;
        break;
      }
    }

    bookmarks.push({
      title: link.title,
      url: link.href,
      category,
      tags: [],
      description,
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