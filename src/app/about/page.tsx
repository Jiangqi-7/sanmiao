export default function AboutPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="max-w-[800px] mx-auto px-6">
        <h1 className="text-3xl font-semibold tracking-tight text-[#171717] mb-8">关于</h1>

        <div className="prose prose-neutral text-[#666666] leading-relaxed space-y-6">
          <p>
            你好！我是三秒，专注于 AI 工具和工作流学习。
          </p>

          <p>
            这个博客记录我在使用 OpenClaw、扣子、GPT 等 AI 工具过程中的一些学习心得和踩坑经验。
          </p>

          <h2 className="text-xl font-medium text-[#171717] mt-8 mb-4">擅长领域</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>OpenClaw / 龙虾 部署和配置</li>
            <li>扣子 / Coze 工作流搭建</li>
            <li>AI 视频生成（Seedance、可灵等）</li>
            <li>AI 图片生成（GPT Image、MJ 等）</li>
            <li>大模型部署和推理优化</li>
          </ul>

          <h2 className="text-xl font-medium text-[#171717] mt-8 mb-4">联系方式</h2>
          <ul className="space-y-2">
            <li>
              GitHub:{" "}
              <a
                href="https://github.com/Jiangqi-7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0072f5] hover:underline"
              >
                Jiangqi-7
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
