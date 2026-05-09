"use client";

import { BAGUA } from "@/lib/design-system";

// 八卦符号组件
export function BaguaSymbol({
  name,
  size = 24,
  className = "",
}: {
  name: keyof typeof BAGUA.positions;
  size?: number;
  className?: string;
}) {
  const bagua = BAGUA.positions[name];
  if (!bagua) return null;

  return (
    <span
      className={`bagua-symbol ${className}`}
      style={{
        fontSize: `${size}px`,
        fontWeight: 300,
        opacity: 0.6,
      }}
      title={`${bagua.name}（${bagua.direction}）`}
    >
      {bagua.symbol}
    </span>
  );
}

// 八卦盘装饰组件
export function BaguaWheel({
  size = 200,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const symbols = [
    { key: "kan" as const, angle: 0 },
    { key: "gen" as const, angle: 45 },
    { key: "zhen" as const, angle: 90 },
    { key: "xun" as const, angle: 135 },
    { key: "li" as const, angle: 180 },
    { key: "kun" as const, angle: 225 },
    { key: "dui" as const, angle: 270 },
    { key: "qian" as const, angle: 315 },
  ];

  const radius = size / 2 - 20;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`bagua-wheel ${className}`}
      style={{ opacity: 0.15 }}
    >
      {/* 外圈 */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
        opacity={0.3}
      />
      {/* 内圈 */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius * 0.6}
        fill="none"
        stroke="currentColor"
        strokeWidth={0.5}
        opacity={0.2}
      />
      {/* 中心 */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={4}
        fill="currentColor"
        opacity={0.3}
      />

      {/* 八卦符号 */}
      {symbols.map(({ key, angle }) => {
        const radian = (angle * Math.PI) / 180;
        const x = size / 2 + Math.sin(radian) * (radius * 0.8);
        const y = size / 2 - Math.cos(radian) * (radius * 0.8);
        const bagua = BAGUA.positions[key];

        return (
          <text
            key={key}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="currentColor"
            fontSize={16}
            opacity={0.5}
            transform={`rotate(${angle}, ${x}, ${y})`}
          >
            {bagua.symbol}
          </text>
        );
      })}
    </svg>
  );
}

// 阴阳鱼装饰
export function YinYang({
  size = 60,
  className = "",
  animate = false,
}: {
  size?: number;
  className?: string;
  animate?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`yin-yang ${animate ? "animate-spin-slow" : ""} ${className}`}
      style={animate ? { animation: "yin-yang-spin 20s linear infinite" } : {}}
    >
      {/* 阴阳鱼整体 */}
      <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth={1} opacity={0.3} />
      <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth={0.5} opacity={0.2} />

      {/* 阳鱼头 */}
      <circle cx="50" cy="30" r="20" fill="currentColor" opacity={0.15} />
      {/* 阴鱼头 */}
      <circle cx="50" cy="70" r="20" fill="currentColor" opacity={0.08} />

      {/* 阳鱼眼 */}
      <circle cx="50" cy="30" r="6" fill="currentColor" opacity={0.3} />
      <circle cx="50" cy="70" r="6" fill="currentColor" opacity={0.2} />
    </svg>
  );
}

// 装饰性线条
export function Divider({
  className = "",
  direction = "horizontal",
}: {
  className?: string;
  direction?: "horizontal" | "vertical";
}) {
  if (direction === "vertical") {
    return (
      <div
        className={`w-px h-full bg-gradient-to-b from-transparent via-gray-600 to-transparent ${className}`}
        style={{ opacity: 0.3 }}
      />
    );
  }

  return (
    <div
      className={`w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent ${className}`}
      style={{ opacity: 0.3 }}
    />
  );
}