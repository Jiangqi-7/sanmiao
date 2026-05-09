import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Vercel Design System Constants
export const DESIGN_SYSTEM = {
  colors: {
    // Primary
    black: "#171717",
    white: "#ffffff",
    trueBlack: "#000000",

    // Workflow Accents
    shipRed: "#ff5b4f",
    previewPink: "#de1d8d",
    developBlue: "#0a72ef",

    // Console Colors
    consoleBlue: "#0070f3",
    consolePurple: "#7928ca",
    consolePink: "#eb367f",

    // Neutral Scale
    gray900: "#171717",
    gray600: "#4d4d4d",
    gray500: "#666666",
    gray400: "#808080",
    gray100: "#ebebeb",
    gray50: "#fafafa",

    // Interactive
    linkBlue: "#0072f5",
    focusBlue: "hsla(212, 100%, 48%, 1)",
  },

  typography: {
    fontFamily: {
      primary: "Geist, Arial, Apple Color Emoji, sans-serif",
      mono: "Geist Mono, ui-monospace, SFMono, monospace",
    },
    weight: {
      body: 400,
      ui: 500,
      heading: 600,
      badge: 700,
    },
    letterSpacing: {
      display: "-2.4px",
      hero: "-2.88px",
    },
  },

  spacing: {
    base: 8,
    sections: {
      desktop: 80,
      mobile: 48,
    },
  },

  shadows: {
    ring: "rgba(0,0,0,0.08) 0px 0px 0px 1px",
    lightRing: "rgb(235,235,235) 0px 0px 0px 1px",
    card:
      "rgba(0,0,0,0.08) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 2px, #fafafa 0px 0px 0px 1px",
    cardHover:
      "rgba(0,0,0,0.08) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 2px, rgba(0,0,0,0.04) 0px 8px 8px -8px, #fafafa 0px 0px 0px 1px",
  },

  radius: {
    micro: "2px",
    subtle: "4px",
    standard: "6px",
    comfortable: "8px",
    image: "12px",
    large: "64px",
    pill: "9999px",
    circle: "50%",
  },

  breakpoints: {
    mobileS: "400px",
    mobile: "600px",
    tabletS: "768px",
    tablet: "1024px",
    desktopS: "1200px",
    desktop: "1400px",
    desktopL: "1400px",
  },
} as const
