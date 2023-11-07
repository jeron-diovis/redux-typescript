import sysPath from 'path'

import { defineConfig } from './.vite'

// https://vitejs.dev/config/
// Lots of stuff here: https://github.com/vitejs/awesome-vite#plugins
export default defineConfig({
  resolve: {
    /** Note these aliases imply css files too – affecting paths in `composes` prop. */
    alias: {
      src: sysPath.resolve(__dirname, 'src'),

      /* Should be used only inside `mock` folder.
       * To make intellisense work, also requires to define this alias in `mock/tsconfig.json` */
      '~mock': sysPath.resolve(__dirname, 'mock'),
    },
  },
})
