/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  })
const nextConfig = {
    output: "export",
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "api.dyarko.com"
            },
            {
                protocol: "http",
                hostname: "**"
            }
        ]
    }
}

module.exports = nextConfig
