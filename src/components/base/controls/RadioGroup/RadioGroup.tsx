import React from 'react'

import Input from '../Input'

import { GetRadioOptionValue, IRadioGroupProps, RadioDataItem } from './types'

const noop = () => {}
const isPrimitive = (x: RadioDataItem): x is string | number =>
  typeof x === 'string' || typeof x === 'number'
const getValue = (x: RadioDataItem) => (isPrimitive(x) ? x : x.value)
const getLabel = (x: RadioDataItem) => (isPrimitive(x) ? x : x.label)

function RadioGroup<T extends RadioDataItem = RadioDataItem>(
  props: IRadioGroupProps<T>
) {
  const {
    data,
    value,
    onChange = noop,
    layout = 'row',
    optionClassName,
    optionStyle,
    renderOption = defaultRenderOption,
    ...rest
  } = props

  const $children = (
    <>
      {data.map(option => {
        const $input = (
          <Input
            {...rest}
            type="radio"
            value={getValue(option)}
            checked={
              value === undefined ? false : getValue(value) === getValue(option)
            }
            onChange={(v, e) => {
              const item = data.find(x => getValue(x).toString() === v)
              const itemValue = item === undefined ? undefined : getValue(item)
              onChange(itemValue as GetRadioOptionValue<T>, item as T, e)
            }}
            className={optionClassName}
            style={optionStyle}
          />
        )
        const $label = <>{getLabel(option)}</>

        return renderOption({ option, $input, $label })
      })}
    </>
  )

  if (typeof layout === 'function') {
    return layout($children)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: layout === 'col' ? 'column' : layout,
      }}
    >
      {$children}
    </div>
  )
}

const defaultRenderOption: NonNullable<IRadioGroupProps['renderOption']> =
  params => {
    const { option, $input, $label } = params
    return (
      <label
        key={getValue(option)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        {$input}
        {$label}
      </label>
    )
  }

export default React.memo(RadioGroup) as typeof RadioGroup
