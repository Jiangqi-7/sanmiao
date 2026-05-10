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

// 抽象石狮子 SVG（传统石刻风格）
function StoneLionSVG({ mirror = false }) {
  return (
    <svg
      width="60"
      height="70"
      viewBox="0 0 60 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: mirror ? "scaleX(-1)" : "none",
        opacity: 0.45,
        filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.3))",
      }}
    >
      {/* 底座 */}
      <rect x="2" y="62" width="56" height="6" rx="1" fill="#8a847a" />
      {/* 身体轮廓 */}
      <ellipse cx="30" cy="52" rx="22" ry="16" fill="#a8a49a" />
      {/* 前腿（站立） */}
      <rect x="10" y="46" width="12" height="18" rx="4" fill="#a8a49a" />
      <rect x="38" y="46" width="12" height="18" rx="4" fill="#a8a49a" />
      {/* 脚爪 */}
      <ellipse cx="16" cy="64" rx="7" ry="4" fill="#9a948a" />
      <ellipse cx="44" cy="64" rx="7" ry="4" fill="#9a948a" />
      {/* 头部（圆形） */}
      <circle cx="30" cy="26" r="22" fill="#b8b4aa" />
      {/* 鬃毛（卷曲线条） */}
      <path d="M8 20 Q0 10 10 4 Q6 0 14 2 Q12 -4 20 0 Q28 -6 38 0 Q46 -4 44 2 Q52 0 50 10 Q60 18 52 24" stroke="#787068" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M10 24 Q2 30 8 38" stroke="#787068" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M50 24 Q58 30 52 38" stroke="#787068" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* 浓眉 */}
      <path d="M14 18 Q22 10 28 20" stroke="#4a4a42" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M46 18 Q38 10 32 20" stroke="#4a4a42" strokeWidth="4" strokeLinecap="round" fill="none" />
      {/* 眼睛（大圆） */}
      <circle cx="20" cy="26" r="6" fill="#3a3a32" />
      <circle cx="40" cy="26" r="6" fill="#3a3a32" />
      <circle cx="22" cy="24" r="2" fill="white" opacity="0.8" />
      <circle cx="42" cy="24" r="2" fill="white" opacity="0.8" />
      {/* 鼻子（大扁） */}
      <ellipse cx="30" cy="32" rx="7" ry="5" fill="#5a5a52" />
      {/* 大张嘴（嘴里有绣球） */}
      <path d="M16 38 Q30 54 44 38" fill="#4a4a42" />
      <path d="M16 38 Q30 50 44 38" fill="#5a5a52" />
      {/* 绣球（在嘴中间） */}
      <circle cx="30" cy="46" r="7" fill="#d4a84b" stroke="#8b6914" strokeWidth="2" />
      <circle cx="30" cy="46" r="3.5" fill="#b8922e" />
      <path d="M26 46 L30 50 L34 46" stroke="#8b6914" strokeWidth="1" fill="none" />
    </svg>
  );
}

// 传统八角宫灯 SVG
function LanternSVG({ sway }: { sway: boolean }) {
  return (
    <svg
      width="44"
      height="80"
      viewBox="0 0 44 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: sway ? "rotate(3deg)" : "rotate(0deg)",
        transition: "transform 0.6s ease-in-out",
        filter: "drop-shadow(0 3px 6px rgba(160,40,40,0.35))",
      }}
    >
      {/* 挂绳 */}
      <line x1="22" y1="0" x2="22" y2="8" stroke="#6a5010" strokeWidth="2" />
      {/* 顶部装饰 */}
      <rect x="14" y="6" width="16" height="4" rx="1" fill="#6a5010" />
      <rect x="12" y="10" width="20" height="3" rx="1" fill="#d4a84b" />
      {/* 八角宫灯主体（八边形） */}
      <polygon points="22,14 36,18 40,32 36,46 22,50 8,46 4,32 8,18" fill="#b81c1c" stroke="#d4a84b" strokeWidth="1.5" />
      {/* 骨架线 */}
      <line x1="22" y1="14" x2="22" y2="50" stroke="#d4a84b" strokeWidth="1" />
      <line x1="4" y1="32" x2="40" y2="32" stroke="#d4a84b" strokeWidth="1" />
      <line x1="8" y1="18" x2="36" y2="46" stroke="#d4a84b" strokeWidth="0.8" />
      <line x1="36" y1="18" x2="8" y2="46" stroke="#d4a84b" strokeWidth="0.8" />
      {/* 顶部斗拱装饰 */}
      <rect x="10" y="50" width="24" height="3" rx="1" fill="#d4a84b" />
      <rect x="12" y="53" width="20" height="4" rx="1" fill="#6a5010" />
      {/* 流苏 */}
      <line x1="18" y1="57" x2="14" y2="70" stroke="#8b6914" strokeWidth="2" />
      <line x1="22" y1="57" x2="22" y2="72" stroke="#8b6914" strokeWidth="2" />
      <line x1="26" y1="57" x2="30" y2="70" stroke="#8b6914" strokeWidth="2" />
      {/* 顶部流苏 */}
      <line x1="14" y1="6" x2="10" y2="2" stroke="#6a5010" strokeWidth="1" />
      <line x1="22" y1="6" x2="22" y2="0" stroke="#6a5010" strokeWidth="1" />
      <line x1="30" y1="6" x2="34" y2="2" stroke="#6a5010" strokeWidth="1" />
      {/* 高光 */}
      <polygon points="10,20 16,17 17,26 10,28" fill="#e84040" opacity="0.4" />
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