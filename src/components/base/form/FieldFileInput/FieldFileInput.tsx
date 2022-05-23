import { useRef } from 'react'
import { FileError as DropzoneFileError } from 'react-dropzone'
import {
  Message as ErrorMessage,
  FieldPath,
  FieldValues,
  useFormContext,
} from 'react-hook-form'

import filesize from 'filesize'
import { zipObject } from 'lodash'

import { FileInput } from '../../controls'
import FieldControl from '../FieldControl'

import { IFieldFileInputProps } from './types'

export function FieldFileInput<
  Fields extends FieldValues = FieldValues,
  Name extends FieldPath<Fields> = FieldPath<Fields>
>(props: IFieldFileInputProps<Fields, Name>) {
  const { control, label, name, rules, ...rest } = props
  const { validate, maxSize, minSize } = rules ?? {}

  const dropzone = useDropzoneValidation()
  const form = useFormContext<Fields>()

  return (
    <FieldControl<Fields, Name>
      {...control}
      label={label}
      name={name}
      rules={{
        ...rules,
        validate: {
          ...(typeof validate === 'function' ? { validate } : validate),
          dropzone: dropzone.validate,
        },
      }}
      key={name}
    >
      {controller => {
        const {
          field: { ref, ...field },
        } = controller

        return (
          <FileInput
            {...rest}
            {...field}
            maxSize={maxSize}
            minSize={minSize}
            onChange={(...args) => {
              dropzone.clearErrors()
              field.onChange(...args)
            }}
            onError={({ errors, file }) => {
              dropzone.setErrors(errors)
              form.setValue(name, file as Fields[Name], {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
              })
            }}
          />
        )
      }}
    </FieldControl>
  )
}

/**
 * react-dropzone has it's own internal validators.
 * To integrate them into react-hook-form, we'll save dropzone errors in ref,
 * and return them as result of react-hook-form's custom validator.
 */
function useDropzoneValidation() {
  type Errors = Dict<ErrorMessage>
  const refErrors = useRef<Errors>()
  return {
    setErrors(errors: DropzoneFileError[]) {
      refErrors.current = zipObject(
        errors.map(x => x.code),
        errors.map(x => formatDropzoneError(x.message))
      )
    },

    clearErrors() {
      refErrors.current = undefined
    },

    validate() {
      const errors = refErrors.current
      return errors === undefined ? undefined : Object.values(errors)[0]
    },
  }
}

function formatDropzoneError(x: string) {
  return x.replace(/(\d+) bytes?/, (match, num) => filesize(num))
}
