"use client";

import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="mt-auto border-t py-8"
      style={{ backgroundColor: "#ffffff", borderColor: "#e5e5e5" }}
    >
      <div className="max-w-[900px] mx-auto px-6">
        {/* 分隔线 */}
        <div className="w-full h-px mb-6" style={{ backgroundColor: "#e5e5e5" }} />

        {/* 底部内容 */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm" style={{ color: "#999999" }}>
            © {currentYear} 三秒. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm" style={{ color: "#666666" }}>
            <Link href="/" className="hover:opacity-70 transition-opacity">首页</Link>
            <Link href="/blog" className="hover:opacity-70 transition-opacity">博客</Link>
            <Link href="/shan-hai-jing" className="hover:opacity-70 transition-opacity">山海经</Link>
            <Link href="/about" className="hover:opacity-70 transition-opacity">关于</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}