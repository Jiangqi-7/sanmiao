import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[#ebebeb] bg-[#fafafa]">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-[#171717] mb-3">三秒</h3>
            <p className="text-sm text-[#666666] leading-relaxed">
              AI 工具学习博客，记录工作中的学习心得和技巧。
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-medium text-[#171717] mb-3">导航</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-[#666666] hover:text-[#0072f5] transition-colors">
                  首页
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-[#666666] hover:text-[#0072f5] transition-colors">
                  博客
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-[#666666] hover:text-[#0072f5] transition-colors">
                  关于
                </Link>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-medium text-[#171717] mb-3">链接</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/Jiangqi-7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#666666] hover:text-[#0072f5] transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#666666] hover:text-[#0072f5] transition-colors"
                >
                  Vercel
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#ebebeb] text-center">
          <p className="text-sm text-[#808080]">
            &copy; {new Date().getFullYear()} 三秒. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
