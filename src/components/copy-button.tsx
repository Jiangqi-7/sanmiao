"use client";

import { useState } from "react";

interface CopyButtonProps {
  text: string;
  lang?: "zh" | "en";
}

export function CopyButton({ text, lang = "zh" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className="ml-auto text-xs px-2 py-1 rounded transition-all hover:opacity-80"
      style={{
        backgroundColor: "var(--text-primary)",
        color: "var(--bg-primary)",
      }}
    >
      {copied ? (lang === "zh" ? "已复制!" : "Copied!") : lang === "zh" ? "复制" : "Copy"}
    </button>
  );
}