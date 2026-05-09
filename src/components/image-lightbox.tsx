"use client";

import { useState, useEffect, useRef } from "react";

interface ImageLightboxProps {
  src: string;
  alt: string;
  children: React.ReactNode;
}

export function ImageLightbox({ src, alt, children }: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setScale(1);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale((prev) => Math.min(Math.max(prev + delta, 0.5), 4));
  };

  return (
    <>
      <div
        className="cursor-pointer overflow-hidden"
        onClick={() => setIsOpen(true)}
      >
        {children}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          onClick={() => setIsOpen(false)}
        >
          {/* 关闭按钮 */}
          <button
            className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white text-2xl hover:bg-white/20 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>

          {/* 操作提示 */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm">
            滚轮缩放 · 点击关闭
          </div>

          {/* 图片容器 */}
          <div
            className="relative w-full h-full flex items-center justify-center p-16"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              ref={imgRef}
              src={src}
              alt={alt}
              className="max-w-full max-h-full object-contain select-none transition-transform duration-200"
              style={{ transform: `scale(${scale})` }}
              onWheel={handleWheel}
              draggable={false}
            />
          </div>
        </div>
      )}
    </>
  );
}