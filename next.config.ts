import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // 启用静态导出
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "", // 设置基础路径
  images: {
    unoptimized: true, // 对于静态导出，需要禁用图片优化
  },
};

export default nextConfig;
