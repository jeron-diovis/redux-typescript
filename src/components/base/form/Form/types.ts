import { CSSProperties, ReactElement, ReactNode } from 'react'
import {
  FieldValues,
  KeepStateOptions,
  Resolver,
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
  buttonsLayout?: CSSProperties['gridAutoColumns']
  /**
   * @see https://react-hook-form.com/advanced-usage#CustomHookwithResolver
   */
  resolver?: Resolver<TFieldValues>
  children?:
    | ReactNode
    | ((
        form: UseFormReturn<TFieldValues>,
        params: { controls: ReactElement; error: ReactElement }
      ) => ReactNode)
}
