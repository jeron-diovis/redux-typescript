const { useBabelRc, override, addBundleVisualizer } = require('customize-cra')
const { merge } = require('lodash')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const detectPort = require('detect-port')

module.exports = override(
  useBabelRc(),

  // @link https://www.npmjs.com/package/webpack-bundle-analyzer
  addBundleAnalyzerPlugin({
    analyzerHost: '0.0.0.0',
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

function addBundleAnalyzerPlugin(opts) {
  let port = process.env.ANALYZER_PORT || 8888

  // Find free port, like CRA does for webpack-dev-server port
  // It's not 100% reliable, since build won't wait for this operation
  // (in difference from CRA, where it's integrated into workflow)
  // But mostly, we can expect it will have enough time while CRA runs all it's async startup logic.
  detectPort(port, (err, freePort) => {
    if (err) {
      console.log(err);
    }

    if (freePort !== port) {
      console.log(`\n[WBA] analyzer port ${port} is occupied. Switching to ${freePort}\n`);
      port = freePort
    }
  })

  return addBundleVisualizer({
    ...opts,
    // Use getter to provide dynamic value
    get analyzerPort() {
      return port
    },
  })
}
