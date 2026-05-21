"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./theme-provider";

const NAV_ITEMS = [
  { href: "/", label: "首页" },
  { href: "/blog", label: "博客" },
  { href: "/bookmarks", label: "书签收藏" },
  { href: "/puzzles", label: "推理阁" },
  { href: "/shan-hai-jing", label: "山海经" },
  { href: "/tools", label: "工具箱" },
  { href: "/prompts", label: "提示词工程" },
  { href: "/search", label: "搜索" },
  { href: "/about", label: "关于" },
];

export function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className="sticky top-0 z-50 border-b glow-hover"
      style={{ backgroundColor: "rgba(255,255,255,0.95)", borderColor: "var(--border)", backdropFilter: "blur(10px)" }}
    >
      <nav className="max-w-[900px] mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl thunder-glow" style={{ color: "var(--accent)" }}>☯</span>
          <span className="font-medium" style={{ color: "var(--text-primary)" }}>三秒</span>
        </Link>

        {/* Navigation + Theme Toggle */}
        <div className="flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm transition-colors"
                    style={{ color: isActive ? "var(--accent)" : "var(--text-secondary)", fontWeight: isActive ? 500 : 400 }}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* 主题切换按钮 */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full border-2 flex items-center justify-center text-base transition-all hover:scale-110 thunder-glow"
            style={{
              borderColor: "var(--accent)",
              backgroundColor: "var(--bg-secondary)",
              color: "var(--accent)",
              flexShrink: 0,
            }}
            title={theme === "simple" ? "切换彩色模式" : theme === "colorful" ? "切换深色模式" : "切换简约模式"}
          >
            {theme === "simple" ? "🎨" : theme === "colorful" ? "⚡" : "🌙"}
          </button>
        </div>
      </nav>
    </header>
  );
}