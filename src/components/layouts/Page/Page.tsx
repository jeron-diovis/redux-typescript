import { IPageProps } from './types'

import styles from './styles.module.scss'

export default function Page(props: IPageProps) {
  const { title, children } = props
  return (
    <div className={styles.page}>
      <If condition={title !== undefined}>
        <h2 className={styles.page_title}>{title}</h2>
      </If>
      <div className={styles.page_content}>{children}</div>
    </div>
  )
}
