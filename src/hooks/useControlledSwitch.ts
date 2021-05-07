import { useCallback, useRef } from 'react'

type Callback = () => void
type IControlledSwitch = Callback & {
  on: Callback
  off: Callback
}

// Stateless version of @react-hook/switch
export default function useControlledSwitch(
  state: boolean,
  onChange: (state: boolean) => void
): IControlledSwitch {
  const refOnChange = useRef(onChange)
  refOnChange.current = onChange

  const toggle = useCallback(() => {
    refOnChange.current(!state)
  }, [state])

  Object.assign(toggle, {
    on: useCallback(() => {
      refOnChange.current(true)
    }, []),
    off: useCallback(() => {
      refOnChange.current(false)
    }, []),
  })

  return (toggle as unknown) as IControlledSwitch
}
