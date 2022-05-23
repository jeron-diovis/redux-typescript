import { ReactElement } from 'react'
import {
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseControllerProps,
  UseControllerReturn,
} from 'react-hook-form'

import { IControlProps } from 'src/components/base/controls'

export interface IFormControllerProps<
  Fields extends FieldValues = FieldValues,
  Name extends FieldPath<Fields> = FieldPath<Fields>
> extends Pick<
    UseControllerProps<Fields, Name>,
    'name' | 'shouldUnregister' | 'defaultValue'
  > {
  rules?: UseControllerProps<Fields, Name>['rules'] &
    Pick<RegisterOptions<Fields, Name>, 'setValueAs'> // See implementation at components/base/form/Form/BaseForm.tsx::usePatchFormRegister // Allow to use `setValueAs` for `useController` too.
}

// Omit 'error' prop, it's provided by form state
export interface IFieldControlProps extends Omit<IControlProps, 'error'> {}

export type FieldControlChildRenderer<
  Fields extends FieldValues = FieldValues,
  Name extends FieldPath<Fields> = FieldPath<Fields>
> = (controller: UseControllerReturn<Fields, Name>) => ReactElement

export interface IFieldControlComponentProps<
  Fields extends FieldValues = FieldValues,
  Name extends FieldPath<Fields> = FieldPath<Fields>
> extends IFieldControlProps,
    IFormControllerProps<Fields, Name> {
  children: ReactElement | FieldControlChildRenderer<Fields, Name>
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
