import { Props as IBaseModalProps } from 'react-modal'

import { Optional } from 'utility-types'

export interface IModalProps
  extends Omit<
    Optional<IBaseModalProps, 'isOpen'>,
    'overlayElement' | 'overlayClassName' | 'className'
  > {
  showCloseBtn?: boolean
  /* Change default values for showCloseBtn / shouldCloseOnEsc / shouldCloseOnOverlayClick props  */
  defaultRequired?: boolean
}
