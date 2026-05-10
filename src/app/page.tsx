"use client";

import Link from "next/link";
import { BAGUA } from "@/lib/design-system";
import { useState, useEffect } from "react";

// 后天八卦九宫格布局
const BAGUA_GRID = [
  { key: "xun", name: "巽", direction: "东南", href: "/blog?category=workflow", color: "#16a34a" },
  { key: "li", name: "离", direction: "南", href: "/shan-hai-jing", desc: "山海经图鉴", color: "#dc2626" },
  { key: "kun", name: "坤", direction: "西南", href: "/about", desc: "关于我们", color: "#ca8a04" },
  { key: "zhen", name: "震", direction: "东", href: "/blog?category=video", desc: "视频生成", color: "#16a34a" },
  { key: "center", name: "中", direction: "宫", href: "/", desc: "道法自然", isCenter: true },
  { key: "dui", name: "兑", direction: "西", href: "/blog?category=image", desc: "图片生成", color: "#525252" },
  { key: "gen", name: "艮", direction: "东北", href: "/blog?category=tools", desc: "工具教程", color: "#a16207" },
  { key: "kan", name: "坎", direction: "北", href: "/blog", desc: "博客文章", color: "#2563eb" },
  { key: "qian", name: "乾", direction: "西北", href: "/about", desc: "关于本站", color: "#ca8a04" },
];

// 窗花装饰组件
function WindowFlower({ position, color = "#8b4513" }: { position: string; color?: string }) {
  const styles: Record<string, React.CSSProperties> = {
    "top-left": { top: -2, left: -2, borderTop: `2px solid ${color}`, borderLeft: `2px solid ${color}` },
    "top-right": { top: -2, right: -2, borderTop: `2px solid ${color}`, borderRight: `2px solid ${color}` },
    "bottom-left": { bottom: -2, left: -2, borderBottom: `2px solid ${color}`, borderLeft: `2px solid ${color}` },
    "bottom-right": { bottom: -2, right: -2, borderBottom: `2px solid ${color}`, borderRight: `2px solid ${color}` },
  };

  return <div className="absolute w-3 h-3" style={styles[position]} />;
}

// 传统石狮子 SVG（蹲坐姿态，嘴里含绣球）
function StoneLionSVG({ mirror = false }) {
  return (
    <svg
      width="56"
      height="64"
      viewBox="0 0 56 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: mirror ? "scaleX(-1)" : "none",
        opacity: 0.4,
        filter: "drop-shadow(2px 3px 3px rgba(0,0,0,0.25))",
      }}
    >
      {/* 底座 */}
      <rect x="6" y="56" width="44" height="6" rx="1" fill="#8b7355" />
      {/* 身体（蹲坐） */}
      <ellipse cx="28" cy="44" rx="18" ry="14" fill="#a8a8a0" />
      {/* 后腿蜷曲 */}
      <ellipse cx="18" cy="50" rx="6" ry="5" fill="#989894" />
      <ellipse cx="38" cy="50" rx="6" ry="5" fill="#989894" />
      {/* 前腿直立 */}
      <rect x="14" y="36" width="8" height="16" rx="3" fill="#a8a8a0" />
      <rect x="34" y="36" width="8" height="16" rx="3" fill="#a8a8a0" />
      {/* 爪子 */}
      <ellipse cx="18" cy="52" rx="5" ry="3" fill="#989894" />
      <ellipse cx="38" cy="52" rx="5" ry="3" fill="#989894" />
      {/* 头部 */}
      <circle cx="28" cy="22" r="16" fill="#a8a8a0" />
      {/* 鬃毛（卷曲） */}
      <path d="M12 12 Q8 16 10 22 Q6 18 10 14 Q8 8 14 10" fill="#787878" />
      <path d="M44 12 Q48 16 46 22 Q50 18 46 14 Q48 8 42 10" fill="#787878" />
      <path d="M20 6 Q22 2 26 6 Q24 2 28 5" fill="#787878" />
      <path d="M28 4 Q32 0 34 5 Q34 1 36 6" fill="#787878" />
      {/* 耳朵 */}
      <ellipse cx="14" cy="18" rx="4" ry="5" fill="#989894" />
      <ellipse cx="42" cy="18" rx="4" ry="5" fill="#989894" />
      {/* 眼睛 */}
      <circle cx="21" cy="20" r="3" fill="#4a4a48" />
      <circle cx="35" cy="20" r="3" fill="#4a4a48" />
      <circle cx="22" cy="19" r="1" fill="white" opacity="0.6" />
      <circle cx="36" cy="19" r="1" fill="white" opacity="0.6" />
      {/* 鼻子 */}
      <ellipse cx="28" cy="26" rx="4" ry="3" fill="#686868" />
      {/* 张开的嘴 */}
      <path d="M20 30 Q28 38 36 30 Q32 34 28 35 Q24 34 20 30" fill="#686868" />
      {/* 嘴里绣球 */}
      <circle cx="28" cy="32" r="4" fill="#d4a84b" />
      <circle cx="28" cy="32" r="2" fill="#b8922e" />
      {/* 下巴 */}
      <ellipse cx="28" cy="34" rx="8" ry="4" fill="#989894" />
    </svg>
  );
}

// 传统宫灯 SVG（6面宫灯造型）
function LanternSVG({ sway }: { sway: boolean }) {
  return (
    <svg
      width="40"
      height="80"
      viewBox="0 0 40 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: sway ? "rotate(4deg)" : "rotate(0deg)",
        transition: "transform 0.6s ease-in-out",
        filter: "drop-shadow(0 3px 6px rgba(180,60,60,0.35))",
      }}
    >
      {/* 挂绳 */}
      <line x1="20" y1="0" x2="20" y2="8" stroke="#8b6914" strokeWidth="2" />
      {/* 灯笼顶部装饰 */}
      <rect x="14" y="6" width="12" height="4" rx="1" fill="#8b6914" />
      <rect x="12" y="10" width="16" height="3" rx="1" fill="#d4a84b" />
      {/* 灯笼框架（6面） */}
      <polygon points="20,14 32,18 32,40 20,44 8,40 8,18" fill="#c41e1e" stroke="#d4a84b" strokeWidth="1.5" />
      {/* 灯笼骨架线 */}
      <line x1="20" y1="14" x2="20" y2="44" stroke="#d4a84b" strokeWidth="1" />
      <line x1="8" y1="27" x2="32" y2="27" stroke="#d4a84b" strokeWidth="1" />
      {/* 灯笼底部装饰 */}
      <rect x="12" y="44" width="16" height="3" rx="1" fill="#d4a84b" />
      <rect x="14" y="47" width="12" height="4" rx="1" fill="#8b6914" />
      {/* 灯笼穗 */}
      <line x1="20" y1="51" x2="20" y2="62" stroke="#8b6914" strokeWidth="2" />
      <ellipse cx="20" cy="65" rx="6" ry="4" fill="#d4a84b" />
      <ellipse cx="20" cy="70" rx="5" ry="3" fill="#d4a84b" />
      {/* 灯笼高光 */}
      <polygon points="12,18 18,16 18,26 12,28" fill="#e05555" opacity="0.5" />
      {/* 顶部流苏 */}
      <line x1="14" y1="6" x2="12" y2="0" stroke="#8b6914" strokeWidth="1" />
      <line x1="20" y1="6" x2="20" y2="0" stroke="#8b6914" strokeWidth="1" />
      <line x1="26" y1="6" x2="28" y2="0" stroke="#8b6914" strokeWidth="1" />
    </svg>
  );
}

// 石狮子组件
function StoneLion({ side }: { side: "left" | "right" }) {
  const [sway, setSway] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSway(true);
      setTimeout(() => setSway(false), 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="absolute bottom-8 flex flex-col items-center"
      style={{ [side]: "20px" }}
    >
      <LanternSVG sway={sway} />
      <StoneLionSVG mirror={side === "right"} />
    </div>
  );
}

// 飘落花瓣
function FallingPetal({ delay, startX }: { delay: number; startX: number }) {
  const [y, setY] = useState(-20);
  const [opacity, setOpacity] = useState(0);
  const [x, setX] = useState(startX);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(0.5);
      const interval = setInterval(() => {
        setY((prev) => {
          if (prev > window.innerHeight) return -20;
          return prev + 0.8;
        });
        setX((prev) => prev + Math.sin(prev / 25) * 0.4);
      }, 30);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className="absolute pointer-events-none text-sm"
      style={{
        left: `${x}%`,
        top: y,
        opacity,
        color: "#eab308",
      }}
    >
      ✿
    </div>
  );
}

// 浮云
function FloatingCloud({ startX, startY }: { startX: number; startY: number }) {
  const [x, setX] = useState(startX);

  useEffect(() => {
    const interval = setInterval(() => {
      setX((prev) => {
        if (prev > window.innerWidth + 100) return -150;
        return prev + 0.5;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="absolute pointer-events-none text-5xl opacity-25"
      style={{
        left: x,
        top: startY,
        color: "#9ca3af",
      }}
    >
      ☁
    </div>
  );
}

function BaguaCell({ cell }: { cell: typeof BAGUA_GRID[0] }) {
  const isCenter = cell.isCenter;
  const symbol = isCenter ? "☯" : BAGUA.positions[cell.key as keyof typeof BAGUA.positions]?.symbol;
  const label = isCenter ? "三秒" : cell.name;
  const subtext = isCenter ? "sanmiao" : cell.direction;
  const tag = isCenter ? "道法自然" : (cell as any).desc;

  return (
    <Link
      href={cell.href}
      className="group relative flex flex-col rounded-xl border p-5 transition-all duration-300 hover:border-[#8b4513] hover:shadow-lg overflow-hidden"
      style={{
        backgroundColor: "#fffef5",
        borderColor: "#d4c5a9",
        boxShadow: "0 2px 8px rgba(139, 69, 19, 0.08)",
      }}
    >
      {/* 窗花四角装饰 */}
      <WindowFlower position="top-left" />
      <WindowFlower position="top-right" />
      <WindowFlower position="bottom-left" />
      <WindowFlower position="bottom-right" />

      {/* 悬停光晕 */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(139,69,19,0.06) 0%, transparent 60%)",
        }}
      />

      {/* 顶部区域 */}
      <div className="relative z-10 flex items-start justify-between mb-6">
        <div>
          <div className="text-xs mb-1 tracking-wider uppercase" style={{ color: "#8b4513", opacity: 0.7 }}>
            {subtext}
          </div>
          <h3 className="text-lg font-semibold" style={{ color: "#1a1a1a" }}>
            {label}
          </h3>
        </div>
        <span
          className="text-2xl transition-all duration-300 group-hover:scale-110"
          style={{ color: isCenter ? "#1a1a1a" : cell.color, opacity: 0.35 }}
        >
          {symbol}
        </span>
      </div>

      {/* 底部标签 */}
      <div className="relative z-10 mt-auto flex flex-col items-center gap-2">
        <span className="text-sm" style={{ color: "#374151" }}>
          {tag}
        </span>
        <span className="text-xs opacity-0 group-hover:opacity-100 transition-all duration-300" style={{ color: "#8b4513" }}>
          →
        </span>
      </div>

      {/* 底部水墨效果 */}
      <div
        className="absolute bottom-0 left-0 right-0 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "linear-gradient(0deg, rgba(139,69,19,0.04) 0%, transparent 100%)",
        }}
      />
    </Link>
  );
}

// 瓦当装饰
function RoofTile() {
  return (
    <div className="flex items-center justify-center">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="w-5 h-4 rounded-t-sm"
          style={{
            backgroundColor: i % 2 === 0 ? "#8b4513" : "#d4c5a9",
          }}
        />
      ))}
    </div>
  );
}

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: "#faf8f5" }}>
      {/* 飘落花瓣 */}
      {[...Array(6)].map((_, i) => (
        <FallingPetal key={i} delay={i * 600} startX={8 + i * 14} />
      ))}

      {/* 浮云 */}
      {[...Array(2)].map((_, i) => (
        <FloatingCloud key={i} startX={i * 500 - 100} startY={60 + i * 100} />
      ))}

      {/* 顶部装饰 */}
      <div className="absolute top-0 left-0 right-0">
        <div
          className="h-1.5"
          style={{
            background: "linear-gradient(90deg, transparent 0%, #8b4513 15%, #d4a84b 50%, #8b4513 85%, transparent 100%)",
          }}
        />
        <div style={{ backgroundColor: "#faf8f5" }}>
          <RoofTile />
        </div>
      </div>

      {/* 侧边门柱装饰 */}
      <div
        className="absolute left-0 top-0 bottom-0 w-2"
        style={{
          background: "linear-gradient(180deg, #d4a84b 0%, #8b4513 30%, #8b4513 70%, #d4a84b 100%)",
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-2"
        style={{
          background: "linear-gradient(180deg, #d4a84b 0%, #8b4513 30%, #8b4513 70%, #d4a84b 100%)",
        }}
      />

      {/* 石狮子与灯笼 */}
      <StoneLion side="left" />
      <StoneLion side="right" />

      {/* 主内容区 */}
      <main className="max-w-[900px] mx-auto px-6 py-16 relative z-10">
        {/* 标题区 */}
        <header className="mb-14 text-center">
          <div
            className={`relative inline-block px-14 py-10 mb-6 transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{
              backgroundColor: "#fffef5",
              border: "4px solid #8b4513",
              boxShadow: "0 8px 32px rgba(139, 69, 19, 0.15)",
            }}
          >
            <WindowFlower position="top-left" />
            <WindowFlower position="top-right" />
            <WindowFlower position="bottom-left" />
            <WindowFlower position="bottom-right" />

            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-1" style={{ backgroundColor: "#d4a84b" }} />

            <h1 className="text-5xl font-bold mb-3 tracking-[0.15em]" style={{ color: "#1a1a1a" }}>
              道法自然
            </h1>
            <p className="text-base tracking-[0.4em]" style={{ color: "#8b4513" }}>
              AI 为用
            </p>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-24 h-1" style={{ backgroundColor: "#d4a84b" }} />
          </div>

          <div className={`flex items-center justify-center gap-6 transition-all duration-1000 delay-300 ${loaded ? "opacity-100" : "opacity-0"}`}>
            <div className="w-20 h-0.5" style={{ backgroundColor: "#d4c5a9" }} />
            <div className="flex items-center gap-4">
              <span className="text-2xl" style={{ color: "#dc2626", opacity: 0.6 }}>☰</span>
              <span className="text-3xl" style={{ color: "#8b4513", opacity: 0.4 }}>☯</span>
              <span className="text-2xl" style={{ color: "#2563eb", opacity: 0.6 }}>☷</span>
            </div>
            <div className="w-20 h-0.5" style={{ backgroundColor: "#d4c5a9" }} />
          </div>
        </header>

        {/* 九宫格 */}
        <div className="grid grid-cols-3 gap-5">
          {BAGUA_GRID.map((cell, index) => (
            <div
              key={cell.key}
              className={`transition-all duration-500 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${index * 100 + 500}ms` }}
            >
              <BaguaCell cell={cell} />
            </div>
          ))}
        </div>

        {/* 底部说明 */}
        <footer className="mt-14 pt-8 text-center border-t" style={{ borderColor: "#d4c5a9" }}>
          <div
            className="inline-block px-8 py-3"
            style={{
              backgroundColor: "#fffef5",
              border: "2px solid #8b4513",
            }}
          >
            <p className="text-sm tracking-[0.3em]" style={{ color: "#8b4513" }}>
              後天八卦 · 九宫格
            </p>
          </div>

          <div className="flex items-center justify-center gap-6 mt-6">
            {["kan", "gen", "zhen", "xun", "li", "kun", "dui", "qian"].map((key) => (
              <span
                key={key}
                className="text-xl transition-all duration-300 hover:scale-125 cursor-default"
                style={{ color: "#8b4513", opacity: 0.5 }}
              >
                {BAGUA.positions[key as keyof typeof BAGUA.positions].symbol}
              </span>
            ))}
          </div>

          <div
            className="w-full h-1 mt-8"
            style={{
              background: "linear-gradient(90deg, transparent, #8b4513 20%, #d4a84b 50%, #8b4513 80%, transparent)",
            }}
          />
        </footer>
      </main>

      {/* 角落菱形窗花 */}
      <div className="absolute top-24 right-12 w-12 h-12 opacity-25 rotate-45" style={{ border: "3px solid #8b4513" }} />
      <div className="absolute bottom-40 left-12 w-10 h-10 opacity-20 rotate-45" style={{ border: "3px solid #8b4513" }} />
    </div>
  );
}