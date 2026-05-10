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
function WindowFlower({ position, size = "md" }: { position: string; size?: "sm" | "md" }) {
  const borderWidth = size === "sm" ? "1px" : "2px";
  const sizeValue = size === "sm" ? "6px" : "10px";

  const styles: Record<string, React.CSSProperties> = {
    "top-left": {
      top: size === "sm" ? -1 : -2,
      left: size === "sm" ? -1 : -2,
      borderTop: borderWidth + " solid #d4c5a9",
      borderLeft: borderWidth + " solid #d4c5a9",
    },
    "top-right": {
      top: size === "sm" ? -1 : -2,
      right: size === "sm" ? -1 : -2,
      borderTop: borderWidth + " solid #d4c5a9",
      borderRight: borderWidth + " solid #d4c5a9",
    },
    "bottom-left": {
      bottom: size === "sm" ? -1 : -2,
      left: size === "sm" ? -1 : -2,
      borderBottom: borderWidth + " solid #d4c5a9",
      borderLeft: borderWidth + " solid #d4c5a9",
    },
    "bottom-right": {
      bottom: size === "sm" ? -1 : -2,
      right: size === "sm" ? -1 : -2,
      borderBottom: borderWidth + " solid #d4c5a9",
      borderRight: borderWidth + " solid #d4c5a9",
    },
  };

  return <div className="absolute w-3 h-3 md:w-4 md:h-4" style={styles[position]} />;
}

// 石狮子组件
function StoneLion({ side }: { side: "left" | "right" }) {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="absolute bottom-4 flex flex-col items-center"
      style={{ [side]: "24px" }}
    >
      {/* 灯笼 */}
      <div className="relative mb-2">
        <div
          className="w-6 h-8 rounded-full animate-pulse"
          style={{
            background: "linear-gradient(180deg, #dc2626 0%, #991b1b 100%)",
            animationDuration: "3s",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-yellow-300" />
        {/* 灯笼穗 */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-4"
          style={{ backgroundColor: "#d4a84b" }}
        />
      </div>

      {/* 石狮子 */}
      <div className="relative text-3xl cursor-default select-none" style={{ opacity: 0.25 }}>
        {side === "left" ? "🦁" : "🦁"}
      </div>
      <div
        className="text-xs mt-1 tracking-wider"
        style={{ color: "#d4c5a9", opacity: 0.5 }}
      >
        {side === "left" ? "守" : "护"}
      </div>
    </div>
  );
}

// 动态浮云组件
function FloatingCloud({ delay, duration, startX, startY }: { delay: number; duration: number; startX: string; startY: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className="absolute pointer-events-none text-2xl opacity-0"
      style={{
        left: startX,
        top: startY,
        opacity: visible ? 0.06 : 0,
        transition: `opacity ${duration}ms ease-in-out`,
        animation: visible ? `floatUp ${duration}ms ease-in-out forwards` : "none",
      }}
    >
      ☁
    </div>
  );
}

// 飘落的花瓣/雪花
function FloatingParticle({ delay }: { delay: number }) {
  const [opacity, setOpacity] = useState(0);
  const [y, setY] = useState(0);
  const [x, setX] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(0.15);
      const interval = setInterval(() => {
        setY((prev) => prev + 0.5);
        setX((prev) => prev + Math.sin(prev / 20) * 0.3);
      }, 50);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className="absolute w-1 h-1 rounded-full pointer-events-none"
      style={{
        top: `${y % 100}%`,
        left: `${20 + (x % 60)}%`,
        opacity,
        backgroundColor: "#d4c5a9",
      }}
    />
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
        borderColor: "#e5e5e5",
      }}
    >
      {/* 窗花四角装饰 */}
      <WindowFlower position="top-left" size="sm" />
      <WindowFlower position="top-right" size="sm" />
      <WindowFlower position="bottom-left" size="sm" />
      <WindowFlower position="bottom-right" size="sm" />

      {/* 悬停光晕效果 - 水墨感 */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${isCenter ? "rgba(0,0,0,0.06)" : "rgba(0,0,0,0.04)"} 0%, transparent 60%)`,
        }}
      />

      {/* 顶部区域 */}
      <div className="relative z-10 flex items-start justify-between mb-6">
        <div>
          <div className="text-xs mb-1 tracking-wider uppercase" style={{ color: "#999999" }}>
            {subtext}
          </div>
          <h3 className="text-lg font-semibold" style={{ color: "#000000" }}>
            {label}
          </h3>
        </div>
        <span
          className="text-2xl transition-all duration-300 group-hover:scale-110"
          style={{ color: isCenter ? "#000000" : cell.color, opacity: 0.25 }}
        >
          {symbol}
        </span>
      </div>

      {/* 底部标签 */}
      <div className="relative z-10 mt-auto flex flex-col items-center gap-2">
        <span className="text-sm" style={{ color: "#333333" }}>
          {tag}
        </span>
        <span className="text-xs opacity-0 group-hover:opacity-100 transition-all duration-300" style={{ color: "#999999" }}>
          →
        </span>
      </div>

      {/* 底部水墨效果 */}
      <div
        className="absolute bottom-0 left-0 right-0 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(0deg, ${isCenter ? "rgba(0,0,0,0.03)" : "rgba(0,0,0,0.02)"} 0%, transparent 100%)`,
        }}
      />
    </Link>
  );
}

// 瓦当装饰（传统建筑屋顶瓦片）
function RoofTile() {
  return (
    <div className="flex items-center justify-center gap-0.5">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="w-3 h-2 rounded-t"
          style={{
            backgroundColor: i % 2 === 0 ? "#d4c5a9" : "#e5e5e5",
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
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: "#fafafa" }}
    >
      {/* 动态背景效果 */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 500} />
        ))}
        {[...Array(3)].map((_, i) => (
          <FloatingCloud
            key={i}
            delay={i * 1000}
            duration={8000 + i * 1000}
            startX={["15%", "75%", "45%"][i]}
            startY={["20%", "60%", "80%"][i]}
          />
        ))}
      </div>

      {/* 顶部装饰 - 门楣与瓦当 */}
      <div className="absolute top-0 left-0 right-0">
        {/* 门楣金线 */}
        <div
          className="h-0.5"
          style={{
            background: "linear-gradient(90deg, transparent 0%, #d4c5a9 15%, #d4a84b 50%, #d4c5a9 85%, transparent 100%)",
          }}
        />
        {/* 瓦当装饰 */}
        <div className="flex justify-center py-1" style={{ backgroundColor: "#fafafa" }}>
          <RoofTile />
        </div>
      </div>

      {/* 侧边装饰 - 门柱 */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{
          background: "linear-gradient(180deg, #d4a84b 0%, #d4c5a9 20%, #d4c5a9 80%, #d4a84b 100%)",
          opacity: 0.15,
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-1"
        style={{
          background: "linear-gradient(180deg, #d4a84b 0%, #d4c5a9 20%, #d4c5a9 80%, #d4a84b 100%)",
          opacity: 0.15,
        }}
      />

      {/* 石狮子 */}
      <StoneLion side="left" />
      <StoneLion side="right" />

      {/* 主内容区 */}
      <main className="max-w-[900px] mx-auto px-6 py-16 relative z-10">
        {/* 标题区 - 牌匾风格 */}
        <header className="mb-14 text-center">
          {/* 牌匾框架 */}
          <div
            className={`relative inline-block px-12 py-8 mb-6 transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{
              backgroundColor: "#ffffff",
              border: "3px solid #d4c5a9",
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            }}
          >
            {/* 牌匾四角窗花装饰 */}
            <WindowFlower position="top-left" />
            <WindowFlower position="top-right" />
            <WindowFlower position="bottom-left" />
            <WindowFlower position="bottom-right" />

            {/* 顶部装饰线 */}
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-20 h-0.5" style={{ backgroundColor: "#d4c5a9" }} />

            <h1
              className="text-5xl font-bold mb-3 tracking-[0.15em]"
              style={{ color: "#000000" }}
            >
              道法自然
            </h1>
            <p
              className="text-base tracking-[0.4em]"
              style={{ color: "#666666" }}
            >
              AI 为用
            </p>

            {/* 底部装饰线 */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-0.5" style={{ backgroundColor: "#d4c5a9" }} />
          </div>

          {/* 八卦符号装饰 */}
          <div
            className={`flex items-center justify-center gap-6 transition-all duration-1000 delay-300 ${loaded ? "opacity-100" : "opacity-0"}`}
          >
            <div className="w-20 h-px" style={{ backgroundColor: "#e5e5e5" }} />
            <div className="flex items-center gap-3">
              <span className="text-xl" style={{ color: "#dc2626", opacity: 0.5 }}>☰</span>
              <span className="text-2xl" style={{ color: "#000000", opacity: 0.3 }}>☯</span>
              <span className="text-xl" style={{ color: "#2563eb", opacity: 0.5 }}>☷</span>
            </div>
            <div className="w-20 h-px" style={{ backgroundColor: "#e5e5e5" }} />
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
        <footer className="mt-14 pt-8 text-center border-t" style={{ borderColor: "#e5e5e5" }}>
          {/* 横批风格 */}
          <div
            className="inline-block px-6 py-2 mb-4"
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #d4c5a9",
            }}
          >
            <p className="text-sm tracking-[0.3em]" style={{ color: "#666666" }}>
              後天八卦 · 九宫格
            </p>
          </div>

          {/* 底部八卦小符号 */}
          <div className="flex items-center justify-center gap-5">
            {["kan", "gen", "zhen", "xun", "li", "kun", "dui", "qian"].map((key, index) => (
              <span
                key={key}
                className="text-base transition-all duration-300 hover:scale-125 cursor-default"
                style={{
                  color: "#d4c5a9",
                  transitionDelay: `${index * 50}ms`,
                }}
              >
                {BAGUA.positions[key as keyof typeof BAGUA.positions].symbol}
              </span>
            ))}
          </div>

          {/* 门槛装饰线 */}
          <div
            className="w-full h-0.5 mt-8"
            style={{
              background: "linear-gradient(90deg, transparent, #d4c5a9 20%, #d4a84b 50%, #d4c5a9 80%, transparent)",
            }}
          />
        </footer>
      </main>

      {/* 角落菱形窗花装饰 */}
      <div
        className="absolute top-20 right-8 w-8 h-8 opacity-10 rotate-45"
        style={{ border: "2px solid #d4c5a9" }}
      />
      <div
        className="absolute bottom-32 left-8 w-6 h-6 opacity-10 rotate-45"
        style={{ border: "2px solid #d4c5a9" }}
      />

      {/* 底部阴阳八卦装饰 */}
      <div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-5xl opacity-[0.03]"
        style={{ color: "#000000" }}
      >
        ☯
      </div>

      {/* CSS 动画 */}
      <style jsx global>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0.08;
          }
          50% {
            opacity: 0.12;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}