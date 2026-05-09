"use client";

import Link from "next/link";
import { BAGUA } from "@/lib/design-system";

// 后天八卦九宫格布局
// 巽(东南) │ 离(南) │ 坤(西南)
// ─────────────────────────
// 震(东)   │ [中宫] │ 兑(西)
// ─────────────────────────
// 艮(东北) │ 坎(北) │ 乾(西北)

const BAGUA_GRID = [
  // 第一行
  { key: "xun", name: "巽", direction: "东南", href: "/blog?category=workflow", desc: "AI 工作流", accent: "var(--bagua-dun)" },
  { key: "li", name: "离", direction: "南", href: "/shan-hai-jing", desc: "山海经图鉴", accent: "var(--bagua-li)" },
  { key: "kun", name: "坤", direction: "西南", href: "/about", desc: "关于我们", accent: "var(--bagua-kun)" },
  // 第二行
  { key: "zhen", name: "震", direction: "东", href: "/blog?category=video", desc: "视频生成", accent: "var(--bagua-zhen)" },
  { key: "center", name: "中", direction: "宫", href: "/", desc: "道法自然", accent: "transparent", isCenter: true },
  { key: "dui", name: "兑", direction: "西", href: "/blog?category=image", desc: "图片生成", accent: "var(--bagua-dui)" },
  // 第三行
  { key: "gen", name: "艮", direction: "东北", href: "/blog?category=tools", desc: "工具教程", accent: "var(--bagua-gen)" },
  { key: "kan", name: "坎", direction: "北", href: "/blog", desc: "博客文章", accent: "var(--bagua-kan)" },
  { key: "qian", name: "乾", direction: "西北", href: "/about", desc: "关于本站", accent: "var(--bagua-qian)" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 顶部标题区 */}
      <header className="pt-16 pb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2" style={{ letterSpacing: "-0.04em" }}>
          道法自然
        </h1>
        <p className="text-sm opacity-50 tracking-wide">AI 为用</p>
      </header>

      {/* 九宫格主区域 */}
      <main className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-[800px]">
          <div className="grid grid-cols-3 gap-4">
            {BAGUA_GRID.map((cell, index) => {
              if (cell.isCenter) {
                // 中宫 - 品牌中心
                return (
                  <Link
                    key={cell.key}
                    href={cell.href}
                    className="col-span-1 relative flex flex-col items-center justify-center rounded-2xl border transition-all duration-300 hover:scale-[1.02] group"
                    style={{
                      aspectRatio: "1",
                      backgroundColor: "var(--bg-card)",
                      borderColor: "var(--border)",
                    }}
                  >
                    {/* 太极符号背景 */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
                      <span className="text-[200px] font-bold">☯</span>
                    </div>

                    {/* 太极光效 */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: "radial-gradient(circle at center, rgba(128,128,128,0.1) 0%, transparent 70%)",
                      }}
                    />

                    <div className="relative z-10 text-center">
                      <span className="text-5xl mb-3 block opacity-60 group-hover:opacity-80 transition-opacity">☯</span>
                      <span className="text-lg font-semibold tracking-tight">三秒</span>
                      <span className="block text-xs opacity-40 mt-1">sanmiao</span>
                    </div>
                  </Link>
                );
              }

              const baguaKey = cell.key as keyof typeof BAGUA.positions;
              const symbol = BAGUA.positions[baguaKey]?.symbol || "☰";

              return (
                <Link
                  key={cell.key}
                  href={cell.href}
                  className="col-span-1 relative flex flex-col items-center justify-center rounded-2xl border p-4 transition-all duration-300 hover:scale-[1.02] group"
                  style={{
                    aspectRatio: "1",
                    backgroundColor: "var(--bg-card)",
                    borderColor: "var(--border)",
                  }}
                >
                  {/* 八卦方位色彩微光 */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ backgroundColor: cell.accent }}
                  />

                  {/* 背景大符号 */}
                  <span
                    className="absolute text-[100px] opacity-[0.04] font-bold select-none transition-transform duration-500 group-hover:scale-110"
                    style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                  >
                    {symbol}
                  </span>

                  {/* 格子内容 */}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <span className="text-3xl mb-2 opacity-60 group-hover:opacity-80 transition-opacity">{symbol}</span>
                    <span className="text-base font-medium tracking-tight">{cell.name}</span>
                    <span className="text-xs opacity-40 mb-2">{cell.direction}</span>
                    <span
                      className="text-xs px-2 py-1 rounded-full transition-colors"
                      style={{
                        backgroundColor: "var(--bg-secondary)",
                        color: "var(--text-muted)",
                      }}
                    >
                      {cell.desc}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      {/* 底部八卦循环 */}
      <footer className="py-10 text-center border-t" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center justify-center gap-4 mb-3">
          {[
            { key: "kan", angle: 0 },
            { key: "gen", angle: 45 },
            { key: "zhen", angle: 90 },
            { key: "xun", angle: 135 },
            { key: "li", angle: 180 },
            { key: "kun", angle: 225 },
            { key: "dui", angle: 270 },
            { key: "qian", angle: 315 },
          ].map((item) => (
            <span
              key={item.key}
              className="text-lg opacity-25 hover:opacity-60 transition-opacity cursor-default"
              style={{
                opacity: 0.25,
                transform: `rotate(${item.angle}deg)`,
              }}
              title={`${BAGUA.positions[item.key as keyof typeof BAGUA.positions].name}·${BAGUA.positions[item.key as keyof typeof BAGUA.positions].direction}`}
            >
              {BAGUA.positions[item.key as keyof typeof BAGUA.positions].symbol}
            </span>
          ))}
        </div>
        <p className="text-xs opacity-30 tracking-widest">后天八卦 · 九宫格</p>
      </footer>
    </div>
  );
}