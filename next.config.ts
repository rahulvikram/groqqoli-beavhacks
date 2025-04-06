import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    GROQ_API_KEY: process.env.GROQ_API_KEY,
  },

  // Enable Fast Refresh and live server reload
  reactStrictMode: true,
  webpack: (config, { isServer, dev }) => {
    // Enable hot module replacement for faster development
    if (dev && !isServer) {
      config.watchOptions = {
        ...config.watchOptions,
        poll: 800, // Check for changes every 0.8 seconds
        aggregateTimeout: 300, // Delay before rebuilding
      };
    }
    return config;
  },
};

export default nextConfig;
