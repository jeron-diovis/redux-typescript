import { getSearch } from 'connected-react-router'
import { useCallback, useMemo, useRef } from 'react'
import { useSelector } from 'react-redux'

import { createDraft } from 'immer'

import { parseQueryString } from 'src/utils'

export function useQueryParams() {
  const search = useSelector(getSearch)
  return useMemo(() => parseQueryString(search), [search])
}

export function useDraft<T extends object>(data: T): T {
  return useMemo(() => createDraft(data), [data]) as T
}

/**
 * Resulting function remains the same no matter what,
 * but can be called with arbitrary params from closure.
 *
 * It's an optimization helper.
 * Should be used for callbacks which depend on some values in context,
 * whose changes themselves should not cause children elements update.
 */
export function useClosureCallback<F extends Func>(fn: F) {
  const ref = useRef(fn)
  ref.current = fn
  return useCallback(
    (...args: Parameters<F>): ReturnType<F> => ref.current(...args),
    []
  )
}
