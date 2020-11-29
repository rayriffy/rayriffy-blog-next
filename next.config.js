const withPlugins = require('next-compose-plugins')

const withPreact = require('next-plugin-preact')

module.exports = withPlugins([
  [withPreact]
], {
  target: 'serverless',
  images: {
    domains: ['images.ctfassets.net']
  }
})
