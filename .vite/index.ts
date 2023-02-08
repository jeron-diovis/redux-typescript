import { flow, identity } from 'lodash-es'

import { useBundleVisualizer } from './cfg.bundle-visualizer'
import { useJsonServer } from './cfg.json-server'
import { useLint } from './cfg.lint'
import { useModularImports } from './cfg.modular-imports'
import { useNodeApp } from './cfg.node-app'
import { useNodeCompat } from './cfg.node-compat'
import { Configurator } from './lib'

const applyPlugins = flow(
  useLint,
  useModularImports,
  useNodeCompat,
  useJsonServer,
  useBundleVisualizer,
  useNodeApp
)

export const withPlugins: Configurator = flow(identity, applyPlugins)
