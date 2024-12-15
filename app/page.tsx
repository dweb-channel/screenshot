"use client";

import { useState } from "react";
import PreviewItem from "@/components/preview-item";
import UploadArea from "@/components/upload-area";
import LetterPullup from "@/components/ui/letter-pullup";

// 定义图片预览项的接口
interface PreviewItem {
  id: string;
  imageUrl: string;
  text: string;
  originalWidth: number;
  originalHeight: number;
}

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

export default function Home() {
  const [previewItems, setPreviewItems] = useState<PreviewItem[]>([]);

  // 处理文件上传
  const handleFiles = async (files: FileList) => {
    const newItems: PreviewItem[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith("image/")) {
        try {
          const imageUrl = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          });

          // 获取图片原始尺寸
          const { width, height } = await getImageDimensions(imageUrl);

          newItems.push({
            id: `${Date.now()}-${i}`,
            imageUrl,
            text: "",
            originalWidth: width,
            originalHeight: height,
          });
        } catch (error) {
          console.error("读取图片失败:", error);
        }
      }
    }

    setPreviewItems((prev) => [...prev, ...newItems]);
  };

  // 更新预览项的文字
  const handleTextChange = (id: string, newText: string) => {
    setPreviewItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, text: newText } : item))
    );
  };

  // 替换图片
  const handleImageReplace = (
    id: string,
    imageUrl: string,
    width: number,
    height: number
  ) => {
    setPreviewItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, imageUrl, originalWidth: width, originalHeight: height }
          : item
      )
    );
  };

  return (
    <main className="container mx-auto p-4 min-h-screen">
      <LetterPullup words={"App Store 批量截图生成器"} delay={0.05} />

      <div className="mb-8">
        <UploadArea onFilesSelected={handleFiles} />
      </div>

      <div className="flex flex-wrap">
        {previewItems.map((item) => (
          <PreviewItem
            key={item.id}
            {...item}
            onTextChange={handleTextChange}
            onImageReplace={handleImageReplace}
          />
        ))}
      </div>

      {previewItems.length > 0 && (
        <div className="mt-8 text-center text-gray-500">
          <p>提示：点击"下载当前"按钮下载单张图片</p>
        </div>
      )}
    </main>
  );
}
