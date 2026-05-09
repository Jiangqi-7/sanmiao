// 道家阴阳 · Design System Constants

export const BAGUA = {
  // 后天八卦方位
  positions: {
    qian: { name: "乾", direction: "西北", symbol: "☰", angle: 315 },
    dun: { name: "巽", direction: "东南", symbol: "☴", angle: 135 },
    kan: { name: "坎", direction: "北", symbol: "☵", angle: 0 },
    gen: { name: "艮", direction: "东北", symbol: "☶", angle: 45 },
    zhen: { name: "震", direction: "东", symbol: "☳", angle: 90 },
    xun: { name: "巽", direction: "东南", symbol: "☴", angle: 135 },
    li: { name: "离", direction: "南", symbol: "☲", angle: 180 },
    kun: { name: "坤", direction: "西南", symbol: "☷", angle: 225 },
    dui: { name: "兑", direction: "西", symbol: "☱", angle: 270 },
  },
} as const;

export const DESIGN_SYSTEM = {
  // 阴阳色彩
  colors: {
    yin: "#0a0a0a",           // 极黑
    yang: "#ffffff",          // 极白
    yinLight: "#171717",      // 阴之浅
    yangDark: "#f5f5f5",       // 阳之暗

    // 灰度过渡
    gray: {
      900: "#171717",
      800: "#2a2a2a",
      700: "#3a3a3a",
      600: "#4d4d4d",
      500: "#666666",
      400: "#808080",
      300: "#a3a3a3",
      200: "#d4d4d4",
      100: "#ebebeb",
      50: "#fafafa",
    },

    // 交互色
    accent: "#ffffff",
    link: "#ffffff",
    focus: "rgba(255, 255, 255, 0.8)",
  },

  // 排版
  typography: {
    fontFamily: {
      primary: "Geist, -apple-system, BlinkMacSystemFont, sans-serif",
      mono: "Geist Mono, ui-monospace, SFMono, monospace",
    },
    weight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },

  // 间距
  spacing: {
    base: 8,
    section: {
      desktop: 80,
      mobile: 48,
    },
  },

  // 阴影层级
  shadows: {
    // 阴（暗）主题 - Card
    card: "0 4px 24px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.08)",
    cardHover: "0 12px 40px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.12)",

    // 阳（亮）主题 - Card
    cardLight: "0 4px 24px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)",
    cardHoverLight: "0 12px 40px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
  },

  // 圆角
  radius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    full: "9999px",
  },

  // 动效
  transitions: {
    fast: "0.15s ease",
    normal: "0.25s ease",
    slow: "0.4s ease",
  },
} as const;