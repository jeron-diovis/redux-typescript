import sysPath from 'path'

import { defineConfig } from 'vite'
import timeReporter from 'vite-plugin-time-reporter'

import { withPlugins } from './.vite'

// https://vitejs.dev/config/
// Lots of stuff here: https://github.com/vitejs/awesome-vite#plugins
export default defineConfig(
  withPlugins({
    resolve: {
      alias: {
        src: sysPath.resolve(__dirname, 'src'),
      },
    },

    plugins: [timeReporter()],
  })
)
