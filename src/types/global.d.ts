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
  type Dict<V = unknown> = Record<string, V>
  type Func<V = any> = (...args: any[]) => V
  type Values<T> = T[keyof T]

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
  type MutableRef<T> = Parameters<ForwardRefRenderFunction<T, any>>[1]

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
   *  FilterKeys<{ a: 1, b: true }, number, 'pick'> => 'a'
   *  FilterKeys<{ a: 1, b: true }, number, 'omit'> => 'b'
   * </pre>
   */
  type FilterKeys<O, T, Mode extends 'pick' | 'omit' = 'pick'> = Values<
    {
      [K in keyof O]: Mode extends 'omit'
        ? O[K] extends T
          ? never
          : K
        : O[K] extends T
        ? K
        : never
    }
  >
}
