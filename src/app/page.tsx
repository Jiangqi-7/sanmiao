"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BAGUA } from "@/lib/design-system";
import { CREATURES_BY_CATEGORY, CATEGORIES } from "@/lib/creatures";

const CATEGORY_BAGUA: Record<string, { key: string; direction: string }> = {
  "南山经": { key: "li", direction: "南" },
  "西山经": { key: "dui", direction: "西" },
  "北山经": { key: "kan", direction: "北" },
  "东山经": { key: "zhen", direction: "东" },
  "中山经": { key: "gen", direction: "东北" },
  "大荒经": { key: "qian", direction: "西北" },
  "海外经": { key: "kun", direction: "西南" },
  "海内经": { key: "xun", direction: "东南" },
  "附录专题": { key: "center", direction: "中" },
};

const CATEGORY_ICONS: Record<string, string> = {
  "南山经": "🦎",
  "西山经": "🐯",
  "北山经": "🐺",
  "东山经": "🐉",
  "中山经": "🐍",
  "大荒经": "🔥",
  "海外经": "🌀",
  "海内经": "🌊",
  "附录专题": "✨",
};

const COLORS = ["vermilion", "gold", "peacock", "sky", "thunder"];

function LightningEffect() {
  const [bolts, setBolts] = useState<Array<{ id: number; x: number; delay: number; angle: number; length: number }>>([]);

  useEffect(() => {
    const newBolts = [];
    for (let i = 0; i < 6; i++) {
      newBolts.push({
        id: i,
        x: 5 + Math.random() * 90,
        delay: Math.random() * 15,
        angle: Math.random() * 20 - 10,
        length: 30 + Math.random() * 50,
      });
    }
    setBolts(newBolts);
  }, []);

  return (
    <div className="lightning-container">
      {bolts.map((bolt) => (
        <div
          key={bolt.id}
          className="lightning-bolt"
          style={{
            left: `${bolt.x}%`,
            animationDelay: `${bolt.delay}s`,
            transform: `rotate(${bolt.angle}deg)`,
            height: `${bolt.length}vh`,
          }}
        />
      ))}
      <div className="lightning-fork" />
      <div className="lightning-fork" />
    </div>
  );
}

function CategoryCard({ category, count, baguaKey }: { category: string; count: number; baguaKey: string }) {
  const symbol = BAGUA.positions[baguaKey as keyof typeof BAGUA.positions]?.symbol || "☯";
  const icon = CATEGORY_ICONS[category] || "◉";

  return (
    <Link
      href={`/shan-hai-jing#${category}`}
      className="group block p-5 transition-all duration-300 border glow-hover color-card relative overflow-hidden"
      style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      {/* 背景八卦符号 */}
      <span
        className="absolute -right-2 -bottom-2 text-8xl opacity-5 select-none transition-transform duration-500 group-hover:opacity-10 group-hover:scale-110"
        style={{ fontFamily: "serif" }}
      >
        {symbol}
      </span>

      {/* 顶部 */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs tracking-widest" style={{ color: "var(--text-muted)" }}>
          {CATEGORY_BAGUA[category]?.direction || category}
        </span>
        <span className="text-xl">{icon}</span>
      </div>

      {/* 名称 */}
      <h3 className="text-xl font-medium mb-1" style={{ color: "var(--text-primary)" }}>
        {category}
      </h3>

      {/* 数量 */}
      <div className="flex items-center justify-between">
        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
          {count} 种异兽
        </span>
        <span
          className="text-2xl opacity-30 transition-opacity duration-300 group-hover:opacity-60 thunder-glow"
          style={{ fontFamily: "serif" }}
        >
          {symbol}
        </span>
      </div>

      {/* 底部装饰线 */}
      <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500" style={{ backgroundColor: "var(--accent)" }} />
    </Link>
  );
}

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const totalCreatures = Object.values(CREATURES_BY_CATEGORY).reduce((sum, arr) => sum + arr.length, 0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }}>
      <LightningEffect />

      {/* 顶部渐变细线 */}
      <div className="h-px gradient-border" />

      <main className="max-w-[900px] mx-auto px-6 py-16">
        {/* 标题区 */}
        <header className="mb-16 text-center relative">
          {/* 装饰性彩色点 */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center gap-3" style={{ top: "-20px" }}>
            {COLORS.map((c, i) => (
              <div key={c} className={`color-dot ${c}`} style={{ animationDelay: `${i * 0.3}s` }} />
            ))}
          </div>

          <h1
            className={`text-5xl font-light mb-3 tracking-[0.3em] transition-all duration-1000 thunder-glow ${loaded ? "opacity-100" : "opacity-0"}`}
            style={{ color: "var(--text-primary)", fontFamily: "serif" }}
          >
            山海经
          </h1>
          <p
            className={`text-sm tracking-[0.5em] transition-all duration-1000 delay-200 ${loaded ? "opacity-100" : "opacity-0"}`}
            style={{ color: "var(--text-muted)" }}
          >
            异兽图鉴
          </p>

          {/* 细分隔线 */}
          <div className={`flex items-center justify-center gap-6 mt-10 transition-all duration-1000 delay-400 ${loaded ? "opacity-100" : "opacity-0"}`}>
            <div className="w-20 h-px" style={{ backgroundColor: "var(--border)" }} />
            <div className="flex items-center gap-4">
              {["☰", "☯", "☷"].map((s, i) => (
                <span key={i} className={`text-lg ${i === 1 ? 'thunder-glow' : ''}`} style={{ fontFamily: "serif", color: "var(--text-muted)" }}>{s}</span>
              ))}
            </div>
            <div className="w-20 h-px" style={{ backgroundColor: "var(--border)" }} />
          </div>
        </header>

        {/* 九宫格 - 按八卦方位排列 */}
        <div className="grid grid-cols-3 gap-4 mb-16">
          {/* 第一行：东南、南、西南 */}
          <div
            className={`transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "100ms" }}
          >
            <CategoryCard category="海内经" count={CREATURES_BY_CATEGORY["海内经"].length} baguaKey={CATEGORY_BAGUA["海内经"].key} />
          </div>
          <div
            className={`transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "200ms" }}
          >
            <CategoryCard category="南山经" count={CREATURES_BY_CATEGORY["南山经"].length} baguaKey={CATEGORY_BAGUA["南山经"].key} />
          </div>
          <div
            className={`transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "300ms" }}
          >
            <CategoryCard category="西山经" count={CREATURES_BY_CATEGORY["西山经"].length} baguaKey={CATEGORY_BAGUA["西山经"].key} />
          </div>

          {/* 第二行：东、中、中 - 左边空、附录专题、右边空 */}
          <div
            className={`transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "400ms" }}
          >
            <CategoryCard category="东山经" count={CREATURES_BY_CATEGORY["东山经"].length} baguaKey={CATEGORY_BAGUA["东山经"].key} />
          </div>
          <div
            className={`transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "500ms" }}
          >
            <CategoryCard category="附录专题" count={CREATURES_BY_CATEGORY["附录专题"].length} baguaKey={CATEGORY_BAGUA["附录专题"].key} />
          </div>
          <div
            className={`transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "600ms" }}
          >
            <CategoryCard category="北山经" count={CREATURES_BY_CATEGORY["北山经"].length} baguaKey={CATEGORY_BAGUA["北山经"].key} />
          </div>

          {/* 第三行：东北、北、西北 */}
          <div
            className={`transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "700ms" }}
          >
            <CategoryCard category="中山经" count={CREATURES_BY_CATEGORY["中山经"].length} baguaKey={CATEGORY_BAGUA["中山经"].key} />
          </div>
          <div
            className={`transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "800ms" }}
          >
            <CategoryCard category="大荒经" count={CREATURES_BY_CATEGORY["大荒经"].length} baguaKey={CATEGORY_BAGUA["大荒经"].key} />
          </div>
          <div
            className={`transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "900ms" }}
          >
            <CategoryCard category="海外经" count={CREATURES_BY_CATEGORY["海外经"].length} baguaKey={CATEGORY_BAGUA["海外经"].key} />
          </div>
        </div>

        {/* 快速导航 */}
        <div className="text-center mb-12">
          <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>快捷导航</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {[
              { href: "/blog", label: "博客" },
              { href: "/bookmarks", label: "书签" },
              { href: "/puzzles", label: "推理阁" },
              { href: "/tools", label: "工具箱" },
              { href: "/prompts", label: "提示词" },
              { href: "/about", label: "关于" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm px-3 py-1.5 rounded-full border transition-all hover:shadow-md"
                style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* 底部 */}
        <footer className="pt-8 text-center border-t" style={{ borderColor: "var(--border)" }}>
          <div className="inline-block px-8 py-4 border gradient-border" style={{ borderColor: "var(--border)" }}>
            <p className="text-xs tracking-[0.4em]" style={{ color: "var(--text-muted)" }}>
              九经分类 · 共 {totalCreatures} 种异兽
            </p>
          </div>

          {/* 底部八卦符号 */}
          <div className="flex items-center justify-center gap-4 mt-8">
            {["kan", "gen", "zhen", "xun", "li", "kun", "dui", "qian"].map((key, i) => (
              <span
                key={key}
                className={`text-base transition-all duration-300 cursor-default ${i % 2 === 0 ? 'thunder-glow' : ''}`}
                style={{ fontFamily: "serif", color: "var(--text-muted)" }}
              >
                {BAGUA.positions[key as keyof typeof BAGUA.positions].symbol}
              </span>
            ))}
          </div>

          {/* 装饰性彩色点 */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {COLORS.map((c, i) => (
              <div key={c} className={`color-dot ${c}`} style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>

          <div className="w-full h-px mt-12" style={{ backgroundColor: "var(--border)" }} />
        </footer>
      </main>

      {/* 底部渐变细线 */}
      <div className="h-px gradient-border" />
    </div>
  );
}