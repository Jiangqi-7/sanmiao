"use client";

import Link from "next/link";
import { BAGUA } from "@/lib/design-system";
import { useState, useEffect } from "react";

// 后天八卦九宫格布局
const BAGUA_GRID = [
  { key: "xun", name: "巽", direction: "东南", href: "/blog?category=workflow" },
  { key: "li", name: "离", direction: "南", href: "/shan-hai-jing" },
  { key: "kun", name: "坤", direction: "西南", href: "/about" },
  { key: "zhen", name: "震", direction: "东", href: "/blog?category=video" },
  { key: "center", name: "中", direction: "宫", href: "/", isCenter: true },
  { key: "dui", name: "兑", direction: "西", href: "/bookmarks", desc: "书签收藏" },
  { key: "gen", name: "艮", direction: "东北", href: "/blog?category=tools" },
  { key: "kan", name: "坎", direction: "北", href: "/blog", desc: "博客文章" },
  { key: "qian", name: "乾", direction: "西北", href: "/about", desc: "关于" },
];

function BaguaCell({ cell }: { cell: typeof BAGUA_GRID[0] }) {
  const isCenter = cell.isCenter;
  const symbol = isCenter ? "☯" : BAGUA.positions[cell.key as keyof typeof BAGUA.positions]?.symbol;
  const label = isCenter ? "三秒" : cell.name;
  const subtext = isCenter ? "sanmiao" : cell.direction;
  const desc = isCenter ? "道法自然" : ("desc" in cell ? cell.desc : cell.direction);

  return (
    <Link
      href={cell.href}
      className="group block p-6 transition-all duration-300 border border-neutral-200 hover:border-neutral-800"
      style={{ backgroundColor: "#fafafa" }}
    >
      <div className="mb-4">
        <span className="text-xs tracking-widest text-neutral-400 uppercase">{subtext}</span>
      </div>
      <h3 className="text-2xl font-light mb-2" style={{ color: "#1a1a1a", fontFamily: "serif" }}>
        {label}
      </h3>
      <div className="flex items-center justify-between">
        <span className="text-sm text-neutral-500">{desc}</span>
        <span className="text-4xl opacity-20 transition-opacity duration-300 group-hover:opacity-40" style={{ fontFamily: "serif" }}>
          {symbol}
        </span>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fafafa" }}>
      {/* 顶部细线 */}
      <div className="h-px" style={{ backgroundColor: "#1a1a1a" }} />

      {/* 主内容区 */}
      <main className="max-w-[900px] mx-auto px-6 py-20">
        {/* 标题区 */}
        <header className="mb-20 text-center">
          <h1
            className={`text-5xl font-light mb-4 tracking-[0.3em] transition-all duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`}
            style={{ color: "#1a1a1a", fontFamily: "serif" }}
          >
            道法自然
          </h1>
          <p
            className={`text-sm tracking-[0.5em] text-neutral-400 transition-all duration-1000 delay-200 ${loaded ? "opacity-100" : "opacity-0"}`}
          >
            AI 为用
          </p>

          {/* 细分隔线 */}
          <div className={`flex items-center justify-center gap-8 mt-12 transition-all duration-1000 delay-400 ${loaded ? "opacity-100" : "opacity-0"}`}>
            <div className="w-16 h-px bg-neutral-300" />
            <div className="flex items-center gap-6">
              {["☰", "☯", "☷"].map((s, i) => (
                <span key={i} className="text-xl text-neutral-300" style={{ fontFamily: "serif" }}>{s}</span>
              ))}
            </div>
            <div className="w-16 h-px bg-neutral-300" />
          </div>
        </header>

        {/* 九宫格 */}
        <div className="grid grid-cols-3 gap-4">
          {BAGUA_GRID.map((cell, index) => (
            <div
              key={cell.key}
              className={`transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${index * 80 + 300}ms` }}
            >
              <BaguaCell cell={cell} />
            </div>
          ))}
        </div>

        {/* 底部 */}
        <footer className="mt-20 pt-8 text-center">
          <div className="inline-block px-8 py-4 border border-neutral-300">
            <p className="text-xs tracking-[0.4em] text-neutral-400">
              後天八卦 · 九宫格
            </p>
          </div>

          {/* 底部八卦符号 */}
          <div className="flex items-center justify-center gap-4 mt-8">
            {["kan", "gen", "zhen", "xun", "li", "kun", "dui", "qian"].map((key) => (
              <span
                key={key}
                className="text-base text-neutral-300 transition-all duration-300 hover:text-neutral-800 cursor-default"
                style={{ fontFamily: "serif" }}
              >
                {BAGUA.positions[key as keyof typeof BAGUA.positions].symbol}
              </span>
            ))}
          </div>

          {/* 底部细线 */}
          <div className="w-full h-px bg-neutral-200 mt-12" />
        </footer>
      </main>

      {/* 底部细线 */}
      <div className="h-px" style={{ backgroundColor: "#1a1a1a" }} />
    </div>
  );
}