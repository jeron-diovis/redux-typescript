import sysPath from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { reactClickToComponent } from 'vite-plugin-react-click-to-component'
import svgr from 'vite-plugin-svgr'
import timeReporter from 'vite-plugin-time-reporter'

import { withPlugins } from './.vite'

// https://vitejs.dev/config/
// Lots of stuff here: https://github.com/vitejs/awesome-vite#plugins
export default defineConfig(
  withPlugins({
    resolve: {
      /** Note these aliases imply css files too – affecting paths in `composes` prop. */
      alias: {
        src: sysPath.resolve(__dirname, 'src'),
      },
    },

    css: {
      devSourcemap: true,
      modules: {
        localsConvention: 'camelCase',
      },
    },

    plugins: [
      react({
        babel: {
          /** @see https://github.com/vitejs/vite/discussions/7927#discussioncomment-4767333 */
          plugins: [
            ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }],
            'jsx-control-statements',
          ],
        },
      }),
      reactClickToComponent(), // Hold Alt to show component source location
      svgr(),
      timeReporter(),
    ],
  })
)
