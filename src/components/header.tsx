"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "首页", symbol: "☯" },
  { href: "/blog", label: "博客", symbol: "☵" },
  { href: "/shan-hai-jing", label: "山海经", symbol: "☶" },
  { href: "/about", label: "关于", symbol: "☷" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: "rgba(10,10,10,0.85)",
        borderColor: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px)",
      }}
    >
      <nav className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <span className="text-2xl" style={{ color: "rgba(255,255,255,0.5)" }}>☯</span>
          <span
            className="text-lg tracking-wide"
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
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
                  className="relative flex items-center gap-2 px-4 py-2 text-sm rounded-md transition-all duration-200 hover:bg-white/5"
                  style={{
                    color: isActive ? "#ffffff" : "rgba(255,255,255,0.45)",
                    backgroundColor: isActive ? "rgba(255,255,255,0.06)" : "transparent",
                  }}
                >
                  <span style={{ opacity: 0.6 }}>{item.symbol}</span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}