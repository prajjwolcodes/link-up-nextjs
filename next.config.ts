import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["t3.ftcdn.net", "i.pinimg.com"], // Add the hostname here
    remotePatterns: [
      {
        protocol: "https",
        hostname: `${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}.ufs.sh`,
        pathname: `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/a/`,
      },
    ],
  },
  experimental: {
    staleTimes: {
      dynamic: 30
    }
  }
};

export default nextConfig;
