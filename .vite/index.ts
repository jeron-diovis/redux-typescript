import { flow, identity } from 'lodash-es'

import { useBundleVisualizer } from './cfg.bundle-visualizer'
import { useLint } from './cfg.lint'
import { useNodeCompat } from './cfg.node-compat'
import { useReact } from './cfg.react'
import { Configurator } from './lib'

import { useCSS } from './cfg.css'

const applyPlugins = flow(
  useReact,
  useCSS,
  useLint,
  useNodeCompat,
  useBundleVisualizer
)

export const withPlugins: Configurator = flow(identity, applyPlugins)
