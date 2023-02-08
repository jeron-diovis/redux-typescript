import { defineMock } from 'vite-plugin-mock-dev-server'

const BASE = '/api/'
const url = (x: TemplateStringsArray) => BASE + x

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
