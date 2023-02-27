/// <reference types="vitest" />
import { defineChunk } from 'vite-split-config'
import { configDefaults } from 'vitest/config'

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
