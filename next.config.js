/* eslint-disable */
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
/* eslint-enable */

module.exports = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  future: {
    webpack5: true,
  },
  webpack: (config) => {
    if (config.resolve.plugins) {
      config.resolve.plugins.push(new TsconfigPathsPlugin())
    } else {
      config.resolve.plugins = [new TsconfigPathsPlugin()]
    }

    config.resolve.extensions.push('.ts', '.tsx')
    return config
  },
}
