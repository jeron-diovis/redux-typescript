import react from '@vitejs/plugin-react'
import reactControlStatements from 'vite-plugin-react-control-statements'
import svgr from 'vite-plugin-svgr'
import { defineChunk } from 'vite-split-config'

export const useReact = defineChunk({
  plugins: [
    react(),
    reactControlStatements(),
    svgr(), // import { ReactComponent } from '*.svg?react'
  ],
})
