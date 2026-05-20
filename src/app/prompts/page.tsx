"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

type Category = "生图" | "生视频" | "角色扮演" | "写作" | "编程" | "翻译" | "分析" | "其他";

interface Prompt {
  id: string;
  title: string;
  category: Category;
  content: string;
  description: string;
  variables: string[];
  createdAt: number;
}

const CATEGORIES: Category[] = ["生图", "生视频", "角色扮演", "写作", "编程", "翻译", "分析", "其他"];

const DEFAULT_PROMPTS: Prompt[] = [
  {
    id: "1",
    title: "Midjourney基础生图",
    category: "生图",
    content: "/imagine prompt: {subject}, {style}, {lighting}, 8k, hyperrealistic, --ar 16:9 --s 750 --q 2",
    description: "通用生图提示词模板",
    variables: ["subject", "style"],
    createdAt: Date.now(),
  },
  {
    id: "2",
    title: "即梦视频生成",
    category: "生视频",
    content: "生成一段{length}秒的视频，主题是{topic}，风格{style}，需要有{element}元素",
    description: "即梦视频生成提示词",
    variables: ["length", "topic", "style", "element"],
    createdAt: Date.now(),
  },
  {
    id: "3",
    title: "角色扮演开场",
    category: "角色扮演",
    content: "你扮演{character}，一个{description}。请用第一人称和我对话，保持角色设定。",
    description: "角色扮演开场白模板",
    variables: ["character", "description"],
    createdAt: Date.now(),
  },
  {
    id: "4",
    title: "英文邮件写作",
    category: "写作",
    content: "请帮我写一封{type}邮件，主题是{topic}，语气{tone}，收件人是{recipient}。",
    description: "商务邮件写作模板",
    variables: ["type", "topic", "tone", "recipient"],
    createdAt: Date.now(),
  },
  {
    id: "5",
    title: "代码审查",
    category: "编程",
    content: "请审查以下代码，找出潜在问题：\n```{language}\n{code}\n```\n重点关注：{focus}",
    description: "代码审查提示词",
    variables: ["language", "code", "focus"],
    createdAt: Date.now(),
  },
  {
    id: "6",
    title: "Seedance生活情景剧",
    category: "生视频",
    content: "生成一段微动作+情绪的生活情景剧视频。\n\n角色：{character}\n场景：{scene}\n情绪：{emotion}\n动作要求：{actions}\n时长：{duration}秒\n风格：{style}",
    description: "Seedance 2.0生活情景剧模板",
    variables: ["character", "scene", "emotion", "actions", "duration", "style"],
    createdAt: Date.now(),
  },
  {
    id: "7",
    title: "Seedance电影感镜头",
    category: "生视频",
    content: "生成一段具有电影感的视频。\n\n主题：{topic}\n镜头语言：{shot}\n色调/调性：{tone}\n时间轴：0-{time1}秒{action1}，{time1}-{time2}秒{action2}\n参考风格：{reference}",
    description: "Seedance戏剧感/电影感模板",
    variables: ["topic", "shot", "tone", "time1", "time2", "action1", "action2", "reference"],
    createdAt: Date.now(),
  },
  {
    id: "8",
    title: "产品特写视频",
    category: "生视频",
    content: "生成产品展示视频。\n\n产品：{product}\n展示角度：{angle}\n质感要求：{quality}\n背景：{background}\n时长：{duration}秒",
    description: "Seedance电商产品特写模板",
    variables: ["product", "angle", "quality", "background", "duration"],
    createdAt: Date.now(),
  },
  {
    id: "9",
    title: "创意广告时间轴",
    category: "生视频",
    content: "生成创意广告视频，严格按时间轴执行：\n\n0-{t1}秒：{a1}\n{t1}-{t2}秒：{a2}\n{t2}-{t3}秒：{a3}\n{t3}-结束：{a4}\n\n产品：{product}\n核心卖点：{卖点}",
    description: "时间轴控制节奏的广告模板",
    variables: ["t1", "t2", "t3", "a1", "a2", "a3", "a4", "product", "卖点"],
    createdAt: Date.now(),
  },
  {
    id: "10",
    title: "视觉特效转场",
    category: "生视频",
    content: "生成特效转场视频。\n\n特效类型：{effect_type}\n转场前：{before}\n转场后：{after}\n参考视频：{reference_video}的特效风格\n持续时间：{duration}秒",
    description: "视觉奇观与特效转场模板",
    variables: ["effect_type", "before", "after", "reference_video", "duration"],
    createdAt: Date.now(),
  },
  {
    id: "11",
    title: "音乐卡点MV",
    category: "生视频",
    content: "生成音乐卡点视频。\n\n音乐节奏描述：{rhythm}\n节拍节点：{beat}\n画面内容：{content}\n转场时机：{transition_at}\n风格：{style}",
    description: "音乐卡点与MV模板",
    variables: ["rhythm", "beat", "content", "transition_at", "style"],
    createdAt: Date.now(),
  },
  {
    id: "12",
    title: "视频延长指令",
    category: "生视频",
    content: "延长现有视频片段。\n\n原视频内容：{original}\n要延长的方向：{direction}\n延长时长：{duration}秒\n保持连贯性：{continuity}",
    description: "视频延长与后期编辑模板",
    variables: ["original", "direction", "duration", "continuity"],
    createdAt: Date.now(),
  },
  {
    id: "13",
    title: "角色复刻替换",
    category: "生视频",
    content: "参考「视频A」的运镜/节奏，换成我的角色：\n\n原视频特征：{original_features}\n我的角色/图片：{my_character}\n复刻要求：{requirements}",
    description: "复刻模仿与角色替换模板",
    variables: ["original_features", "my_character", "requirements"],
    createdAt: Date.now(),
  },
  {
    id: "14",
    title: "对话表演模板",
    category: "生视频",
    content: "生成对话表演视频。\n\n角色{role1}：{action1}：「{dialogue1}」\n角色{role2}：{action2}：「{dialogue2}」\n方言/语种：{dialect}\n情绪：{emotion}",
    description: "对话表演与方言配音模板",
    variables: ["role1", "action1", "dialogue1", "role2", "action2", "dialogue2", "dialect", "emotion"],
    createdAt: Date.now(),
  },
  {
    id: "15",
    title: "分镜转视频",
    category: "生视频",
    content: "将分镜/漫画转化为视频。\n\n分镜描述：{storyboard}\n风格要求：{style}\n镜头顺序：{sequence}\n时长控制：{duration}",
    description: "分镜、漫画转视频模板",
    variables: ["storyboard", "style", "sequence", "duration"],
    createdAt: Date.now(),
  },
  {
    id: "16",
    title: "一镜到底",
    category: "生视频",
    content: "生成沉浸式一镜到底视频。\n\n场景：{scene}\n动作流程：{action_flow}\n相机运动：{camera_movement}\n总时长：{duration}秒\n不允许剪辑切换",
    description: "沉浸式一镜到底模板",
    variables: ["scene", "action_flow", "camera_movement", "duration"],
    createdAt: Date.now(),
  },
  {
    id: "17",
    title: "微短剧选题分析",
    category: "写作",
    content: "你是一个资深的微短剧策划，在抖音和快手做了3年短剧内容。\n\n请帮我分析当前微短剧市场最热门的{num}个赛道，每个赛道给出：\n- 赛道名称和核心吸引力\n- 典型爆款案例1-2个\n- 目标受众画像\n- 竞争程度和适合新手程度",
    description: "微短剧选题分析提示词",
    variables: ["num"],
    createdAt: Date.now(),
  },
  {
    id: "18",
    title: "故事大纲生成",
    category: "写作",
    content: "我要做一部微短剧。\n【赛道】{track}\n【集数】{episodes}\n【目标平台】{platform}\n【目标受众】{audience}\n\n请帮我设计完整故事大纲：核心设定、人物设定、分集大纲（每集要有钩子）",
    description: "微短剧故事大纲生成",
    variables: ["track", "episodes", "platform", "audience"],
    createdAt: Date.now(),
  },
  {
    id: "19",
    title: "单集剧本撰写",
    category: "写作",
    content: "基于以下故事大纲，请撰写第{episode}集的完整剧本。\n\n【故事大纲】{outline}\n【本集大纲】{episode_outline}\n【上一集结尾】{prev_ending}\n\n格式要求：总时长90秒左右（800-1000字），前5秒必须有强钩子，对话口语化短句为主。",
    description: "微短剧单集剧本撰写",
    variables: ["episode", "outline", "episode_outline", "prev_ending"],
    createdAt: Date.now(),
  },
  {
    id: "20",
    title: "钩子优化",
    category: "写作",
    content: "以下是微短剧第{episode}集的剧本，请优化：\n\n【剧本】{script}\n\n一、开头优化（前5秒）- 给出3个版本：悬念型、冲突型、反常型\n二、结尾优化（最后5秒）- 给出3个版本：悬念断点、反转炸弹、情感冲击",
    description: "微短剧钩子优化提示词",
    variables: ["episode", "script"],
    createdAt: Date.now(),
  },
];

const STORAGE_KEY = "sanmiao-prompts";

function loadPrompts(): Prompt[] {
  if (typeof window === "undefined") return DEFAULT_PROMPTS;
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROMPTS));
    return DEFAULT_PROMPTS;
  }
  try {
    return JSON.parse(saved);
  } catch {
    return DEFAULT_PROMPTS;
  }
}

function savePrompts(prompts: Prompt[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));
}

function extractVariables(content: string): string[] {
  const matches = content.match(/\{(\w+)\}/g);
  if (!matches) return [];
  return [...new Set(matches.map((m) => m.slice(1, -1)))];
}

function fillVariables(content: string, values: Record<string, string>): string {
  let result = content;
  for (const [key, value] of Object.entries(values)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, "g"), value || `{${key}}`);
  }
  return result;
}

export default function PromptsPage() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [filter, setFilter] = useState<Category | "全部">("全部");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Prompt | null>(null);
  const [fillValues, setFillValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  // Form state
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState<Category>("生图");
  const [formContent, setFormContent] = useState("");
  const [formDescription, setFormDescription] = useState("");

  useEffect(() => {
    setPrompts(loadPrompts());
  }, []);

  const filtered = useMemo(() => {
    return prompts.filter((p) => {
      const matchCategory = filter === "全部" || p.category === filter;
      const matchSearch = !search || p.title.includes(search) || p.content.includes(search) || p.description.includes(search);
      return matchCategory && matchSearch;
    });
  }, [prompts, filter, search]);

  const handleSave = () => {
    const variables = extractVariables(formContent);
    const newPrompt: Prompt = {
      id: editing?.id || String(Date.now()),
      title: formTitle,
      category: formCategory,
      content: formContent,
      description: formDescription,
      variables,
      createdAt: editing?.createdAt || Date.now(),
    };

    let newPrompts: Prompt[];
    if (editing) {
      newPrompts = prompts.map((p) => (p.id === editing.id ? newPrompt : p));
    } else {
      newPrompts = [newPrompt, ...prompts];
    }

    setPrompts(newPrompts);
    savePrompts(newPrompts);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (!confirm("确定删除？")) return;
    const newPrompts = prompts.filter((p) => p.id !== id);
    setPrompts(newPrompts);
    savePrompts(newPrompts);
  };

  const handleEdit = (prompt: Prompt) => {
    setEditing(prompt);
    setFormTitle(prompt.title);
    setFormCategory(prompt.category);
    setFormContent(prompt.content);
    setFormDescription(prompt.description);
    setShowForm(true);
  };

  const handleCopy = (prompt: Prompt) => {
    const values: Record<string, string> = {};
    prompt.variables.forEach((v) => {
      values[v] = fillValues[v] || "";
    });

    let content = prompt.content;
    if (Object.values(values).some((v) => v)) {
      content = fillVariables(content, values);
    }

    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditing(null);
    setFormTitle("");
    setFormCategory("生图");
    setFormContent("");
    setFormDescription("");
    setFillValues({});
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="h-px" style={{ backgroundColor: "var(--accent)" }} />

      <main className="max-w-[900px] mx-auto px-6 py-16">
        <header className="mb-12">
          <Link href="/" className="text-sm text-neutral-400 hover:text-neutral-600 mb-4 block">← 返回</Link>
          <div className="flex items-baseline justify-between">
            <div>
              <h1 className="text-4xl font-light tracking-wider" style={{ color: "var(--text-primary)", fontFamily: "serif" }}>提示词</h1>
              <p className="text-sm text-neutral-400 mt-2">模板管理 · 变量填充 · 一键复制</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-2 text-sm border transition-colors"
              style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
            >
              + 新建
            </button>
          </div>
        </header>

        {/* 筛选 */}
        <div className="mb-8 space-y-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索提示词..."
            className="w-full px-4 py-2 text-sm border"
            style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }}
          />
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilter("全部")}
              className="px-3 py-1 text-xs border transition-colors"
              style={{
                borderColor: filter === "全部" ? "var(--accent)" : "var(--border)",
                backgroundColor: filter === "全部" ? "var(--accent)" : "var(--bg-card)",
                color: filter === "全部" ? "#fff" : "var(--text-secondary)",
              }}
            >
              全部
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className="px-3 py-1 text-xs border transition-colors"
                style={{
                  borderColor: filter === cat ? "var(--accent)" : "var(--border)",
                  backgroundColor: filter === cat ? "var(--accent)" : "var(--bg-card)",
                  color: filter === cat ? "#fff" : "var(--text-secondary)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 提示词列表 */}
        <div className="space-y-4">
          {filtered.map((prompt) => (
            <div key={prompt.id} className="p-6 border" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg" style={{ color: "var(--text-primary)" }}>{prompt.title}</h3>
                    <span className="px-2 py-0.5 text-xs border" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                      {prompt.category}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-400">{prompt.description}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(prompt)} className="px-3 py-1 text-xs border" style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>
                    编辑
                  </button>
                  <button onClick={() => handleDelete(prompt.id)} className="px-3 py-1 text-xs border" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                    删除
                  </button>
                </div>
              </div>

              {/* 内容预览 */}
              <div className="p-3 text-sm font-mono border mb-3" style={{ borderColor: "var(--border)", color: "var(--text-secondary)", backgroundColor: "var(--bg-primary)" }}>
                {prompt.content.slice(0, 150)}{prompt.content.length > 150 ? "..." : ""}
              </div>

              {/* 变量填充 */}
              {prompt.variables.length > 0 && (
                <div className="mb-3">
                  <div className="text-xs text-neutral-400 mb-2">变量填充</div>
                  <div className="flex gap-2 flex-wrap">
                    {prompt.variables.map((v) => (
                      <input
                        key={v}
                        type="text"
                        placeholder={`{${v}}`}
                        value={fillValues[v] || ""}
                        onChange={(e) => setFillValues({ ...fillValues, [v]: e.target.value })}
                        className="px-3 py-1 text-sm border w-32"
                        style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => handleCopy(prompt)}
                className="px-4 py-2 text-sm border transition-colors"
                style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
              >
                {copied ? "已复制！" : "复制提示词"}
              </button>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="p-8 text-center text-neutral-400">
              {search || filter !== "全部" ? "没有找到匹配的提示词" : "还没有提示词，点击新建添加"}
            </div>
          )}
        </div>
      </main>

      {/* 新建/编辑弹窗 */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="w-full max-w-2xl p-8 border" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
            <h2 className="text-2xl font-light mb-6" style={{ color: "var(--text-primary)" }}>
              {editing ? "编辑提示词" : "新建提示词"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-1">标题</label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="提示词名称"
                  className="w-full px-4 py-2 text-sm border"
                  style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }}
                />
              </div>

              <div>
                <label className="block text-sm text-neutral-400 mb-1">分类</label>
                <div className="flex gap-2 flex-wrap">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFormCategory(cat)}
                      className="px-3 py-1 text-xs border"
                      style={{
                        borderColor: formCategory === cat ? "var(--accent)" : "var(--border)",
                        backgroundColor: formCategory === cat ? "var(--accent)" : "var(--bg-card)",
                        color: formCategory === cat ? "#fff" : "var(--text-secondary)",
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-neutral-400 mb-1">描述</label>
                <input
                  type="text"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="简短描述用途"
                  className="w-full px-4 py-2 text-sm border"
                  style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }}
                />
              </div>

              <div>
                <label className="block text-sm text-neutral-400 mb-1">内容（用 {"{变量名}"} 作为占位符）</label>
                <textarea
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="请输入提示词内容，使用 {variable} 作为变量占位符"
                  className="w-full h-40 p-3 text-sm border resize-none font-mono"
                  style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }}
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleSave}
                  disabled={!formTitle || !formContent}
                  className="px-6 py-2 text-sm border transition-colors disabled:opacity-50"
                  style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
                >
                  保存
                </button>
                <button
                  onClick={resetForm}
                  className="px-6 py-2 text-sm border"
                  style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="h-px" style={{ backgroundColor: "var(--accent)" }} />
    </div>
  );
}