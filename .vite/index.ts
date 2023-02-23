import { flow, identity } from 'lodash-es'

import { useBundleVisualizer } from './cfg.bundle-visualizer'
import { useChunkSplit } from './cfg.chunk-split'
import { useJsonServer } from './cfg.json-server'
import { useLint } from './cfg.lint'
import { useModularImports } from './cfg.modular-imports'
import { useNodeCompat } from './cfg.node-compat'
import { useReact } from './cfg.react'
import { useCSS } from './cfg.styles'
import { Configurator } from './lib'

const applyPlugins = flow(
  useReact,
  useCSS,
  useLint,
  useModularImports,
  useNodeCompat,
  useJsonServer,
  useChunkSplit,
  // make sure this one is always the last – to get more accurate filesize data
  useBundleVisualizer
)

export const withPlugins: Configurator = flow(identity, applyPlugins)
