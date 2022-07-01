import { ForwardedRef } from 'react'

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

export function combineRefs<T>(...args: Array<ForwardedRef<T> | undefined>) {
  const refs = args.filter(x => x !== undefined)
  if (refs.length < 2) return refs[0]
  // add `null` here because ForwardedRef adds it implicitly
  return (value: T | null) => {
    refs.forEach(ref => {
      assignRef(ref, value)
    })
  }
}
