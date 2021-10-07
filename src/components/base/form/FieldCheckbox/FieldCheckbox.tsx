import { FieldPath, FieldValues } from 'react-hook-form'

import { Checkbox, ControlSettings } from 'src/components/base/controls'

import FieldControl from '../FieldControl'

import { IFieldCheckboxProps } from './types'

export default function FieldCheckbox<
  Fields extends FieldValues = FieldValues,
  Name extends FieldPath<Fields> = FieldPath<Fields>
>(props: IFieldCheckboxProps<Fields, Name>) {
  const { control = {}, name, rules, ...rest } = props

  const { labelPosition = 'after', stretch = false } = control

  return (
    /* Force override `columns`. Checkbox is always rendered in a single row */
    <ControlSettings layout="max-content auto">
      <FieldControl
        {...control}
        labelPosition={labelPosition}
        stretch={stretch}
        name={name}
        rules={rules}
      >
        {controller => {
          const { field, fieldState } = controller
          const { invalid } = fieldState
          return (
            <Checkbox
              {...rest}
              {...field}
              checked={field.value}
              invalid={invalid}
              onChange={(_, e) => field.onChange(e)}
            />
          )
        }}
      </FieldControl>
    </ControlSettings>
  )
}
