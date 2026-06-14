import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    allowedDevOrigins: ["10.10.7.24", "fundraising.apponislam.top", "198.41.192.7", "10.10.26.171"],
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
            {
                protocol: "http",
                hostname: "**",
            },
        ],
    },
};

export default nextConfig;
