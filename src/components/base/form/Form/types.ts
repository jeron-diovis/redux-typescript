import { CSSProperties, ReactElement, ReactNode } from 'react'
import {
  FieldValues,
  KeepStateOptions,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form'

export interface IUseFormProps<
  TFieldValues extends FieldValues = FieldValues,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TContext = any
> extends UseFormProps<TFieldValues, TContext> {
  onSubmit?: (
    data: Parameters<SubmitHandler<TFieldValues>>[0],
    event: Parameters<SubmitHandler<TFieldValues>>[1],
    form: UseFormReturn<TFieldValues>
  ) => ReturnType<SubmitHandler<TFieldValues>>
  onSubmitError?: (err: Error) => void
  onValidationError?: SubmitErrorHandler<TFieldValues>
  reset?: KeepStateOptions
}

export interface IUseFormReturn<TFieldValues extends FieldValues = FieldValues>
  extends UseFormReturn<TFieldValues> {
  onSubmit: ReturnType<UseFormHandleSubmit<TFieldValues>>
  onReset: () => void
}

export interface IBaseFormProps<TFieldValues extends FieldValues = FieldValues>
  extends IStyled,
    IUseFormProps<TFieldValues> {
  debug?: true
  children?: ReactNode | ((form: IUseFormReturn<TFieldValues>) => ReactNode)
}

export interface IFormProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<IBaseFormProps<TFieldValues>, 'reset'> {
  reset?: true | KeepStateOptions
  error?: unknown
  btnSubmitText?: ReactNode
  btnResetText?: ReactNode
  buttonsLayout?: CSSProperties['gridAutoColumns']
  children?:
    | ReactNode
    | ((
        form: UseFormReturn<TFieldValues>,
        params: {
          controls: ReactElement
          error: ReactElement
          externalError: ReactElement | undefined
        }
      ) => ReactNode)
}
