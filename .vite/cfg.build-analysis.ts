import { visualizer } from 'rollup-plugin-visualizer'
import timeReporter from 'vite-plugin-time-reporter'

import { defineChunk } from './lib'

export const useBuildAnalysis = defineChunk({
  plugins: [
    (['sunburst', 'treemap', 'network'] as const).map(template =>
      visualizer({
        emitFile: true,
        filename: `stats/${template}.html`,
        template,
        gzipSize: true,
      })
    ),

    timeReporter(),
  ],
})
