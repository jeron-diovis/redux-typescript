import { chunkSplitPlugin } from 'vite-plugin-chunk-split'

import { defineChunk } from './lib'

export const useChunkSplit = defineChunk({
  plugins: [
    /** @see https://www.npmjs.com/package/vite-plugin-chunk-split */
    chunkSplitPlugin({
      strategy: 'single-vendor',
      customSplitting: {
        react: [/react/],
      },
    }),
  ],
})
