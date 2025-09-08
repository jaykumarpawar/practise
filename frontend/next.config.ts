import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repoName = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",
  webpack: (config: {
    resolve: { alias: { canvas: boolean; encoding: boolean } };
  }) => {
    // Handle PDF renderer
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;

    return config;
  },
  transpilePackages: ["@react-pdf/renderer"],
};

export default nextConfig;
