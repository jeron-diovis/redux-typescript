import { defineMock } from 'vite-plugin-mock-dev-server'

import { url } from '../.vite/cfg.json-server'

/**
 * @see https://github.com/pengzhanbo/vite-plugin-mock-dev-server#mock-configuration
 */
export default defineMock([
  {
    url: url`test`,
    body: {
      demo: 'The mock api works!',
    },
  },
])
