import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production"; // 判断是否为生产环境

const nextConfig: NextConfig = {
  output: "export", // 启用静态导出
  basePath: isProd ? process.env.NEXT_PUBLIC_BASE_PATH || "" : "", // 仅在生产环境设置 basePath
  assetPrefix: isProd ? process.env.NEXT_PUBLIC_BASE_PATH || "" : "", // 资源路径前缀
  images: {
    unoptimized: true, // 对于静态导出，需要禁用图片优化
  },
};

export default nextConfig;
