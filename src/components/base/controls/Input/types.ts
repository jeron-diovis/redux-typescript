import {
  ChangeEvent,
  ForwardedRef,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
} from 'react'

export interface IInputProps<Type extends HTMLInputTypeAttribute = 'text'>
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'defaultValue' | 'children' | 'type'
  > {
  type?: Type
  invalid?: boolean
  refInput?: ForwardedRef<HTMLInputElement>
  onChange?: (value: string, e: ChangeEvent<HTMLInputElement>) => void
}
