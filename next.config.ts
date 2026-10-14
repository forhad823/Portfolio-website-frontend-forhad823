import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  reactStrictMode: true,
  reactCompiler: true,
  // output: "export", // uncomment the line before running build to deploy on netlify
};

export default nextConfig;
