import { UserConfig } from 'vite'

import { merge as mergeBase, mergeWith, partialRight } from 'lodash-es'

type Merge = typeof mergeBase
const merge: Merge = partialRight(mergeWith, (a: unknown, b: unknown) => {
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.concat(b)
  }
})

export type Configurator<Required extends boolean = true> = (
  base: UserConfig
) => Required extends true ? UserConfig : UserConfig | void

/**
 * <pre>
 *   useConfig({ plugins: [ myPlugin() ] })
 *
 *   useConfig(base => { do something conditional with config })
 * </pre>
 */
export const useConfig =
  (cfg: UserConfig | Configurator<false>): Configurator =>
  base =>
    typeof cfg === 'function'
      ? ((cfg(base) ?? base) as UserConfig)
      : merge(base, cfg)
