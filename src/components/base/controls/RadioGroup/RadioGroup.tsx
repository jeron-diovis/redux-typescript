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
    tag: Tag = 'div',
    data,
    value,
    onChange = noop,
    name,
    className,
    style,
    optionClassName,
    optionStyle,
    refInput,
  } = props
  return (
    <Tag className={className} style={style}>
      {data.map(x => (
        <label
          key={getValue(x)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          <Input
            type="radio"
            refInput={refInput}
            name={name}
            value={getValue(x)}
            checked={
              value === undefined ? false : getValue(value) === getValue(x)
            }
            onChange={(v, e) => {
              const item = data.find(x => getValue(x).toString() === v)
              const itemValue = item === undefined ? undefined : getValue(item)
              onChange(itemValue as GetRadioOptionValue<T>, item as T, e)
            }}
            className={optionClassName}
            style={optionStyle}
          />
          {getLabel(x)}
        </label>
      ))}
    </Tag>
  )
}

export default React.memo(RadioGroup) as typeof RadioGroup
