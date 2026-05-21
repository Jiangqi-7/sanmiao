"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BAGUA } from "@/lib/design-system";

const BAGUA_GRID = [
  { key: "xun", name: "巽", direction: "东南", href: "/blog" },
  { key: "li", name: "离", direction: "南", href: "/shan-hai-jing" },
  { key: "kun", name: "坤", direction: "西南", href: "/prompts" },
  { key: "zhen", name: "震", direction: "东", href: "/blog" },
  { key: "center", name: "中", direction: "宫", href: "/", isCenter: true },
  { key: "dui", name: "兑", direction: "西", href: "/bookmarks" },
  { key: "gen", name: "艮", direction: "东北", href: "/tools" },
  { key: "kan", name: "坎", direction: "北", href: "/about" },
  { key: "qian", name: "乾", direction: "西北", href: "/puzzles" },
];

const BAGUA_DESCS: Record<string, string> = {
  "xun": "博客",
  "li": "山海经",
  "kun": "提示词工程",
  "zhen": "博客",
  "dui": "书签收藏",
  "gen": "工具箱",
  "kan": "关于",
  "qian": "推理阁",
};

const BAGUA_SYMBOLS = ["kan", "gen", "zhen", "xun", "li", "kun", "dui", "qian"];
const COLORS = ["vermilion", "gold", "peacock", "sky", "thunder"];

// 打字机效果组件
function TypewriterText({ text, onComplete }: { text: string; onComplete?: () => void }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        onComplete?.();
      }
    }, 120);
    return () => clearInterval(timer);
  }, [text, onComplete]);

  return <span>{displayed}</span>;
}

// 不规则闪电组件
function Lightning({ x, y }: { x: number; y: number }) {
  const [paths, setPaths] = useState<string[]>([]);

  useEffect(() => {
    // 生成多条不规则闪电路径
    const generateZigzag = (startX: number, startY: number, angle: number, length: number) => {
      let d = `M ${startX} ${startY}`;
      let cx = startX;
      let cy = startY;
      const steps = 8 + Math.floor(Math.random() * 5);
      const stepLength = length / steps;

      for (let i = 0; i < steps; i++) {
        const jitter = (Math.random() - 0.5) * 30;
        const nextAngle = angle + jitter;
        cx += Math.sin(nextAngle * Math.PI / 180) * stepLength;
        cy -= Math.cos(nextAngle * Math.PI / 180) * stepLength;
        d += ` L ${cx} ${cy}`;
      }
      return d;
    };

    const newPaths: string[] = [];

    // 主干闪电 - 向下
    newPaths.push(generateZigzag(x, y, 90, 200));

    // 分叉1 - 向左
    newPaths.push(generateZigzag(x, y + 50, 150, 100));
    newPaths.push(generateZigzag(x, y + 80, 120, 80));

    // 分叉2 - 向右
    newPaths.push(generateZigzag(x, y + 60, 30, 120));
    newPaths.push(generateZigzag(x, y + 90, 60, 90));

    // 分叉3 - 向左上
    newPaths.push(generateZigzag(x - 20, y + 40, 160, 80));

    setPaths(newPaths);

    // 1秒后清除
    const timer = setTimeout(() => setPaths([]), 1000);
    return () => clearTimeout(timer);
  }, [x, y]);

  return (
    <svg
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          stroke={i === 0 ? "#fff" : ["#87CEEB", "#8A2BE2"][i % 2]}
          strokeWidth={i === 0 ? 3 : 2}
          fill="none"
          style={{
            filter: "drop-shadow(0 0 5px #fff) drop-shadow(0 0 10px #87CEEB)",
          }}
        />
      ))}
    </svg>
  );
}

function BaguaCell({ cell, index }: { cell: typeof BAGUA_GRID[0]; index: number }) {
  const isCenter = cell.isCenter;
  const symbol = isCenter ? "☯" : BAGUA.positions[cell.key as keyof typeof BAGUA.positions]?.symbol;
  const label = isCenter ? "三秒" : cell.name;
  const desc = isCenter ? "道法自然" : BAGUA_DESCS[cell.key];

  return (
    <Link
      href={cell.href}
      className="group block p-6 transition-all duration-300 border glow-hover color-card"
      style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>{cell.direction}</span>
        <div className="flex items-center gap-1">
          {COLORS.slice(0, 3).map((c) => (
            <div key={c} className={`color-dot ${c}`} style={{ animationDelay: `${index * 0.2}s` }} />
          ))}
        </div>
      </div>
      <h3 className="text-2xl font-light mb-2" style={{ color: "var(--text-primary)", fontFamily: "serif" }}>
        {label}
      </h3>
      <div className="flex items-center justify-between">
        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{desc}</span>
        <span className="text-4xl opacity-20 transition-opacity duration-300 group-hover:opacity-40 breath thunder-glow" style={{ fontFamily: "serif" }}>
          {symbol}
        </span>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);
  const [titleShown, setTitleShown] = useState(false);
  const [lightning, setLightning] = useState<{ x: number; y: number } | null>(null);

  const handleClick = (e: React.MouseEvent) => {
    setLightning({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }} onClick={handleClick}>
      {lightning && <Lightning x={lightning.x} y={lightning.y} />}

      {/* 顶部渐变细线 */}
      <div className="h-px gradient-border" />

      {/* 视频播放器 - 左上角 */}
      <div className="fixed top-20 left-6 w-48 z-40">
        <video
          id="home-video"
          className="w-full rounded-lg shadow-lg border"
          style={{ borderColor: "var(--border)" }}
          src="/dance-light.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
      </div>

      {/* 推理阁视频预加载 - 隐藏 */}
      <video
        id="puzzle-video"
        className="fixed top-0 left-0 w-0 h-0 opacity-0 pointer-events-none"
        src="/thinking-light.mp4"
        preload="auto"
      />

      <main className="relative max-w-[900px] mx-auto px-6 py-20">
        {/* 标题区 */}
        <header className="mb-20 text-center relative">
          {/* 装饰性彩色点 */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center gap-3" style={{ top: "-20px" }}>
            {COLORS.map((c, i) => (
              <div key={c} className={`color-dot ${c}`} style={{ animationDelay: `${i * 0.3}s` }} />
            ))}
          </div>

          <h1
            className="text-5xl font-light mb-4 tracking-[0.3em] thunder-glow"
            style={{ color: "var(--text-primary)", fontFamily: "serif" }}
          >
            {titleShown ? "道法自然" : <TypewriterText text="道法自然" onComplete={() => setTitleShown(true)} />}
          </h1>
          <p className="text-sm tracking-[0.5em]" style={{ color: "var(--text-muted)" }}>
            {titleShown ? "AI 为用" : <TypewriterText text="AI 为用" />}
          </p>

          {/* 点击提示 */}
          <p className="text-xs mt-4" style={{ color: "var(--text-muted)" }}>
            点击任意位置触发闪电
          </p>

          {/* 细分隔线 */}
          <div className="flex items-center justify-center gap-8 mt-12">
            <div className="w-16 h-px" style={{ backgroundColor: "var(--border)" }} />
            <div className="flex items-center gap-6">
              {["☰", "☯", "☷"].map((s, i) => (
                <span key={i} className={`text-xl ${i === 1 ? 'thunder-glow' : ''}`} style={{ fontFamily: "serif", color: "var(--text-muted)" }}>{s}</span>
              ))}
            </div>
            <div className="w-16 h-px" style={{ backgroundColor: "var(--border)" }} />
          </div>
        </header>

        {/* 九宫格 */}
        <div className="grid grid-cols-3 gap-4">
          {BAGUA_GRID.map((cell, index) => (
            <div key={cell.key}>
              <BaguaCell cell={cell} index={index} />
            </div>
          ))}
        </div>

        {/* 底部 */}
        <footer className="mt-20 pt-8 text-center border-t" style={{ borderColor: "var(--border)" }}>
          <div className="inline-block px-8 py-4 border gradient-border" style={{ borderColor: "var(--border)" }}>
            <p className="text-xs tracking-[0.4em]" style={{ color: "var(--text-muted)" }}>
              後天八卦 · 九宫格
            </p>
          </div>

          {/* 底部八卦符号 */}
          <div className="flex items-center justify-center gap-4 mt-8">
            {BAGUA_SYMBOLS.map((key, i) => (
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