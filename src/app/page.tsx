"use client";

import Link from "next/link";
import { BAGUA } from "@/lib/design-system";

// 后天八卦九宫格布局
//  巽(东南)  │   离(南)   │  坤(西南)
// ─────────────────────────────────
//   震(东)   │  [中宫]   │   兑(西)
// ─────────────────────────────────
//   艮(东北)  │   坎(北)   │   乾(西北)

const BAGUA_GRID = [
  { key: "xun", name: "巽", direction: "东南", href: "/blog?category=workflow", desc: "AI 工作流", color: "#22c55e" },
  { key: "li", name: "离", direction: "南", href: "/shan-hai-jing", desc: "山海经图鉴", color: "#ef4444" },
  { key: "kun", name: "坤", direction: "西南", href: "/about", desc: "关于我们", color: "#eab308" },
  { key: "zhen", name: "震", direction: "东", href: "/blog?category=video", desc: "视频生成", color: "#22c55e" },
  { key: "center", name: "中", direction: "宫", href: "/", desc: "道法自然", isCenter: true },
  { key: "dui", name: "兑", direction: "西", href: "/blog?category=image", desc: "图片生成", color: "#e5e5e5" },
  { key: "gen", name: "艮", direction: "东北", href: "/blog?category=tools", desc: "工具教程", color: "#d97706" },
  { key: "kan", name: "坎", direction: "北", href: "/blog", desc: "博客文章", color: "#3b82f6" },
  { key: "qian", name: "乾", direction: "西北", href: "/about", desc: "关于本站", color: "#fbbf24" },
];

function BaguaCell({ cell }: { cell: typeof BAGUA_GRID[0] }) {
  const isCenter = cell.isCenter;
  const color = isCenter ? "#888888" : cell.color;

  return (
    <Link
      href={cell.href}
      className="relative flex flex-col rounded-2xl border transition-all duration-300 hover:scale-[1.02]"
      style={{
        height: "280px",
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border)",
      }}
    >
      {/* 顶部区域 */}
      <div className="pt-6 pb-2 flex flex-col items-center shrink-0">
        <span
          className="text-2xl"
          style={{ color: isCenter ? "var(--text-primary)" : color, opacity: isCenter ? 0.6 : 1 }}
        >
          {isCenter ? "☯" : BAGUA.positions[cell.key as keyof typeof BAGUA.positions]?.symbol}
        </span>
        <span className="text-base font-semibold mt-2" style={{ color: "var(--text-primary)" }}>
          {isCenter ? "三秒" : cell.name}
        </span>
      </div>

      {/* 中间大背景符号 */}
      <div className="flex-1 flex items-center justify-center">
        <span
          className="text-[80px] font-bold select-none pointer-events-none"
          style={{ color: color, opacity: 0.08 }}
        >
          {isCenter ? "☯" : BAGUA.positions[cell.key as keyof typeof BAGUA.positions]?.symbol}
        </span>
      </div>

      {/* 底部区域 */}
      <div className="pb-6 pt-2 flex flex-col items-center shrink-0">
        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
          {isCenter ? "sanmiao" : cell.direction}
        </span>
        <span
          className="text-xs px-3 py-1.5 rounded-full mt-2"
          style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-primary)" }}
        >
          {isCenter ? "道法自然" : cell.desc}
        </span>
      </div>
    </Link>
  );
}

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 顶部标题区 */}
      <header className="pt-16 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2" style={{ letterSpacing: "-0.04em", color: "var(--text-primary)" }}>
          道法自然
        </h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>AI 为用</p>
      </header>

      {/* 九宫格主区域 */}
      <main className="flex-1 flex items-center justify-center px-8 py-6">
        <div className="w-full max-w-[900px]">
          <div className="grid grid-cols-3 gap-6">
            {BAGUA_GRID.map((cell) => (
              <BaguaCell key={cell.key} cell={cell} />
            ))}
          </div>
        </div>
      </main>

      {/* 底部八卦循环 */}
      <footer className="py-10 text-center border-t" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center justify-center gap-6 mb-3">
          {["kan", "gen", "zhen", "xun", "li", "kun", "dui", "qian"].map((key) => (
            <span
              key={key}
              className="text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              {BAGUA.positions[key as keyof typeof BAGUA.positions].symbol}
            </span>
          ))}
        </div>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>后天八卦 · 九宫格</p>
      </footer>
    </div>
  );
}