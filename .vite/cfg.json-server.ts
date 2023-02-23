import mockDevServerPlugin from 'vite-plugin-mock-dev-server'

import { useConfig } from './lib'

const PREFIX = '/api'

export const url = (x: TemplateStringsArray) => `${PREFIX}/${x}`

export const useJsonServer = useConfig({
  plugins: [
    /** @see https://github.com/pengzhanbo/vite-plugin-mock-dev-server#options */
    mockDevServerPlugin({
      prefix: PREFIX,
    }),
  ],
})
