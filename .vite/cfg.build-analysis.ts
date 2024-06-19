import { analyzer } from 'vite-bundle-analyzer'
import timeReporter from 'vite-plugin-time-reporter'
import { defineChunk } from 'vite-split-config'

export const useBuildAnalysis = defineChunk({
  plugins: [
    analyzer({
      analyzerMode: 'static',
      summary: true,
    }),

    timeReporter(),
  ],
})
