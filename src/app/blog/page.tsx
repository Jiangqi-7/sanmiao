import Link from "next/link";

const ALL_POSTS = [
  {
    slug: "openclaw-deployment",
    title: "OpenClaw 部署完全指南",
    description: "从零开始部署 OpenClaw，龙虾开壳到配置详解",
    date: "2026-05-08",
    category: "OpenClaw",
  },
  {
    slug: "coze-workflow",
    title: "扣子工作流搭建保姆级教程",
    description: "手把手教你搭建第一个扣子 AI 工作流",
    date: "2026-05-07",
    category: "扣子/Coze",
  },
  {
    slug: "seedance-usage",
    title: "Seedance 2.0 使用手册",
    description: "AI 视频生成工具 Seedance 2.0 完整教程",
    date: "2026-05-06",
    category: "AI 视频",
  },
  {
    slug: "ffmpeg-guide",
    title: "FFmpeg 音视频处理入门",
    description: "命令行工具 FFmpeg 常用命令大全",
    date: "2026-05-05",
    category: "工具配置",
  },
  {
    slug: "yt-dlp-guide",
    title: "yt-dlp 全能下载器使用指南",
    description: "支持视频、音频、字幕批量下载",
    date: "2026-05-04",
    category: "工具配置",
  },
];

export default function BlogPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <h1 className="text-3xl font-semibold tracking-tight text-[#171717] mb-8">博客</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALL_POSTS.map((post) => (
            <article
              key={post.slug}
              className="group p-6 bg-[#ffffff] rounded-lg border border-[#ebebeb] hover:border-[#171717] transition-all"
            >
              <div className="mb-3">
                <span className="inline-block px-2 py-1 text-xs font-medium text-[#0068d6] bg-[#ebf5ff] rounded">
                  {post.category}
                </span>
              </div>
              <h2 className="text-lg font-medium text-[#171717] mb-2 group-hover:text-[#0072f5] transition-colors">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="text-sm text-[#666666] leading-relaxed mb-4">{post.description}</p>
              <time className="text-xs text-[#808080]">{post.date}</time>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
