import react from '@vitejs/plugin-react'
import { reactClickToComponent } from 'vite-plugin-react-click-to-component'
import reactControlStatements from 'vite-plugin-react-control-statements'
import svgr from 'vite-plugin-svgr'
import { defineChunk } from 'vite-split-config'

export const useReact = defineChunk({
  plugins: [
    react(),
    reactControlStatements(),
    svgr(), // import { ReactComponent } from '*.svg?react'
    reactClickToComponent() /* @see https://github.com/ArnaudBarre/vite-plugin-react-click-to-component */,
  ],
})
