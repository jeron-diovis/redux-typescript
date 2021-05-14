import { useCallback, useRef } from 'react'

import useSwitchOriginal from '@react-hook/switch'

type IUseSwitch = typeof useSwitchOriginal
type SwitchTuple = ReturnType<IUseSwitch>
type SwitchCallback = SwitchTuple[1]

/**
 * Patch `useSwitch` to make it return constant callbacks.
 *
 * Re-creating callbacks whenever state changes, as origin `useSwitch` does, doesn't make any sense.
 * If some component accepts a switch callback, but doesn't depend from switch state itself,
 * then updating it when switch state changes is redundant.
 */
export function useSwitch(...args: Parameters<IUseSwitch>) {
  const [state, toggle] = useSwitchOriginal(...args)

  const refToggle = useRef(() => {})
  const refToggleOn = useRef(() => {})
  const refToggleOff = useRef(() => {})
  refToggle.current = toggle
  refToggleOn.current = toggle.on
  refToggleOff.current = toggle.off

  const constantToggle = useCallback(() => {
    refToggle.current()
  }, [])
  Object.assign(constantToggle, {
    on: useCallback(() => {
      refToggleOn.current()
    }, []),
    off: useCallback(() => {
      refToggleOff.current()
    }, []),
  })

  return [state, constantToggle] as unknown as SwitchTuple
}

// Stateless version
export function useControlledSwitch(
  state: boolean,
  onChange: (state: boolean) => void
): SwitchCallback {
  const refState = useRef(state)
  refState.current = state

  const refOnChange = useRef(onChange)
  refOnChange.current = onChange

  const toggle = useCallback(() => {
    refOnChange.current(!refState.current)
  }, [])

  Object.assign(toggle, {
    on: useCallback(() => {
      refOnChange.current(true)
    }, []),
    off: useCallback(() => {
      refOnChange.current(false)
    }, []),
  })

  return toggle as unknown as SwitchCallback
}
