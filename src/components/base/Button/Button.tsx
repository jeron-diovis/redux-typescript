import { ButtonHTMLAttributes } from 'react'
import { Link, LinkProps } from 'react-router-dom'

import clsx from 'clsx'
import { LocationState } from 'history'

import styles from './styles.module.scss'

interface CustomButtonProps {
  kind?: 'primary' | 'secondary' | 'bare'
}

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    CustomButtonProps {}

export function Button(props: ButtonProps) {
  const { type = 'button', className, kind, ...rest } = props
  return (
    <button
      {...rest}
      type={type}
      className={resolveButtonClasses(kind, className)}
    />
  )
}

export interface LinkButtonProps<S = LocationState>
  extends LinkProps<S>,
    CustomButtonProps {}

export function LinkButton<S = LocationState>(props: LinkButtonProps<S>) {
  const { kind, className, ...rest } = props
  return <Link {...rest} className={resolveButtonClasses(kind, className)} />
}

export function resolveButtonClasses(
  kind: CustomButtonProps['kind'],
  className?: string
) {
  return clsx(className, styles.btn, {
    [styles.primary]: kind === 'primary',
    [styles.secondary]: kind === 'secondary',
    [styles.bare]: kind === 'bare',
  })
}
