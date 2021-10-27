/* eslint-disable */
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = app => {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
  })

  const { API_PROXY_TARGET } = process.env

  if (API_PROXY_TARGET) {
    app.use(
      ['/api'],
      createProxyMiddleware({
        target: API_PROXY_TARGET,
        changeOrigin: true,
      })
    )
  }
}
