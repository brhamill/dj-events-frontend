/* eslint-disable */
// const withPlugins = require('next-compose-plugins')
// const withFonts = require('next-fonts')
// const withImages = require('next-images')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
/* eslint-enable */

module.exports = {
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
