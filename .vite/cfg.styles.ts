import { defineChunk } from './lib'

export const useCSS = defineChunk({
  css: {
    devSourcemap: true,
    modules: {
      localsConvention: 'camelCase',
    },
  },
})
