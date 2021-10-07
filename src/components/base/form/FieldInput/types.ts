import { HTMLInputTypeAttribute } from 'react'
import { FieldPath, FieldValues } from 'react-hook-form'

import { IInputProps } from 'src/components/base/controls'

import { IFormFieldProps } from '../FieldControl'

export interface IFieldInputProps<
  Type extends HTMLInputTypeAttribute = 'text',
  Fields extends FieldValues = FieldValues,
  Name extends FieldPath<Fields> = FieldPath<Fields>
> extends IFormFieldProps<IInputProps<Type>, Fields, Name> {}
