import mockDevServerPlugin from 'vite-plugin-mock-dev-server'
import { defineChunk } from 'vite-split-config'

const PREFIX = '/api'

/**
 * Shorthand intended to use in mock modules: { url: url`foo/bar` }
 */
export const url = (x: TemplateStringsArray) => `${PREFIX}/${x}`

export const useJsonServer = defineChunk({
  plugins: [
    /** @see https://github.com/pengzhanbo/vite-plugin-mock-dev-server#options */
    mockDevServerPlugin({
      prefix: PREFIX,
    }),
  ],
})
