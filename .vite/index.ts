import { flow, identity } from 'lodash-es'

import { useBundleVisualizer } from './cfg.bundle-visualizer'
import { useLint } from './cfg.lint'
import { useNodeApp } from './cfg.node-app'
import { Configurator } from './lib'

const applyPlugins = flow(useLint, useBundleVisualizer, useNodeApp)

export const withPlugins: Configurator = flow(identity, applyPlugins)
