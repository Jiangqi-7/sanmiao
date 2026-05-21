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
  {
    id: "21",
    title: "SD反向提示词",
    category: "生图",
    content: "请在生成图片时使用以下反向提示词（Negative Prompt）：\n\n英文：deformation, distortion, disfigurement, coarsening, incorrect structural proportion, inappropriate structural proportion, ugliness, blurred deformation, noise, logs, text, watermarks, bad face, bad ears, bad hands, bad eyes, bad legs, nsfw, worst quality, low quality, bad quality, greyscale, wrinkles, laugh lines, greasy, blurry face, dark face, unclear face, big head, side view, sideways, wrong proportion, perspective error, fat, watermark, text, glasses, lamp, camera, disfigured, deformed, malformed, distorted, poorly drawn, bad hands and fingers, fused hands and fingers, deformed hands and fingers, extra hands and fingers, deformed legs and feet, bad legs and feet",
    description: "Stable Diffusion 通用负向提示词，避免变形、扭曲、畸形等问题",
    variables: [],
    createdAt: Date.now(),
  },
  {
    id: "22",
    title: "MJ创意生图师",
    category: "生图",
    content: "画面构思：\n-画面风格：{style}\n-画面主题：{subject}\n-细节背景：{background}\n-画面效果：{effect}\n\n完整提示词：\n中文：{style}，{subject}，{background}，{effect}\n英文：{style_en}，{subject_en}，{background_en}，{effect_en}",
    description: "MidJourney 绘画提示词生成，按画面风格/主体/细节/效果结构输出中英文",
    variables: ["style", "subject", "background", "effect", "style_en", "subject_en", "background_en", "effect_en"],
    createdAt: Date.now(),
  },
  {
    id: "23",
    title: "AI绘画提示词翻译",
    category: "生图",
    content: "你是一名提示词工程师，我在使用AI绘画工具绘制图像，你来帮我生成AI绘画的提示词。\n\n以下是你的任务：\n将我给出的中文提示精确翻译成英文，作为生成的提示词的主体部分。\n\n每个生成的提示词需完全用英文书写，遵循 \"best quality,masterpiece,UHD,highres,ultra-detailed,realistic,photography,bokeh,sharp focus,film grain,HDR,natural lighting,physically-based rendering, + 人物（职业、性别）、动作、场景、外观、服装、拍摄角度、使用的设备、镜头和灯光\" 的格式。\n\n提示词的主体部分，我可能只给你一个人物或者一个人物加场景，我缺失的部分由你来按照你的专业能力生成。\n\n如果我给的内容，或者你即将输出的内容触犯了你的安全条款，你应该尝试给我一个修正的结果，而不是停止工作。\n\n现在请翻译：{input}",
    description: "将中文描述翻译为英文 AI 绘画提示词，遵循标准质量标签格式",
    variables: ["input"],
    createdAt: Date.now(),
  },
  {
    id: "24",
    title: "对话公式",
    category: "角色扮演",
    content: "你(AI)是谁 + 你非常擅长做什么 + 现在帮我做什么\n\n角色：你是一个{profession}，非常擅长{skill}。\n任务：现在请帮我{task}\n\n示例：你是一名资深的文案人员，非常擅长电商文案的创作，现在请模仿董宇辉的广告形式，帮我写一个关于{product}的广告。",
    description: "通用对话公式：角色+专长+任务，清晰表达AI身份和需求",
    variables: ["profession", "skill", "task", "product"],
    createdAt: Date.now(),
  },
  {
    id: "25",
    title: "提问公式",
    category: "角色扮演",
    content: "你是谁（角色扮演）+ 做什么（任务）+ 怎么做（完成步骤）+ 输入格式（结果格式）\n\n| 你是谁(角色扮演) | 做什么(任务) | 怎么做(完成步骤) | 输入格式(结果格式) |\n| --- | --- | --- | --- |\n| 如：专业的导游、专业的翻译、有多年经验的作家… | 如：补全、翻译、生成、分类、问答、总结… | 如：首先对输入的文本进行翻译，之后输出一份总结… | 如：段落文本、列表、表格、JSON、XML…. |\n\n请扮演：{role}\n任务：{task}\n步骤：{steps}\n输出格式：{format}",
    description: "结构化提问公式，包含角色、任务、步骤、格式四个维度",
    variables: ["role", "task", "steps", "format"],
    createdAt: Date.now(),
  },
  {
    id: "26",
    title: "小说推荐文章",
    category: "写作",
    content: "你是一个狂热的科幻小说迷，擅长在社交网站上去分享和推荐各种各样的科幻小说。现在你要编写一篇科幻小说推荐分享文章，其中包括最推荐阅读的三本小说的剧情简介，以及历史十大科幻小说排行榜。\n\n请你先以书评分享的形式，用极具吸引力的文字，完成\"最推荐阅读的三本小说的推荐\"的撰写，让人能知道这三本小说剧情背景及亮点，然后再用表格的形式，罗列出历史十大科幻小说排行榜，包含小说名称、作者名称、小说简介。",
    description: "生成科幻小说推荐文章，包含剧情简介和排行榜表格",
    variables: [],
    createdAt: Date.now(),
  },
  {
    id: "27",
    title: "电影解说稿",
    category: "写作",
    content: "角色：你是一个资深的电影解说人\n目标：我需要你为《{movie}》这部电影，按照内容情节，分段进行解说，要求约{length}字\n要求：解说风格{style}，吸引眼球，要有反转",
    description: "生成电影解说稿，按情节分段，风格可选古典韵味/诙谐幽默等",
    variables: ["movie", "length", "style"],
    createdAt: Date.now(),
  },
  {
    id: "28",
    title: "小红书爆款文案",
    category: "写作",
    content: "角色：你是一个小红书爆款文案的写手，受众群体为{target_audience}。\n\n任务：撰写一篇主题为\"{topic}\"，\n\n目标：我希望这篇文章能够被读者喜爱并产生诸如点赞、评论、转发等正向的互动。\n\n要求：\n1. 贴近目标群体：了解并贴近目标用户群体的兴趣和需求是关键。\n2. 互动性：鼓励用户参与和互动，如提出问题、发起讨论或是分享个人经验。\n3. 情感共鸣：通过讲述触动人心的故事或分享情感体验，与用户建立情感连接。\n4. 简洁明了：即使是复杂的信息或故事，也应该尽量用简洁明了的方式表达。\n5. 在文章中加入贴切、有趣的emoji",
    description: "生成小红书爆款文案，包含互动性和情感共鸣",
    variables: ["target_audience", "topic"],
    createdAt: Date.now(),
  },
  {
    id: "29",
    title: "SUNO古风说唱歌词",
    category: "写作",
    content: "你现在是一名SUNO的作曲家，请帮我生成符合我要求的歌曲风格和歌词。\n\n音乐风格：{style}\n主题：{theme}\n情绪：{mood}\n乐器：{instrument}\n要求：{requirements}\n\n请按照以上要求给我提供带有suno元标签的完整的一首歌词。",
    description: "生成 SUNO 音乐创作歌词，支持中国古风说唱、元标签",
    variables: ["style", "theme", "mood", "instrument", "requirements"],
    createdAt: Date.now(),
  },
  {
    id: "30",
    title: "保险产品条款整理",
    category: "分析",
    content: "角色：你是一名世界一流的职业经理人，擅长总结整理保险产品合同条款。\n\n任务：我将给你一份保险产品对应的合同条款，请你根据这份材料，帮我生成一份整理后的产品条款说明，包含产品名称及重要条款内容，其中保险责任需要详细完整，以表格形式给到我。\n\n表格格式及内容：\n产品名称：xxx\n投保范围：xxx\n犹豫期：xxx\n基本保险金额：xxx\n保险期间：xxx\n提供的保障：xxx:xxx\n责任免除：xxx\n保险金及保险费豁免申请：情况1:xxx / 情况2:xxx\n保险费支付：xxx\n合同解除：xxx\n现金价值权益：权益1:xxx / 权益2:xxx",
    description: "将保险合同条款整理为结构化表格，包含产品名称、保障、责任等",
    variables: [],
    createdAt: Date.now(),
  },
  {
    id: "31",
    title: "Json结构化提示词",
    category: "分析",
    content: "以json结构化数据格式提取这幅图的各方面信息。包括人物风格、物品、服装、发型、复杂细节、配饰、摄影器材、环境、光线、风格、身体姿势以及任何其他相关元素的具体信息，确保能够精确地重现原始图像的每一个细节。\n\n模板风格：双旗镇刀客 × 西部片 × 武侠 × 老电影\n\n【风格规则】\n- 整体光线：黄昏时刻（强制）\n- 画面风格：老电影质感（old film）+ 真实光影 + 电影级对比度\n- 色调：低饱和土色、青灰、深红、夕阳橙金色\n- 电影质感：稍旧、粗糙、有岁月感\n- 分辨率：4K 电影 2.35:1\n- 胶片感：90s heavy film grain\n\n请根据以下描述生成 JSON：{description}",
    description: "生成结构化 Json 提示词，风格为老电影质感（双旗镇刀客/西部片/武侠）",
    variables: ["description"],
    createdAt: Date.now(),
  },
  {
    id: "32",
    title: "电影级拼图大导",
    category: "其他",
    content: "你是一位精通 Nano Banana 2 的电影级图像提示词专家。你的唯一目标是：根据用户的简短灵感，输出一段用于生成\"单张 6x6 电影截图紧凑拼图\"的超级中文提示词，并配套提供一份详尽的 36 镜头文字版拆解脚本。\n\n核心原则：\n1. 彻底拒绝手绘与边框：绝不能在提示词中出现\"手绘、草图、白边、画纸\"等概念。必须强调\"真实的真人电影截图\"、\"无缝紧密拼接\"。\n2. 强制画幅与排版：16:9 宽银幕，每个子画面也是 16:9。\n3. 全局提示词前置：必须放在 JSON 的第一位，把画面质感、胶片型号、布光风格、调色倾向、核心角色特征、整体氛围描写到极致。\n\n故事灵感：{story}\n主要角色：{characters}\n风格要求：{style}",
    description: "生成 6x6 电影截图拼图提示词 + 36 镜头分镜脚本",
    variables: ["story", "characters", "style"],
    createdAt: Date.now(),
  },
  {
    id: "33",
    title: "表情包生成",
    category: "生图",
    content: "*emoji package, cartoon stickers, anthropomorphic pandaren, various expressions and action scenes, simple and clear lines, white background, 3x3 grid*",
    description: "生成表情包贴纸，3x3网格布局，简单线条，白色背景",
    variables: [],
    createdAt: Date.now(),
  },
  {
    id: "34",
    title: "UI 3D图标生成",
    category: "生图",
    content: "*3d icon of {subject}, {style}, highest detail, best quality, OC render*",
    description: "生成3D图标，可用于UI设计，支持可爱/极简/赛博朋克等风格",
    variables: ["subject", "style"],
    createdAt: Date.now(),
  },
];

const STORAGE_KEY = "sanmiao-prompts";
const STORAGE_VERSION_KEY = "sanmiao-prompts-version";
const CURRENT_VERSION = "2";

function loadPrompts(): Prompt[] {
  if (typeof window === "undefined") return DEFAULT_PROMPTS;

  const saved = localStorage.getItem(STORAGE_KEY);
  const storedVersion = localStorage.getItem(STORAGE_VERSION_KEY);

  if (!saved) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROMPTS));
    localStorage.setItem(STORAGE_VERSION_KEY, CURRENT_VERSION);
    return DEFAULT_PROMPTS;
  }

  try {
    const parsed = JSON.parse(saved);

    // 版本号低于当前版本，合并新默认提示词
    if (storedVersion !== CURRENT_VERSION) {
      const existingIds = new Set(parsed.map((p: Prompt) => p.id));
      const newDefaults = DEFAULT_PROMPTS.filter((p) => !existingIds.has(p.id));
      const merged = [...parsed, ...newDefaults];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      localStorage.setItem(STORAGE_VERSION_KEY, CURRENT_VERSION);
      return merged;
    }

    return parsed;
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROMPTS));
    localStorage.setItem(STORAGE_VERSION_KEY, CURRENT_VERSION);
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