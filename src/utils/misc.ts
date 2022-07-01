import { ReactElement, ReactNode, isValidElement } from 'react'

import { isPrimitive } from 'utility-types'

export function assert<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new Error(`Expected 'val' to be defined, but received ${val}`)
  }
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

export function resolveErrorMessage(e: unknown): ReactNode {
  if (e === null || e === undefined) {
    return null
  }
  if (isValidElement(e as object)) {
    return e as ReactElement
  }
  if (isPrimitive(e)) {
    return e
  }
  if (e instanceof Error || 'message' in (e as Dict)) {
    return (e as Error).message
  }
  return JSON.stringify(e, null, 4)
}
