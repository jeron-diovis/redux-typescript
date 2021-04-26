// ---
// Handy shortcuts
type Primitive = string | number | boolean
type Dict<V = unknown> = Record<string, V>
type Func<V = any> = (...args: any[]) => V
type Values<T> = T[keyof T]

// ---
// Utilities

// In addition to standard `ReturnType`
type ReturnTypeAsync<T extends Func<Promise<unknown>>> = T extends Func<Promise<infer RT>>
  ? RT
  : never

/**
 * Require all optional props to be explicitly listed
 *
 * <pre>
 *  { a?: number } => { a: number | undefined }
 * </pre>
 *
 * @link {https://medium.com/terria/typescript-transforming-optional-properties-to-required-properties-that-may-be-undefined-7482cb4e1585}
 */
type Complete<T> = {
  [P in keyof Required<T>]: Pick<T, P> extends Required<Pick<T, P>>
    ? T[P]
    : T[P] | undefined
}

/**
 * <pre>
 *  FilterKeys<{ a: 1, b: true }, number, 'pick'> => 'a'
 *  FilterKeys<{ a: 1, b: true }, number, 'omit'> => 'b'
 * </pre>
 */
type FilterKeys<O, T, Mode extends 'pick' | 'omit' = 'pick'> = Values<{
  [K in keyof O]: Mode extends 'omit'
    ? O[K] extends T
      ? never
      : K
    : O[K] extends T
      ? K
      : never
}>
