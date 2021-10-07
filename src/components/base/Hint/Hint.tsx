import React from 'react'

import clsx from 'clsx'

import styles from './styles.module.scss'

const Hint: React.FC<React.HTMLAttributes<HTMLSpanElement>> = props => {
  const { className } = props
  return <span {...props} className={clsx(styles.hint, className)} />
}

export default Hint
