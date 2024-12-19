"use client";

import { useRef, useEffect, useState } from "react";
import * as htmlToImage from "html-to-image";
import { IPhoneFrame } from "./ui/iphone-frame";

// 定义常量
export const TARGET_WIDTH = 1320;
export const TARGET_HEIGHT = 2868;
export const PREVIEW_SCALE = 0.2; // 将预览比例从 0.25 调整为 0.2，使手机显示更小

interface PreviewItemProps {
  id: string;
  imageUrl: string;
  text: string;
  originalWidth: number;
  originalHeight: number;
  onTextChange: (id: string, text: string) => void;
  onImageReplace: (
    id: string,
    imageUrl: string,
    width: number,
    height: number
  ) => void;
}

// 计算图片在目标区域内的缩放和位置
const calculateImagePosition = (
  originalWidth: number,
  originalHeight: number
) => {
  // 考虑边框宽度
  const BORDER_WIDTH = 12;
  const contentWidth = TARGET_WIDTH - BORDER_WIDTH * 2;
  const contentHeight = TARGET_HEIGHT - BORDER_WIDTH * 2;

  const targetRatio = contentWidth / contentHeight;
  const imageRatio = originalWidth / originalHeight;

  let width, height;

  if (imageRatio > targetRatio) {
    // 图片更宽
    height = contentHeight;
    width = height * imageRatio;
  } else {
    // 图片更高
    width = contentWidth;
    height = width / imageRatio;
  }

  // 计算偏移量，使图片中心对齐到截图中心
  const centerX = TARGET_WIDTH / 2;
  const centerY = TARGET_HEIGHT / 2;
  const x = centerX - (width / 2);
  const y = centerY - (height / 2);

  return { width, height, x, y };
};
// 获取图片的原始尺寸
const getImageDimensions = (
  url: string
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.src = url;
  });
};

const imageHalfScale = (imageUrl: string) => {
  const img = new Image();
  img.crossOrigin = "anonymous";

  img.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // 设置画布大小为目标尺寸
    canvas.width = TARGET_WIDTH;
    canvas.height = TARGET_HEIGHT;

    if (ctx) {
      // 填充白色背景
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 计算图片位置和尺寸
      const { width, height, x, y } = calculateImagePosition(img.width, img.height);
      
      // 使用整数值进行绘制，避免小数点导致的模糊或偏移
      ctx.drawImage(
        img,
        Math.round(x),
        Math.round(y),
        Math.round(width),
        Math.round(height)
      );
    }

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.download = "screenshot.png";
          link.href = url;
          link.click();

          URL.revokeObjectURL(url);
        }
      },
      "image/png",
      1.0
    );
  };

  img.src = imageUrl;
};

export default function PreviewItem({
  id,
  imageUrl,
  text,
  originalWidth,
  originalHeight,
  onTextChange,
  onImageReplace,
}: PreviewItemProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const { width, height, x, y } = calculateImagePosition(
    originalWidth,
    originalHeight
  );
  // 生成并下载当前图片
  const handleDownload = async () => {
    if (!previewRef.current) return;
    try {
      // 直接使用预览组件生成图片
      const dataUrl = await htmlToImage.toPng(previewRef.current, {
        width: TARGET_WIDTH,
        height: TARGET_HEIGHT,
        pixelRatio: 2, // 提高清晰度
        quality: 1,
        skipAutoScale: true,
        backgroundColor: "#ffffff",
        style: {
          transform: `translate(200%, ${y}px) scale(${0.8 / PREVIEW_SCALE})`, // 使用计算出的偏移
          transformOrigin: "center center",
        },
      });

      // 下载图片
      imageHalfScale(dataUrl);
    } catch (error) {
      console.error("生成图片失败:", error);
    }
  };

  return (
    <div className="space-y-4 flex flex-col items-center p-4">
      <div 
        ref={previewRef} 
        className="relative w-full h-full flex flex-col items-center justify-center"
        style={{
          margin: "0 auto",
          maxWidth: `${TARGET_WIDTH * PREVIEW_SCALE}px`,
          minHeight: `${TARGET_HEIGHT * PREVIEW_SCALE}px`,
          transform: `translate(${x * PREVIEW_SCALE}px, ${y * PREVIEW_SCALE}px)`, // 预览时也使用相同的偏移
        }}
      >
        <div
          style={{
            width: "100%",
            textAlign: "center",
            padding: "20px",
          }}
        >
          <h1
            style={{
              fontSize: "28px", // 增大字号
              fontWeight: "600",
              color: "#1a1a1a", // 更柔和的黑色
              margin: "0 auto",
              fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              whiteSpace: "pre-wrap",
              lineHeight: 1.4, // 增加行高
              letterSpacing: "-0.02em", // 略微调整字间距
              textAlign: "center",
              maxWidth: "800px", // 限制最大宽度
              wordBreak: "break-word", // 防止文字溢出
            }}
          >
            {text.match(/.{1,4}/g)?.join("\n") || text}
          </h1>
        </div>
        <IPhoneFrame
          width={TARGET_WIDTH * PREVIEW_SCALE}
          height={TARGET_HEIGHT * PREVIEW_SCALE}
          imageUrl={imageUrl}
          imageStyle={{
            width: width * PREVIEW_SCALE,
            height: height * PREVIEW_SCALE,
            x: x * PREVIEW_SCALE,
            y: y * PREVIEW_SCALE,
          }}
        />
      </div>

      {/* 控制区域 */}
      <div className="space-y-2 w-full max-w-[330px] relative">
        <textarea
          className="w-full p-2 border rounded-lg resize-none"
          rows={2}
          placeholder="输入要显示的文字..."
          value={text}
          onChange={(e) => onTextChange(id, e.target.value)}
        />
        <div className="grid grid-cols-2 gap-2">
          <label className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer text-center">
            替换图片
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  try {
                    const imageUrl = await new Promise<string>((resolve) => {
                      const reader = new FileReader();
                      reader.onloadend = () => resolve(reader.result as string);
                      reader.readAsDataURL(file);
                    });

                    const { width, height } = await getImageDimensions(
                      imageUrl
                    );
                    onImageReplace(id, imageUrl, width, height);
                  } catch (error) {
                    console.error("读取图片失败:", error);
                  }
                }
              }}
            />
          </label>
          <button
            onClick={handleDownload}
            className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            下载当前
          </button>
        </div>
      </div>
    </div>
  );
}
