import type { NextConfig } from "next";

const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.nike.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
