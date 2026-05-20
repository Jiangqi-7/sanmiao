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
    content: "请帮我写一封{type}邮件，主题是{topic}，语气{ tone}，收件人是{recipient}。",
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