import { IInputProps } from '../Input'

export interface ICheckboxProps<Value extends string>
  extends Omit<IInputProps, 'onChange' | 'type' | 'defaultChecked'> {
  value?: Value
  onChange?: (checked: boolean, value: Value) => void
}
