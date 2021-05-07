import { useMemo, useRef } from 'react'

import { DebounceSettings, debounce } from 'lodash'

import { useChanged } from './changes'

export default function useDebounce(
  fn: Func,
  delay: number,
  options?: DebounceSettings
) {
  const opts = useChanged(options)
  const refFn = useRef(fn)
  refFn.current = fn

  return useMemo(
    () => debounce((...args) => refFn.current(...args), delay, opts),
    [delay, opts, refFn]
  )
}
