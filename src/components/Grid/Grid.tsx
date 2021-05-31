import { useMemo } from 'react'

import { IGridProps } from './types'

import styles from './styles.module.scss'

const DEFAULT_GAP = '12px'

export default function Grid(props: IGridProps) {
  const {
    children,
    columns = 1,
    gap = DEFAULT_GAP,
    columnWidth = 'auto',
  } = props

  const inlineStyles = useMemo(() => {
    return {
      gap,
      gridTemplateColumns: createColumnsTemplate(columns, columnWidth),
    }
  }, [columns, gap, columnWidth])

  return (
    <div className={styles.root} style={inlineStyles}>
      {children}
    </div>
  )
}

function createColumnsTemplate(
  count: number,
  width: NonNullable<IGridProps['columnWidth']>
): string {
  if (width === 'auto') {
    return Array.from(new Array(count - 1), () => 'auto')
      .concat('1fr')
      .join(' ')
  }

  return Array.from(new Array(count), () => {
    switch (width) {
      case 'stretch':
        return '1fr'
      default:
        return width
    }
  }).join(' ')
}
