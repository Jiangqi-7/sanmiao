"use client";

import Link from "next/link";
import { BAGUA } from "@/lib/design-system";
import { BaguaWheel } from "@/components/bagua-decorations";
import { CopyButton } from "@/components/copy-button";
import { CREATURES_BY_CATEGORY, CATEGORIES } from "@/lib/creatures";

function CreatureCard({ creature }: { creature: typeof CREATURES_BY_CATEGORY["南山经"][0] }) {
  return (
    <article
      className="group rounded-xl border overflow-hidden transition-all duration-300 hover:shadow-xl"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border)",
      }}
    >
      {/* 头部：名称和出处 */}
      <div className="p-4 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{BAGUA.positions[creature.bagua as keyof typeof BAGUA.positions]?.symbol || "☯"}</span>
          <div>
            <h3 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>{creature.name}</h3>
            <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-muted)" }}>
              {creature.source}
            </span>
          </div>
        </div>
        <p className="text-sm italic leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {creature.rawText}
        </p>
      </div>

      {/* 标签 */}
      <div className="px-4 pt-3 flex flex-wrap gap-2">
        {creature.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 rounded"
            style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-muted)" }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* 提示词区域 */}
      <details className="group/prompt">
        <summary
          className="flex items-center justify-between px-4 py-3 cursor-pointer list-none text-sm font-medium"
          style={{ color: "var(--text-primary)" }}
        >
          <span className="flex items-center gap-2">
            <span style={{ opacity: 0.5 }}>{BAGUA.positions.li.symbol}</span>
            提示词
          </span>
          <span className="text-xs opacity-50 group-open/prompt:hidden block">点击展开</span>
          <span className="text-xs opacity-50 group-open/prompt:block hidden">点击收起</span>
        </summary>

        <div className="px-4 pb-4 space-y-3">
          {/* 中文提示词 */}
          <div>
            <p className="text-xs font-medium mb-2 flex items-center gap-2" style={{ color: "var(--text-muted)" }}>
              中文提示词
              <CopyButton text={creature.promptZh} lang="zh" />
            </p>
            <p
              className="text-sm p-3 rounded-md leading-relaxed"
              style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-primary)" }}
            >
              {creature.promptZh}
            </p>
          </div>

          {/* English Prompt */}
          <div>
            <p className="text-xs font-medium mb-2 flex items-center gap-2" style={{ color: "var(--text-muted)" }}>
              English Prompt
              <CopyButton text={creature.promptEn} lang="en" />
            </p>
            <p
              className="text-xs p-3 rounded-md font-mono leading-relaxed"
              style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-secondary)" }}
            >
              {creature.promptEn}
            </p>
          </div>
        </div>
      </details>
    </article>
  );
}

const CATEGORY_BAGUA: Record<string, string> = {
  "南山经": "li",
  "西山经": "dui",
  "北山经": "kan",
  "东山经": "zhen",
  "中山经": "gen",
  "大荒经": "qian",
  "海外经": "kun",
  "海内经": "xun",
  "附录专题": "center",
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

function CategoryNavGrid() {
  const order = ["海内经", "南山经", "西山经", "东山经", "附录专题", "北山经", "中山经", "大荒经", "海外经"];

  return (
    <div className="grid grid-cols-3 gap-3 p-4">
      {order.map((cat) => {
        const baguaKey = CATEGORY_BAGUA[cat] as keyof typeof BAGUA.positions;
        const icon = CATEGORY_ICONS[cat] || "◉";
        const symbol = cat === "附录专题" ? "☯" : (BAGUA.positions[baguaKey]?.symbol || "☯");

        return (
          <a
            key={cat}
            href={`#${cat}`}
            className="group flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 hover:shadow-md"
            style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
          >
            <span className="text-2xl">{icon}</span>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm" style={{ color: "var(--text-primary)" }}>{cat}</div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>{CREATURES_BY_CATEGORY[cat as keyof typeof CREATURES_BY_CATEGORY].length} 种</div>
            </div>
            <span className="text-xl opacity-30 group-hover:opacity-60 transition-opacity" style={{ fontFamily: "serif" }}>
              {symbol}
            </span>
          </a>
        );
      })}
    </div>
  );
}

export default function ShanHaiJingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* 背景八卦装饰 */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-0 right-0">
            <BaguaWheel size={400} />
          </div>
        </div>

        <div className="relative z-10 max-w-[1000px] mx-auto px-6 text-center">
          {/* 标题符号 */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-3xl opacity-40">{BAGUA.positions.gen.symbol}</span>
            <span className="text-5xl">☯</span>
            <span className="text-3xl opacity-40">{BAGUA.positions.dui.symbol}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            山海经
            <span className="block text-xl md:text-2xl font-normal opacity-60 mt-2">异兽图鉴</span>
          </h1>

          <p className="text-lg mb-6" style={{ color: "var(--text-secondary)" }}>
            《山海经》异兽与 AI 创作的融合
          </p>

          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            GPT Image 2 提示词 · 中英对照 · 点击展开复制
          </p>

          <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
            共收录 {Object.values(CREATURES_BY_CATEGORY).reduce((sum, arr) => sum + arr.length, 0)} 种异兽
          </p>
        </div>
      </section>

      {/* 分类导航 - 八卦九宫格 */}
      <section className="py-6 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-[900px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-lg">{BAGUA.positions.kun.symbol}</span>
            <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>九经分类</span>
          </div>
          <CategoryNavGrid />
        </div>
      </section>

      {/* 异兽展示 */}
      <section className="py-12 flex-1">
        <div className="max-w-[1400px] mx-auto px-6 space-y-16">
          {Object.keys(CREATURES_BY_CATEGORY).map((category) => {
            const creatures = CREATURES_BY_CATEGORY[category as keyof typeof CREATURES_BY_CATEGORY];
            const baguaKey = CATEGORY_BAGUA[category] as keyof typeof BAGUA.positions;
            const baguaSymbol = BAGUA.positions[baguaKey]?.symbol || "☯";

            return (
              <div key={category} id={category}>
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-3xl">{baguaSymbol}</span>
                  <h2 className="text-2xl font-semibold">{category}</h2>
                  <span
                    className="text-sm px-3 py-1 rounded-full"
                    style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-muted)" }}
                  >
                    已收录 {creatures.length} 种
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {creatures.map((creature) => (
                    <CreatureCard key={creature.id} creature={creature} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}