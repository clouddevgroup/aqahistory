/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Simplified configuration for Vercel - using standalone instead of export
  // This allows API routes to work
  output: 'standalone',
  // Ensure static assets are properly handled
  images: {
    unoptimized: true,
  },
  // Add trailingSlash for compatibility with static HTML
  trailingSlash: true,
  // Add redirects for common variations
  async redirects() {
    return [
      {
        source: '/practise',
        destination: '/practice',
        permanent: true,
      },
      {
        source: '/practise.html',
        destination: '/practice',
        permanent: true,
      },
      {
        source: '/practice.html',
        destination: '/practice',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;