import { useMemo } from 'react'

import clsx from 'clsx'

import { IGridProps } from './types'

import styles from './styles.module.scss'

export default function Grid(props: IGridProps) {
  const {
    children,
    columns = 1,
    gap = 12,

    /* This tries to be smart.
     * Assume that grid is, first of all, a handy tool for spacing between items (with `gap`).
     * With that, 1-column grid is about spacing between rows – so don't care about column content, just stretch it like it's a div.
     * Multi-column grid uses `max-content` to don't distribute columns content all over available width.
     * If you need it, specify it explicitly with `columnWidth=auto` */
    columnWidth = columns === 1 ? 'auto' : 'max-content',

    style,
    className,
  } = props

  const inlineStyles = useMemo(() => {
    return {
      ...style,
      gap,
      gridTemplateColumns: createColumnsTemplate(columns, columnWidth),
    }
  }, [columns, gap, columnWidth, style])

  return (
    <div className={clsx(styles.root, className)} style={inlineStyles}>
      {children}
    </div>
  )
}

function createColumnsTemplate(
  count: number,
  width: NonNullable<IGridProps['columnWidth']>
): string {
  return Array.from(new Array(count), () => {
    switch (width) {
      case 'stretch':
        return '1fr'
      default:
        return width
    }
  }).join(' ')
}
