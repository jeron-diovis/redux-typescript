import sysPath from 'path'

import { reactClickToComponent } from 'vite-plugin-react-click-to-component'

import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import react from '@vitejs/plugin-react'
import { flowRight as compose, merge } from 'lodash-es'
import rollupNodePolyFill from 'rollup-plugin-node-polyfills'
import { PluginVisualizerOptions, visualizer } from 'rollup-plugin-visualizer'
import { type PluginOption, UserConfigExport, defineConfig } from 'vite'
import checker from 'vite-plugin-checker'
import importus from 'vite-plugin-importus'
import svgr from 'vite-plugin-svgr'
import timeReporter from 'vite-plugin-time-reporter'

// @ts-expect-error This directive is for IDE only. Vite itself is fine with importing this module.
import pkg from './package.json'

// Lots of stuff here: https://github.com/vitejs/awesome-vite#plugins

const configure = compose(defineConfig, provideNodeCompat)

// https://vitejs.dev/config/
export default configure({
  resolve: {
    /** Note these aliases imply css files too – affecting paths in `composes` prop. */
    alias: {
      src: sysPath.resolve(__dirname, 'src'),
    },
  },

  plugins: [
    timeReporter(),

    react({
      babel: {
        /** @see https://github.com/vitejs/vite/discussions/7927#discussioncomment-4767333 */
        plugins: [
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }],
          'jsx-control-statements',
        ],
      },
    }),
    // Hold Alt to show component source location; click to open file in default editor:
    reactClickToComponent(),

    svgr(),

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
    ]),

    ...bundleVisualizer(),
  ],

  css: {
    devSourcemap: true,
    modules: {
      localsConvention: 'camelCase',
    },
  },
})

// ---

/**
 * @see https://stackoverflow.com/a/70666018/3437433
 */
function provideNodeCompat(config: UserConfigExport): UserConfigExport {
  return merge(config, {
    optimizeDeps: {
      esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
          global: 'globalThis',
        },
        // Enable esbuild polyfill plugins
        plugins: [
          NodeGlobalsPolyfillPlugin({
            process: true,
            buffer: true,
          }),
          NodeModulesPolyfillPlugin(),
        ],
      },
    },

    build: {
      rollupOptions: {
        plugins: [
          // Enable rollup polyfills plugin
          // used during production bundling
          rollupNodePolyFill(),
        ],
      },
    },
  })
}

function bundleVisualizer() {
  const templates: PluginVisualizerOptions['template'][] = [
    'sunburst',
    'treemap',
    'network',
  ]
  return templates.map(
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
