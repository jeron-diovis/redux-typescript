import checker from 'vite-plugin-checker'

import pkg from '../package.json'

import { useConfig } from './lib'

export const useLint = useConfig({
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
    }),
  ],
})
