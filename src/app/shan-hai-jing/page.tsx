"use client";

import { useEffect, useState } from "react";
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

function CategoryCard({ cat, index }: { cat: string; index: number }) {
  const baguaKey = CATEGORY_BAGUA[cat] as keyof typeof BAGUA.positions;
  const icon = CATEGORY_ICONS[cat] || "◉";
  const symbol = cat === "附录专题" ? "☯" : (BAGUA.positions[baguaKey]?.symbol || "☯");

  return (
    <a
      href={`/shan-hai-jing/${cat}`}
      className="group block p-6 transition-all duration-300 border glow-hover color-card"
      style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="text-3xl">{icon}</span>
        <div className="flex items-center gap-1">
          {COLORS.slice(0, 3).map((c) => (
            <div key={c} className={`color-dot ${c}`} style={{ animationDelay: `${index * 0.2}s` }} />
          ))}
        </div>
      </div>
      <h3 className="text-xl font-medium mb-2" style={{ color: "var(--text-primary)" }}>
        {cat}
      </h3>
      <div className="flex items-center justify-between">
        <span className="text-sm" style={{ color: "var(--text-muted)" }}>
          {CREATURES_BY_CATEGORY[cat as keyof typeof CREATURES_BY_CATEGORY].length} 种异兽
        </span>
        <span
          className="text-3xl opacity-20 transition-opacity duration-300 group-hover:opacity-40 thunder-glow"
          style={{ fontFamily: "serif" }}
        >
          {symbol}
        </span>
      </div>
    </a>
  );
}

const ORDER = ["海内经", "南山经", "西山经", "东山经", "附录专题", "北山经", "中山经", "大荒经", "海外经"];

export default function ShanHaiJingPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }}>
      <LightningEffect />

      {/* 顶部渐变细线 */}
      <div className="h-px gradient-border" />

      <main className="max-w-[900px] mx-auto px-6 py-20">
        {/* 标题区 */}
        <header className="mb-20 text-center relative">
          {/* 装饰性彩色点 */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center gap-3" style={{ top: "-20px" }}>
            {COLORS.map((c, i) => (
              <div key={c} className={`color-dot ${c}`} style={{ animationDelay: `${i * 0.3}s` }} />
            ))}
          </div>

          <h1
            className={`text-5xl font-light mb-4 tracking-[0.3em] transition-all duration-1000 thunder-glow ${loaded ? "opacity-100" : "opacity-0"}`}
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
          <div className={`flex items-center justify-center gap-8 mt-12 transition-all duration-1000 delay-400 ${loaded ? "opacity-100" : "opacity-0"}`}>
            <div className="w-16 h-px" style={{ backgroundColor: "var(--border)" }} />
            <div className="flex items-center gap-6">
              {["☰", "☯", "☷"].map((s, i) => (
                <span key={i} className={`text-xl ${i === 1 ? 'thunder-glow' : ''}`} style={{ fontFamily: "serif", color: "var(--text-muted)" }}>{s}</span>
              ))}
            </div>
            <div className="w-16 h-px" style={{ backgroundColor: "var(--border)" }} />
          </div>
        </header>

        {/* 九宫格 - 八卦分类导航 */}
        <div className="grid grid-cols-3 gap-4">
          {ORDER.map((cat, index) => (
            <div
              key={cat}
              className={`transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${index * 80 + 300}ms` }}
            >
              <CategoryCard cat={cat} index={index} />
            </div>
          ))}
        </div>

        {/* 底部信息 */}
        <footer className="mt-20 pt-8 text-center border-t" style={{ borderColor: "var(--border)" }}>
          <div className="inline-block px-8 py-4 border gradient-border" style={{ borderColor: "var(--border)" }}>
            <p className="text-xs tracking-[0.4em]" style={{ color: "var(--text-muted)" }}>
              九经分类 · 共 {Object.values(CREATURES_BY_CATEGORY).reduce((sum, arr) => sum + arr.length, 0)} 种异兽
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