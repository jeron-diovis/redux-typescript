/// <reference types="vite/client" />

declare module '*.svg' {
  import { Component, SVGAttributes } from 'react'

  export const ReactComponent = Component<SVGAttributes<SVGElement>>
}
