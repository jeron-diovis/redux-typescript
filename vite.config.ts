import sysPath from 'path'

import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import react from '@vitejs/plugin-react'
import rollupNodePolyFill from 'rollup-plugin-node-polyfills'
import { visualizer } from 'rollup-plugin-visualizer'
import { type PluginOption, UserConfig, defineConfig } from 'vite'
import checker from 'vite-plugin-checker'
import importus from 'vite-plugin-importus'
import mockDevServerPlugin from 'vite-plugin-mock-dev-server'
import { reactClickToComponent } from 'vite-plugin-react-click-to-component'
import svgr from 'vite-plugin-svgr'
import timeReporter from 'vite-plugin-time-reporter'

import { flow, merge as mergeBase, mergeWith, partialRight } from 'lodash-es'

// @ts-expect-error This directive is for IDE only. Vite itself is fine with importing this module.
import pkg from './package.json'

// ---

const merge: typeof mergeBase = partialRight(mergeWith, (a, b) => {
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.concat(b)
  }
})

const useConfig =
  (cfg: UserConfig) =>
  (base: UserConfig): UserConfig =>
    merge(base, cfg)

/**
 * @see https://stackoverflow.com/a/70666018/3437433
 */
const useNodeCompat = useConfig({
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

const useLint = useConfig({
  plugins: [
    /**
     * There are separate plugins for js and css:
     * @see https://www.npmjs.com/package/vite-plugin-eslint
     * @see https://www.npmjs.com/package/vite-plugin-stylelint
     * They have more options and allow for a good fine-grained output.
     * BUT they work each on their own, overwriting console output of each other.
     * And we need some workaround for typescript checks also.
     *
     * This plugin handles everything at once integrally – at cost of a worse configurability.
     */
    checker({
      typescript: true,

      /**
       * Add `--max-warnings=0` to make `vite build` fail if anything violates lint rules.
       * Somehow, this does not affect behavior of dev mode.
       */
      eslint: { lintCommand: `${pkg.scripts['lint:js']} --max-warnings=0` },
      stylelint: {
        lintCommand: `${pkg.scripts['lint:css']} --max-warnings=0`,
      },

      /** Sadly, it's impossible to manage linter's severity with this plugin,
       * so by default it will open overlay for any non-important warnings.
       * With this, it's collapses to a tiny window in a corner, and stay that until you ask.
       */
      overlay: { initialIsOpen: false },
    }),
  ],
})

const useModularImports = useConfig({
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
      // TODO: date-fns, MUI, ...
    ]),
  ],
})

const useJsonServer = useConfig({
  plugins: [
    /** @see https://github.com/pengzhanbo/vite-plugin-mock-dev-server#options */
    mockDevServerPlugin(),
  ],

  server: {
    proxy: {
      /**
       * DevServerPlugin requires a proxy to be set for mocked routes.
       * Doesn't matter where it points to – you can set `target: ''` – it just has to be defined.
       *
       * For real app, replace this demo config with your backend.
       */
      '^/api': {
        target: 'https://jsonplaceholder.typicode.com/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
})

function pluginBundleVisualizer() {
  return (['sunburst', 'treemap', 'network'] as const).map(
    template =>
      visualizer({
        emitFile: true,
        filename: `stats/${template}.html`,
        template,
        gzipSize: true,
        open: true,
      }) as unknown as PluginOption
  )
}

// ---

const configure = flow(
  defineConfig,
  useLint,
  useModularImports,
  useNodeCompat,
  useJsonServer
)

// https://vitejs.dev/config/
// Lots of stuff here: https://github.com/vitejs/awesome-vite#plugins
export default configure({
  resolve: {
    /** Note these aliases imply css files too – affecting paths in `composes` prop. */
    alias: {
      src: sysPath.resolve(__dirname, 'src'),
    },
  },

  css: {
    devSourcemap: true,
    modules: {
      localsConvention: 'camelCase',
    },
  },

  plugins: [
    react({
      babel: {
        /** @see https://github.com/vitejs/vite/discussions/7927#discussioncomment-4767333 */
        plugins: [
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }],
          'jsx-control-statements',
        ],
      },
    }),
    reactClickToComponent(), // Hold Alt to show component source location
    svgr(),
    timeReporter(),
    pluginBundleVisualizer(),
  ],
})
