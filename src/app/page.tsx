import Link from "next/link";
import { BAGUA } from "@/lib/design-system";
import { BaguaWheel } from "@/components/bagua-decorations";

// 后天八卦九宫格布局
// 巽(东南) │ 离(南) │ 坤(西南)
// ─────────────────────────
// 震(东)   │ [中宫] │ 兑(西)
// ─────────────────────────
// 艮(东北) │ 坎(北) │ 乾(西北)

const BAGUA_GRID = [
  // 第一行
  { key: "xun", name: "巽", direction: "东南", href: "/blog?category=workflow", desc: "AI工作流", color: "var(--accent-xun)" },
  { key: "li", name: "离", direction: "南", href: "/shan-hai-jing", desc: "山海经图鉴", color: "var(--accent-li)" },
  { key: "kun", name: "坤", direction: "西南", href: "/about", desc: "关于我们", color: "var(--accent-kun)" },
  // 第二行
  { key: "zhen", name: "震", direction: "东", href: "/blog?category=video", desc: "视频生成", color: "var(--accent-zhen)" },
  { key: "center", name: "中", direction: "宫", href: "/", desc: "道法自然", color: "var(--accent-center)", isCenter: true },
  { key: "dui", name: "兑", direction: "西", href: "/blog?category=image", desc: "图片生成", color: "var(--accent-dui)" },
  // 第三行
  { key: "gen", name: "艮", direction: "东北", href: "/blog?category=tools", desc: "工具教程", color: "var(--accent-gen)" },
  { key: "kan", name: "坎", direction: "北", href: "/blog", desc: "博客文章", color: "var(--accent-kan)" },
  { key: "qian", name: "乾", direction: "西北", href: "/about", desc: "关于本站", color: "var(--accent-qian)" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 九宫格主区域 */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div
          className="w-full max-w-[900px] aspect-square grid grid-cols-3 grid-rows-3 gap-3"
          style={{
            // CSS Grid 直接实现九宫格
          }}
        >
          {BAGUA_GRID.map((cell) => {
            if (cell.isCenter) {
              // 中宫 - 品牌中心
              return (
                <Link
                  key={cell.key}
                  href={cell.href}
                  className="relative flex flex-col items-center justify-center rounded-2xl border transition-all duration-300 hover:scale-105 group"
                  style={{
                    backgroundColor: "var(--bg-card)",
                    borderColor: "var(--border)",
                  }}
                >
                  <div className="absolute inset-0 opacity-5">
                    <BaguaWheel size={400} />
                  </div>
                  <span className="text-5xl mb-2 opacity-40 group-hover:opacity-60 transition-opacity">☯</span>
                  <span className="text-lg font-semibold tracking-tight">三秒</span>
                  <span className="text-xs opacity-50 mt-1">道法自然 · AI 为用</span>
                </Link>
              );
            }

            const baguaKey = cell.key as keyof typeof BAGUA.positions;
            const symbol = BAGUA.positions[baguaKey]?.symbol || "☰";

            return (
              <Link
                key={cell.key}
                href={cell.href}
                className="relative flex flex-col items-center justify-center rounded-2xl border p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg overflow-hidden"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor: "var(--border)",
                }}
              >
                {/* 背景八卦符号 */}
                <span
                  className="absolute text-[120px] opacity-[0.03] font-bold select-none"
                  style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                >
                  {symbol}
                </span>

                {/* 格子内容 */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  <span className="text-3xl mb-2 opacity-70">{symbol}</span>
                  <span className="text-sm font-medium">{cell.name}</span>
                  <span className="text-xs opacity-50">{cell.direction}</span>
                  <span
                    className="text-xs mt-2 px-2 py-1 rounded-full"
                    style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-muted)" }}
                  >
                    {cell.desc}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      {/* 底部装饰 */}
      <footer className="py-8 text-center border-t" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center justify-center gap-6 opacity-30 mb-2">
          {["kan", "gen", "zhen", "xun", "li", "kun", "dui", "qian"].map((key) => (
            <span key={key} className="text-sm">
              {BAGUA.positions[key as keyof typeof BAGUA.positions].symbol}
            </span>
          ))}
        </div>
        <p className="text-xs opacity-40">后天八卦 · 九宫格布局</p>
      </footer>
    </div>
  );
}