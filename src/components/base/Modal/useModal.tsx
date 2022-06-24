import React, { ReactElement, useCallback } from 'react'

import { SwitchCallback, useSwitch } from 'src/hooks'

import { Modal } from './Modal'
import { IModalProps } from './types'

export interface IUseModalResult {
  $element: ReactElement | null
  isOpen: boolean
  toggle: SwitchCallback
}

export type IUseModalOptions = Omit<IModalProps, 'children' | 'isOpen'> & {
  defaultOpen?: boolean
}

type ContentRenderer =
  | ReactElement
  | ((modal: { toggle: SwitchCallback }) => ReactElement)

export function useModal(children: ContentRenderer): IUseModalResult
export function useModal(
  props: IUseModalOptions,
  children: ContentRenderer
): IUseModalResult

export function useModal(...args: unknown[]): IUseModalResult {
  let children: ContentRenderer
  let props: IUseModalOptions
  if (args.length === 1) {
    children = args[0] as ContentRenderer
    props = {}
  } else {
    ;[props, children] = args as [IUseModalOptions, ContentRenderer]
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
    $element: !isOpen
      ? null
      : React.createElement(
          Modal,
          { ...props, isOpen, onRequestClose: handleRequestClose },
          typeof children !== 'function' ? children : children({ toggle })
        ),
  }
}
