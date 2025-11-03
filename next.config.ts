// next.config.js - GÜNCELLENMİŞ
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['mongoose']
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  }
}

module.exports = nextConfig