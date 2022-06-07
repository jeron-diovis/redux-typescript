import { FieldPath, FieldValues, RegisterOptions } from 'react-hook-form'

import { Overwrite } from 'utility-types'

import { IFileInputProps } from '../../controls'
import { IFormFieldProps } from '../FieldControl'

export interface IFieldFileInputProps<
  Fields extends FieldValues = FieldValues,
  Name extends FieldPath<Fields> = FieldPath<Fields>
> extends Overwrite<
    IFormFieldProps<ExportedFileInputProps, Fields, Name>,
    {
      rules?: Rules<Fields, Name>
    }
  > {}

type ExportedFileInputProps = Pick<
  IFileInputProps,
  'accept' | 'placeholder' | 'icon'
>

type Rules<Fields, Name extends FieldPath<Fields>> = Pick<
  RegisterOptions<Fields, Name>,
  'required' | 'validate'
> &
  Pick<IFileInputProps, 'maxSize' | 'minSize'>
