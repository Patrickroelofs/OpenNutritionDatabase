import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/ui", "@workspace/tailwind-config"],
  reactCompiler: true,
  output: "standalone",
};

export default nextConfig;
