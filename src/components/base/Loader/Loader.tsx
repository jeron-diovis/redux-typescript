import React from 'react'

import clsx from 'clsx'

import imgLoader from './loader.gif'
import { ILoaderProps } from './types'

import styles from './styles.module.scss'

export default function Loader(props: ILoaderProps) {
  const { center = false, className, width = 40, ...rest } = props
  return (
    <img
      src={imgLoader}
      alt="loader"
      width={width}
      className={clsx(className, {
        [styles.center]: center,
      })}
      {...rest}
    />
  )
}
