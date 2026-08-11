import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  images: {
    remotePatterns: [],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        // Profile & logo images: short cache + revalidate for logo purge protocol
        source: "/(profile-image|og-image|icon|logo|apple-touch-icon|umair-amjad-khan-ai-machine-learning-engineer)\\.(jpg|jpeg|png|svg|webp)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, must-revalidate, stale-while-revalidate=3600",
          },
        ],
      },
      {
        // Other static assets: long-term immutable cache
        source: "/:path*\\.(jpg|jpeg|png|svg|webp|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
