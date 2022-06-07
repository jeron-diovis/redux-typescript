import React, { ReactElement, useCallback } from 'react'

import { SwitchCallback, useSwitch } from 'src/hooks'

import { Modal } from './Modal'
import { IModalProps } from './types'

export interface IUseModalResult {
  $element: ReactElement
  isOpen: boolean
  toggle: SwitchCallback
}

export type IUseModalOptions = Omit<IModalProps, 'children' | 'isOpen'> & {
  defaultOpen?: boolean
}

export function useModal(children: ReactElement): IUseModalResult
export function useModal(
  props: IUseModalOptions,
  children: ReactElement
): IUseModalResult

export function useModal(...args: unknown[]): IUseModalResult {
  let children: ReactElement
  let props: IUseModalOptions
  if (args.length === 1) {
    children = args[0] as ReactElement
    props = {}
  } else {
    ;[props, children] = args as [IUseModalOptions, ReactElement]
  }

  const { defaultOpen = false, onRequestClose } = props
  const [isOpen, toggle] = useSwitch(defaultOpen)

  const handleRequestClose = useCallback<NonNullable<typeof onRequestClose>>(
    (...args) => {
      onRequestClose?.(...args)
      toggle.off()
    },
    [onRequestClose, toggle]
  )

  return {
    isOpen,
    toggle,
    $element: React.createElement(
      Modal,
      { ...props, isOpen, onRequestClose: handleRequestClose },
      children
    ),
  }
}
