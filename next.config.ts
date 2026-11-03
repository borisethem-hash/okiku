import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  // 旧サイト (WordPress) と同じく末尾スラッシュ付きURLに統一
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  // 旧サイトのURLから新URLへの恒久リダイレクト（SEO評価の引き継ぎ）
  // ※ 旧投稿URL（日本語スラッグ）は src/proxy.ts で処理
  async redirects() {
    return [
      { source: "/work/", destination: "/service/", permanent: true },
      { source: "/instagram/", destination: "/news/", permanent: true },
      { source: "/category/:slug*", destination: "/news/", permanent: true },
      { source: "/feed/", destination: "/news/", permanent: true },
    ];
  },
};

export default nextConfig;
