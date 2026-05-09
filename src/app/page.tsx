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
  { key: "xun", name: "巽", direction: "东南", href: "/blog?category=workflow", desc: "AI 工作流", color: "#4ade80" },
  { key: "li", name: "离", direction: "南", href: "/shan-hai-jing", desc: "山海经图鉴", color: "#ef4444" },
  { key: "kun", name: "坤", direction: "西南", href: "/about", desc: "关于我们", color: "#facc15" },
  { key: "zhen", name: "震", direction: "东", href: "/blog?category=video", desc: "视频生成", color: "#4ade80" },
  { key: "center", name: "中", direction: "宫", href: "/", desc: "道法自然", isCenter: true },
  { key: "dui", name: "兑", direction: "西", href: "/blog?category=image", desc: "图片生成", color: "#d4d4d4" },
  { key: "gen", name: "艮", direction: "东北", href: "/blog?category=tools", desc: "工具教程", color: "#d97706" },
  { key: "kan", name: "坎", direction: "北", href: "/blog", desc: "博客文章", color: "#38bdf8" },
  { key: "qian", name: "乾", direction: "西北", href: "/about", desc: "关于本站", color: "#eab308" },
];

function BaguaCell({ cell }: { cell: typeof BAGUA_GRID[0] }) {
  const isCenter = cell.isCenter;
  const color = isCenter ? "#ffffff" : cell.color;

  return (
    <Link
      href={cell.href}
      className="relative flex flex-col rounded-2xl border overflow-hidden transition-all duration-300 hover:scale-[1.02] ink-card"
      style={{
        height: "260px",
        borderColor: isCenter ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.08)",
      }}
    >
      {/* 大背景符号 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span
          className="text-[90px] font-bold select-none"
          style={{
            color: color,
            opacity: isCenter ? 0.1 : 0.12,
          }}
        >
          {isCenter ? "☯" : BAGUA.positions[cell.key as keyof typeof BAGUA.positions]?.symbol}
        </span>
      </div>

      {/* 顶部区域 */}
      <div className="pt-6 pb-1 flex flex-col items-center shrink-0 relative z-10">
        <span
          className="text-2xl"
          style={{ color: color, opacity: 0.85 }}
        >
          {isCenter ? "☯" : BAGUA.positions[cell.key as keyof typeof BAGUA.positions]?.symbol}
        </span>
        <span
          className="text-base font-medium mt-1"
          style={{ color: "#ffffff" }}
        >
          {isCenter ? "三秒" : cell.name}
        </span>
      </div>

      {/* 底部区域 */}
      <div className="pb-6 pt-auto flex flex-col items-center shrink-0 relative z-10 mt-auto">
        <span className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
          {isCenter ? "sanmiao" : cell.direction}
        </span>
        <span
          className="text-xs px-3 py-1 rounded-full mt-2"
          style={{
            backgroundColor: "rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.65)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {isCenter ? "道法自然" : cell.desc}
        </span>
      </div>

      {/* 顶部水墨光效 */}
      <div
        className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)",
        }}
      />

      {/* 底部水墨光效 */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{
          background: "linear-gradient(0deg, rgba(255,255,255,0.04) 0%, transparent 100%)",
        }}
      />

      {/* 右侧水墨晕染 */}
      <div
        className="absolute top-1/4 right-0 w-16 h-32 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 100% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)",
        }}
      />
    </Link>
  );
}

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen ink-bg">
      {/* 顶部标题区 - 毛笔字体 */}
      <header className="pt-20 pb-14 text-center relative">
        {/* 顶部装饰 */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="w-20 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)" }} />
          <span className="text-2xl" style={{ color: "rgba(255,255,255,0.35)" }}>☯</span>
          <div className="w-20 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)" }} />
        </div>

        {/* 水墨标题 - 毛笔字体 */}
        <h1
          className="font-brush text-6xl md:text-7xl font-normal tracking-wider"
          style={{ color: "#f0f0f0" }}
        >
          道法自然
        </h1>
        <p
          className="font-brush text-xl tracking-[0.4em] mt-4"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          AI 为用
        </p>
      </header>

      {/* 九宫格主区域 */}
      <main className="flex-1 flex items-center justify-center px-8 py-6">
        <div className="w-full max-w-[840px]">
          <div className="grid grid-cols-3 gap-5">
            {BAGUA_GRID.map((cell) => (
              <BaguaCell key={cell.key} cell={cell} />
            ))}
          </div>
        </div>
      </main>

      {/* 底部八卦循环 */}
      <footer className="py-10 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="flex items-center justify-center gap-6 mb-4">
          {["kan", "gen", "zhen", "xun", "li", "kun", "dui", "qian"].map((key) => (
            <span
              key={key}
              className="text-base"
              style={{ color: "rgba(255,255,255,0.18)" }}
            >
              {BAGUA.positions[key as keyof typeof BAGUA.positions].symbol}
            </span>
          ))}
        </div>
        <p className="font-brush text-sm tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.2)" }}>
          後天八卦 · 九宮格
        </p>
      </footer>
    </div>
  );
}