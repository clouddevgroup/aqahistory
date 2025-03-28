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
      // Handle both with and without trailing slash for topic pages
      {
        source: '/topics/boom',
        destination: '/public/topics/boom.html',
      },
      {
        source: '/topics/boom/',
        destination: '/public/topics/boom.html',
      },
      {
        source: '/topics/depression',
        destination: '/public/topics/depression.html',
      },
      {
        source: '/topics/depression/',
        destination: '/public/topics/depression.html',
      },
      {
        source: '/topics/new-deal',
        destination: '/public/topics/new-deal.html',
      },
      {
        source: '/topics/new-deal/',
        destination: '/public/topics/new-deal.html',
      },
      {
        source: '/topics/ww2',
        destination: '/public/topics/ww2.html',
      },
      {
        source: '/topics/ww2/',
        destination: '/public/topics/ww2.html',
      },
      {
        source: '/topics/cold-war',
        destination: '/public/topics/cold-war.html',
      },
      {
        source: '/topics/cold-war/',
        destination: '/public/topics/cold-war.html',
      },
      {
        source: '/topics/space-race',
        destination: '/public/topics/space-race.html',
      },
      {
        source: '/topics/space-race/',
        destination: '/public/topics/space-race.html',
      },
      {
        source: '/topics/ww2-interactive-quiz',
        destination: '/pages/topics/ww2-interactive-quiz',
      },
      {
        source: '/topics/ww2-timeline',
        destination: '/pages/topics/ww2-timeline',
      },
      {
        source: '/topics/ww2-key-figures',
        destination: '/pages/topics/ww2-key-figures',
      },
      // Add rewrites for static assets to ensure they're accessible from subpaths
      {
        source: '/practice/css/:path*',
        destination: '/css/:path*',
      },
      {
        source: '/practice/js/:path*',
        destination: '/js/:path*',
      },
      {
        source: '/practice/images/:path*',
        destination: '/images/:path*',
      },
      {
        source: '/topics/css/:path*',
        destination: '/css/:path*',
      },
      {
        source: '/topics/js/:path*',
        destination: '/js/:path*',
      },
      {
        source: '/topics/images/:path*',
        destination: '/images/:path*',
      },
    ];
  },
};

module.exports = nextConfig;