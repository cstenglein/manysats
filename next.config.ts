import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  output: "standalone",
};

export default nextConfig;