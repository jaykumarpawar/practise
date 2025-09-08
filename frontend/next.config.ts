import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isProd ? "/resume-builder" : "",
  assetPrefix: isProd ? "/resume-builder/" : "",
};

export default nextConfig;
