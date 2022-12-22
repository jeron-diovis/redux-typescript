import { MouseEventHandler, ReactElement, useCallback } from 'react'
import BaseModal from 'react-modal'

import { useSwitch } from 'src/hooks'

import { IModalProps } from './types'

import styles from './styles.module.scss'

function ModalComponent(props: IModalProps) {
  const {
    children,
    isOpen,
    onRequestClose,
    defaultRequired = false,
    showCloseBtn = !defaultRequired,
    shouldCloseOnEsc = !defaultRequired,
    shouldCloseOnOverlayClick = !defaultRequired,
  } = props
  const isControlled = isOpen !== undefined
  const [isOpenControlled, toggle] = useSwitch(isOpen ?? false)

  const handleRequestClose = useCallback<NonNullable<typeof onRequestClose>>(
    (...args) => {
      onRequestClose?.(...args)
      if (!isControlled) {
        toggle.off()
      }
    },
    [onRequestClose, isControlled, toggle]
  )

  return (
    <BaseModal
      {...props}
      isOpen={isOpen ?? isOpenControlled}
      onRequestClose={handleRequestClose}
      overlayElement={renderEventInterceptor}
      shouldCloseOnEsc={shouldCloseOnEsc}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
    >
      <If condition={showCloseBtn}>
        <span onClick={handleRequestClose} className={styles.btn_close}>
          X
        </span>
      </If>
      <div className={styles.body}>{children}</div>
    </BaseModal>
  )
}

function renderEventInterceptor(
  props: { onClick?: MouseEventHandler },
  children: ReactElement
) {
  return (
    <div
      {...props}
      onClick={e => {
        e.stopPropagation()
        props.onClick?.(e)
      }}
    >
      {children}
    </div>
  )
}

// ---

type IModal = ((props: IModalProps) => ReactElement) & {
  setAppElement: typeof BaseModal.setAppElement
}

const Modal = ModalComponent as IModal
Modal.setAppElement = BaseModal.setAppElement

export { Modal }
