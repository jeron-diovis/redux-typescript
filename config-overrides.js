const {
  useBabelRc,
  override,
  addBundleVisualizer,
  addWebpackPlugin,
} = require('customize-cra')
const detectPort = require('detect-port')
const { merge } = require('lodash')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')

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
  addWebpackPlugin(
    new LodashModuleReplacementPlugin({
      paths: true,
      flattening: true,
      currying: true,
      collections: true,
    })
  ),

  // @link https://www.npmjs.com/package/stylelint-webpack-plugin
  addWebpackPlugin(
    new StyleLintPlugin({
      fix: true,
    })
  ),

  // Separate chunk for react-modules, for better build analysis.
  config => {
    merge(config.optimization, {
      splitChunks: {
        cacheGroups: {
          react: {
            test: /[\\/]node_modules[\\/].*react.*/,
            reuseExistingChunk: true,
          },
        },
      },
    })
    return config
  },

  // Fix resolution for native modules
  // @see https://github.com/reactioncommerce/reaction-component-library/issues/399#issuecomment-467860022
  config => {
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    })

    return config
  },

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

function addBundleAnalyzerPlugin(opts) {
  let port = process.env.ANALYZER_PORT || 8888

  // Find free port, like CRA does for webpack-dev-server port
  // It's not 100% reliable, since build won't wait for this operation
  // (in difference from CRA, where it's integrated into workflow)
  // But mostly, we can expect it will have enough time while CRA runs all it's async startup logic.
  detectPort(port, (err, freePort) => {
    if (err) {
      console.log(err)
    }

    if (freePort.toString() !== port.toString()) {
      console.log(
        `\n[WBA] analyzer port ${port} is occupied. Switching to ${freePort}\n`
      )
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
