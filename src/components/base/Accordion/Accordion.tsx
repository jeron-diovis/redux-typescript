import React, { useRef } from 'react'

import clsx from 'clsx'

import { useSwitch } from 'src/hooks'

import { IAccordionProps } from './types'

import styles from './styles.module.scss'

export function Accordion(props: IAccordionProps) {
  const {
    tag: Tag = 'div',
    children,
    header,
    lazy = true,
    isOpen: isOpenControlled,
    onToggle,
    bodyMaxHeight,
    className,
    style,
  } = props

  const [isOpen, toggle] = useSwitch(false, isOpenControlled, onToggle)

  const refWasOpen = useRef(isOpen)
  if (isOpen) {
    refWasOpen.current = true
  }

  return (
    <Tag
      className={clsx(styles.accordion, className, {
        [styles.open]: isOpen,
      })}
      style={
        {
          ...style,
          '--body-max-height':
            typeof bodyMaxHeight === 'number'
              ? `${bodyMaxHeight}px`
              : bodyMaxHeight,
        } as typeof style
      }
    >
      <div className={styles.header} onClick={toggle}>
        {header}
        /\
      </div>

      <div className={styles.body}>
        {!lazy || refWasOpen.current ? children : null}
      </div>
    </Tag>
  )
}
