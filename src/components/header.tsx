"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "首页" },
  { href: "/blog", label: "博客" },
  { href: "/shan-hai-jing", label: "山海经" },
  { href: "/about", label: "关于" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{ backgroundColor: "rgba(255,255,255,0.95)", borderColor: "#e5e5e5", backdropFilter: "blur(10px)" }}
    >
      <nav className="max-w-[900px] mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">☯</span>
          <span className="font-medium" style={{ color: "#000000" }}>三秒</span>
        </Link>

        {/* Navigation */}
        <ul className="flex items-center gap-6">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm transition-colors"
                  style={{ color: isActive ? "#000000" : "#666666", fontWeight: isActive ? 500 : 400 }}
                >
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