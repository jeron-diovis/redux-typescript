import { chunkSplitPlugin } from 'vite-plugin-chunk-split'

import { useConfig } from './lib'

export const useChunkSplit = useConfig({
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
