import { ReactElement } from 'react'
import {
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  UseControllerProps,
  UseControllerReturn,
} from 'react-hook-form'

import { IControlProps } from 'src/components/base/controls'

// In lib itself, default value also is `any`.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ControllerValue = any

export interface IFormControllerProps<
  Fields extends FieldValues = FieldValues,
  Name extends FieldPath<Fields> = FieldPath<Fields>
> extends Pick<
    UseControllerProps<Fields, ControllerValue, Name>,
    'name' | 'rules' | 'shouldUnregister'
  > {}

// Omit 'error' prop, it's provided by form state
export interface IFieldControlProps extends Omit<IControlProps, 'error'> {}

export interface IFieldControlComponentProps<
  Fields extends FieldValues = FieldValues,
  Name extends FieldPath<Fields> = FieldPath<Fields>
> extends IFieldControlProps,
    IFormControllerProps<Fields, Name> {
  children:
    | ReactElement
    | ((
        controller: UseControllerReturn<Fields, ControllerValue, Name>
      ) => ReactElement)
}

export type IFormFieldProps<
  InputType,
  Fields extends FieldValues = FieldValues,
  Name extends FieldPath<Fields> = FieldPath<Fields>
> = Omit<InputType, keyof ControllerRenderProps> &
  IFormControllerProps<Fields, Name> & {
    label?: IControlProps['label'] // put label at top-level props for convenience
    control?: Omit<IFieldControlProps, 'label'>
  }
