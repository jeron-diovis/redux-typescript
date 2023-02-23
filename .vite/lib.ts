import { ConfigEnv, UserConfig } from 'vite'

import { isFunction, merge, mergeWith, partialRight } from 'lodash-es'

export const mergeConfig: typeof merge = partialRight(
  mergeWith,
  (a: unknown, b: unknown) => {
    if (Array.isArray(a) && Array.isArray(b)) {
      return a.concat(b)
    }
  }
)

type If<Cond extends boolean, Value> = Cond extends true ? Value : never

type CfgInit<Static extends boolean = false> =
  | ((env: ConfigEnv) => UserConfig)
  | If<Static, UserConfig>

type CfgChunk<Mutable extends boolean = false> = (
  base: UserConfig,
  env: ConfigEnv
) => UserConfig | If<Mutable, void>

type ChunkFactory = (config: UserConfig | CfgChunk<true>) => CfgChunk

type ConfigBuilder = (chunks: CfgChunk[]) => (base: CfgInit<true>) => CfgInit

/**
 * <pre>
 *   useConfig({ plugins: ... })
 *
 *   useConfig((base, env) => ({
 *     plugins: ...
 *   }))
 *
 *   useConfig((base, env) => {
 *     base.plugins.push(...)
 *   })
 * </pre>
 */
export const defineChunk: ChunkFactory = cfg => (base, env) => {
  const ext = isFunction(cfg) ? cfg(base, env) : cfg
  // `undefined` assumes that config has been mutated
  return ext === undefined ? base : mergeConfig(base, ext)
}

/**
 * <pre>
 *   // somewhere in dedicated modules
 *   const plugin1 = defineChunk(...)
 *   const plugin2 = defineChunk(...)
 *   const configure = useChunks([ plugin1, plugin2 ])
 *
 *   // vite.config.ts
 *   defineConfig(configure({ ...your basic config... }))
 *   defineConfig(configure(env => ({ ... })))
 * </pre>
 */
export const useChunks: ConfigBuilder = fns => init => env =>
  fns.reduce(
    (cfg, plugin) => plugin(cfg, env),
    isFunction(init) ? init(env) : init
  )
