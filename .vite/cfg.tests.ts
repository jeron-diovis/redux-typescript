/// <reference types="vitest" />
import { configDefaults } from 'vitest/config'

import { defineChunk } from './lib'

export const useTests = defineChunk({
  test: {
    globals: true,

    forceRerunTriggers: [...configDefaults.forceRerunTriggers, '**/.vite/**'],
    /**
     * Uncomment to enable in-source testing.
     * @see https://vitest.dev/guide/in-source.html
     */
    // includeSource: ['src/**/*.{js,ts}{,x}'],
  },
  /**
   * @see https://vitest.dev/guide/in-source.html#production-build
   */
  define: { 'import.meta.vitest': 'undefined' },
})
