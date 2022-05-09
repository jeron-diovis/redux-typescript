import { FieldPath, FieldValues, RegisterOptions } from 'react-hook-form'

import { Overwrite } from 'utility-types'

import { IFileInputProps } from '../../controls'
import { IFormFieldProps } from '../FieldControl'

export interface IFieldFileInputProps<
  Fields extends FieldValues = FieldValues,
  Name extends FieldPath<Fields> = FieldPath<Fields>
> extends Overwrite<
    IFormFieldProps<Pick<IFileInputProps, 'accept'>, Fields, Name>,
    {
      rules?: Pick<RegisterOptions<Fields, Name>, 'required' | 'validate'> &
        Pick<IFileInputProps, 'maxSize' | 'minSize'>
    }
  > {}
