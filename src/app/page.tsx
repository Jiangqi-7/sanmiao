"use client";

import Link from "next/link";
import { BAGUA } from "@/lib/design-system";

// 后天八卦九宫格布局 - Notion 风格
const BAGUA_GRID = [
  { key: "xun", name: "巽", direction: "东南", href: "/blog?category=workflow", desc: "AI 工作流", color: "#000000" },
  { key: "li", name: "离", direction: "南", href: "/shan-hai-jing", desc: "山海经图鉴", color: "#000000" },
  { key: "kun", name: "坤", direction: "西南", href: "/about", desc: "关于我们", color: "#000000" },
  { key: "zhen", name: "震", direction: "东", href: "/blog?category=video", desc: "视频生成", color: "#000000" },
  { key: "center", name: "中", direction: "宫", href: "/", desc: "道法自然", isCenter: true },
  { key: "dui", name: "兑", direction: "西", href: "/blog?category=image", desc: "图片生成", color: "#000000" },
  { key: "gen", name: "艮", direction: "东北", href: "/blog?category=tools", desc: "工具教程", color: "#000000" },
  { key: "kan", name: "坎", direction: "北", href: "/blog", desc: "博客文章", color: "#000000" },
  { key: "qian", name: "乾", direction: "西北", href: "/about", desc: "关于本站", color: "#000000" },
];

function BaguaCell({ cell }: { cell: typeof BAGUA_GRID[0] }) {
  const isCenter = cell.isCenter;
  const symbol = isCenter ? "☯" : BAGUA.positions[cell.key as keyof typeof BAGUA.positions]?.symbol;
  const label = isCenter ? "三秒" : cell.name;
  const subtext = isCenter ? "sanmiao" : cell.direction;
  const tag = isCenter ? "道法自然" : cell.desc;

  return (
    <Link
      href={cell.href}
      className="group block rounded-lg border border-[#e5e5e5] p-5 transition-all duration-200 hover:border-[#000000] hover:shadow-md"
      style={{ backgroundColor: "#ffffff" }}
    >
      {/* 顶部符号和大名称 */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-sm mb-1" style={{ color: "#666666" }}>
            {subtext}
          </div>
          <h3
            className="text-lg font-semibold"
            style={{ color: "#000000" }}
          >
            {label}
          </h3>
        </div>
        <span
          className="text-2xl opacity-10 group-hover:opacity-30 transition-opacity"
          style={{ color: "#000000" }}
        >
          {symbol}
        </span>
      </div>

      {/* 底部描述标签 */}
      <div className="flex items-center justify-between">
        <span
          className="text-xs px-2 py-1 rounded"
          style={{ backgroundColor: "#f5f5f5", color: "#666666" }}
        >
          {tag}
        </span>
        <span
          className="text-xs opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color: "#999999" }}
        >
          →
        </span>
      </div>
    </Link>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#ffffff" }}>
      {/* Notion 风格 Header */}
      <header className="border-b" style={{ borderColor: "#e5e5e5" }}>
        <div className="max-w-[900px] mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">☯</span>
            <span className="font-medium" style={{ color: "#000000" }}>三秒</span>
          </Link>

          {/* 导航 */}
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium"
              style={{ color: "#000000" }}
            >
              首页
            </Link>
            <Link
              href="/blog"
              className="text-sm"
              style={{ color: "#666666" }}
            >
              博客
            </Link>
            <Link
              href="/shan-hai-jing"
              className="text-sm"
              style={{ color: "#666666" }}
            >
              山海经
            </Link>
            <Link
              href="/about"
              className="text-sm"
              style={{ color: "#666666" }}
            >
              关于
            </Link>
          </nav>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="max-w-[900px] mx-auto px-6 py-16">
        {/* 标题区 */}
        <div className="mb-12">
          <h1
            className="text-4xl font-bold mb-2"
            style={{ color: "#000000", letterSpacing: "-0.02em" }}
          >
            道法自然
          </h1>
          <p className="text-base" style={{ color: "#666666" }}>
            AI 为用
          </p>
        </div>

        {/* 九宫格 - Notion 风格 */}
        <div className="grid grid-cols-3 gap-4">
          {BAGUA_GRID.map((cell) => (
            <BaguaCell key={cell.key} cell={cell} />
          ))}
        </div>

        {/* 底部八卦说明 */}
        <div className="mt-12 pt-8 border-t" style={{ borderColor: "#e5e5e5" }}>
          <p className="text-sm" style={{ color: "#999999" }}>
            后天八卦 · 九宫格布局
          </p>
          <div className="flex items-center gap-4 mt-3">
            {["kan", "gen", "zhen", "xun", "li", "kun", "dui", "qian"].map((key) => (
              <span
                key={key}
                className="text-sm"
                style={{ color: "#cccccc" }}
              >
                {BAGUA.positions[key as keyof typeof BAGUA.positions].symbol}
              </span>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}