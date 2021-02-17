const withPlugins = require('next-compose-plugins')

const withPreact = require('next-plugin-preact')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withPlugins([[withPreact], [withBundleAnalyzer]], {
  target: 'serverless',
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
      {
        source: '/robots.txt',
        destination: '/api/robots',
      },
    ]
  },
  images: {
    domains: ['images.ctfassets.net'],
  },
  future: {
    webpack5: true,
  },
  experimental: {
    optimizeFonts: true,
  },
})
