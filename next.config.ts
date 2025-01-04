import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "kzosnocadtyxpiguzyah.supabase.co",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com", // Přidáno pro podporu obrázků z Clerk
      },
    ],
  },
};

export default nextConfig;
