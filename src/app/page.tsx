import Link from "next/link";
import { BAGUA } from "@/lib/design-system";
import { BaguaWheel, YinYang, Divider } from "@/components/bagua-decorations";

// 模拟文章数据
const FEATURED_POSTS = [
  {
    slug: "shan-hai-jing-chi-long",
    title: "烛龙",
    subtitle: "《山海经·南山经》",
    description: "赤红巨龙，身长千里，目开为昼，闭则为夜。一角一音，掌控昼夜更替。",
    prompt_zh: "一条红色的巨龙，古风，水墨画，烟雾缭绕，神秘威严",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80",
    category: "山海经",
    bagua: "li" as const,
  },
  {
    slug: "shan-hai-jing-qilin",
    title: "麒麟",
    subtitle: "《山海经》四灵之一",
    description: "鹿身牛尾，龙鳞凤爪。性情温和，不履生草，不入陷阱。",
    prompt_zh: "一只神兽麒麟，古风，工笔画，祥云缭绕，瑞气千条",
    image: "https://images.unsplash.com/photo-1577493340887-b7bfff550145?w=600&q=80",
    category: "山海经",
    bagua: "zhen" as const,
  },
  {
    slug: "openclaw-deployment",
    title: "OpenClaw 部署完全指南",
    subtitle: "工具教程",
    description: "从零开始部署 OpenClaw，龙虾开壳到配置详解，含常见问题解答。",
    image: "",
    category: "工具",
    bagua: "gen" as const,
  },
];

const CATEGORIES = [
  { name: "全部", count: 89, href: "/blog", bagua: "li" as const },
  { name: "山海经图鉴", count: 36, href: "/shan-hai-jing", bagua: "gen" as const },
  { name: "工具教程", count: 24, href: "/blog?category=tools", bagua: "kan" as const },
  { name: "AI工作流", count: 15, href: "/blog?category=workflow", bagua: "xun" as const },
  { name: "视频生成", count: 8, href: "/blog?category=video", bagua: "dui" as const },
  { name: "图片生成", count: 6, href: "/blog?category=image", bagua: "zhen" as const },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 overflow-hidden">
          {/* 渐变背景 */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at 30% 20%, var(--gray-100) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, var(--gray-200) 0%, transparent 50%)",
              opacity: 0.5,
            }}
          />
          {/* 暗色主题背景 */}
          <div
            className="absolute inset-0 hidden dark:block"
            style={{
              background: "radial-gradient(ellipse at 30% 20%, var(--gray-800) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, var(--gray-900) 0%, transparent 50%)",
              opacity: 0.5,
            }}
          />

          {/* 八卦轮盘装饰 - 左上 */}
          <div className="absolute top-20 left-10 opacity-20">
            <BaguaWheel size={300} />
          </div>

          {/* 八卦轮盘装饰 - 右下 */}
          <div className="absolute bottom-10 right-10 opacity-15">
            <BaguaWheel size={400} />
          </div>

          {/* 阴阳装饰 - 右侧 */}
          <div className="absolute right-20 top-1/2 -translate-y-1/2 opacity-10">
            <YinYang size={150} animate />
          </div>
        </div>

        {/* Hero 内容 */}
        <div className="relative z-10 max-w-[900px] mx-auto px-6 text-center">
          {/* 顶部符号 */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="text-2xl opacity-40">{BAGUA.positions.li.symbol}</span>
            <span className="text-4xl">☯</span>
            <span className="text-2xl opacity-40">{BAGUA.positions.kan.symbol}</span>
          </div>

          {/* 主标题 */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight" style={{ letterSpacing: "-0.04em" }}>
            道法自然
            <br />
            <span style={{ opacity: 0.6 }}>AI 为用</span>
          </h1>

          {/* 副标题 */}
          <p className="text-lg md:text-xl mb-4 leading-relaxed max-w-[600px] mx-auto" style={{ color: "var(--text-secondary)" }}>
            探索 AI 工具与东方智慧的融合
          </p>
          <p className="text-sm mb-10" style={{ color: "var(--text-muted)" }}>
            OpenClaw · 扣子 · 山海经异兽图鉴
          </p>

          {/* CTA 按钮 */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium rounded-md transition-all duration-200"
              style={{
                backgroundColor: "var(--yin)",
                color: "var(--yang)",
              }}
            >
              浏览博客
            </Link>
            <Link
              href="/shan-hai-jing"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium rounded-md border transition-all duration-200"
              style={{
                backgroundColor: "transparent",
                borderColor: "var(--border-strong)",
              }}
            >
              山海经图鉴
            </Link>
          </div>

          {/* 底部八卦符号 */}
          <div className="flex items-center justify-center gap-6 mt-16 opacity-40">
            {["kan", "gen", "zhen", "xun", "li", "kun", "dui", "qian"].map((key) => (
              <span key={key} className="text-lg">
                {BAGUA.positions[key as keyof typeof BAGUA.positions].symbol}
              </span>
            ))}
          </div>
        </div>

        {/* 滚动指示 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <span className="text-xs opacity-40">↓</span>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-semibold flex items-center gap-3">
              <span style={{ opacity: 0.5 }}>{BAGUA.positions.kan.symbol}</span>
              {BAGUA.positions.kan.name}·{BAGUA.positions.kan.direction}
              <span className="text-sm font-normal opacity-60">分类</span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="group relative flex items-center gap-3 px-6 py-3 rounded-lg border transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor: "var(--border)",
                }}
              >
                <span className="text-lg opacity-50 group-hover:opacity-80 transition-opacity">
                  {BAGUA.positions[cat.bagua].symbol}
                </span>
                <span className="text-sm font-medium">{cat.name}</span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-muted)" }}
                >
                  {cat.count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section - 离卦（南）火 */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-semibold flex items-center gap-3">
              <span style={{ opacity: 0.5 }}>{BAGUA.positions.li.symbol}</span>
              {BAGUA.positions.li.name}·{BAGUA.positions.li.direction}
              <span className="text-sm font-normal opacity-60">最新文章</span>
            </h2>
            <Link
              href="/blog"
              className="text-sm font-medium opacity-60 hover:opacity-100 transition-opacity"
            >
              查看全部 →
            </Link>
          </div>

          {/* 文章卡片网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_POSTS.map((post, index) => (
              <article
                key={post.slug}
                className="group relative rounded-xl border overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor: "var(--border)",
                }}
              >
                {/* 图片区域 */}
                {post.image ? (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, var(--bg-card) 0%, transparent 50%)" }}
                    />
                    {/* 分类标签 */}
                    <span
                      className="absolute top-4 left-4 text-xs font-medium px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: "rgba(0,0,0,0.6)",
                        color: "#fff",
                      }}
                    >
                      {post.category}
                    </span>
                  </div>
                ) : (
                  <div
                    className="h-48 flex items-center justify-center"
                    style={{ backgroundColor: "var(--bg-secondary)" }}
                  >
                    <span className="text-6xl opacity-20">{BAGUA.positions[post.bagua].symbol}</span>
                  </div>
                )}

                {/* 内容区域 */}
                <div className="p-6">
                  {/* 顶部符号 */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg opacity-40">{BAGUA.positions[post.bagua].symbol}</span>
                    <span className="text-xs opacity-50">{post.subtitle}</span>
                  </div>

                  <h3 className="text-xl font-semibold mb-2 group-hover:opacity-80 transition-opacity">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                    {post.description}
                  </p>

                  {post.prompt_zh && (
                    <div
                      className="text-xs p-3 rounded-md mb-4"
                      style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-muted)" }}
                    >
                      <p className="truncate">{post.prompt_zh}</p>
                    </div>
                  )}

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium opacity-60 hover:opacity-100 transition-opacity"
                  >
                    阅读全文
                    <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview - 坤卦（西南）地 */}
      <section className="py-24" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="max-w-[600px] mx-auto text-center">
            <span className="text-4xl opacity-20 block mb-4">{BAGUA.positions.kun.symbol}</span>
            <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center gap-3">
              <span style={{ opacity: 0.5 }}>{BAGUA.positions.kun.symbol}</span>
              {BAGUA.positions.kun.name}·{BAGUA.positions.kun.direction}
            </h2>
            <p className="leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
              三秒，专注于 AI 工具和工作流学习。记录在实践中探索技术与传统的融合，
              从 OpenClaw 部署到山海经 AI 创作，每一步都是成长。
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-medium opacity-70 hover:opacity-100 transition-opacity"
            >
              <span>{BAGUA.positions.qian.symbol}</span>
              了解更多
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}