const { useBabelRc, override, addBundleVisualizer } = require('customize-cra')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

module.exports = override(
  useBabelRc(),

  // @link https://www.npmjs.com/package/webpack-bundle-analyzer
  addBundleVisualizer({
    openAnalyzer: false,
    analyzerPort: 9999, // default 8888 is going to be occupied by backend services
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
