/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Simplified configuration for Vercel
  output: 'export',
  // Ensure static assets are properly handled
  images: {
    unoptimized: true,
  },
  // Remove experimental options that might cause issues
};

module.exports = nextConfig;