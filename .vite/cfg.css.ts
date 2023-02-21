import { useConfig } from './lib'

export const useCSS = useConfig({
  css: {
    devSourcemap: true,
    modules: {
      localsConvention: 'camelCase',
    },
  },
})
