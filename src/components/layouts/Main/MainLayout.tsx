import { Footer, Header } from 'src/components/domain'

import { IMainLayoutProps } from './types'

import styles from './styles.module.scss'

export default function MainLayout(props: IMainLayoutProps) {
  const { children } = props
  return (
    <div className={styles.main_layout}>
      <Header />
      <div className={styles.content}>{children}</div>
      <Footer />
    </div>
  )
}
