import react from '@vitejs/plugin-react'

import { useConfig } from './lib'

export const useReact = useConfig({
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
  ],
})
