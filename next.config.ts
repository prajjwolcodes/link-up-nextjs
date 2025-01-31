import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["t3.ftcdn.net"], // Add the hostname here
  },
  experimental: {
    staleTimes: {
      dynamic: 30
    }
  }
};

export default nextConfig;
