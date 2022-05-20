/* eslint-disable no-console */
import sysPath from 'path'

import { static as serveStatic } from 'express'
import expressRewrite from 'express-urlrewrite'
import * as jsonServer from 'json-server'

import { WEB_PATH_STATIC } from './const'
import DB from './db'

// types for this lib somehow only allow string as `from`, although lib itself does accept regexps
const rewrite = (from: string | RegExp, to?: string) =>
  expressRewrite(from as string, to)

export function setupServer() {
  const server = jsonServer.create()

  const dbRouter = jsonServer.router(DB)
  const middlewares = jsonServer.defaults()

  server.use(middlewares)

  server.use(jsonServer.bodyParser)

  server.use(
    `/${WEB_PATH_STATIC}`,
    serveStatic(sysPath.resolve(__dirname, '../public'))
  )

  // ---
  // static routes from db file:

  server.use(rewrite('/api/*', '/$1'))

  /**
   * Since db.json router doesn't support /any/nested/paths, trying to be smart here:
   * - define db routes as `/any_nested_paths`
   * - look for "compatible" parts in received url and replace them with db routes
   */
  const dbRoutes = Object.keys(DB)
  server.use((req, res, next) => {
    const pseudo_slash = '_'
    const pseudo_url = req.url
      .replaceAll(/^\/|\/$/g, '')
      .replaceAll('/', pseudo_slash)
    const route =
      // try to find the best match first
      dbRoutes.find(path => pseudo_url === path) ||
      dbRoutes.find(path => pseudo_url.startsWith(path))
    if (route !== undefined) {
      const replaceable = route.replaceAll(pseudo_slash, '/')
      console.log(
        '[db-route found]: %s : %s -> %s',
        req.url,
        replaceable,
        route
      )
      req.url = req.url.replaceAll(replaceable, route)
    }
    next()
  })

  // default router must be after all others routes
  server.use(dbRouter)

  // ---

  return server
}
