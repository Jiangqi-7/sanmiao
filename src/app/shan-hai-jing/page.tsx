"use client";

import Link from "next/link";
import { BAGUA } from "@/lib/design-system";
import { BaguaWheel } from "@/components/bagua-decorations";
import { CopyButton } from "@/components/copy-button";

// 山海经异兽数据 - 从 Obsidian 迁移
const CREATURES = [
  {
    id: "chi-ru",
    name: "赤鱬",
    source: "《山海经·南山经》",
    rawText: "英水出焉，南流注于即翼之泽。其中多赤鱬，其状如鱼而人面，其音如鸳鸯，食之不疥。",
    promptZh: "生成一张山海经赤鱬插图，人面鱼身的奇异生物在幽蓝湖底游弋，鱼身晶莹透明，人面清晰可辨，周围是水草和珊瑚，远处光斑透入水面，中国神话水中灵兽，水墨彩绘风格。",
    promptEn: "A mystical Chinese creature Chi Ru, Shan Hai Jing illustration, fish with a human face swimming in a deep crystal lake, translucent body showing internal organs, clearly defined humanoid face, coral and seaweed surroundings, light rays penetrating from above, ethereal blue atmosphere, ancient Chinese mythological water spirit, ink wash painting style, no text, no watermark",
    tags: ["南山经", "水族", "祥瑞"],
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
    bagua: "kan" as const,
  },
  {
    id: "li-li",
    name: "狸力",
    source: "《山海经·南山经》",
    rawText: "柜山，有兽焉，其状如豚，有距，其音如狗吠，其名曰狸力，见则其县多土功。",
    promptZh: "生成一张山海经狸力插图，小猪身形却长着锋利的鸡爪，在挖掘泥土，地面隆起堆成小山，尘土飞扬，周围是古代县城的工地，中国上古劳作之兽，水墨淡彩风格。",
    promptEn: "A diligent Chinese beast Li Li, Shan Hai Jing illustration, piglet-sized creature with rooster-like talons digging earth, mounds of soil piling up around it, dust flying in the air, ancient county construction site in background, hardworking mythical creature from Chinese folklore, muted ink wash style with earth tones, no text, no watermark",
    tags: ["南山经", "山兽", "土功"],
    image: "https://images.unsplash.com/photo-1550947627-6a4a8d7d5b1e?w=800&q=80",
    bagua: "gen" as const,
  },
  {
    id: "lei",
    name: "类",
    source: "《山海经·南山经》",
    rawText: "亶爰之山，多水，无草木。有兽焉，其状如狸而有髦，其名曰类，自为牝牡，食者不妒。",
    promptZh: "生成一张山海经类插图，野猫身形却披散长发，雌雄同体的神秘生物在幽暗密林间独行，双性特征模糊难辨，周围是潮湿的亚热带植被，月光透过树叶，中国神话神秘异兽，水墨写意风格。",
    promptEn: "A mysterious Chinese beast Lei, Shan Hai Jing ancient illustration, wildcat-like creature with long flowing hair, androgynous form with ambiguous gender features, prowling through dark dense subtropical forest, moonlight filtering through leaves, fog swirling at its feet, enigmatic Chinese mythological creature, sparse ink wash painting, no text, no watermark",
    tags: ["南山经", "山兽", "神秘"],
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=80",
    bagua: "kun" as const,
  },
  {
    id: "bo-yi",
    name: "猼訑",
    source: "《山海经·南山经》",
    rawText: "基山，有兽焉，其状如羊，九尾，四耳，其目在背，其名曰猼訑，佩之不畏。",
    promptZh: "生成一张山海经猼訑插图，羊身九尾奇异神兽，背生四耳各朝不同方向，眼睛长在后背，九尾如彩带飘散，周身散发无畏神光，佩之不畏的祥瑞之兽，中国上古神怪画风。",
    promptEn: "A fearless Chinese mythical beast Bo Yi, Shan Hai Jing ancient illustration, goat-like creature with nine flowing tails and four ears on its back, eyes positioned on its back watching all directions, divine fearless glow surrounding it, ethereal mystical atmosphere, ancient Chinese supernatural art, nine tails fanning out dramatically, no text, no watermark",
    tags: ["南山经", "山兽", "祥瑞"],
    image: "https://images.unsplash.com/photo-1577493340887-b7bfff550145?w=800&q=80",
    bagua: "zhen" as const,
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
          {/* 南山经 */}
          <div id="nan" className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl">{BAGUA.positions.xun.symbol}</span>
              <h2 className="text-2xl font-semibold">南山经</h2>
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
              西山经 · 北山经 · 东山经 · 中山经 · 海外经 · 大荒经
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}