import qs from 'qs'
export * from './redux'

export { shallowEqual } from 'react-redux'

export function assignRef<T>(ref: MutableRef<T> | undefined, value: T): void {
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

export function dictOf<T, K extends string = string>(
  value: T,
  keys: K[]
): Record<K, T> {
  return keys.reduce((acc, k) => {
    acc[k] = value
    return acc
  }, {} as Record<K, T>)
}
