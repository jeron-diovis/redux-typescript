import importus from 'vite-plugin-importus'

import { useConfig } from './lib'

export const useModularImports = useConfig({
  plugins: [
    importus([
      {
        /**
         * For lodash, it is possible to use `lodash-es` package instead, which is tree-shaked automatically.
         * But it has no support for lodash/fp version – which is a significant drawback, as for me.
         * With this plugin, it is possible to use fp in just the same way:
         */
        libraryName: 'lodash',
        camel2DashComponentName: false,
        customName: name => `lodash/${name}`,
      },
      {
        libraryName: 'date-fns',
        camel2DashComponentName: false,
        customName: name => `date-fns/${name}`,
      },
    ]),
  ],
})
