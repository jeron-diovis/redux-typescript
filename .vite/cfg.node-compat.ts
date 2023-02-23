import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import rollupNodePolyFill from 'rollup-plugin-node-polyfills'

import { defineChunk } from './lib'

/**
 * @see https://stackoverflow.com/a/70666018/3437433
 */
export const useNodeCompat = defineChunk({
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis', // Node.js global to browser globalThis
      },
      plugins: [
        NodeModulesPolyfillPlugin(),
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
      ],
    },
  },

  build: {
    rollupOptions: {
      plugins: [
        // Enable rollup polyfills plugin used during production bundling
        rollupNodePolyFill(),
      ],
    },
  },
})
