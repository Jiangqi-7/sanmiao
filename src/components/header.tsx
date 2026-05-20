"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./theme-provider";

const NAV_ITEMS = [
  { href: "/", label: "首页" },
  { href: "/blog", label: "博客" },
  { href: "/bookmarks", label: "书签" },
  { href: "/puzzles", label: "推理" },
  { href: "/shan-hai-jing", label: "山海经" },
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
          <span className="text-xl breath" style={{ color: "var(--accent)" }}>☯</span>
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
                    style={{ color: isActive ? "var(--text-primary)" : "var(--text-secondary)", fontWeight: isActive ? 500 : 400 }}
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
            className="w-8 h-8 rounded-full border flex items-center justify-center text-sm transition-all hover:scale-110"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--bg-secondary)",
              color: "var(--accent)",
            }}
            title={theme === "simple" ? "切换彩色模式" : "切换简约模式"}
          >
            {theme === "simple" ? "🎨" : "⚪"}
          </button>
        </div>
      </nav>
    </header>
  );
}