"use client";

import { useRef, useEffect, useState } from "react";
import * as htmlToImage from "html-to-image";
import { IPhoneFrame } from "./ui/iphone-frame";

// 定义常量
export const TARGET_WIDTH = 1320;
export const TARGET_HEIGHT = 2868;
export const PREVIEW_SCALE = 0.25;

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
  const targetRatio = TARGET_WIDTH / TARGET_HEIGHT;
  const imageRatio = originalWidth / originalHeight;

  let width, height, x, y;

  if (imageRatio > targetRatio) {
    height = TARGET_HEIGHT;
    width = height * imageRatio;
    x = -(width - TARGET_WIDTH) / 2;
    y = 0;
  } else {
    width = TARGET_WIDTH;
    height = width / imageRatio;
    x = 0;
    y = -(height - TARGET_HEIGHT) / 2;
  }

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
    canvas.width = img.width / 2;
    canvas.height = img.height / 2;

    ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "screenshot.png";
        link.href = url;
        link.click();

        URL.revokeObjectURL(url);
      }
    });
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
          transform: `scale(3.55)`, // 反向缩放以获得原始大小
          transformOrigin: "top left",
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
      <div ref={previewRef} className="relative w-full h-full m-4">
        <div
          style={{
            width: "100%",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "25px",
              fontWeight: "bold",
              color: "black",
              margin: 0,
              fontFamily: "system-ui,-apple-system",
              whiteSpace: "pre-wrap", // 允许换行
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
