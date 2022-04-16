const withPlugins = require('next-compose-plugins')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withPlugins([[withBundleAnalyzer]], {
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
      {
        source: '/feed.rss',
        destination: '/api/feed/rss',
      },
      {
        source: '/feed.atom',
        destination: '/api/feed/atom',
      },
      {
        source: '/feed.json',
        destination: '/api/feed/json',
      },
      {
        source: '/robots.txt',
        destination: '/api/robots',
      },
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['images.ctfassets.net'],
  },
  experimental: {
    optimizeFonts: true,
  },
})
