import { HTMLInputTypeAttribute } from 'react'
import { FieldPath, FieldValues } from 'react-hook-form'

import { capitalize } from 'lodash'

import { combineRefs } from 'src/utils'

import Input from '../../controls/Input'
import FieldControl from '../FieldControl'

import { IFieldInputProps } from './types'

export default function FieldInput<
  Fields extends FieldValues = FieldValues,
  Name extends FieldPath<Fields> = FieldPath<Fields>,
  Type extends HTMLInputTypeAttribute = 'text'
>(props: IFieldInputProps<Fields, Name, Type>) {
  const {
    control,
    label,
    name,
    rules,
    placeholder = capitalize(name),
    defaultValue,
    ...rest
  } = props

  return (
    <FieldControl<Fields, Name>
      {...control}
      label={label}
      name={name}
      rules={rules}
      key={name}
      defaultValue={defaultValue}
    >
      {controller => {
        const {
          field: { ref, ...field },
          fieldState,
        } = controller
        const { invalid } = fieldState
        const { refInput, type } = rest

        const extras = {}
        if (type === 'number') {
          Object.assign(extras, {
            min: rules?.min,
            max: rules?.max,
          })
        }

        return (
          <Input<Type>
            {...rest}
            {...extras}
            {...field}
            placeholder={placeholder}
            refInput={combineRefs(ref, refInput)}
            invalid={invalid}
          />
        )
      }}
    </FieldControl>
  )
}
