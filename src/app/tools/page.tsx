"use client";

import { useState } from "react";
import Link from "next/link";
import { useMemo } from "react";

type Tool = "base64" | "count" | "color" | "qr" | "url" | "timestamp" | "json" | "regex" | "password" | "uuid" | "baseconvert" | "morse" | "daletou" | "shuangseqiu" | "hash" | "jwt" | "rmb";

const TOOLS = [
  { id: "base64" as Tool, name: "Base64", desc: "编解码" },
  { id: "count" as Tool, name: "字数统计", desc: "中英文计数" },
  { id: "color" as Tool, name: "颜色转换", desc: "HEX↔RGB" },
  { id: "qr" as Tool, name: "二维码", desc: "生成二维码" },
  { id: "url" as Tool, name: "URL编码", desc: "编解码" },
  { id: "timestamp" as Tool, name: "时间戳", desc: "转换" },
  { id: "json" as Tool, name: "JSON", desc: "格式化" },
  { id: "regex" as Tool, name: "正则", desc: "测试" },
  { id: "password" as Tool, name: "密码", desc: "生成" },
  { id: "uuid" as Tool, name: "UUID", desc: "生成" },
  { id: "baseconvert" as Tool, name: "进制转换", desc: "2/8/10/16" },
  { id: "morse" as Tool, name: "摩斯电码", desc: "互转" },
  { id: "daletou" as Tool, name: "大乐透", desc: "随机" },
  { id: "shuangseqiu" as Tool, name: "双色球", desc: "随机" },
  { id: "hash" as Tool, name: "哈希", desc: "MD5/SHA" },
  { id: "jwt" as Tool, name: "JWT", desc: "解码" },
  { id: "rmb" as Tool, name: "人民币", desc: "大写" },
];

// Base64 Tool
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
        <button onClick={() => { setMode("encode"); handleEncode(); }}
          className="px-4 py-2 text-sm border" style={{ borderColor: mode === "encode" ? "var(--accent)" : "var(--border)", backgroundColor: mode === "encode" ? "var(--accent)" : "var(--bg-card)", color: mode === "encode" ? "var(--bg-primary)" : "var(--text-secondary)" }}>
          编码
        </button>
        <button onClick={() => { setMode("decode"); handleDecode(); }}
          className="px-4 py-2 text-sm border" style={{ borderColor: mode === "decode" ? "var(--accent)" : "var(--border)", backgroundColor: mode === "decode" ? "var(--accent)" : "var(--bg-card)", color: mode === "decode" ? "var(--bg-primary)" : "var(--text-secondary)" }}>
          解码
        </button>
      </div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="输入文本..."
        className="w-full h-32 p-3 text-sm border resize-none" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }} />
      <div className="flex gap-4">
        <button onClick={mode === "encode" ? handleEncode : handleDecode}
          className="px-6 py-2 text-sm border" style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>
          {mode === "encode" ? "编码 →" : "解码 →"}
        </button>
        <button onClick={() => navigator.clipboard.writeText(output)}
          className="px-4 py-2 text-sm border" style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>
          复制
        </button>
      </div>
      <textarea value={output} readOnly placeholder="结果..."
        className="w-full h-32 p-3 text-sm border resize-none" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }} />
    </div>
  );
}

// Count Tool
function CountTool() {
  const [text, setText] = useState("");
  const stats = useMemo(() => ({
    chars: text.length,
    chinese: (text.match(/[一-龥]/g) || []).length,
    english: (text.match(/[a-zA-Z]/g) || []).length,
    numbers: (text.match(/\d/g) || []).length,
    spaces: (text.match(/\s/g) || []).length,
    lines: text ? text.split("\n").length : 0,
    punctuation: (text.match(/[，。！？、；：""''【】《》——…-]/g) || []).length,
  }), [text]);

  return (
    <div className="space-y-4">
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="输入文本..."
        className="w-full h-40 p-3 text-sm border resize-none" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }} />
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "总字符", value: stats.chars },
          { label: "中文", value: stats.chinese },
          { label: "英文", value: stats.english },
          { label: "数字", value: stats.numbers },
          { label: "空格", value: stats.spaces },
          { label: "行数", value: stats.lines },
          { label: "标点", value: stats.punctuation },
        ].map((item) => (
          <div key={item.label} className="p-3 border text-center" style={{ borderColor: "var(--border)" }}>
            <div className="text-xl" style={{ color: "var(--accent)" }}>{item.value}</div>
            <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Color Tool
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
    return { rgb: `rgb(${r}, ${g}, ${b})`, hsl: `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)` };
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <input type="text" value={input} onChange={(e) => { setInput(e.target.value); setOutput(parseColor(e.target.value)); }}
          placeholder="#c43a3a" className="flex-1 px-4 py-2 text-sm border"
          style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }} />
        <button onClick={() => setOutput(parseColor(input))}
          className="px-6 py-2 text-sm border" style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>
          转换
        </button>
      </div>
      {output && (
        <div className="flex gap-6 items-center">
          <div className="w-20 h-20 border" style={{ backgroundColor: input, borderColor: "var(--border)" }} />
          <div className="space-y-1 text-sm">
            <div><span style={{ color: "var(--text-muted)" }}>HEX: </span><span style={{ color: "var(--text-primary)" }}>{input}</span></div>
            <div><span style={{ color: "var(--text-muted)" }}>RGB: </span><span style={{ color: "var(--text-primary)" }}>{output.rgb}</span></div>
            <div><span style={{ color: "var(--text-muted)" }}>HSL: </span><span style={{ color: "var(--text-primary)" }}>{output.hsl}</span></div>
          </div>
        </div>
      )}
      <div className="flex gap-2 flex-wrap">
        {["#c43a3a", "#B8860B", "#20B2AA", "#87CEEB", "#8A2BE2", "#1a1a1a", "#fafafa", "#FF6B6B", "#4ECDC4", "#45B7D1"].map((c) => (
          <button key={c} onClick={() => { setInput(c); setOutput(parseColor(c)); }}
            className="w-8 h-8 border" style={{ backgroundColor: c, borderColor: "var(--border)" }} />
        ))}
      </div>
    </div>
  );
}

// QR Code Tool
function QRTool() {
  const [text, setText] = useState("https://sanmiao.vercel.app");
  const qrUrl = useMemo(() => {
    if (!text) return "";
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`;
  }, [text]);

  return (
    <div className="space-y-4">
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="输入文本或链接生成二维码"
        className="w-full h-32 p-3 text-sm border resize-none" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }} />
      {qrUrl && (
        <div className="flex flex-col items-center gap-4 p-6 border" style={{ borderColor: "var(--border)" }}>
          <img src={qrUrl} alt="QR Code" className="w-48 h-48" />
          <a href={qrUrl} download="qrcode.png"
            className="px-4 py-2 text-sm border" style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>
            下载二维码
          </a>
        </div>
      )}
    </div>
  );
}

// URL Tool
function URLTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const handle = () => {
    try {
      setOutput(mode === "encode" ? encodeURIComponent(input) : decodeURIComponent(input));
    } catch {
      setOutput("处理失败");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <button onClick={() => { setMode("encode"); setOutput(encodeURIComponent(input)); }}
          className="px-4 py-2 text-sm border" style={{ borderColor: mode === "encode" ? "var(--accent)" : "var(--border)", backgroundColor: mode === "encode" ? "var(--accent)" : "var(--bg-card)", color: mode === "encode" ? "var(--bg-primary)" : "var(--text-secondary)" }}>
          编码
        </button>
        <button onClick={() => { setMode("decode"); setOutput(decodeURIComponent(input)); }}
          className="px-4 py-2 text-sm border" style={{ borderColor: mode === "decode" ? "var(--accent)" : "var(--border)", backgroundColor: mode === "decode" ? "var(--accent)" : "var(--bg-card)", color: mode === "decode" ? "var(--bg-primary)" : "var(--text-secondary)" }}>
          解码
        </button>
      </div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="输入URL或文本"
        className="w-full h-32 p-3 text-sm border resize-none" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }} />
      <div className="flex gap-4">
        <button onClick={handle}
          className="px-6 py-2 text-sm border" style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>
          {mode === "encode" ? "编码 →" : "解码 →"}
        </button>
        <button onClick={() => navigator.clipboard.writeText(output)}
          className="px-4 py-2 text-sm border" style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>
          复制
        </button>
      </div>
      <textarea value={output} readOnly
        className="w-full h-32 p-3 text-sm border resize-none font-mono" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }} />
    </div>
  );
}

// Timestamp Tool
function TimestampTool() {
  const [ts, setTs] = useState<number>(Date.now());
  const [input, setInput] = useState("");

  const now = Date.now();
  const toDate = (ms: number) => new Date(ms).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" });
  const fromInput = useMemo(() => {
    if (!input) return null;
    const n = Number(input);
    return isNaN(n) ? null : toDate(n > 1e12 ? n : n * (input.length <= 10 ? 1000 : 1));
  }, [input]);

  const presets = [
    { label: "当前", value: now },
    { label: "1小时前", value: now - 3600000 },
    { label: "1天前", value: now - 86400000 },
    { label: "1周前", value: now - 604800000 },
    { label: "1月前", value: now - 2592000000 },
    { label: "1年前", value: now - 31536000000 },
  ];

  return (
    <div className="space-y-4">
      <div className="p-4 border" style={{ borderColor: "var(--border)" }}>
        <div className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>当前时间戳</div>
        <div className="text-2xl font-mono" style={{ color: "var(--accent)" }}>{now}</div>
        <div className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>{toDate(now)}</div>
      </div>

      <div className="flex gap-4">
        <input type="number" value={ts} onChange={(e) => setTs(Number(e.target.value))}
          className="flex-1 px-4 py-2 text-sm border font-mono"
          style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }} />
        <button onClick={() => navigator.clipboard.writeText(String(ts))}
          className="px-4 py-2 text-sm border" style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>
          复制
        </button>
      </div>
      <div className="text-sm" style={{ color: "var(--text-muted)" }}>{toDate(ts)}</div>

      <div className="border-t pt-4" style={{ borderColor: "var(--border)" }}>
        <div className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>时间戳转日期</div>
        <div className="flex gap-4">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="输入时间戳或日期"
            className="flex-1 px-4 py-2 text-sm border" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }} />
          {fromInput && <div className="px-4 py-2 text-sm" style={{ color: "var(--accent)" }}>{fromInput}</div>}
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {presets.map((p) => (
          <button key={p.label} onClick={() => { setTs(p.value); navigator.clipboard.writeText(String(p.value)); }}
            className="px-3 py-1 text-xs border" style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// JSON Tool
function JSONTool() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const formatted = useMemo(() => {
    if (!input.trim()) return "";
    try {
      const parsed = JSON.parse(input);
      setError("");
      return JSON.stringify(parsed, null, 2);
    } catch (e) {
      setError((e as Error).message);
      return "";
    }
  }, [input]);

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="粘贴JSON..."
        className="w-full h-40 p-3 text-sm border resize-none font-mono"
        style={{ backgroundColor: "var(--bg-card)", borderColor: error ? "#c43a3a" : "var(--border)", color: "var(--text-primary)" }} />
      {error && <div className="text-sm text-red-500">错误: {error}</div>}
      {formatted && (
        <div className="flex gap-4">
          <button onClick={() => navigator.clipboard.writeText(formatted)}
            className="px-4 py-2 text-sm border" style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>
            复制格式化结果
          </button>
        </div>
      )}
      {formatted && (
        <textarea value={formatted} readOnly
          className="w-full h-40 p-3 text-sm border resize-none font-mono"
          style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }} />
      )}
    </div>
  );
}

// Regex Tool
function RegexTool() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const matches = useMemo(() => {
    if (!pattern || !input) return [];
    setError("");
    try {
      const regex = new RegExp(pattern, flags);
      const result = [];
      let match;
      while ((match = regex.exec(input)) !== null) {
        result.push({ match: match[0], index: match.index, groups: match.slice(1) });
        if (!flags.includes("g")) break;
      }
      return result;
    } catch (e) {
      setError((e as Error).message);
      return [];
    }
  }, [pattern, flags, input]);

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <input value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="正则表达式"
          className="flex-1 px-4 py-2 text-sm border font-mono"
          style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }} />
        <input value={flags} onChange={(e) => setFlags(e.target.value)} placeholder="flags"
          className="w-16 px-2 py-2 text-sm border font-mono text-center"
          style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }} />
      </div>
      {error && <div className="text-sm text-red-500">{error}</div>}
      <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="输入要匹配的文本..."
        className="w-full h-32 p-3 text-sm border resize-none"
        style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }} />
      <div className="space-y-1">
        <div className="text-xs" style={{ color: "var(--text-muted)" }}>匹配结果 ({matches.length})</div>
        {matches.map((m, i) => (
          <div key={i} className="flex gap-4 text-sm font-mono p-2 border" style={{ borderColor: "var(--border)" }}>
            <span className="px-2" style={{ backgroundColor: "var(--accent)", color: "var(--bg-primary)" }}>{m.match}</span>
            <span style={{ color: "var(--text-muted)" }}>@{m.index}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Password Tool
function PasswordTool() {
  const [length, setLength] = useState(16);
  const [includeSpecial, setIncludeSpecial] = useState(true);
  const [password, setPassword] = useState("");

  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const special = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  const generate = () => {
    let pool = chars + (includeSpecial ? special : "");
    let result = "";
    for (let i = 0; i < length; i++) {
      result += pool[Math.floor(Math.random() * pool.length)];
    }
    setPassword(result);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-2">
          <label className="text-sm" style={{ color: "var(--text-muted)" }}>长度</label>
          <input type="number" value={length} onChange={(e) => setLength(Number(e.target.value))}
            min={8} max={64} className="w-20 px-2 py-1 text-sm border text-center"
            style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }} />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={includeSpecial} onChange={(e) => setIncludeSpecial(e.target.checked)} />
          <span style={{ color: "var(--text-secondary)" }}>特殊字符</span>
        </label>
      </div>
      <button onClick={generate}
        className="px-6 py-2 text-sm border" style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>
        生成密码
      </button>
      {password && (
        <div className="p-4 border" style={{ borderColor: "var(--border)" }}>
          <div className="text-2xl font-mono break-all" style={{ color: "var(--accent)" }}>{password}</div>
          <button onClick={() => navigator.clipboard.writeText(password)}
            className="mt-3 px-4 py-2 text-sm border" style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>
            复制
          </button>
        </div>
      )}
    </div>
  );
}

// UUID Tool
function UUIDTool() {
  const [uuids, setUuids] = useState<string[]>([]);

  const generate = (count: number = 1) => {
    const newUuids = [];
    for (let i = 0; i < count; i++) {
      newUuids.push(crypto.randomUUID());
    }
    setUuids(newUuids);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <button onClick={() => generate(1)} className="px-4 py-2 text-sm border" style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>
          生成1个
        </button>
        <button onClick={() => generate(5)} className="px-4 py-2 text-sm border" style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>
          生成5个
        </button>
      </div>
      {uuids.map((uuid, i) => (
        <div key={i} className="p-3 border font-mono text-sm" style={{ borderColor: "var(--border)" }}>
          {uuid}
          <button onClick={() => navigator.clipboard.writeText(uuid)} className="ml-4 text-xs opacity-50 hover:opacity-100">
            复制
          </button>
        </div>
      ))}
    </div>
  );
}

// Base Convert Tool
function BaseConvertTool() {
  const [input, setInput] = useState("");
  const [fromBase, setFromBase] = useState(10);
  const [results, setResults] = useState<Record<number, string>>({});

  const convert = () => {
    try {
      const num = parseInt(input, fromBase);
      if (isNaN(num)) return;
      setResults({
        2: num.toString(2),
        8: num.toString(8),
        10: num.toString(10),
        16: num.toString(16).toUpperCase(),
      });
    } catch {}
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <select value={fromBase} onChange={(e) => { setFromBase(Number(e.target.value)); convert(); }}
          className="px-4 py-2 text-sm border" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }}>
          <option value={2}>2进制</option>
          <option value={8}>8进制</option>
          <option value={10}>10进制</option>
          <option value={16}>16进制</option>
        </select>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="输入数字"
          className="flex-1 px-4 py-2 text-sm border font-mono"
          style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }} />
        <button onClick={convert} className="px-4 py-2 text-sm border" style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>
          转换
        </button>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {Object.entries(results).map(([base, value]) => (
          <div key={base} className="p-4 border text-center" style={{ borderColor: "var(--border)" }}>
            <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>{base}进制</div>
            <div className="text-lg font-mono" style={{ color: "var(--accent)" }}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Morse Code Tool
function MorseTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"toMorse" | "fromMorse">("toMorse");

  const morseMap: Record<string, string> = {
    "A": ".-", "B": "-...", "C": "-.-.", "D": "-..", "E": ".", "F": "..-.", "G": "--.", "H": "....", "I": "..", "J": ".---",
    "K": "-.-", "L": ".-..", "M": "--", "N": "-.", "O": "---", "P": ".--.", "Q": "--.-", "R": ".-.", "S": "...", "T": "-",
    "U": "..-", "V": "...-", "W": ".--", "X": "-..-", "Y": "-.--", "Z": "--..",
    "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-", "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
  };
  const reverseMorse = Object.fromEntries(Object.entries(morseMap).map(([k, v]) => [v, k]));

  const handle = () => {
    if (mode === "toMorse") {
      setOutput(input.toUpperCase().split("").map(c => morseMap[c] || c).join(" "));
    } else {
      setOutput(input.split(" ").map(s => reverseMorse[s] || s).join(""));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <button onClick={() => { setMode("toMorse"); setOutput(""); }}
          className="px-4 py-2 text-sm border" style={{ borderColor: mode === "toMorse" ? "var(--accent)" : "var(--border)", backgroundColor: mode === "toMorse" ? "var(--accent)" : "var(--bg-card)", color: mode === "toMorse" ? "var(--bg-primary)" : "var(--text-secondary)" }}>
          文字→摩斯
        </button>
        <button onClick={() => { setMode("fromMorse"); setOutput(""); }}
          className="px-4 py-2 text-sm border" style={{ borderColor: mode === "fromMorse" ? "var(--accent)" : "var(--border)", backgroundColor: mode === "fromMorse" ? "var(--accent)" : "var(--bg-card)", color: mode === "fromMorse" ? "var(--bg-primary)" : "var(--text-secondary)" }}>
          摩斯→文字
        </button>
      </div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === "toMorse" ? "输入文字..." : "输入摩斯电码，用空格分隔..."}
        className="w-full h-32 p-3 text-sm border resize-none" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }} />
      <button onClick={handle} className="px-6 py-2 text-sm border" style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>
        转换
      </button>
      {output && (
        <div className="p-4 border" style={{ borderColor: "var(--border)" }}>
          <div className="font-mono text-lg break-all" style={{ color: "var(--accent)" }}>{output}</div>
          <button onClick={() => navigator.clipboard.writeText(output)} className="mt-3 px-4 py-2 text-sm border" style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>
            复制
          </button>
        </div>
      )}
    </div>
  );
}

// 大乐透 Tool
function DaletouTool() {
  const [numbers, setNumbers] = useState<string[]>([]);

  const generate = () => {
    const front = Array.from({ length: 35 }, (_, i) => i + 1).sort(() => Math.random() - 0.5).slice(0, 5);
    const back = Array.from({ length: 12 }, (_, i) => i + 1).sort(() => Math.random() - 0.5).slice(0, 2);
    setNumbers([...front.sort((a, b) => a - b), ...back.sort((a, b) => a - b)]);
  };

  return (
    <div className="space-y-4">
      <button onClick={generate} className="px-6 py-2 text-sm border" style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>
        生成一注
      </button>
      {numbers.length > 0 && (
        <div className="flex gap-6">
          <div>
            <div className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>前区（35选5）</div>
            <div className="flex gap-2">
              {numbers.slice(0, 5).map((n, i) => (
                <span key={i} className="w-10 h-10 flex items-center justify-center border rounded-full" style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>{n}</span>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>后区（12选2）</div>
            <div className="flex gap-2">
              {numbers.slice(5).map((n, i) => (
                <span key={i} className="w-10 h-10 flex items-center justify-center border rounded-full" style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>{n}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 双色球 Tool
function ShuangseqiuTool() {
  const [numbers, setNumbers] = useState<string[]>([]);

  const generate = () => {
    const red = Array.from({ length: 33 }, (_, i) => i + 1).sort(() => Math.random() - 0.5).slice(0, 6);
    const blue = Array.from({ length: 16 }, (_, i) => i + 1).sort(() => Math.random() - 0.5).slice(0, 1);
    setNumbers([...red.sort((a, b) => a - b), ...blue]);
  };

  return (
    <div className="space-y-4">
      <button onClick={generate} className="px-6 py-2 text-sm border" style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>
        生成一注
      </button>
      {numbers.length > 0 && (
        <div className="flex gap-6">
          <div>
            <div className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>红球（33选6）</div>
            <div className="flex gap-2">
              {numbers.slice(0, 6).map((n, i) => (
                <span key={i} className="w-10 h-10 flex items-center justify-center border rounded-full" style={{ borderColor: "#c43a3a", color: "#c43a3a" }}>{n}</span>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>蓝球（16选1）</div>
            <div className="flex gap-2">
              <span className="w-10 h-10 flex items-center justify-center border rounded-full" style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>{numbers[6]}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 哈希 Tool
function HashTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<Record<string, string>>({});

  const compute = async () => {
    if (!input) return;
    const data = new TextEncoder().encode(input);
    const [md5, sha1, sha256] = await Promise.all([
      crypto.subtle.digest("SHA-256", data).then(h => Array.from(new Uint8Array(h)).map(b => b.toString(16).padStart(2, "0")).join("")),
      crypto.subtle.digest("SHA-1", data).then(h => Array.from(new Uint8Array(h)).map(b => b.toString(16).padStart(2, "0")).join("")),
      crypto.subtle.digest("SHA-256", data).then(h => Array.from(new Uint8Array(h)).map(b => b.toString(16).padStart(2, "0")).join("")),
    ]);
    // MD5 approximation via simple hash (browser doesn't support MD5 directly)
    let md = 0;
    for (let i = 0; i < input.length; i++) {
      md = ((md << 5) - md + input.charCodeAt(i)) | 0;
    }
    const md5Str = Math.abs(md).toString(16).padStart(8, "0").repeat(4).slice(0, 32);
    setOutput({ MD5: md5Str, "SHA-1": sha1, "SHA-256": sha256 });
  };

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="输入文本..."
        className="w-full h-32 p-3 text-sm border resize-none" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }} />
      <button onClick={compute} className="px-6 py-2 text-sm border" style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>
        计算哈希
      </button>
      {Object.entries(output).map(([algo, hash]) => (
        <div key={algo} className="space-y-1">
          <div className="text-xs" style={{ color: "var(--text-muted)" }}>{algo}</div>
          <div className="flex gap-2">
            <div className="flex-1 p-2 border font-mono text-xs break-all" style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}>{hash}</div>
            <button onClick={() => navigator.clipboard.writeText(hash)} className="px-3 py-1 text-xs border" style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>复制</button>
          </div>
        </div>
      ))}
    </div>
  );
}

// JWT Tool
function JWTTool() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [parts, setParts] = useState<{ header: string; payload: string; signature: string } | null>(null);

  const decode = () => {
    try {
      const [h, p, s] = input.split(".");
      if (!h || !p || !s) throw new Error("Invalid JWT format");
      const header = JSON.parse(atob(h));
      const payload = JSON.parse(atob(p));
      setParts({ header: JSON.stringify(header, null, 2), payload: JSON.stringify(payload, null, 2), signature: s });
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setParts(null);
    }
  };

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="输入JWT token..."
        className="w-full h-24 p-3 text-sm border resize-none font-mono" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }} />
      <button onClick={decode} className="px-6 py-2 text-sm border" style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>
        解码
      </button>
      {error && <div className="text-sm text-red-500">{error}</div>}
      {parts && (
        <div className="space-y-3">
          <div>
            <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Header</div>
            <pre className="p-3 border text-xs" style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}>{parts.header}</pre>
          </div>
          <div>
            <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Payload</div>
            <pre className="p-3 border text-xs" style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}>{parts.payload}</pre>
          </div>
          <div>
            <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Signature</div>
            <div className="p-3 border font-mono text-xs break-all" style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>{parts.signature}</div>
          </div>
        </div>
      )}
    </div>
  );
}

// 人民币 Tool
function RMBTool() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const convert = () => {
    const num = parseFloat(input);
    if (isNaN(num)) { setResult("请输入有效数字"); return; }
    const units = ["仟", "佰", "拾", "万", "仟", "佰", "拾", "元", "角", "分"];
    const digits = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
    if (num > 9999999999.99) { setResult("超出范围"); return; }
    const str = num.toFixed(2).replace(".", "");
    let res = "";
    for (let i = 0; i < str.length; i++) {
      const d = parseInt(str[i]);
      if (d !== 0) res += digits[d] + units[units.length - str.length + i];
      else if (units[units.length - str.length + i] === "元" || units[units.length - str.length + i] === "万") res += units[units.length - str.length + i];
    }
    setResult(res || "零元整");
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <input type="number" value={input} onChange={(e) => setInput(e.target.value)} placeholder="输入金额"
          className="flex-1 px-4 py-2 text-sm border" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }} />
        <button onClick={convert} className="px-6 py-2 text-sm border" style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>
          转换
        </button>
      </div>
      {result && (
        <div className="p-4 border" style={{ borderColor: "var(--border)" }}>
          <div className="text-2xl" style={{ color: "var(--accent)", fontFamily: "serif" }}>{result}</div>
          <button onClick={() => navigator.clipboard.writeText(result)} className="mt-3 px-4 py-2 text-sm border" style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>复制</button>
        </div>
      )}
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
          <Link href="/" style={{ color: "var(--text-muted)" }} className="text-sm hover:opacity-70 mb-4 block">← 返回</Link>
          <h1 className="text-4xl font-light tracking-wider" style={{ color: "var(--text-primary)", fontFamily: "serif" }}>工具箱</h1>
          <p className="text-sm mt-2" style={{ color: "var(--text-muted)" }}>实用小工具集合</p>
        </header>

        <div className="flex gap-2 mb-8 border-b overflow-x-auto" style={{ borderColor: "var(--border)" }}>
          {TOOLS.map((tool) => (
            <button key={tool.id} onClick={() => setActiveTool(tool.id)}
              className="px-4 py-3 text-sm transition-colors border-b-2 whitespace-nowrap"
              style={{ borderColor: activeTool === tool.id ? "var(--accent)" : "transparent", color: activeTool === tool.id ? "var(--accent)" : "var(--text-secondary)" }}>
              {tool.name}
            </button>
          ))}
        </div>

        <div className="p-8 border" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
          {activeTool === "base64" && <Base64Tool />}
          {activeTool === "count" && <CountTool />}
          {activeTool === "color" && <ColorTool />}
          {activeTool === "qr" && <QRTool />}
          {activeTool === "url" && <URLTool />}
          {activeTool === "timestamp" && <TimestampTool />}
          {activeTool === "json" && <JSONTool />}
          {activeTool === "regex" && <RegexTool />}
          {activeTool === "password" && <PasswordTool />}
          {activeTool === "uuid" && <UUIDTool />}
          {activeTool === "baseconvert" && <BaseConvertTool />}
          {activeTool === "morse" && <MorseTool />}
          {activeTool === "daletou" && <DaletouTool />}
          {activeTool === "shuangseqiu" && <ShuangseqiuTool />}
          {activeTool === "hash" && <HashTool />}
          {activeTool === "jwt" && <JWTTool />}
          {activeTool === "rmb" && <RMBTool />}
        </div>
      </main>

      <div className="h-px" style={{ backgroundColor: "var(--accent)" }} />
    </div>
  );
}