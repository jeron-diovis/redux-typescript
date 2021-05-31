import { IPageProps } from './types'

import styles from './styles.module.scss'

export default function Page(props: IPageProps) {
  const { title, children } = props
  return (
    <div className={styles.root}>
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  )
}
