/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    unoptimized: false,
  },
  // AWS deployment optimizations
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
  // Enable static exports if needed for S3
  // output: 'export',
}

module.exports = nextConfig

