import sysPath from 'path'

import tsconfigPaths from 'vite-tsconfig-paths'

import { defineConfig } from './.vite'

// https://vitejs.dev/config/
// Lots of stuff here: https://github.com/vitejs/awesome-vite#plugins
export default defineConfig({
  resolve: {
    /** Note these aliases imply css files too – affecting paths in `composes` prop. */
    alias: {
      src: sysPath.resolve(__dirname, 'src'),

      /* Handy alias to navigate a vast nested mocks structure.
       * Supposed to be used _only_ inside '/mock' folder.
       * DO NOT import it in app sources. */
      '~mock': sysPath.resolve(__dirname, 'mock'),
    },
  },

  plugins: [
    /* Note that this plugin is NOT equivalent to `resolve.alias` option.
     * It does resolve imports – yet if, for example, some plugin relies
     * specifically on an alias configured (like "mock-dev-server" plugin does) –
     * tsconfig-paths will NOT help with that. */
    tsconfigPaths(),
  ],
})
