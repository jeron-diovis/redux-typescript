// see `RegisterOptions` interface in react-hook-form:
export type ErrorType =
  | 'required'
  | 'min'
  | 'max'
  | 'minLength'
  | 'maxLength'
  | 'pattern'
  | 'validate'

export type DefaultValidationMessage =
  | string
  | ((param: unknown, value: unknown) => string)

export type DefaultValidationMessages = Partial<
  Record<ErrorType, DefaultValidationMessage>
>
