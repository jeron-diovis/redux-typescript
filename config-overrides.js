const { useBabelRc, override, addBundleVisualizer } = require('customize-cra')

module.exports = override(
  useBabelRc(),

  // @link https://www.npmjs.com/package/webpack-bundle-analyzer
  addBundleVisualizer({
    openAnalyzer: false,
    analyzerPort: 9999, // default 8888 is going to be occupied by backend services
    analyzerMode: process.env.NODE_ENV === 'production' ? 'static' : 'server',
    generateStatsFile: true,
  })
)
