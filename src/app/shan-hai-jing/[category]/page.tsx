"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BAGUA } from "@/lib/design-system";
import { CopyButton } from "@/components/copy-button";
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

function CreatureCard({ creature }: { creature: typeof CREATURES_BY_CATEGORY["南山经"][0] }) {
  return (
    <article
      className="group rounded-xl border overflow-hidden transition-all duration-300 hover:shadow-xl"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border)",
      }}
    >
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

export default function CategoryPage() {
  const params = useParams();
  const category = decodeURIComponent(params.category as string);

  if (!CREATURES_BY_CATEGORY[category as keyof typeof CREATURES_BY_CATEGORY]) {
    notFound();
  }

  const creatures = CREATURES_BY_CATEGORY[category as keyof typeof CREATURES_BY_CATEGORY];
  const baguaKey = CATEGORY_BAGUA[category] as keyof typeof BAGUA.positions;
  const symbol = category === "附录专题" ? "☯" : (BAGUA.positions[baguaKey]?.symbol || "☯");
  const icon = CATEGORY_ICONS[category] || "◉";

  return (
    <div className="min-h-screen">
      <header className="py-12 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-[1000px] mx-auto px-6 text-center">
          <Link href="/shan-hai-jing" className="text-sm mb-6 inline-flex items-center gap-2" style={{ color: "var(--text-muted)" }}>
            <span>←</span> 返回导航
          </Link>
          <div className="text-5xl mb-4">{icon}</div>
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-3xl opacity-40">{symbol}</span>
            <h1 className="text-4xl font-bold" style={{ color: "var(--text-primary)" }}>{category}</h1>
            <span className="text-3xl opacity-40">{symbol}</span>
          </div>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            已收录 {creatures.length} 种异兽
          </p>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {creatures.map((creature) => (
            <CreatureCard key={creature.id} creature={creature} />
          ))}
        </div>
      </main>
    </div>
  );
}