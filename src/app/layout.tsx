import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html lang="zh-CN" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#ffffff] text-[#171717]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
