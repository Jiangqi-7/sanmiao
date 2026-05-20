"use client";

import { useState } from "react";
import Link from "next/link";

type Tool = "base64" | "count" | "color";

const TOOLS = [
  { id: "base64" as Tool, name: "Base64", desc: "编解码" },
  { id: "count" as Tool, name: "字数统计", desc: "中英文计数" },
  { id: "color" as Tool, name: "颜色转换", desc: "HEX↔RGB" },
];

function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const handleEncode = () => {
    try {
      setOutput(btoa(unescape(encodeURIComponent(input))));
    } catch {
      setOutput("编码失败");
    }
  };

  const handleDecode = () => {
    try {
      setOutput(decodeURIComponent(escape(atob(input))));
    } catch {
      setOutput("解码失败");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <button
          onClick={() => { setMode("encode"); handleEncode(); }}
          className="px-4 py-2 text-sm border transition-colors"
          style={{
            borderColor: mode === "encode" ? "var(--accent)" : "var(--border)",
            backgroundColor: mode === "encode" ? "var(--accent)" : "var(--bg-card)",
            color: mode === "encode" ? "#fff" : "var(--text-secondary)",
          }}
        >
          编码
        </button>
        <button
          onClick={() => { setMode("decode"); handleDecode(); }}
          className="px-4 py-2 text-sm border transition-colors"
          style={{
            borderColor: mode === "decode" ? "var(--accent)" : "var(--border)",
            backgroundColor: mode === "decode" ? "var(--accent)" : "var(--bg-card)",
            color: mode === "decode" ? "#fff" : "var(--text-secondary)",
          }}
        >
          解码
        </button>
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="输入文本..."
        className="w-full h-32 p-3 text-sm border resize-none"
        style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }}
      />
      <button
        onClick={mode === "encode" ? handleEncode : handleDecode}
        className="px-6 py-2 text-sm border transition-colors"
        style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
      >
        {mode === "encode" ? "编码 →" : "解码 →"}
      </button>
      <textarea
        value={output}
        readOnly
        placeholder="结果..."
        className="w-full h-32 p-3 text-sm border resize-none"
        style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }}
      />
      <button
        onClick={() => navigator.clipboard.writeText(output)}
        className="px-4 py-2 text-sm border transition-colors"
        style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
      >
        复制结果
      </button>
    </div>
  );
}

function CountTool() {
  const [text, setText] = useState("");

  const stats = {
    chars: text.length,
    chinese: (text.match(/[一-龥]/g) || []).length,
    english: (text.match(/[a-zA-Z]/g) || []).length,
    numbers: (text.match(/\d/g) || []).length,
    spaces: (text.match(/\s/g) || []).length,
    lines: text ? text.split("\n").length : 0,
  };

  return (
    <div className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="输入文本统计..."
        className="w-full h-48 p-3 text-sm border resize-none"
        style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }}
      />
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "总字符", value: stats.chars },
          { label: "中文", value: stats.chinese },
          { label: "英文", value: stats.english },
          { label: "数字", value: stats.numbers },
          { label: "空格", value: stats.spaces },
          { label: "行数", value: stats.lines },
        ].map((item) => (
          <div key={item.label} className="p-4 border text-center" style={{ borderColor: "var(--border)" }}>
            <div className="text-2xl font-light" style={{ color: "var(--accent)" }}>{item.value}</div>
            <div className="text-xs text-neutral-400 mt-1">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ColorTool() {
  const [input, setInput] = useState("#c43a3a");
  const [output, setOutput] = useState<{ rgb: string; hsl: string } | null>(null);

  const parseColor = (color: string) => {
    let hex = color.trim();
    if (!hex.startsWith("#")) hex = "#" + hex;
    if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) return null;

    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    const rNorm = r / 255, gNorm = g / 255, bNorm = b / 255;
    const max = Math.max(rNorm, gNorm, bNorm), min = Math.min(rNorm, gNorm, bNorm);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case rNorm: h = ((gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)) / 6; break;
        case gNorm: h = ((bNorm - rNorm) / d + 2) / 6; break;
        case bNorm: h = ((rNorm - gNorm) / d + 4) / 6; break;
      }
    }

    return {
      rgb: `rgb(${r}, ${g}, ${b})`,
      hsl: `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`,
    };
  };

  const handleConvert = () => {
    const result = parseColor(input);
    setOutput(result);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="#c43a3a"
          className="flex-1 px-4 py-2 text-sm border"
          style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }}
        />
        <button
          onClick={handleConvert}
          className="px-6 py-2 text-sm border transition-colors"
          style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
        >
          转换
        </button>
      </div>

      {output && (
        <div className="flex gap-6 items-center">
          <div
            className="w-24 h-24 border"
            style={{ backgroundColor: input, borderColor: "var(--border)" }}
          />
          <div className="space-y-2">
            <div className="text-sm">
              <span className="text-neutral-400">HEX: </span>
              <span style={{ color: "var(--text-primary)" }}>{input}</span>
            </div>
            <div className="text-sm">
              <span className="text-neutral-400">RGB: </span>
              <span style={{ color: "var(--text-primary)" }}>{output.rgb}</span>
            </div>
            <div className="text-sm">
              <span className="text-neutral-400">HSL: </span>
              <span style={{ color: "var(--text-primary)" }}>{output.hsl}</span>
            </div>
          </div>
        </div>
      )}

      <div className="pt-4">
        <p className="text-xs text-neutral-400 mb-3">快速颜色</p>
        <div className="flex gap-2 flex-wrap">
          {["#c43a3a", "#B8860B", "#20B2AA", "#87CEEB", "#8A2BE2", "#1a1a1a", "#fafafa"].map((c) => (
            <button
              key={c}
              onClick={() => { setInput(c); setOutput(parseColor(c)); }}
              className="w-8 h-8 border"
              style={{ backgroundColor: c, borderColor: "var(--border)" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState<Tool>("base64");

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="h-px" style={{ backgroundColor: "var(--accent)" }} />

      <main className="max-w-[900px] mx-auto px-6 py-16">
        <header className="mb-12">
          <Link href="/" className="text-sm text-neutral-400 hover:text-neutral-600 mb-4 block">
            ← 返回
          </Link>
          <h1 className="text-4xl font-light tracking-wider" style={{ color: "var(--text-primary)", fontFamily: "serif" }}>
            工具箱
          </h1>
          <p className="text-sm text-neutral-400 mt-2">实用小工具集合</p>
        </header>

        {/* 工具切换 */}
        <div className="flex gap-2 mb-8 border-b" style={{ borderColor: "var(--border)" }}>
          {TOOLS.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className="px-4 py-3 text-sm transition-colors border-b-2"
              style={{
                borderColor: activeTool === tool.id ? "var(--accent)" : "transparent",
                color: activeTool === tool.id ? "var(--accent)" : "var(--text-secondary)",
              }}
            >
              {tool.name}
            </button>
          ))}
        </div>

        {/* 工具内容 */}
        <div className="p-8 border" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
          {activeTool === "base64" && <Base64Tool />}
          {activeTool === "count" && <CountTool />}
          {activeTool === "color" && <ColorTool />}
        </div>
      </main>

      <div className="h-px" style={{ backgroundColor: "var(--accent)" }} />
    </div>
  );
}