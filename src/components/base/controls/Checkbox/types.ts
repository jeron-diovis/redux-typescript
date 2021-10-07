import { ChangeEvent } from 'react'

import { IInputProps } from '../Input'

export interface ICheckboxProps
  extends Omit<IInputProps, 'onChange' | 'type' | 'defaultChecked'> {
  onChange?: (checked: boolean, e: ChangeEvent<HTMLInputElement>) => void
  indeterminate?: boolean
}
