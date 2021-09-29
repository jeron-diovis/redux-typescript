import { Link, LinkProps } from 'react-router-dom'

import clsx from 'clsx'

import { styles as ButtonStyles } from '../Button'

import styles from './styles.module.scss'

export default function LinkButton(props: LinkProps) {
  const { className, ...rest } = props
  return (
    <Link
      {...rest}
      className={clsx(className, ButtonStyles.root, styles.root)}
    />
  )
}
