/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config) => {
      config.resolve.fallback = { fs: false, net: false, tls: false };
      config.externals.push("pino-pretty", "lokijs", "encoding");
      return config;
    },
    images: {
      unoptimized: true,
      formats: ["image/avif", "image/webp"],
    }
  }
  
  
export default nextConfig;
