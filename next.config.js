/** @type {import('next').NextConfig} */
const nextConfig = {
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
