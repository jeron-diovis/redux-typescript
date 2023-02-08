import { UserConfig } from 'vite'

import { merge, mergeWith, partialRight } from 'lodash-es'

export const mergeConfig: typeof merge = partialRight(mergeWith, (a, b) => {
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
      : mergeConfig(base, cfg)
