// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Geçici olarak TypeScript hatalarını ignore et
  },
  eslint: {
    ignoreDuringBuilds: true, // Geçici olarak ESLint hatalarını ignore et
  },
  experimental: {
    serverComponentsExternalPackages: ['mongoose'],
  },
}

module.exports = nextConfig