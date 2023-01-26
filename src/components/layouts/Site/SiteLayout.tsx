import React from 'react'

import { Footer, Header } from 'src/components/domain'

import styles from './styles.module.scss'

export function SiteLayout(props: { children: React.ReactNode }) {
  const { children } = props
  return (
    <div className={styles.main_layout}>
      <Header />
      <div className={styles.scroller}>
        <div className={styles.content}>{children}</div>
      </div>
      <Footer />
    </div>
  )
}
