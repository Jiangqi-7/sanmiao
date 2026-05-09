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
  { key: "xun", name: "巽", direction: "东南", href: "/blog?category=workflow", desc: "AI 工作流", color: "#2d5a3d" },
  { key: "li", name: "离", direction: "南", href: "/shan-hai-jing", desc: "山海经图鉴", color: "#8b2323" },
  { key: "kun", name: "坤", direction: "西南", href: "/about", desc: "关于我们", color: "#6b5a2d" },
  { key: "zhen", name: "震", direction: "东", href: "/blog?category=video", desc: "视频生成", color: "#2d5a3d" },
  { key: "center", name: "中", direction: "宫", href: "/", desc: "道法自然", isCenter: true },
  { key: "dui", name: "兑", direction: "西", href: "/blog?category=image", desc: "图片生成", color: "#4a6670" },
  { key: "gen", name: "艮", direction: "东北", href: "/blog?category=tools", desc: "工具教程", color: "#5a4a2d" },
  { key: "kan", name: "坎", direction: "北", href: "/blog", desc: "博客文章", color: "#2a4a6b" },
  { key: "qian", name: "乾", direction: "西北", href: "/about", desc: "关于本站", color: "#6b5a2d" },
];

function BaguaCell({ cell }: { cell: typeof BAGUA_GRID[0] }) {
  const isCenter = cell.isCenter;
  const color = isCenter ? "#d4c5a9" : cell.color;

  return (
    <Link
      href={cell.href}
      className="relative flex flex-col rounded-xl border transition-all duration-300 hover:scale-[1.02]"
      style={{
        height: "240px",
        background: isCenter
          ? "linear-gradient(145deg, #1a1a1a 0%, #0d0d0d 100%)"
          : "linear-gradient(145deg, #1f1f1f 0%, #141414 100%)",
        borderColor: "#2a2a2a",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)",
      }}
    >
      {/* 水墨晕染效果 - 顶部 */}
      <div
        className="absolute top-0 left-0 right-0 h-16 opacity-10"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(212,197,169,0.3) 0%, transparent 70%)",
        }}
      />

      {/* 顶部区域 */}
      <div className="pt-5 pb-1 flex flex-col items-center shrink-0 relative z-10">
        <span
          className="text-lg"
          style={{
            color: color,
            opacity: isCenter ? 0.7 : 0.85,
            textShadow: isCenter ? "0 0 20px rgba(212,197,169,0.3)" : "none",
          }}
        >
          {isCenter ? "☯" : BAGUA.positions[cell.key as keyof typeof BAGUA.positions]?.symbol}
        </span>
        <span
          className="text-sm font-medium mt-1 tracking-wider"
          style={{ color: "#d4c5a9" }}
        >
          {isCenter ? "三 秒" : cell.name}
        </span>
      </div>

      {/* 中间大背景符号 */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        <span
          className="text-[60px] font-bold select-none pointer-events-none"
          style={{
            color: color,
            opacity: 0.05,
            letterSpacing: "-0.05em",
          }}
        >
          {isCenter ? "☯" : BAGUA.positions[cell.key as keyof typeof BAGUA.positions]?.symbol}
        </span>
      </div>

      {/* 底部区域 */}
      <div className="pb-4 pt-1 flex flex-col items-center shrink-0 relative z-10">
        <span className="text-xs" style={{ color: "#888888" }}>
          {isCenter ? "sanmiao" : cell.direction}
        </span>
        <span
          className="text-xs px-2 py-0.5 rounded-full mt-1"
          style={{
            backgroundColor: "rgba(212,197,169,0.08)",
            color: "#a09080",
            border: "1px solid rgba(212,197,169,0.1)",
          }}
        >
          {isCenter ? "道法自然" : cell.desc}
        </span>
      </div>

      {/* 水墨晕染效果 - 底部 */}
      <div
        className="absolute bottom-0 left-0 right-0 h-12 opacity-5"
        style={{
          background: "radial-gradient(ellipse at 50% 100%, rgba(212,197,169,0.2) 0%, transparent 60%)",
        }}
      />
    </Link>
  );
}

export default function HomePage() {
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        background: "linear-gradient(180deg, #0a0a0a 0%, #141414 50%, #0a0a0a 100%)",
      }}
    >
      {/* 顶部标题区 - 水墨风格 */}
      <header className="pt-20 pb-14 text-center relative">
        {/* 装饰性水墨晕染 */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 30%, rgba(212,197,169,0.03) 0%, transparent 50%)",
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center justify-center gap-6 mb-4">
            <span className="text-2xl opacity-30" style={{ color: "#d4c5a9" }}>☰</span>
            <span className="text-4xl" style={{ color: "#d4c5a9", textShadow: "0 0 40px rgba(212,197,169,0.2)" }}>☯</span>
            <span className="text-2xl opacity-30" style={{ color: "#d4c5a9" }}>☷</span>
          </div>
          <h1
            className="text-5xl md:text-6xl font-bold tracking-wider mb-3"
            style={{
              color: "#d4c5a9",
              letterSpacing: "0.15em",
              textShadow: "0 2px 20px rgba(212,197,169,0.15)",
            }}
          >
            道法自然
          </h1>
          <p
            className="text-base tracking-widest opacity-50"
            style={{ color: "#888888", letterSpacing: "0.3em" }}
          >
            AI 为用
          </p>
        </div>

        {/* 装饰性横线 */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(212,197,169,0.3) 50%, transparent 100%)",
          }}
        />
      </header>

      {/* 九宫格主区域 */}
      <main className="flex-1 flex items-center justify-center px-8 py-8">
        <div className="w-full max-w-[800px]">
          <div className="grid grid-cols-3 gap-4">
            {BAGUA_GRID.map((cell) => (
              <BaguaCell key={cell.key} cell={cell} />
            ))}
          </div>
        </div>
      </main>

      {/* 底部八卦循环 - 水墨风格 */}
      <footer
        className="py-12 text-center border-t"
        style={{
          borderColor: "rgba(212,197,169,0.1)",
          background: "linear-gradient(180deg, transparent 0%, rgba(212,197,169,0.02) 100%)",
        }}
      >
        <div className="flex items-center justify-center gap-8 mb-4">
          {[
            { key: "kan" },
            { key: "gen" },
            { key: "zhen" },
            { key: "xun" },
            { key: "li" },
            { key: "kun" },
            { key: "dui" },
            { key: "qian" },
          ].map((item) => (
            <span
              key={item.key}
              className="text-base"
              style={{ color: "rgba(212,197,169,0.25)" }}
            >
              {BAGUA.positions[item.key as keyof typeof BAGUA.positions].symbol}
            </span>
          ))}
        </div>
        <p
          className="text-xs tracking-[0.3em] opacity-30"
          style={{ color: "#666666" }}
        >
          後天八卦 · 九宮格
        </p>
      </footer>
    </div>
  );
}