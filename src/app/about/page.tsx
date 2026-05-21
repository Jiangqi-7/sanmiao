"use client";

// 评论区已移除，如需开启请参考 giscus.app

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="h-px gradient-border" />

      <main className="max-w-[800px] mx-auto px-6 py-20">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-light tracking-widest mb-8" style={{ color: "var(--text-primary)", fontFamily: "serif" }}>
            关于
          </h1>
          <div className="w-16 h-px mx-auto" style={{ backgroundColor: "var(--border)" }} />
        </header>

        <div className="prose space-y-6" style={{ color: "var(--text-secondary)" }}>
          <p>
            我是三秒，爱好广泛，正在学习 AI 领域相关知识与内容。
          </p>
          <p>
            这个网站用来记录些想记录的东西，希望大家一起学习交流。
          </p>

          <div className="mt-12 pt-8 border-t" style={{ borderColor: "var(--border)" }}>
            <h2 className="text-sm font-medium mb-4" style={{ color: "var(--text-muted)" }}>视频来源</h2>
            <p className="text-sm">
              网站中引用的视频来自：{" "}
              <a
                href="https://github.com/EKKOLearnAI/hermes-web-ui/tree/main"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent)] transition-colors"
                style={{ color: "var(--accent)" }}
              >
                EKKOLearnAI/hermes-web-ui
              </a>
            </p>
          </div>
        </div>
      </main>

      <div className="h-px gradient-border" />
    </div>
  );
}