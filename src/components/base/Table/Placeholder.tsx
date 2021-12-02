import React from 'react'

import styles from './table.module.scss'

const TableEmptyPlaceholder: React.FC = props => {
  const { children } = props
  return <div className={styles.placeholder}>{children}</div>
}

export default TableEmptyPlaceholder
