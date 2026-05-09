# Vercel Design System — DESIGN.md

## 1. Visual Theme & Atmosphere

A restrained, white-dominant aesthetic where minimalism functions as engineering principle. Every unnecessary element is stripped away.

**Core Philosophy:**
Minimalism as design isn't decoration — it's infrastructure. The interface functions like a compiler: only structure remains.

**Key Visual Techniques:**
- Extreme negative letter-spacing on headlines creates compressed, urgent text
- Shadow-as-border replaces traditional CSS borders throughout
- Multi-layer shadow stacks provide nuanced depth without heavy elevation
- Near-pure white canvas with #171717 text creates micro-contrast softness

## 2. Color Palette

**Primary:**
- Vercel Black: #171717
- Pure White: #ffffff
- True Black: #000000

**Workflow Accents:**
- Ship Red: #ff5b4f
- Preview Pink: #de1d8d
- Develop Blue: #0a72ef

**Neutral Scale:**
- Gray 900: #171717
- Gray 600: #4d4d4d
- Gray 500: #666666
- Gray 400: #808080
- Gray 100: #ebebeb
- Gray 50: #fafafa

**Interactive:**
- Link Blue: #0072f5
- Focus Blue: hsla(212, 100%, 48%, 1)

## 3. Typography Rules

**Font Families:**
- Primary: Geist (fallback: Arial, Apple Color Emoji)
- Monospace: Geist Mono (fallback: ui-monospace, SFMono)

**Key Type Treatments:**
- Display Hero: 48px, weight 600, letter-spacing: -2.4px to -2.88px
- Section Heading: 40px, weight 600, letter-spacing: -2.4px
- Body: 18px, weight 400, line-height: 1.56
- Body Small: 16px, weight 400
- Button: 14px, weight 500

**OpenType Features:**
- "liga" enabled globally on all Geist text
- "tnum" for tabular numbers on captions

**Weight System (Three Weights Only):**
- 400: Body/reading text
- 500: UI/interactive elements
- 600: Headings/emphasis
- 700: Micro-badges only

## 4. Component Stylings

**Primary Dark Button:**
- Background: #171717
- Text: #ffffff
- Padding: 8px 16px
- Radius: 6px
- Use: Primary CTA

**Primary White Button:**
- Background: #ffffff
- Text: #171717
- Padding: 0px 6px
- Radius: 6px
- Shadow: rgb(235, 235, 235) 0px 0px 0px 1px

**Pill Badge:**
- Background: #ebf5ff
- Text: #0068d6
- Radius: 9999px
- Padding: 0px 10px
- Font: 12px weight 500

**Card Container:**
- Background: #ffffff
- Shadow: rgba(0,0,0,0.08) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 2px, #fafafa 0px 0px 0px 1px
- Radius: 8px (standard), 12px (image cards)

## 5. Layout Principles

**Spacing Scale:**
- Base unit: 8px
- Major gaps: 16px to 32px (no 20px or 24px)

**Container:**
- Max width: ~1200px
- Hero: centered single-column with generous padding
- Feature sections: 2-3 column grids

**Whitespace Philosophy:**
- Massive vertical padding between sections (80-120px+)
- White space IS the design
- Section rhythm through borders and spacing only

**Border Radius Scale:**
- Micro: 2px
- Subtle: 4px
- Standard: 6px
- Comfortable: 8px
- Image: 12px
- Large: 64px
- Pill: 9999px
- Circle: 50%

## 6. Depth & Elevation

**Shadow Levels:**
- Level 0 (Flat): No shadow
- Level 1 (Ring): rgba(0,0,0,0.08) 0px 0px 0px 1px
- Level 1b (Light Ring): rgb(235,235,235) 0px 0px 0px 1px
- Level 2 (Subtle Card): Ring + rgba(0,0,0,0.04) 0px 2px 2px
- Level 3 (Full Card): Ring + Subtle + rgba(0,0,0,0.04) 0px 8px 8px -8px + inner #fafafa ring

**Focus (Accessibility):**
- Outline: 2px solid hsla(212, 100%, 48%, 1)

## 7. Do's and Don'ts

**Do:**
- Use Geist Sans with negative letter-spacing at display sizes
- Use shadow-as-border instead of CSS border
- Enable "liga" on all Geist text
- Use three-weight system (400, 500, 600)
- Use workflow accent colors only in workflow context
- Apply multi-layer shadow stacks for cards
- Keep palette achromatic
- Use #171717 instead of #000000

**Don't:**
- Use positive letter-spacing on Geist Sans
- Use weight 700 on body text
- Use traditional CSS border on cards
- Introduce warm colors (orange, yellow, green) in UI
- Apply workflow accent colors decoratively
- Use heavy shadows (> 0.1 opacity)
- Increase body text letter-spacing
- Use pill radius on primary buttons
- Skip inner #fafafa ring in card shadows

## 8. Responsive Breakpoints

- Mobile Small: <400px
- Mobile: 400-600px
- Tablet Small: 600-768px
- Tablet: 768-1024px
- Desktop Small: 1024-1200px
- Desktop: 1200-1400px
- Large Desktop: >1400px

**Section Spacing:**
- Desktop: 80px+
- Mobile: 48px

## 9. Quick Reference

**Primary CTA:** #171717 background, white text
**Background:** #ffffff
**Headings:** #171717
**Body text:** #4d4d4d
**Border technique:** 0px 0px 0px 1px rgba(0,0,0,0.08)
**Link color:** #0072f5
**Focus ring:** hsla(212, 100%, 48%, 1)

**Workflow Colors:**
- Develop: #0a72ef
- Preview: #de1d8d
- Ship: #ff5b4f

---

*System inspired by Vercel's design philosophy: invisible infrastructure where every element earns its pixel.*
