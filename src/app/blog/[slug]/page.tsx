import Link from "next/link";

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  // 后续从 MDX 文件读取内容
  return (
    <div className="py-16 md:py-24" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="max-w-[800px] mx-auto px-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-[#666666] hover:text-[#0072f5] transition-colors mb-8"
        >
          ← 返回博客
        </Link>

        <article>
          <header className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight text-[#171717] mb-4">
              文章标题
            </h1>
            <div className="flex items-center gap-4 text-sm text-[#666666]">
              <span className="inline-block px-2 py-1 text-xs font-medium text-[#0068d6] bg-[#ebf5ff] rounded">
                分类
              </span>
              <time>2026-05-08</time>
            </div>
          </header>

          <div className="prose prose-neutral text-[#666666] leading-relaxed">
            <p>文章内容正在加载中...</p>
          </div>
        </article>
      </div>
    </div>
  );
}
