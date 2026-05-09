import Link from "next/link";

// 模拟文章数据（后续从 MDX 文件读取）
const FEATURED_POSTS = [
  {
    slug: "openclaw-deployment",
    title: "OpenClaw 部署完全指南",
    description: "从零开始部署 OpenClaw，龙虾开壳到配置详解",
    date: "2026-05-08",
    category: "OpenClaw",
  },
  {
    slug: "coze-workflow",
    title: "扣子工作流搭建保姆级教程",
    description: "手把手教你搭建第一个扣子 AI 工作流",
    date: "2026-05-07",
    category: "扣子/Coze",
  },
  {
    slug: "seedance-usage",
    title: "Seedance 2.0 使用手册",
    description: "AI 视频生成工具 Seedance 2.0 完整教程",
    date: "2026-05-06",
    category: "AI 视频",
  },
];

const CATEGORIES = [
  { name: "OpenClaw", count: 15, href: "/blog?category=openclaw" },
  { name: "扣子/Coze", count: 8, href: "/blog?category=coze" },
  { name: "AI 视频", count: 6, href: "/blog?category=video" },
  { name: "AI 图片", count: 5, href: "/blog?category=image" },
  { name: "工具配置", count: 4, href: "/blog?category=tools" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-[1200px] mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-[#171717] mb-6">
            AI 工具学习博客
          </h1>
          <p className="text-lg md:text-xl text-[#666666] max-w-[640px] mx-auto mb-8 leading-relaxed">
            记录工作中的学习心得，OpenClaw、扣子、GPT 应用等工具使用教程。
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#171717] text-white text-sm font-medium rounded-md hover:bg-[#333333] transition-colors"
            >
              浏览文章
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#ffffff] text-[#171717] text-sm font-medium rounded-md border border-[#ebebeb] hover:border-[#171717] transition-colors"
            >
              关于我
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-[#fafafa]">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-[#171717] mb-8">分类</h2>
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#ffffff] text-sm text-[#666666] rounded-full border border-[#ebebeb] hover:border-[#171717] hover:text-[#171717] transition-colors"
              >
                {cat.name}
                <span className="text-xs text-[#808080]">{cat.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold tracking-tight text-[#171717]">最新文章</h2>
            <Link
              href="/blog"
              className="text-sm font-medium text-[#0072f5] hover:text-[#0060d0] transition-colors"
            >
              查看全部
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURED_POSTS.map((post) => (
              <article
                key={post.slug}
                className="group p-6 bg-[#ffffff] rounded-lg border border-[#ebebeb] hover:border-[#171717] transition-all"
              >
                <div className="mb-3">
                  <span className="inline-block px-2 py-1 text-xs font-medium text-[#0068d6] bg-[#ebf5ff] rounded">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-[#171717] mb-2 group-hover:text-[#0072f5] transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-sm text-[#666666] leading-relaxed mb-4">{post.description}</p>
                <time className="text-xs text-[#808080]">{post.date}</time>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 md:py-24 bg-[#fafafa]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-[640px] mx-auto text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-[#171717] mb-4">关于三秒</h2>
            <p className="text-[#666666] leading-relaxed mb-6">
              专注于 AI 工具和工作流学习，记录在实践过程中的踩坑经验和心得技巧。
            </p>
            <Link
              href="/about"
              className="text-sm font-medium text-[#0072f5] hover:text-[#0060d0] transition-colors"
            >
              了解更多 →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
