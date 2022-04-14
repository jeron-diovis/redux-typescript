import { useCallback } from 'react'
import { FieldError } from 'react-hook-form'

import { AnySchema, ValidationError } from 'yup'

/**
 * @see https://react-hook-form.com/advanced-usage#CustomHookwithResolver
 */
export const useYupValidationResolver = <TFieldValues>(
  validationSchema: AnySchema<TFieldValues>
) =>
  useCallback(
    async (data: TFieldValues) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        })

        return {
          values,
          errors: {},
        }
      } catch (e) {
        const error = e as ValidationError
        return {
          values: {},
          errors: error.inner.reduce((allErrors, currentError) => {
            allErrors[currentError.path as string] = {
              type: currentError.type ?? 'validation',
              message: currentError.message,
            }
            return allErrors
          }, {} as Dict<Required<Pick<FieldError, 'type' | 'message'>>>),
        }
      }
    },
    [validationSchema]
  )
