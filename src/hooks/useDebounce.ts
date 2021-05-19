import { useMemo, useRef } from 'react'

import { DebounceSettings, debounce } from 'lodash'

import { useChanged } from './changes'

export default function useDebounce<F extends Func>(
  fn: F,
  delay: number,
  options?: DebounceSettings
) {
  const opts = useChanged(options)
  const refFn = useRef(fn)
  refFn.current = fn

  return useMemo(
    () => debounce(((...args) => refFn.current(...args)) as F, delay, opts),
    [delay, opts]
  )
}
