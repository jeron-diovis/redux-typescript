import { ReactElement, ReactNode } from 'react'
import {
  FieldValues,
  KeepStateOptions,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form'

export interface IBaseFormProps<TFieldValues extends FieldValues = FieldValues>
  extends IStyled,
    UseFormProps<TFieldValues> {
  children?: ReactNode | ((form: UseFormReturn<TFieldValues>) => ReactNode)
  debug?: true
  onSubmit?: SubmitHandler<TFieldValues>
  onSubmitError?: (err: Error) => void
  onValidationError?: SubmitErrorHandler<TFieldValues>
  reset?: KeepStateOptions
}

export interface IFormProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<IBaseFormProps<TFieldValues>, 'reset'> {
  reset?: true | KeepStateOptions
  btnSubmitText?: ReactNode
  btnResetText?: ReactNode
  children?:
    | ReactNode
    | ((
        form: UseFormReturn<TFieldValues>,
        params: { controls: ReactElement; error: ReactElement }
      ) => ReactNode)
}
