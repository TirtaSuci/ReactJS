import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "fakestoreapi.com",
      "static.nike.com",
      "firebasestorage.googleapis.com",
    ],
  },
};

export default nextConfig;