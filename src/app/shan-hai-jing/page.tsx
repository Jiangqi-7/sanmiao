"use client";

import Link from "next/link";
import { BAGUA } from "@/lib/design-system";
import { BaguaWheel } from "@/components/bagua-decorations";
import { CopyButton } from "@/components/copy-button";

// 山海经异兽数据 - 从 llm-wiki 迁移 + 用户生成的图片
const CREATURES = [
  {
    id: "zhu-long",
    name: "烛龙",
    source: "《山海经·大荒北经》",
    rawText: "西北海之外，赤水之北，有章尾山。有神，人面蛇身而赤，直目正乘，其瞑乃晦，其视乃明，不食不寝不息，风雨是谒。是烛九阴，是烛龙。",
    promptZh: "生成一张山海经烛龙插图，巨大的红色人面蛇身神占据画面中央，烛龙的眼睛睁闭之间控制昼夜交替，通体散发着日月般的光芒，周围风雨环绕，背景是幽暗神秘的山海世界，水墨古风，武侠电影般的史诗氛围。",
    promptEn: "A legendary Chinese fire deity Zhu Long, ancient ink wash painting style, a massive red humanoid face atop an enormous serpent body stretching across the landscape, eyes closed for night and open for day, glowing like the sun and moon, surrounded by swirling mist and wind, dramatic Wu Xia cinematic atmosphere, dark mystical background with red and gold accents, intricate scales, powerful divine presence, Chinese mythological art, detailed texture, no text, no watermark",
    tags: ["大荒北经", "神祇", "昼夜"],
    image: "https://minimax-algeng-chat-tts.oss-cn-wulanchabu.aliyuncs.com/ccv2%2F2026-05-10%2FMiniMax-M2.7%2F2030867529949253797%2F0dbed19cb6a1248a660c6762b4c77f56d8c9f485df20efa40ea471fd17dc2175..jpeg?Expires=1778441353&OSSAccessKeyId=LTAI5tGLnRTkBjLuYPjNcKQ8&Signature=zqHqdG8pcOILX1oZZw9%2FW8lFhB8%3D",
    bagua: "kan" as const,
  },
  {
    id: "kui-niu",
    name: "夔牛",
    source: "《山海经·大荒东经》",
    rawText: "东海中有流波山，入海七千里。其上有兽，状如牛，苍身而无角，一足，出入水则必有风雨，其光如日月，其声如雷，其名曰夔。黄帝得之，以其皮为鼓，橛以雷兽之骨，声闻五百里，以威天下。",
    promptZh: "生成一张山海经夔牛插图，独脚青灰色神牛站在雷雨交加的东海之中，单眼如烈日般炽烈燃烧，周身风雨大作，青铜器纹饰风格，远景海浪翻涌，肃穆而震撼的中国神话氛围。",
    promptEn: "A mythical Chinese beast Kui Niu, ancient bronze ritual vessel art style, single-legged blue-grey bull standing in a thunderstorm sea, its body glowing like moonlight, lightning and rain surrounding it, one cyclopean eye blazing like the sun, dramatic silhouette, dark stormy ocean backdrop, ancient Chinese mythological creature, bronze mask aesthetic, visceral powerful presence, no text, no watermark",
    tags: ["大荒东经", "神兽", "雷兽"],
    image: "https://minimax-algeng-chat-tts.oss-cn-wulanchabu.aliyuncs.com/ccv2%2F2026-05-10%2FMiniMax-M2.7%2F2030867529949253797%2Ffcc80bac60a78648b4ecdb4a61562f9cb397c05b50db057dd882a94bd95d8d2b..jpeg?Expires=1778441352&OSSAccessKeyId=LTAI5tGLnRTkBjLuYPjNcKQ8&Signature=hifZS6eTIBSW6GtDKaaSAvp%2FTI8%3D",
    bagua: "gen" as const,
  },
];

function CreatureCard({ creature }: { creature: typeof CREATURES[0] }) {
  return (
    <article
      className="group rounded-xl border overflow-hidden transition-all duration-300 hover:shadow-xl"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border)",
      }}
    >
      {/* 顶部大图 */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={creature.image}
          alt={creature.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* 渐变遮罩 */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)",
          }}
        />

        {/* 名称和出处叠加在图片上 */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm opacity-70">{BAGUA.positions[creature.bagua].symbol}</span>
            <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
              {creature.source}
            </span>
          </div>
          <h3 className="text-2xl font-bold">{creature.name}</h3>
        </div>
      </div>

      {/* 原文区域 */}
      <div className="p-4 border-b" style={{ borderColor: "var(--border)" }}>
        <p className="text-sm italic leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {creature.rawText}
        </p>
      </div>

      {/* 标签 */}
      <div className="px-4 pt-3 pb-1 flex flex-wrap gap-2">
        {creature.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 rounded"
            style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-muted)" }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* 提示词区域 - 默认隐藏 */}
      <details className="group/prompt">
        <summary
          className="flex items-center justify-between px-4 py-3 cursor-pointer list-none text-sm font-medium"
          style={{ color: "var(--text-primary)" }}
        >
          <span className="flex items-center gap-2">
            <span style={{ opacity: 0.5 }}>{BAGUA.positions.li.symbol}</span>
            提示词
          </span>
          <span className="text-xs opacity-50 group-open/prompt:hidden block">点击展开</span>
          <span className="text-xs opacity-50 group-open/prompt:block hidden">点击收起</span>
        </summary>

        <div className="px-4 pb-4 space-y-3">
          {/* 中文提示词 */}
          <div>
            <p className="text-xs font-medium mb-2 flex items-center gap-2" style={{ color: "var(--text-muted)" }}>
              中文提示词
              <CopyButton text={creature.promptZh} lang="zh" />
            </p>
            <p
              className="text-sm p-3 rounded-md leading-relaxed"
              style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-primary)" }}
            >
              {creature.promptZh}
            </p>
          </div>

          {/* English Prompt */}
          <div>
            <p className="text-xs font-medium mb-2 flex items-center gap-2" style={{ color: "var(--text-muted)" }}>
              English Prompt
              <CopyButton text={creature.promptEn} lang="en" />
            </p>
            <p
              className="text-xs p-3 rounded-md font-mono leading-relaxed"
              style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-secondary)" }}
            >
              {creature.promptEn}
            </p>
          </div>
        </div>
      </details>
    </article>
  );
}

export default function ShanHaiJingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* 背景八卦装饰 */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-0 right-0">
            <BaguaWheel size={400} />
          </div>
        </div>

        <div className="relative z-10 max-w-[1000px] mx-auto px-6 text-center">
          {/* 标题符号 */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-3xl opacity-40">{BAGUA.positions.gen.symbol}</span>
            <span className="text-5xl">☯</span>
            <span className="text-3xl opacity-40">{BAGUA.positions.dui.symbol}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            山海经
            <span className="block text-xl md:text-2xl font-normal opacity-60 mt-2">异兽图鉴</span>
          </h1>

          <p className="text-lg mb-6" style={{ color: "var(--text-secondary)" }}>
            《山海经》异兽与 AI 创作的融合
          </p>

          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            GPT Image 2 提示词 · 中英对照 · 点击展开复制
          </p>
        </div>
      </section>

      {/* 目录导航 */}
      <section
        className="py-4 sticky top-16 z-40 backdrop-blur-xl border-b"
        style={{
          backgroundColor: "color-mix(in srgb, var(--bg-primary) 90%, transparent)",
          borderColor: "var(--border)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center gap-2 text-sm overflow-x-auto">
            <span style={{ opacity: 0.5 }}>{BAGUA.positions.kun.symbol}</span>
            <span>导航：</span>
            <Link href="#nan" className="px-2 py-1 rounded transition-colors hover:bg-[var(--bg-secondary)]">
              南山经
            </Link>
            <span className="opacity-30">·</span>
            <Link href="#xi" className="px-2 py-1 rounded transition-colors hover:bg-[var(--bg-secondary)]">
              西山经
            </Link>
            <span className="opacity-30">·</span>
            <Link href="#bei" className="px-2 py-1 rounded transition-colors hover:bg-[var(--bg-secondary)]">
              北山经
            </Link>
          </div>
        </div>
      </section>

      {/* 异兽展示 */}
      <section className="py-12 flex-1">
        <div className="max-w-[1400px] mx-auto px-6">
          {/* 大荒北经 */}
          <div id="bei" className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl">{BAGUA.positions.kan.symbol}</span>
              <h2 className="text-2xl font-semibold">大荒北经</h2>
              <span
                className="text-sm px-3 py-1 rounded-full"
                style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-muted)" }}
              >
                已收录 {CREATURES.length} 种
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {CREATURES.map((creature) => (
                <CreatureCard key={creature.id} creature={creature} />
              ))}
            </div>
          </div>

          {/* 更多经文预告 */}
          <div
            className="text-center py-12 rounded-xl border border-dashed"
            style={{ borderColor: "var(--border)" }}
          >
            <span className="text-4xl opacity-20 block mb-4">{BAGUA.positions.dui.symbol}</span>
            <p className="text-lg mb-2">更多经文正在整理中</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              南山经 · 西山经 · 北山经 · 东山经 · 中山经 · 海外经 · 大荒经
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}