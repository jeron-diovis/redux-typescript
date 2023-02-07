import { visualizer } from 'rollup-plugin-visualizer'
import { PluginOption } from 'vite'
import { useConfig } from './lib'

export const useBundleVisualizer = useConfig({
  plugins: [
    ([ 'sunburst', 'treemap', 'network' ] as const).map(
      template =>
        visualizer({
          emitFile: true,
          filename: `stats/${template}.html`,
          template,
          gzipSize: true,
          open: true,
        }) as unknown as PluginOption
    )
  ]
})
