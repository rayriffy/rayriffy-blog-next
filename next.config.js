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
        source: '/robots.txt',
        destination: '/api/robots',
      },
    ]
  },
  images: {
    domains: ['images.ctfassets.net'],
  },
  experimental: {
    nextScriptWorkers: true,
    optimizeFonts: true,
  },
})
