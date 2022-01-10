import { MutableRefObject, useEffect, useLayoutEffect, useRef } from 'react'

import { shallowEqual } from 'src/utils'

import { useOnMount, useOnMountLayout } from './effects'

// ---

export function useConst<T>(value: T): T {
  return useRef(value).current
}

// Use `Readonly`, because `RefObject` interface forces value type to `T | null`
export function useLatestRef<T>(value: T): Readonly<MutableRefObject<T>> {
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
  layout?: boolean
}

export function useOnChange<T>(
  value: T,
  callback: (current: T, prev: T) => void,
  options: UseOnChangeHookOptions<T> = {}
): void {
  const { eq = shallowEqual, onMount = false, layout = false } = options

  const previous = useRef(value)

  const isLayoutMode = useInvariant(layout, {
    label: 'Option "layout"',
  })

  const useEffectHook = isLayoutMode ? useLayoutEffect : useEffect
  const useMountHook = isLayoutMode ? useOnMountLayout : useOnMount

  useEffectHook(() => {
    if (!eq(value, previous.current)) {
      callback(value, previous.current)
      previous.current = value
    }
  })

  useMountHook(() => {
    if (onMount) {
      callback(value, previous.current)
    }
  })
}

// ---

interface UseInvariantOptions<T> {
  label?: string
  eq?: Comparator<T>
}

export function useInvariant<T>(x: T, opts: UseInvariantOptions<T> = {}): T {
  const { label = 'value', eq = shallowEqual } = opts
  const ref = useRef(x)

  if (!eq(x, ref.current)) {
    console.error(
      `${label} is not supposed to change during component lifecycle.\nGot change: %o -> %o`,
      ref.current,
      x
    )
    throw new Error(
      `${label} is not supposed to change during component lifecycle.\nGot change: ${ref.current} -> ${x}`
    )
  }

  return x
}
