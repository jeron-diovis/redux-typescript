const { useBabelRc, override, addBundleVisualizer } = require('customize-cra')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

module.exports = override(
  useBabelRc(),

  // @link https://www.npmjs.com/package/webpack-bundle-analyzer
  addBundleVisualizer({
    openAnalyzer: false,
    analyzerMode: process.env.NODE_ENV === 'production' ? 'static' : 'server',
    generateStatsFile: true,
  }),

  // @link https://github.com/lodash/lodash-webpack-plugin
  config => {
    config.plugins.push(new LodashModuleReplacementPlugin({
      paths: true,
      flattening: true,
    }))
    return config
  },
)
