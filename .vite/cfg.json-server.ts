import mockDevServerPlugin from 'vite-plugin-mock-dev-server'
import { useConfig } from './lib'

export const useJsonServer = useConfig({
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
