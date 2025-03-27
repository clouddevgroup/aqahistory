/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Configure static file serving
  output: 'standalone',
  // Serve static files from the public directory
  experimental: {
    outputFileTracingRoot: '/',
  },
};

module.exports = nextConfig;