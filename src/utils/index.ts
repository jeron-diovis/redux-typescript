import { ForwardedRef } from 'react'

import qs from 'qs'

export * from './redux'

export { shallowEqual } from 'react-redux'

export function assert<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new Error(`Expected 'val' to be defined, but received ${val}`)
  }
}

export function assignRef<T>(
  ref: ForwardedRef<T> | undefined,
  value: T | null // add `null` here because ForwardedRef adds it implicitly
): void {
  if (ref === null || ref === undefined) return

  if (typeof ref === 'function') {
    ref(value)
  } else {
    ref.current = value
  }
}

export function parseQueryString(string: string) {
  return qs.parse(string, { ignoreQueryPrefix: true })
}

export function dictOf<T, K extends string | symbol = string>(
  value: T,
  keys: K[]
): Record<K, T> {
  return keys.reduce((acc, k) => {
    acc[k] = value
    return acc
  }, {} as Record<K, T>)
}
