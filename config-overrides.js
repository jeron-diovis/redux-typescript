const { useBabelRc, override, addBundleVisualizer } = require('customize-cra')
const { merge } = require('lodash')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')

module.exports = override(
  useBabelRc(),

  // @link https://www.npmjs.com/package/webpack-bundle-analyzer
  addBundleVisualizer({
    analyzerHost: '0.0.0.0',
    analyzerPort: process.env.ANALYZER_PORT || 8888,
    openAnalyzer: false,
    analyzerMode: process.env.NODE_ENV === 'production' ? 'static' : 'server',
    generateStatsFile: true,
  }),

  // @link https://github.com/lodash/lodash-webpack-plugin
  addPlugin(
    new LodashModuleReplacementPlugin({
      paths: true,
      flattening: true,
    })
  ),

  // @link https://www.npmjs.com/package/stylelint-webpack-plugin
  addPlugin(
    new StyleLintPlugin({
      fix: true,
    })
  ),

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

// ---

function addPlugin(plugin) {
  return config => {
    config.plugins.push(plugin)
    return config
  }
}
