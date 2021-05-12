export * from './redux'

export function assignRef<T>(ref: MutableRef<T> | undefined, value: T) {
  if (ref === null || ref === undefined) return

  if (typeof ref === 'function') {
    ref(value)
  } else {
    ref.current = value
  }
}
