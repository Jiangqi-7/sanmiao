"use client";

import Link from "next/link";
import { BAGUA } from "@/lib/design-system";

// 后天八卦九宫格布局
const BAGUA_GRID = [
  { key: "xun", name: "巽", direction: "东南", href: "/blog?category=workflow", desc: "AI 工作流", color: "#6ee7b7" },
  { key: "li", name: "离", direction: "南", href: "/shan-hai-jing", desc: "山海经图鉴", color: "#fca5a5" },
  { key: "kun", name: "坤", direction: "西南", href: "/about", desc: "关于我们", color: "#fcd34d" },
  { key: "zhen", name: "震", direction: "东", href: "/blog?category=video", desc: "视频生成", color: "#6ee7b7" },
  { key: "center", name: "中", direction: "宫", href: "/", desc: "道法自然", isCenter: true },
  { key: "dui", name: "兑", direction: "西", href: "/blog?category=image", desc: "图片生成", color: "#e5e5e5" },
  { key: "gen", name: "艮", direction: "东北", href: "/blog?category=tools", desc: "工具教程", color: "#fcd34d" },
  { key: "kan", name: "坎", direction: "北", href: "/blog", desc: "博客文章", color: "#7dd3fc" },
  { key: "qian", name: "乾", direction: "西北", href: "/about", desc: "关于本站", color: "#fcd34d" },
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
      className="group relative flex flex-col rounded-2xl transition-all duration-500 hover:scale-[1.03]"
      style={{
        height: "280px",
        background: isCenter
          ? "linear-gradient(160deg, #1a1a1a 0%, #0f0f0f 100%)"
          : "linear-gradient(160deg, #1a1a1a 0%, #141414 100%)",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)",
      }}
    >
      {/* 顶部光晕 */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/3 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${isCenter ? "rgba(255,255,255,0.12)" : cell.color}22 0%, transparent 70%)`,
        }}
      />

      {/* 大背景符号 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span
          className="text-[110px] font-bold select-none transform group-hover:scale-110 transition-transform duration-700"
          style={{
            color: isCenter ? "#ffffff" : cell.color,
            opacity: isCenter ? 0.06 : 0.08,
            textShadow: "0 0 60px rgba(255,255,255,0.1)",
          }}
        >
          {symbol}
        </span>
      </div>

      {/* 内容区域 */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full p-5">
        {/* 顶部 */}
        <div className="flex flex-col items-center">
          <span
            className="text-3xl mb-2 transform group-hover:scale-110 transition-transform duration-500"
            style={{ color: isCenter ? "#ffffff" : cell.color }}
          >
            {symbol}
          </span>
          <span
            className="font-brush text-2xl tracking-[0.2em]"
            style={{ color: "rgba(255,255,255,0.9)" }}
          >
            {label}
          </span>
        </div>

        {/* 底部 */}
        <div className="flex flex-col items-center">
          <span
            className="text-xs tracking-[0.3em] mb-3 uppercase"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            {subtext}
          </span>
          <span
            className="text-xs px-4 py-1.5 rounded-full tracking-wider transition-all duration-300 group-hover:bg-white/10"
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              color: "rgba(255,255,255,0.5)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {tag}
          </span>
        </div>
      </div>

      {/* 底部光晕 */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1/4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `radial-gradient(ellipse at 50% 100%, ${isCenter ? "rgba(255,255,255,0.08)" : cell.color}15 0%, transparent 60%)`,
        }}
      />
    </Link>
  );
}

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#090909" }}>
      {/* 顶部标题区 */}
      <header className="pt-24 pb-16 text-center relative overflow-hidden">
        {/* 装饰性光晕 */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 70%)",
          }}
        />

        {/* 顶部装饰线 */}
        <div className="flex items-center justify-center gap-5 mb-8">
          <div
            className="h-px w-24"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)" }}
          />
          <span className="text-2xl" style={{ color: "rgba(255,255,255,0.25)" }}>☯</span>
          <div
            className="h-px w-24"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)" }}
          />
        </div>

        {/* 标题 */}
        <h1
          className="font-brush text-7xl md:text-8xl font-normal tracking-[0.3em] mb-4"
          style={{
            color: "rgba(255,255,255,0.95)",
            textShadow: "0 0 80px rgba(255,255,255,0.1)",
          }}
        >
          道法自然
        </h1>
        <p
          className="font-brush text-2xl tracking-[0.5em]"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          AI 为用
        </p>
      </header>

      {/* 九宫格主区域 */}
      <main className="flex-1 flex items-center justify-center px-10 py-8">
        <div className="w-full max-w-[900px]">
          <div className="grid grid-cols-3 gap-6">
            {BAGUA_GRID.map((cell) => (
              <BaguaCell key={cell.key} cell={cell} />
            ))}
          </div>
        </div>
      </main>

      {/* 底部八卦 */}
      <footer className="py-12 text-center relative">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }}
        />

        <div className="flex items-center justify-center gap-8 mb-5">
          {["kan", "gen", "zhen", "xun", "li", "kun", "dui", "qian"].map((key) => (
            <span
              key={key}
              className="text-lg transition-opacity duration-300 hover:opacity-100"
              style={{ color: "rgba(255,255,255,0.15)", opacity: 0.15 }}
            >
              {BAGUA.positions[key as keyof typeof BAGUA.positions].symbol}
            </span>
          ))}
        </div>
        <p
          className="font-brush text-sm tracking-[0.4em]"
          style={{ color: "rgba(255,255,255,0.15)" }}
        >
          後天八卦 · 九宮格
        </p>
      </footer>
    </div>
  );
}