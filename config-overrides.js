const { useBabelRc, override, addBundleVisualizer } = require('customize-cra')
const { merge } = require('lodash')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

module.exports = override(
  useBabelRc(),

  // @link https://www.npmjs.com/package/webpack-bundle-analyzer
  addBundleVisualizer({
    analyzerHost: '0.0.0.0',
    openAnalyzer: false,
    analyzerMode: process.env.NODE_ENV === 'production' ? 'static' : 'server',
    generateStatsFile: true,
  }),

  // @link https://github.com/lodash/lodash-webpack-plugin
  config => {
    config.plugins.push(
      new LodashModuleReplacementPlugin({
        paths: true,
        flattening: true,
      })
    )
    return config
  },

  // Separate chunk for react-modules, for better build analysis.
  config => {
    merge(config.optimization.splitChunks, {
      cacheGroups: {
        react: {
          test: /[\\/]node_modules[\\/].*react.*/,
          reuseExistingChunk: true,
        },
      },
    })
    return config
  }
)
