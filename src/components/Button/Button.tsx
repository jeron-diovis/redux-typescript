import clsx from 'clsx'

import { IButtonProps } from './types'

import styles from './styles.module.scss'

export default function Button(props: IButtonProps) {
  const { type = 'button', className, ...rest } = props

  return (
    <button {...rest} type={type} className={clsx(className, styles.root)} />
  )
}
