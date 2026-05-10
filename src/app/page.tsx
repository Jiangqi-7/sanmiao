"use client";

import Link from "next/link";
import { BAGUA } from "@/lib/design-system";

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
function WindowFlower({ position }: { position: string }) {
  const styles: Record<string, React.CSSProperties> = {
    "top-left": {
      top: 0,
      left: 0,
      borderTop: "2px solid #d4c5a9",
      borderLeft: "2px solid #d4c5a9",
    },
    "top-right": {
      top: 0,
      right: 0,
      borderTop: "2px solid #d4c5a9",
      borderRight: "2px solid #d4c5a9",
    },
    "bottom-left": {
      bottom: 0,
      left: 0,
      borderBottom: "2px solid #d4c5a9",
      borderLeft: "2px solid #d4c5a9",
    },
    "bottom-right": {
      bottom: 0,
      right: 0,
      borderBottom: "2px solid #d4c5a9",
      borderRight: "2px solid #d4c5a9",
    },
  };

  return <div className="absolute w-4 h-4" style={styles[position]} />;
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
      className="group relative flex flex-col rounded-xl border p-5 transition-all duration-300 hover:border-[#000000] overflow-hidden"
      style={{
        backgroundColor: "#ffffff",
        borderColor: "#e5e5e5",
      }}
    >
      {/* 窗花四角装饰 */}
      <WindowFlower position="top-left" />
      <WindowFlower position="top-right" />
      <WindowFlower position="bottom-left" />
      <WindowFlower position="bottom-right" />

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
          style={{ color: isCenter ? "#000000" : cell.color, opacity: 0.2 }}
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

// 中国结装饰
function ChineseKnot() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-2 h-8" style={{ backgroundColor: "#dc2626" }} />
      <div className="w-6 h-3 rounded-full" style={{ backgroundColor: "#dc2626" }} />
      <div className="w-1 h-6" style={{ backgroundColor: "#dc2626" }} />
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen relative" style={{ backgroundColor: "#fafafa" }}>
      {/* 顶部装饰 - 传统门楣 */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, transparent, #d4c5a9 20%, #dc2626 50%, #d4c5a9 80%, transparent)" }} />

      {/* 侧边装饰 - 中国结 */}
      <div className="absolute top-1/2 left-6 transform -translate-y-1/2 opacity-20">
        <ChineseKnot />
      </div>
      <div className="absolute top-1/2 right-6 transform -translate-y-1/2 opacity-20">
        <ChineseKnot />
      </div>

      {/* 主内容区 */}
      <main className="max-w-[900px] mx-auto px-6 py-16">
        {/* 标题区 - 牌匾风格 */}
        <header className="mb-14 text-center">
          {/* 牌匾框架 */}
          <div
            className="relative inline-block px-12 py-8 mb-6"
            style={{
              backgroundColor: "#ffffff",
              border: "3px solid #d4c5a9",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            {/* 牌匾四角窗花装饰 */}
            <WindowFlower position="top-left" />
            <WindowFlower position="top-right" />
            <WindowFlower position="bottom-left" />
            <WindowFlower position="bottom-right" />

            {/* 顶部装饰线 - 如同门框 */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5" style={{ backgroundColor: "#d4c5a9" }} />

            <h1
              className="text-5xl font-bold mb-3"
              style={{ color: "#000000", letterSpacing: "0.15em" }}
            >
              道法自然
            </h1>
            <p
              className="text-base"
              style={{ color: "#666666", letterSpacing: "0.4em" }}
            >
              AI 为用
            </p>

            {/* 底部装饰线 */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5" style={{ backgroundColor: "#d4c5a9" }} />
          </div>

          {/* 八卦符号装饰 */}
          <div className="flex items-center justify-center gap-6">
            <div className="w-20 h-px" style={{ backgroundColor: "#e5e5e5" }} />
            <div className="flex items-center gap-3">
              <span style={{ color: "#dc2626", opacity: 0.4 }}>☰</span>
              <span style={{ color: "#000000", opacity: 0.3 }}>☯</span>
              <span style={{ color: "#2563eb", opacity: 0.4 }}>☷</span>
            </div>
            <div className="w-20 h-px" style={{ backgroundColor: "#e5e5e5" }} />
          </div>
        </header>

        {/* 九宫格 - 窗棂风格 */}
        <div className="grid grid-cols-3 gap-5">
          {BAGUA_GRID.map((cell) => (
            <BaguaCell key={cell.key} cell={cell} />
          ))}
        </div>

        {/* 底部说明 - 牌匾风格 */}
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

          {/* 底部装饰线 - 如同门槛 */}
          <div
            className="w-full h-px mt-8"
            style={{ background: "linear-gradient(90deg, transparent, #d4c5a9 30%, #dc2626 50%, #d4c5a9 70%, transparent)" }}
          />
        </footer>
      </main>

      {/* 角落窗花装饰 */}
      <div
        className="absolute bottom-8 left-8 w-12 h-12 opacity-10"
        style={{
          border: "2px solid #d4c5a9",
          transform: "rotate(45deg)",
        }}
      />
      <div
        className="absolute top-8 right-8 w-12 h-12 opacity-10"
        style={{
          border: "2px solid #d4c5a9",
          transform: "rotate(45deg)",
        }}
      />
    </div>
  );
}