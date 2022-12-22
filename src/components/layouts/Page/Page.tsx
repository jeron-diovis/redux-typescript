import clsx from 'clsx'

import { IPageProps } from './types'

import styles from './styles.module.scss'

export function Page(props: IPageProps) {
  const {
    title,
    children,
    center = false,
    scrollable = true,
    width = '100%',
  } = props
  return (
    <div
      className={clsx(styles.page, {
        [styles.page_center]: center === true,
        [styles.page_center_v]: center === 'v',
        [styles.page_center_h]: center === 'h',
        [styles.page_non_scrollable]: !scrollable,
      })}
      style={width === undefined ? undefined : { width }}
    >
      <If condition={title !== undefined}>
        <h2 className={styles.page_title}>{title}</h2>
      </If>
      <div className={styles.page_content}>{children}</div>
    </div>
  )
}
