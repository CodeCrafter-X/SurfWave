/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  // Disable static generation for all pages by default
  // Individual pages can opt-in with generateStaticParams
  staticPageGenerationTimeout: 60,
  // Properly handle dynamic routes
  experimental: {
    isrMemoryCacheSize: 0,
  },
};

export default nextConfig;
