"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BaguaSymbol } from "./bagua-decorations";

const NAV_ITEMS = [
  { href: "/", label: "首页", bagua: "li" as const },
  { href: "/blog", label: "博客", bagua: "kan" as const },
  { href: "/shan-hai-jing", label: "山海经", bagua: "gen" as const },
  { href: "/about", label: "关于", bagua: "kun" as const },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-[var(--border)]" style={{ backgroundColor: "color-mix(in srgb, var(--bg-primary) 80%, transparent)" }}>
      <nav className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <span className="text-2xl" style={{ opacity: 0.7 }}>☯</span>
          <span className="text-xl font-semibold tracking-tight" style={{ letterSpacing: "-0.02em" }}>
            三秒
          </span>
        </Link>

        {/* Navigation */}
        <ul className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="relative flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 hover:bg-[var(--bg-secondary)]"
                  style={{
                    color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                    backgroundColor: isActive ? "var(--bg-secondary)" : "transparent",
                  }}
                >
                  <BaguaSymbol name={item.bagua} size={14} />
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ backgroundColor: "var(--text-primary)" }} />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}