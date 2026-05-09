"use client";

import Link from "next/link";
import { BAGUA } from "@/lib/design-system";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[var(--border)]" style={{ backgroundColor: "var(--bg-secondary)" }}>
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        {/* 主内容区 - 3列布局 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* 第一列：品牌 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl" style={{ opacity: 0.5 }}>☯</span>
              <h3 className="text-lg font-semibold" style={{ letterSpacing: "-0.02em" }}>三秒</h3>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              道法自然，AI 为用。<br />
              记录 AI 工具学习之路，探索技术与传统的融合。
            </p>
          </div>

          {/* 第二列：导航 */}
          <div>
            <h4 className="text-sm font-medium mb-4 flex items-center gap-2">
              <span style={{ opacity: 0.5 }}>{BAGUA.positions.kan.symbol}</span>
              {BAGUA.positions.kan.name}·{BAGUA.positions.kan.direction}
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/", label: "首页" },
                { href: "/blog", label: "博客" },
                { href: "/shan-hai-jing", label: "山海经图鉴" },
                { href: "/about", label: "关于" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm transition-colors hover:opacity-80"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 第三列：链接 */}
          <div>
            <h4 className="text-sm font-medium mb-4 flex items-center gap-2">
              <span style={{ opacity: 0.5 }}>{BAGUA.positions.qian.symbol}</span>
              {BAGUA.positions.qian.name}·{BAGUA.positions.qian.direction}
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/Jiangqi-7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm transition-colors hover:opacity-80"
                  style={{ color: "var(--text-secondary)" }}
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm transition-colors hover:opacity-80"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Hosted on Vercel
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 分隔线 */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent mb-8" style={{ opacity: 0.2 }} />

        {/* 底部版权 */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            &copy; {currentYear} 三秒. All rights reserved.
          </p>
          <p className="text-xs flex items-center gap-2" style={{ color: "var(--text-muted)" }}>
            <span>{BAGUA.positions.kun.symbol}</span>
            <span>{BAGUA.positions.kun.name}为地，承载万物</span>
            <span>{BAGUA.positions.qian.symbol}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}