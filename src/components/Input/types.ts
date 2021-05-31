import { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react'

export interface IInputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'defaultValue' | 'children'
  > {
  onChange?: (value: string, e: ChangeEvent<HTMLInputElement>) => void
  label?: ReactNode
  labelPosition?: 'before' | 'after'
}
