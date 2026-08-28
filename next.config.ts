import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel provides its own deployment adapter. Next.js 16.3 currently omits
  // the root NFT trace when that adapter and standalone output are combined.
  output: process.env.VERCEL ? undefined : "standalone",
  reactCompiler: true,
};

export default nextConfig;
