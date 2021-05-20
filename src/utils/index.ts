import qs from 'qs'
export * from './redux'

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
