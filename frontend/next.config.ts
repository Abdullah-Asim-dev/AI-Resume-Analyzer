import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'http://localhost:8000/api/:path*', // Deployed directly to local address interface
      },
    ];
  },
};

export default nextConfig;
