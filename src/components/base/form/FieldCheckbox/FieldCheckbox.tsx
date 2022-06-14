import { FieldPath, FieldValues } from 'react-hook-form'

import { capitalize } from 'lodash'

import { Checkbox } from 'src/components/base/controls'

import FieldControl from '../FieldControl'

import { IFieldCheckboxProps } from './types'

export default function FieldCheckbox<
  Fields extends FieldValues = FieldValues,
  Name extends FieldPath<Fields> = FieldPath<Fields>
>(props: IFieldCheckboxProps<Fields, Name>) {
  const { control = {}, name, label = capitalize(name), rules, ...rest } = props

  // Explicit props will take precedence over ControlSettingsContext.
  // Thus, Checkbox will always render with these settings regardless of context,
  // unless other props will be passed to it directly.
  const {
    labelPosition = 'after',
    justify = false,
    layout = 'max-content auto',
  } = control

  return (
    <FieldControl<Fields, Name>
      {...control}
      layout={layout}
      label={label}
      labelPosition={labelPosition}
      justify={justify}
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
  )
}
