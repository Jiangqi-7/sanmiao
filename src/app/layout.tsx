import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { ClientComponents } from "@/components/client-components";
import { BackToTop } from "@/components/back-to-top";

export const metadata: Metadata = {
  title: "三秒 | AI 工具学习博客",
  description: "AI工具、工作流学习笔记，OpenClaw、扣子、GPT应用等",
  keywords: ["AI", "工具", "OpenClaw", "扣子", "Coze", "GPT", "工作流"],
  authors: [{ name: "三秒" }],
  openGraph: {
    title: "三秒 | AI 工具学习博客",
    description: "AI工具、工作流学习笔记",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
        <ThemeProvider>
          <ClientComponents />
          <Header />
          {children}
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}