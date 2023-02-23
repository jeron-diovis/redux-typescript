import { ConfigEnv, UserConfig, UserConfigFn } from 'vite'

import { isFunction, merge, mergeWith, partialRight } from 'lodash-es'

import { Promised, reduceAsync, wait } from './lib.async'

// ---

export const mergeConfig: typeof merge = partialRight(
  mergeWith,
  (a: unknown, b: unknown) => {
    if (Array.isArray(a) && Array.isArray(b)) {
      return a.concat(b)
    }
  }
)

// ---

type PromisedConfig = ReturnType<UserConfigFn>

type If<Cond extends boolean, Value> = Cond extends true ? Value : never

type CfgInit<Static extends boolean = false> =
  | UserConfigFn
  | If<Static, PromisedConfig>

type CfgChunk<Mutable extends boolean = false> = (
  base: UserConfig,
  env: ConfigEnv
) => Promised<UserConfig | If<Mutable, void>>

type ChunkFactory = (config: PromisedConfig | CfgChunk<true>) => CfgChunk

type ConfigBuilder = (chunks: CfgChunk[]) => (base: CfgInit<true>) => CfgInit

// ---

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
export const defineChunk: ChunkFactory = cfg => (base, env) =>
  wait(isFunction(cfg) ? cfg(base, env) : cfg, cfg =>
    // `undefined` assumes that config has been mutated
    cfg === undefined ? base : mergeConfig(base, cfg)
  )

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
  reduceAsync(
    (cfg, chunk) => chunk(cfg, env),
    fns,
    isFunction(init) ? init(env) : init
  )
