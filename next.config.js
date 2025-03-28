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
  // Add redirects for common variations and fix HTML links
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
      {
        source: '/topics.html',
        destination: '/topics',
        permanent: true,
      },
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/about.html',
        destination: '/about',
        permanent: true,
      },
    ];
  },
  // Fix internal navigation between pages
  async rewrites() {
    return [
      {
        source: '/about',
        destination: '/public/about.html',
      },
      {
        source: '/contact',
        destination: '/public/contact.html',
      },
      {
        source: '/privacy',
        destination: '/public/privacy.html',
      },
    ];
  },
};

module.exports = nextConfig;