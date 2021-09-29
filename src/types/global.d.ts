import React, { CSSProperties } from 'react'

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

  type IStyled = {
    style?: CSSProperties
    className?: string
  }

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
   *   FilterKeys<{ a: number, b: boolean }, number, 'pick'> => 'a'
   *   FilterKeys<{ a: number, b: boolean }, number, 'omit'> => 'b'
   * </pre>
   */
  type FilterKeys<O, T, Mode extends 'pick' | 'omit' = 'pick'> = Values<
    OmitNullable<{
      [K in keyof Required<O>]: Extends<T, O[K]> extends (
        Mode extends 'pick' ? true : false
      )
        ? K
        : null
    }>
  >

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

// ---
// module internals

type OmitNullable<O> = {
  [K in keyof O]: null extends O[K] ? never : K
}

type Extends<Type, Base> = Type extends Base ? true : false
