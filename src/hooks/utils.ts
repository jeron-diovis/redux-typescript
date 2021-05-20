import { getSearch } from 'connected-react-router'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { parseQueryString } from 'src/utils'

export function useQueryParams() {
  const search = useSelector(getSearch)
  return useMemo(() => parseQueryString(search), [search])
}
