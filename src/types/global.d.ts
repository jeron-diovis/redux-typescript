import React, { CSSProperties } from 'react'

/**
 * Put globals here instead of standard `src/global.d.ts`, because here we can
 * - use imports
 * - use module augmentations, without overriding module completely
 */

/* In some weird way, presence of this import makes export into global namespace below work properly.
 * Without it, all re-exported helpers resolve to `any`. */
import 'utility-types'

// put some of the most common helpers into globals
declare global {
  export type {
    Primitive,
    Optional,
    Required as RequiredProps,
    Overwrite,
    Assign,
  } from 'utility-types'
}

declare global {
  // ---
  // Handy shortcuts
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
   *
   * In `assignable` mode, it will look for keys a `T` is assignable to.
   * In `extending`, it will look for keys which do extend `T`
   * <pre>
   *   // `number | string` is not assignable to `number`:
   *   FilterKeys<{ a: number }, number | string, 'pick', 'assignable'> => never
   *   // `number` does extend `number | string`:
   *   FilterKeys<{ a: number }, number | string, 'pick', 'extending'> => 'a'
   * </pre>
   */
  type FilterKeys<
    O,
    T,
    Mode extends 'pick' | 'omit' = 'pick',
    Relation extends 'assignable' | 'extending' = 'assignable'
  > = Values<
    OmitNullable<{
      [K in keyof Required<O>]: (
        Relation extends 'assignable' ? Extends<T, O[K]> : Extends<O[K], T>
      ) extends (Mode extends 'pick' ? true : false)
        ? K
        : null
    }>
  >

  /**
   * <pre>
   *   OverwriteByValue<{ a: string, b: number }, number, boolean> => { a: string, b: boolean }
   * </pre>
   */
  type OverwriteByValue<O, TypeToReplace, NewType> = {
    [K in keyof O]: O[K] extends TypeToReplace ? NewType : O[K]
  }
}

// ---
// module internals

type OmitNullable<O> = {
  [K in keyof O]: null extends O[K] ? never : K
}

type Extends<Type, Base> = Type extends Base ? true : false
