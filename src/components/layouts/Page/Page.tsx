import clsx from 'clsx'

import { IPageProps } from './types'

import styles from './styles.module.scss'

export function Page(props: IPageProps) {
  const { title, style, children, center = false, scrollable = true } = props
  return (
    <div
      className={clsx(styles.page, {
        [styles.page_center]: center === true,
        [styles.page_center_v]: center === 'v',
        [styles.page_center_h]: center === 'h',
        [styles.flex_column]: !scrollable,
      })}
      style={style}
    >
      <If condition={title !== undefined}>
        <h2 className={styles.page_title}>{title}</h2>
      </If>
      <div
        className={clsx(styles.page_content, {
          [styles.flex_column]: !scrollable,
        })}
      >
        {children}
      </div>
    </div>
  )
}
