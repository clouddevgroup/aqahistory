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
  // Add trailingSlash for compatibility with static HTML
  trailingSlash: true,
  // Ensure all HTML files are correctly exported
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/practice': { page: '/practice' },
      '/topics': { page: '/topics' },
    };
  },
};

module.exports = nextConfig;