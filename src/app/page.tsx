"use client";

import Link from "next/link";
import { BAGUA } from "@/lib/design-system";

// 后天八卦九宫格布局
const BAGUA_GRID = [
  { key: "xun", name: "巽", direction: "东南", href: "/blog?category=workflow", color: "#16a34a" },
  { key: "li", name: "离", direction: "南", href: "/shan-hai-jing", desc: "山海经图鉴", color: "#dc2626" },
  { key: "kun", name: "坤", direction: "西南", href: "/about", desc: "关于我们", color: "#ca8a04" },
  { key: "zhen", name: "震", direction: "东", href: "/blog?category=video", desc: "视频生成", color: "#16a34a" },
  { key: "center", name: "中", direction: "宫", href: "/", desc: "道法自然", isCenter: true },
  { key: "dui", name: "兑", direction: "西", href: "/blog?category=image", desc: "图片生成", color: "#525252" },
  { key: "gen", name: "艮", direction: "东北", href: "/blog?category=tools", desc: "工具教程", color: "#a16207" },
  { key: "kan", name: "坎", direction: "北", href: "/blog", desc: "博客文章", color: "#2563eb" },
  { key: "qian", name: "乾", direction: "西北", href: "/about", desc: "关于本站", color: "#ca8a04" },
];

function BaguaCell({ cell }: { cell: typeof BAGUA_GRID[0] }) {
  const isCenter = cell.isCenter;
  const symbol = isCenter ? "☯" : BAGUA.positions[cell.key as keyof typeof BAGUA.positions]?.symbol;
  const label = isCenter ? "三秒" : cell.name;
  const subtext = isCenter ? "sanmiao" : cell.direction;
  const tag = isCenter ? "道法自然" : (cell as any).desc;

  return (
    <Link
      href={cell.href}
      className="group relative flex flex-col rounded-xl border p-5 transition-all duration-300 hover:border-[#000000] overflow-hidden"
      style={{
        backgroundColor: "#ffffff",
        borderColor: "#e5e5e5",
      }}
    >
      {/* 悬停光晕效果 - 水墨感 */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${isCenter ? "rgba(0,0,0,0.06)" : "rgba(0,0,0,0.04)"} 0%, transparent 60%)`,
        }}
      />

      {/* 顶部区域 */}
      <div className="relative z-10 flex items-start justify-between mb-6">
        <div>
          <div className="text-xs mb-1 tracking-wider uppercase" style={{ color: "#999999" }}>
            {subtext}
          </div>
          <h3 className="text-lg font-semibold" style={{ color: "#000000" }}>
            {label}
          </h3>
        </div>
        <span
          className="text-2xl transition-all duration-300 group-hover:scale-110"
          style={{ color: isCenter ? "#000000" : cell.color, opacity: 0.2 }}
        >
          {symbol}
        </span>
      </div>

      {/* 底部标签 */}
      <div className="relative z-10 mt-auto flex flex-col items-center gap-2">
        <span className="text-sm" style={{ color: "#333333" }}>
          {tag}
        </span>
        <span className="text-xs opacity-0 group-hover:opacity-100 transition-all duration-300" style={{ color: "#999999" }}>
          →
        </span>
      </div>

      {/* 底部水墨效果 */}
      <div
        className="absolute bottom-0 left-0 right-0 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(0deg, ${isCenter ? "rgba(0,0,0,0.03)" : "rgba(0,0,0,0.02)"} 0%, transparent 100%)`,
        }}
      />
    </Link>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fafafa" }}>
      {/* 主内容区 - Notion 风格简洁布局 */}
      <main className="max-w-[900px] mx-auto px-6 py-16">
        {/* 标题区 */}
        <div className="mb-12 text-center">
          {/* 八卦符号装饰 */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-px" style={{ backgroundColor: "#e5e5e5" }} />
            <span className="text-3xl" style={{ color: "#000000", opacity: 0.2 }}>☯</span>
            <div className="w-16 h-px" style={{ backgroundColor: "#e5e5e5" }} />
          </div>

          <h1
            className="text-5xl font-bold mb-3"
            style={{ color: "#000000", letterSpacing: "-0.02em" }}
          >
            道法自然
          </h1>
          <p className="text-base" style={{ color: "#666666" }}>
            AI 为用
          </p>
        </div>

        {/* 九宫格 */}
        <div className="grid grid-cols-3 gap-4">
          {BAGUA_GRID.map((cell) => (
            <BaguaCell key={cell.key} cell={cell} />
          ))}
        </div>

        {/* 底部说明 */}
        <div className="mt-12 pt-8 text-center border-t" style={{ borderColor: "#e5e5e5" }}>
          <p className="text-sm" style={{ color: "#999999" }}>
            后天八卦 · 九宫格
          </p>
          <div className="flex items-center justify-center gap-4 mt-3">
            {["kan", "gen", "zhen", "xun", "li", "kun", "dui", "qian"].map((key) => (
              <span
                key={key}
                className="text-base"
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