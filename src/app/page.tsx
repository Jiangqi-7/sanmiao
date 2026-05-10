"use client";

import Link from "next/link";
import { BAGUA } from "@/lib/design-system";

// 后天八卦九宫格布局 - 中国传统窗花风格
const BAGUA_GRID = [
  { key: "xun", name: "巽", direction: "东南", href: "/blog?category=workflow", color: "#1a5f4a" },
  { key: "li", name: "离", direction: "南", href: "/shan-hai-jing", desc: "山海经图鉴", color: "#b83a3a" },
  { key: "kun", name: "坤", direction: "西南", href: "/about", desc: "关于我们", color: "#8b6914" },
  { key: "zhen", name: "震", direction: "东", href: "/blog?category=video", desc: "视频生成", color: "#1a5f4a" },
  { key: "center", name: "中", direction: "宫", href: "/", desc: "道法自然", isCenter: true },
  { key: "dui", name: "兑", direction: "西", href: "/blog?category=image", desc: "图片生成", color: "#4a4a4a" },
  { key: "gen", name: "艮", direction: "东北", href: "/blog?category=tools", desc: "工具教程", color: "#6b4a12" },
  { key: "kan", name: "坎", direction: "北", href: "/blog", desc: "博客文章", color: "#2a4a6b" },
  { key: "qian", name: "乾", direction: "西北", href: "/about", desc: "关于本站", color: "#8b6914" },
];

function BaguaCell({ cell }: { cell: typeof BAGUA_GRID[0] }) {
  const isCenter = cell.isCenter;
  const symbol = isCenter ? "☯" : BAGUA.positions[cell.key as keyof typeof BAGUA.positions]?.symbol;
  const label = isCenter ? "三秒" : cell.name;
  const subtext = isCenter ? "sanmiao" : cell.direction;
  const tag = isCenter ? "道法自然" : (cell as any).desc;

  return (
    <Link
      href={cell.href}
      className="group relative rounded-lg border transition-all duration-300 hover:shadow-lg overflow-hidden"
      style={{
        aspectRatio: "1",
        backgroundColor: "#fffef8",
        borderColor: "#d4c5a9",
        boxShadow: "0 2px 8px rgba(139,105,20,0.06)",
      }}
    >
      {/* 云纹装饰 - 左上角 */}
      <div
        className="absolute top-0 left-0 w-16 h-16 pointer-events-none opacity-30"
        style={{
          background: "radial-gradient(circle at 0% 0%, rgba(139,105,20,0.15) 0%, transparent 50%)",
        }}
      />

      {/* 云纹装饰 - 右下角 */}
      <div
        className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle at 100% 100%, rgba(139,105,20,0.12) 0%, transparent 50%)",
        }}
      />

      {/* 顶部悬停光晕 - 水墨效果 */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(139,105,20,0.04) 0%, transparent 40%, transparent 60%, rgba(139,105,20,0.03) 100%)",
        }}
      />

      {/* 内容 */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full p-4">
        {/* 顶部 */}
        <div className="flex flex-col items-center">
          <span
            className="text-3xl mb-1 transition-transform duration-300 group-hover:scale-110"
            style={{ color: isCenter ? "#8b6914" : cell.color }}
          >
            {symbol}
          </span>
          <h3
            className="text-base font-semibold"
            style={{ color: "#2a2a2a", letterSpacing: "0.1em" }}
          >
            {label}
          </h3>
          <span className="text-xs mt-1" style={{ color: "#8b6914", opacity: 0.7 }}>
            {subtext}
          </span>
        </div>

        {/* 底部 */}
        <div className="flex flex-col items-center">
          <span
            className="text-xs px-3 py-1 rounded-full border transition-all duration-300 group-hover:bg-[#8b6914] group-hover:text-white group-hover:border-[#8b6914]"
            style={{
              backgroundColor: "#fffef8",
              color: "#8b6914",
              borderColor: "#d4c5a9",
            }}
          >
            {tag}
          </span>
        </div>
      </div>
    </Link>
  );
}

// 云纹装饰组件
function CloudPattern() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
      <svg width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="cloud" patternUnits="userSpaceOnUse" width="200" height="200">
            <path
              d="M25,60 Q50,40 75,60 T125,60 T175,60 Q200,60 200,60 L200,100 Q175,80 150,100 T100,100 T50,100 Q0,100 0,100 Z"
              fill="none"
              stroke="#8b6914"
              strokeWidth="0.5"
            />
            <path
              d="M50,140 Q75,120 100,140 T150,140 Q175,140 175,140 L175,170 Q150,150 125,170 T75,170 Q25,170 25,170 Z"
              fill="none"
              stroke="#8b6914"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cloud)" />
      </svg>
    </div>
  );
}

export default function HomePage() {
  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: "#f5f0e6" }}
    >
      {/* 云纹背景纹理 */}
      <CloudPattern />

      {/* 顶部装饰 - 传统建筑屋檐线条 */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{
          background: "linear-gradient(90deg, transparent 0%, #8b6914 20%, #d4a84b 50%, #8b6914 80%, transparent 100%)",
          opacity: 0.3,
        }}
      />

      {/* 主内容区 */}
      <main className="relative z-10 max-w-[960px] mx-auto px-8 py-20">
        {/* 标题区 - 如同传统建筑匾额 */}
        <header className="text-center mb-16">
          {/* 装饰框 - 窗花风格 */}
          <div
            className="inline-block px-8 py-6 mb-6 relative"
            style={{
              backgroundColor: "#fffef8",
              border: "2px solid #d4c5a9",
            }}
          >
            {/* 四角云纹装饰 */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2" style={{ borderColor: "#8b6914" }} />
            <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2" style={{ borderColor: "#8b6914" }} />
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2" style={{ borderColor: "#8b6914" }} />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2" style={{ borderColor: "#8b6914" }} />

            <h1
              className="text-5xl font-bold mb-2"
              style={{ color: "#2a2a2a", letterSpacing: "0.3em" }}
            >
              道法自然
            </h1>
            <p
              className="text-lg"
              style={{ color: "#8b6914", letterSpacing: "0.5em" }}
            >
              AI 为用
            </p>
          </div>

          {/* 底部装饰线 */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="w-24 h-px" style={{ backgroundColor: "#d4c5a9" }} />
            <span style={{ color: "#d4a84b" }}>☯</span>
            <div className="w-24 h-px" style={{ backgroundColor: "#d4c5a9" }} />
          </div>
        </header>

        {/* 九宫格 - 窗花/窗棂风格 */}
        <div className="grid grid-cols-3 gap-6">
          {BAGUA_GRID.map((cell) => (
            <BaguaCell key={cell.key} cell={cell} />
          ))}
        </div>

        {/* 底部说明 - 传统牌匾风格 */}
        <footer className="mt-16 text-center">
          <div
            className="inline-block px-6 py-3 border-y"
            style={{ borderColor: "#d4c5a9" }}
          >
            <p className="text-sm tracking-[0.3em]" style={{ color: "#8b6914" }}>
              後天八卦 · 九宮格
            </p>
          </div>

          {/* 底部八卦小符号 */}
          <div className="flex items-center justify-center gap-6 mt-6">
            {["kan", "gen", "zhen", "xun", "li", "kun", "dui", "qian"].map((key) => (
              <span
                key={key}
                className="text-base"
                style={{ color: "#d4c5a9" }}
              >
                {BAGUA.positions[key as keyof typeof BAGUA.positions].symbol}
              </span>
            ))}
          </div>
        </footer>
      </main>

      {/* 侧边装饰 - 石狮子简化图标 */}
      <div className="absolute top-20 left-8 text-4xl opacity-10 rotate-[-15deg]">石</div>
      <div className="absolute bottom-20 right-8 text-4xl opacity-10 rotate-[15deg]">狮</div>
    </div>
  );
}