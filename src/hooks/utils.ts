import { getSearch } from 'connected-react-router'
import { useCallback, useMemo, useRef } from 'react'
import { useDispatch as useDispatchBase, useSelector } from 'react-redux'

import { createDraft } from 'immer'

import { parseQueryString } from 'src/utils'

/**
 * Typed version.
 * Use this over default `useDispatch` everywhere.
 * It's crucial when using `unwrapResult` helper.
 * @see https://redux-toolkit.js.org/api/createAsyncThunk#unwrapping-result-actions
 * Default version doesn't infer dispatched actions types,
 * and thus it's return value is incompatible with `unwrapResult` param type.
 */
export function useDispatch() {
  return useDispatchBase<AppDispatch>()
}

export function useQueryParams<T extends object>(): Partial<T> {
  const search = useSelector(getSearch)
  return useMemo(() => parseQueryString(search) as Partial<T>, [search])
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
