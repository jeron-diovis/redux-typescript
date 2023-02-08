import { VitePluginNode } from 'vite-plugin-node'

import { useConfig } from './lib'

/**
 * @see https://github.com/axe-me/vite-plugin-node#get-started
 */
export const useNodeApp = useConfig({
  plugins: [
    VitePluginNode({
      adapter: 'express',
      appPath: 'src/main.ts',
      exportName: 'default',
    }),
  ],
})
