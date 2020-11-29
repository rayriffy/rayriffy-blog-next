const withPlugins = require('next-compose-plugins')

const withPreact = require('next-plugin-preact')

module.exports = withPlugins([
  [withPreact]
], {
  target: 'serverless',
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ]
  },
  images: {
    domains: ['images.ctfassets.net']
  }
})
