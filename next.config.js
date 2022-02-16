const { i18n } = require('./next-i18next.config')

const MAINTENANCE_MODE = process.env.MAINTENANCE === 'true'
if (MAINTENANCE_MODE) {
  console.log(`⚠️⚠️⚠️ MAINTENANCE MODE ENABLED ⚠️⚠️⚠️`)
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/robots.txt',
        destination: '/api/fe/robots',
      },
      {
        source: '/sitemap.xml',
        destination: '/api/fe/sitemap',
      },
    ]
  },
}

module.exports = nextConfig
