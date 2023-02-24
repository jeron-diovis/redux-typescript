import { useBundleVisualizer } from './cfg.bundle-visualizer'
import { useChunkSplit } from './cfg.chunk-split'
import { useJsonServer } from './cfg.json-server'
import { useLint } from './cfg.lint'
import { useModularImports } from './cfg.modular-imports'
import { useNodeCompat } from './cfg.node-compat'
import { useProxy } from './cfg.proxy'
import { useReact } from './cfg.react'
import { useCSS } from './cfg.styles'
import { useChunks } from './lib'

export const defineConfig = useChunks([
  useReact,
  useCSS,
  useLint,
  useModularImports,
  useNodeCompat,
  useJsonServer,
  useChunkSplit,
  useProxy,
  useBundleVisualizer, // make sure this one is always the last – to get more accurate filesize data
])
