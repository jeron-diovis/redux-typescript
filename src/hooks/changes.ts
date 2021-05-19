import { MutableRefObject, useEffect, useRef } from 'react'
import { shallowEqual } from 'react-redux'

import { useOnMount } from './effects'

// ---

export function useConst<T>(value: T): T {
  return useRef(value).current
}

export function useLatestRef<T>(value: T): MutableRefObject<T> {
  const ref = useRef(value)
  useEffect(() => {
    ref.current = value
  })
  return ref
}

export function useLatest<T>(value: T): T {
  return useLatestRef(value).current
}

// ---

type Comparator<T = unknown> = (a: T, b: T) => boolean

export function useChangedMeta<T>(
  value: T,
  eq: Comparator<T> = shallowEqual
): { value: T; prev: T; changed: boolean } {
  const ref = useRef<T>(value)
  const prev = ref.current
  const changed = !eq(value, prev)
  if (changed) {
    ref.current = value
  }
  return { value, prev, changed }
}

export function useChanged<T>(value: T, eq: Comparator<T> = shallowEqual): T {
  const { value: next, prev, changed } = useChangedMeta(value, eq)
  return changed ? next : prev
}

// ---

type UseOnChangeHookOptions<T = unknown> = {
  onMount?: boolean
  eq?: Comparator<T>
}

export function useOnChange<T>(
  value: T,
  callback: (current: T, prev: T) => void,
  options: UseOnChangeHookOptions<T> = {}
): void {
  const { eq = shallowEqual, onMount = false } = options

  const previous = useRef(value)

  useEffect(() => {
    if (!eq(value, previous.current)) {
      callback(value, previous.current)
      previous.current = value
    }
  })

  useOnMount(() => {
    if (onMount) {
      callback(value, previous.current)
    }
  })
}
