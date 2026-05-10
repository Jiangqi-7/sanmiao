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
  const size = "12px";
  const styles: Record<string, React.CSSProperties> = {
    "top-left": { top: -2, left: -2, borderTop: `2px solid ${color}`, borderLeft: `2px solid ${color}` },
    "top-right": { top: -2, right: -2, borderTop: `2px solid ${color}`, borderRight: `2px solid ${color}` },
    "bottom-left": { bottom: -2, left: -2, borderBottom: `2px solid ${color}`, borderLeft: `2px solid ${color}` },
    "bottom-right": { bottom: -2, right: -2, borderBottom: `2px solid ${color}`, borderRight: `2px solid ${color}` },
  };

  return <div className="absolute w-3 h-3" style={styles[position]} />;
}

// 石狮子组件 - 卡通风格
function StoneLion({ side }: { side: "left" | "right" }) {
  const [sway, setSway] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSway(true);
      setTimeout(() => setSway(false), 500);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="absolute bottom-8 flex flex-col items-center"
      style={{ [side]: "16px" }}
    >
      {/* 红包灯笼 */}
      <div
        className="w-10 h-14 rounded-lg mb-3 relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #dc2626 0%, #b91c1c 100%)",
          boxShadow: "0 4px 12px rgba(220, 38, 38, 0.4)",
        }}
      >
        {/* 灯笼金边 */}
        <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: "#d4a84b" }} />
        <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: "#d4a84b" }} />
        {/* 灯笼图案 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl">福</div>
        {/* 灯笼穗 */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-5" style={{ backgroundColor: "#d4a84b" }} />
      </div>

      {/* 卡通狮子 */}
      <div
        className="text-5xl cursor-default select-none transition-transform duration-500"
        style={{
          transform: sway ? (side === "left" ? "rotate(-5deg)" : "rotate(5deg)") : "rotate(0deg)",
          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
        }}
      >
        🦁
      </div>
    </div>
  );
}

// 飘落花瓣
function FallingPetal({ delay, startX }: { delay: number; startX: number }) {
  const [y, setY] = useState(-20);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(0.6);
      const interval = setInterval(() => {
        setY((prev) => {
          if (prev > window.innerHeight) return -20;
          return prev + 1;
        });
        setOpacity((prev) => (prev > 1.5 ? 0.6 : prev * 0.998));
      }, 30);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className="absolute pointer-events-none text-lg"
      style={{
        left: `${startX}%`,
        top: y,
        opacity,
      }}
    >
      🌸
    </div>
  );
}

// 浮云
function FloatingCloud({ startX, startY }: { startX: number; startY: number }) {
  const [x, setX] = useState(startX);

  useEffect(() => {
    const interval = setInterval(() => {
      setX((prev) => {
        if (prev > window.innerWidth + 100) return -100;
        return prev + 0.3;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="absolute pointer-events-none text-4xl opacity-20"
      style={{
        left: x,
        top: startY,
        color: "#666",
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
      className="group relative flex flex-col rounded-xl border p-5 transition-all duration-300 hover:border-[#000000] hover:shadow-lg overflow-hidden"
      style={{
        backgroundColor: "#ffffff",
        borderColor: "#d4c5a9",
        boxShadow: "0 2px 8px rgba(139, 69, 19, 0.08)",
      }}
    >
      {/* 窗花四角装饰 - 更明显 */}
      <WindowFlower position="top-left" color="#8b4513" />
      <WindowFlower position="top-right" color="#8b4513" />
      <WindowFlower position="bottom-left" color="#8b4513" />
      <WindowFlower position="bottom-right" color="#8b4513" />

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
          <h3 className="text-lg font-semibold" style={{ color: "#000000" }}>
            {label}
          </h3>
        </div>
        <span
          className="text-2xl transition-all duration-300 group-hover:scale-110"
          style={{ color: isCenter ? "#000000" : cell.color, opacity: 0.3 }}
        >
          {symbol}
        </span>
      </div>

      {/* 底部标签 */}
      <div className="relative z-10 mt-auto flex flex-col items-center gap-2">
        <span className="text-sm" style={{ color: "#333333" }}>
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
    <div className="flex items-center justify-center gap-0">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="w-4 h-3 rounded-t-sm"
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
      {[...Array(8)].map((_, i) => (
        <FallingPetal key={i} delay={i * 800} startX={10 + i * 10} />
      ))}

      {/* 浮云 */}
      {[...Array(3)].map((_, i) => (
        <FloatingCloud key={i} startX={i * 300 - 100} startY={50 + i * 80} />
      ))}

      {/* 顶部装饰 - 瓦当 */}
      <div className="absolute top-0 left-0 right-0">
        <div
          className="h-1"
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
          background: "linear-gradient(180deg, #d4a84b 0%, #8b4513 50%, #d4a84b 100%)",
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-2"
        style={{
          background: "linear-gradient(180deg, #d4a84b 0%, #8b4513 50%, #d4a84b 100%)",
        }}
      />

      {/* 石狮子与灯笼 */}
      <StoneLion side="left" />
      <StoneLion side="right" />

      {/* 主内容区 */}
      <main className="max-w-[900px] mx-auto px-6 py-16 relative z-10">
        {/* 标题区 - 牌匾风格 */}
        <header className="mb-14 text-center">
          {/* 牌匾框架 */}
          <div
            className={`relative inline-block px-14 py-10 mb-6 transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{
              backgroundColor: "#fffef5",
              border: "4px solid #8b4513",
              boxShadow: "0 8px 32px rgba(139, 69, 19, 0.15)",
            }}
          >
            {/* 牌匾四角窗花装饰 - 更大更明显 */}
            <WindowFlower position="top-left" color="#8b4513" />
            <WindowFlower position="top-right" color="#8b4513" />
            <WindowFlower position="bottom-left" color="#8b4513" />
            <WindowFlower position="bottom-right" color="#8b4513" />

            {/* 顶部装饰线 */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-1" style={{ backgroundColor: "#d4a84b" }} />

            <h1
              className="text-5xl font-bold mb-3 tracking-[0.15em]"
              style={{ color: "#1a1a1a" }}
            >
              道法自然
            </h1>
            <p className="text-base tracking-[0.4em]" style={{ color: "#8b4513" }}>
              AI 为用
            </p>

            {/* 底部装饰线 */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-24 h-1" style={{ backgroundColor: "#d4a84b" }} />
          </div>

          {/* 八卦符号装饰 */}
          <div
            className={`flex items-center justify-center gap-6 transition-all duration-1000 delay-300 ${loaded ? "opacity-100" : "opacity-0"}`}
          >
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
          {/* 横批风格 */}
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

          {/* 底部八卦小符号 */}
          <div className="flex items-center justify-center gap-6 mt-6">
            {["kan", "gen", "zhen", "xun", "li", "kun", "dui", "qian"].map((key, index) => (
              <span
                key={key}
                className="text-xl transition-all duration-300 hover:scale-125 cursor-default"
                style={{
                  color: "#8b4513",
                  opacity: 0.5,
                }}
              >
                {BAGUA.positions[key as keyof typeof BAGUA.positions].symbol}
              </span>
            ))}
          </div>

          {/* 门槛装饰线 */}
          <div
            className="w-full h-1 mt-8"
            style={{
              background: "linear-gradient(90deg, transparent, #8b4513 20%, #d4a84b 50%, #8b4513 80%, transparent)",
            }}
          />
        </footer>
      </main>

      {/* 角落菱形窗花装饰 - 更明显 */}
      <div
        className="absolute top-24 right-12 w-10 h-10 opacity-30 rotate-45"
        style={{ border: "3px solid #8b4513" }}
      />
      <div
        className="absolute bottom-40 left-12 w-8 h-8 opacity-25 rotate-45"
        style={{ border: "3px solid #8b4513" }}
      />
    </div>
  );
}