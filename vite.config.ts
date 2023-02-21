import { defineConfig } from 'vite'
import timeReporter from 'vite-plugin-time-reporter'

import { withPlugins } from './.vite'

// https://vitejs.dev/config/
// Lots of stuff here: https://github.com/vitejs/awesome-vite#plugins
export default defineConfig(
  withPlugins({
    build: {
      lib: {
        entry: 'src/index',
        formats: ['es', 'cjs'],
      },
      sourcemap: true,

      rollupOptions: {
        external: ['react'],
      },
    },

    plugins: [timeReporter()],
  })
)
