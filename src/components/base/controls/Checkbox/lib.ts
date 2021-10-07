import { useRef } from 'react'

import { useOnChange } from 'src/hooks'

export function useIndeterminateRef(state: boolean) {
  const ref = useRef<HTMLInputElement>()
  useOnChange(
    state,
    x => {
      const input = ref.current
      if (input) {
        input.indeterminate = x
      }
    },
    {
      onMount: true,
    }
  )
  return ref
}
