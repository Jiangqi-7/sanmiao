"use client";

import { BAGUA } from "@/lib/design-system";
import { CREATURES_BY_CATEGORY } from "@/lib/creatures";

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
            href={`/shan-hai-jing/${cat}`}
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
      <section className="relative py-24 overflow-hidden text-center">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-3xl opacity-40">{BAGUA.positions.gen.symbol}</span>
            <span className="text-5xl">☯</span>
            <span className="text-3xl opacity-40">{BAGUA.positions.dui.symbol}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight" style={{ color: "var(--text-primary)" }}>
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

      </div>
  );
}