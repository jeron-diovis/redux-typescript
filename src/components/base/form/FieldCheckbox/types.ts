import { FieldPath, FieldValues } from 'react-hook-form'

import { ICheckboxProps } from 'src/components/base/controls'

import { IFormFieldProps } from '../FieldControl'

export interface IFieldCheckboxProps<
  Fields extends FieldValues = FieldValues,
  Name extends FieldPath<Fields> = FieldPath<Fields>
> extends IFormFieldProps<ICheckboxProps, Fields, Name> {}
