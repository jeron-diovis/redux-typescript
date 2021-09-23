import React, { ForwardRefRenderFunction } from 'react'

/**
 * Put globals here instead of standard `src/global.d.ts`, because here we can
 * - use imports
 * - use module augmentations, without overriding module completely
 */
declare global {
  // ---
  // Handy shortcuts
  type Primitive = string | number | boolean
  type Values<T> = T[keyof T]
  type Dict<V = unknown> = Record<string, V>
  type Func<V = any> = (...args: any[]) => V // eslint-disable-line @typescript-eslint/no-explicit-any

  // ---
  // jsx-control-statements support
  // @see https://github.com/AlexGilleran/jsx-control-statements/issues/72#issuecomment-389484553
  declare const If: React.FC<{ condition: boolean }>
  declare const Choose: React.FC
  declare const When: React.FC<{ condition: boolean }>
  declare const Otherwise: React.FC
  // Don't support <With> / <For>, because they are hard to type properly,
  // and only complicate code readability anyway.

  // ---
  // Utilities

  /**
   * This is what react type definitions lack.
   *
   * It has shorthand type `Ref` – which is *immutable* ref:
   * @link https://github.com/DefinitelyTyped/DefinitelyTyped/blob/0a6c9582b0cf04de29c11775adc55c0cbda8ea42/types/react/v16/index.d.ts#L88
   *
   * But `forwardRef` accepts a MutableRefObject instead of RefObject:
   * @link https://github.com/DefinitelyTyped/DefinitelyTyped/blob/0a6c9582b0cf04de29c11775adc55c0cbda8ea42/types/react/v16/index.d.ts#L561
   * And there is no shorthand type for this parameter.
   *
   * Which mean, you can't simply define ref prop on your component and pass forwarded ref there.
   */
  type MutableRef<T> = Parameters<ForwardRefRenderFunction<T, unknown>>[1]

  /**
   * In addition to standard `ReturnType`
   */
  type ReturnTypeAsync<T extends Func<Promise<unknown>>> = T extends Func<
    Promise<infer RT>
  >
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
   *  Includes<'a' | 'b', 'b'> => true
   *  Includes<'a' | 'b', 'c'> => false
   * </pre>
   */
  type Includes<T, V> = Extract<T, V> extends never ? false : true

  /**
   * <pre>
   *  Extends<string | null, string, true> => false
   *  Extends<string | null, string, false> => true
   * </pre>
   */
  type Extends<T, V, Strict extends boolean = true> = Strict extends false
    ? Includes<T, V>
    : T extends V
    ? true
    : false

  /**
   * <pre>
   *  FilterKeys<{ a: 1, b: true }, number, 'pick'> => 'a'
   *  FilterKeys<{ a: 1, b: true }, number, 'omit'> => 'b'
   *
   *  FilterKeys<{ a?: 1 }, number, 'pick', true> => never
   *  FilterKeys<{ a?: 1 }, number, 'pick', false> => 'a'
   * </pre>
   */
  type FilterKeys<
    O,
    T,
    Mode extends 'pick' | 'omit' = 'pick',
    Strict extends boolean = true
  > = Values<{
    [K in keyof Required<O>]: [K, never][Extends<O[K], T, Strict> extends (
      Mode extends 'pick' ? true : false
    )
      ? 0
      : 1]
  }>

  /**
   * <pre>
   *  Replace<{ a: string, b: number }, { a: boolean }> => { a: boolean, b: number }
   * </pre>
   */
  type Replace<O, R extends Partial<Record<keyof O, unknown>>> = Omit<
    O,
    keyof R
  > &
    R
}
