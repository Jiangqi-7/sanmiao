"use client";

import Link from "next/link";
import { BAGUA } from "@/lib/design-system";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="mt-auto border-t"
      style={{
        backgroundColor: "rgba(15,15,15,0.95)",
        borderColor: "rgba(255,255,255,0.05)",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        {/* 主内容区 - 3列布局 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* 第一列：品牌 */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span style={{ color: "rgba(255,255,255,0.4)" }}>☯</span>
              <span className="text-base font-medium tracking-wide" style={{ color: "rgba(255,255,255,0.7)" }}>
                三秒
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
              道法自然，AI 为用。<br />
              记录 AI 工具学习之路，探索技术与传统的融合。
            </p>
          </div>

          {/* 第二列：导航 */}
          <div>
            <h4 className="text-sm mb-3 flex items-center gap-2" style={{ color: "rgba(255,255,255,0.4)" }}>
              <span>{BAGUA.positions.kan.symbol}</span>
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
                    className="text-sm transition-colors hover:opacity-70"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 第三列：链接 */}
          <div>
            <h4 className="text-sm mb-3 flex items-center gap-2" style={{ color: "rgba(255,255,255,0.4)" }}>
              <span>{BAGUA.positions.qian.symbol}</span>
              {BAGUA.positions.qian.name}·{BAGUA.positions.qian.direction}
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/Jiangqi-7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm transition-colors hover:opacity-70"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm transition-colors hover:opacity-70"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  Hosted on Vercel
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 分隔线 */}
        <div
          className="w-full h-px mb-8"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
          }}
        />

        {/* 底部版权 */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
            © {currentYear} 三秒. All rights reserved.
          </p>
          <p className="text-xs flex items-center gap-2" style={{ color: "rgba(255,255,255,0.2)" }}>
            <span>{BAGUA.positions.kun.symbol}</span>
            <span>{BAGUA.positions.kun.name}为地，承载万物</span>
            <span>{BAGUA.positions.qian.symbol}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}