import sysPath from 'path'

import svgr from 'vite-plugin-svgr'
import timeReporter from 'vite-plugin-time-reporter'

import { defineConfig } from './.vite'

// https://vitejs.dev/config/
// Lots of stuff here: https://github.com/vitejs/awesome-vite#plugins
export default defineConfig({
  resolve: {
    /** Note these aliases imply css files too – affecting paths in `composes` prop. */
    alias: {
      src: sysPath.resolve(__dirname, 'src'),
    },
  },

  plugins: [svgr(), timeReporter()],
})
