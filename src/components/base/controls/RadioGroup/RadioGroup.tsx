import React from 'react'

import Input from '../Input'

import { GetRadioOptionValue, IRadioGroupProps, RadioDataItem } from './types'

const noop = () => {}
const isPrimitive = (x: RadioDataItem): x is string | number =>
  typeof x === 'string' || typeof x === 'number'
const getValue = (x: RadioDataItem) => (isPrimitive(x) ? x : x.value)
const getLabel = (x: RadioDataItem) => (isPrimitive(x) ? x : x.label)

export default function RadioGroup<T extends RadioDataItem = RadioDataItem>(
  props: IRadioGroupProps<T>
) {
  const {
    tag: Tag = 'div',
    data,
    value,
    onChange = noop,
    name,
    className,
    style,
    refInput,
  } = props
  return (
    <Tag className={className} style={style}>
      {data.map(x => (
        <label key={getValue(x)}>
          <Input
            type="radio"
            refInput={refInput}
            name={name}
            value={getValue(x)}
            checked={value === getValue(x)}
            onChange={(v, e) => {
              const item = data.find(x => getValue(x).toString() === v)
              const itemValue = item === undefined ? undefined : getValue(item)
              onChange(itemValue as GetRadioOptionValue<T>, item as T, e)
            }}
          />
          {getLabel(x)}
        </label>
      ))}
    </Tag>
  )
}
