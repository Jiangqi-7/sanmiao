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
  { key: "li", name: "离", direction: "南", href: "/shan-hai-jing", desc: "山海经图鉴", color: "#f87171" },
  { key: "kun", name: "坤", direction: "西南", href: "/about", desc: "关于我们", color: "#facc15" },
  { key: "zhen", name: "震", direction: "东", href: "/blog?category=video", desc: "视频生成", color: "#fb923c" },
  { key: "center", name: "中", direction: "宫", href: "/", desc: "道法自然", isCenter: true },
  { key: "dui", name: "兑", direction: "西", href: "/blog?category=image", desc: "图片生成", color: "#22d3ee" },
  { key: "gen", name: "艮", direction: "东北", href: "/blog?category=tools", desc: "工具教程", color: "#a78bfa" },
  { key: "kan", name: "坎", direction: "北", href: "/blog", desc: "博客文章", color: "#38bdf8" },
  { key: "qian", name: "乾", direction: "西北", href: "/about", desc: "关于本站", color: "#e879f9" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 顶部标题区 */}
      <header className="pt-12 pb-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-1" style={{ letterSpacing: "-0.04em", color: "var(--text-primary)" }}>
          道法自然
        </h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>AI 为用</p>
      </header>

      {/* 九宫格主区域 */}
      <main className="flex-1 flex items-start justify-center px-4 py-2">
        <div className="w-full max-w-[720px]">
          <div className="grid grid-cols-3 gap-3">
            {BAGUA_GRID.map((cell) => {
              if (cell.isCenter) {
                return (
                  <Link
                    key={cell.key}
                    href={cell.href}
                    className="relative flex flex-col items-center justify-center rounded-2xl border transition-all duration-300 hover:scale-[1.02] group"
                    style={{
                      aspectRatio: "1",
                      backgroundColor: "var(--bg-card)",
                      borderColor: "var(--border)",
                    }}
                  >
                    <span className="text-4xl mb-1" style={{ color: "var(--text-primary)", opacity: 0.6 }}>☯</span>
                    <span className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>三秒</span>
                    <span className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>sanmiao</span>
                  </Link>
                );
              }

              const baguaKey = cell.key as keyof typeof BAGUA.positions;
              const symbol = BAGUA.positions[baguaKey]?.symbol || "☰";

              return (
                <Link
                  key={cell.key}
                  href={cell.href}
                  className="relative flex flex-col items-center justify-center rounded-2xl border transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    aspectRatio: "1",
                    backgroundColor: "var(--bg-card)",
                    borderColor: "var(--border)",
                  }}
                >
                  {/* 顶部装饰符号 */}
                  <span className="text-2xl mb-1" style={{ color: cell.color }}>{symbol}</span>

                  {/* 宫位名称 */}
                  <span className="text-base font-medium" style={{ color: "var(--text-primary)" }}>{cell.name}</span>
                  <span className="text-xs mb-2" style={{ color: "var(--text-secondary)" }}>{cell.direction}</span>

                  {/* 描述标签 */}
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-primary)" }}
                  >
                    {cell.desc}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      {/* 底部八卦循环 */}
      <footer className="py-8 text-center border-t" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center justify-center gap-3 mb-2">
          {[
            { key: "kan", label: "坎·北" },
            { key: "gen", label: "艮·东北" },
            { key: "zhen", label: "震·东" },
            { key: "xun", label: "巽·东南" },
            { key: "li", label: "离·南" },
            { key: "kun", label: "坤·西南" },
            { key: "dui", label: "兑·西" },
            { key: "qian", label: "乾·西北" },
          ].map((item) => (
            <span
              key={item.key}
              className="text-sm cursor-default"
              style={{ color: "var(--text-muted)" }}
              title={item.label}
            >
              {BAGUA.positions[item.key as keyof typeof BAGUA.positions].symbol}
            </span>
          ))}
        </div>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>后天八卦 · 九宫格</p>
      </footer>
    </div>
  );
}