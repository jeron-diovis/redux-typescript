import React, { CSSProperties } from 'react'

import { FlexProps } from './types'

const DEFAULT_GAP = 12

export const Flex: React.FC<FlexProps> = props => {
  const {
    children,
    tag: Tag = 'div',
    column = false,
    inline = false,
    gap = DEFAULT_GAP,
    center,
    reverse,
    wrap = true,
    className,
    style,
  } = props

  return (
    <Tag
      style={{
        ...style,
        ...getRowCenterStyle({ column, center }),
        gap,
        display: inline ? 'inline-flex' : 'flex',
        flexDirection: getDirectionStyle({ column, reverse }),
        // eslint-disable-next-line no-nested-ternary
        flexWrap: wrap === true ? 'wrap' : wrap === false ? 'nowrap' : wrap,
      }}
      className={className}
    >
      {children}
    </Tag>
  )
}

// ---

const CENTER_JUSTIFY: CSSProperties = { justifyContent: 'center' }
const CENTER_ALIGN: CSSProperties = { alignItems: 'center' }
const CENTER_ALL = { ...CENTER_JUSTIFY, ...CENTER_ALIGN }

function getRowCenterStyle(params: Pick<FlexProps, 'column' | 'center'>) {
  const { column, center } = params
  if (center === undefined) {
    return undefined
  }

  if (center === true) {
    return CENTER_ALL
  }

  if (column) {
    return center === 'v' ? CENTER_JUSTIFY : CENTER_ALIGN
  }

  // row
  return center === 'h' ? CENTER_JUSTIFY : CENTER_ALIGN
}

function getDirectionStyle(params: Pick<FlexProps, 'column' | 'reverse'>) {
  const { column, reverse } = params
  if (column) {
    return reverse ? 'column-reverse' : 'column'
  }

  return reverse ? 'row-reverse' : 'row'
}
