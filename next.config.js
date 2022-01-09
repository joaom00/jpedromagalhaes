const withPlugins = require('next-compose-plugins')

const { withContentlayer } = require('next-contentlayer')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

/**
 * @type {import('next').NextConfig}
 */
module.exports = withPlugins([[withBundleAnalyzer], [withContentlayer]], {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'pbs.twimg.com', // Twitter
      'res.cloudinary.com',
      'avatars.githubusercontent.com',
      'raw.githubusercontent.com',
      'camo.githubusercontent.com'
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            name: '[name]-[hash].[ext]'
          }
        }
      ]
    })

    return config
  }
})
