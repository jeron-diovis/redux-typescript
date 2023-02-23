export type Promised<T = unknown> = T | Promise<T>

/**
 * All the stuff below can be eliminated completely by just using this instead of 'reduceAsync':
 * > reduce(async (a, b) => fn(await a, await b))
 * But, the goal was to return a _sync_ value if there are no promises among config chunks.
 */
type PromisedBy<T, R> = T extends Promise<unknown> ? Promise<R> : R

type Wait = <R, V>(x: Promised<V>, cb: (x: V) => R) => PromisedBy<typeof x, R>
type ReduceAsync = <T, R>(
  fn: (memo: R, x: T) => Promised<R>,
  xs: Promised<T>[],
  seed: Promised<R>
) => Promised<R>

export const wait: Wait = (x, cb) =>
  (x instanceof Promise ? x.then(cb) : cb(x)) as PromisedBy<
    typeof x,
    ReturnType<typeof cb>
  >

export const reduceAsync: ReduceAsync = (fn, xs, seed) =>
  xs.reduce((m, x) => wait(m, m => wait(x, x => fn(m, x))) as typeof seed, seed)
