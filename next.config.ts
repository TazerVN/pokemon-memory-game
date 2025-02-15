import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
  },
  pageExtensions: ["tsx", "ts", "jsx", "js"],
  future: { webpack5: true },
};

export default nextConfig;
