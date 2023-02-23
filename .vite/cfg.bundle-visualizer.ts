import { visualizer } from 'rollup-plugin-visualizer'

import { defineChunk } from './lib'

export const useBundleVisualizer = defineChunk({
  plugins: [
    (['sunburst', 'treemap', 'network'] as const).map(template =>
      visualizer({
        emitFile: true,
        filename: `stats/${template}.html`,
        template,
        gzipSize: true,
      })
    ),
  ],
})
