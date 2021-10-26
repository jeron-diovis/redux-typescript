import { useCallback } from 'react'

import { noop } from 'lodash'

import { useSwitch } from './useSwitch'

// ---

type Callback<T> = T extends (...args: infer PT) => unknown
  ? (...args: PT) => void
  : () => void

interface IOptions {
  onOpen?: Func
  onCancel?: Func
  onConfirm?: Func
  onClose?: () => void
}

interface IConfirm<T extends IOptions> {
  isOpen: boolean
  open: Callback<T['onOpen']>
  confirm: Callback<T['onConfirm']>
  cancel: Callback<T['onCancel']>
}

// ---

export default function useConfirm<T extends IOptions>(
  options: T = {} as T
): IConfirm<T> {
  const [checked, toggle] = useSwitch(false)
  const {
    onOpen = noop,
    onCancel = noop,
    onConfirm = noop,
    onClose = noop,
  } = options

  return {
    isOpen: checked,

    open: useCallback(
      (...args: unknown[]) => {
        onOpen(...args)
        toggle.on()
      },
      [toggle, onOpen]
    ) as Callback<T['onOpen']>,

    cancel: useCallback(
      (...args: unknown[]) => {
        onCancel(...args)
        onClose()
        toggle.off()
      },
      [toggle, onCancel, onClose]
    ) as Callback<T['onCancel']>,

    confirm: useCallback(
      (...args: unknown[]) => {
        onConfirm(...args)
        onClose()
        toggle.off()
      },
      [toggle, onClose, onConfirm]
    ) as Callback<T['onConfirm']>,
  }
}
