const { withContentlayer } = require('next-contentlayer')

/**
 * @type {import('next').NextConfig}
 */
module.exports = withContentlayer()({
  reactStrictMode: true,
  images: {
    domains: [
      'pbs.twimg.com', // Twitter
      'res.cloudinary.com',
      'avatars.githubusercontent.com',
      'raw.githubusercontent.com',
      'camo.githubusercontent.com'
    ]
  },
  webpack(config, { dev, isServer }) {
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
