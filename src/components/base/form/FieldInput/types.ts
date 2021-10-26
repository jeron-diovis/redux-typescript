import { HTMLInputTypeAttribute } from 'react'
import { FieldPath, FieldValues } from 'react-hook-form'

import { IInputProps } from 'src/components/base/controls'

import { IFormFieldProps } from '../FieldControl'

export interface IFieldInputProps<
  Fields extends FieldValues = FieldValues,
  Name extends FieldPath<Fields> = FieldPath<Fields>,
  Type extends HTMLInputTypeAttribute = 'text'
> extends IFormFieldProps<IInputProps<Type>, Fields, Name> {}
