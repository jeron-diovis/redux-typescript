import React, { CSSProperties, useMemo } from 'react'

import clsx from 'clsx'

import { IGridProps } from './types'

import styles from './styles.module.scss'

export function Grid(props: IGridProps) {
  const {
    children,
    tag: Tag = 'div',
    gap = 12,
    columns,
    autoColumns,
    autoRows,
    style,
    className,
  } = props

  const inlineStyles = useMemo((): CSSProperties => {
    return {
      ...style,
      gap,
      gridAutoFlow: columns === true ? 'column' : undefined, // `row` is browser's default
      gridAutoRows: autoRows,
      gridAutoColumns: autoColumns,
      gridTemplateColumns: createTemplateColumns({ columns, autoColumns }),
    }
  }, [columns, gap, style, autoColumns, autoRows])

  return (
    <Tag className={clsx(styles.grid, className)} style={inlineStyles}>
      {children}
    </Tag>
  )
}

// ---

const DEFAULT_AUTO_COLUMN_WIDTH = 'auto'

function createTemplateColumns(
  params: Pick<IGridProps, 'columns' | 'autoColumns'>
): string | undefined {
  const { columns, autoColumns } = params
  if (columns === true) {
    return undefined
  }

  if (typeof columns === 'string') {
    return columns
  }

  if (typeof columns === 'number') {
    return `repeat(${columns}, ${autoColumns ?? DEFAULT_AUTO_COLUMN_WIDTH})`
  }

  return undefined
}
