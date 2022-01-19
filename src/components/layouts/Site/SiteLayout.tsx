import React from 'react'

import { Footer, Header } from 'src/components/domain'

import styles from './styles.module.scss'

export const SiteLayout: React.FC = ({ children }) => {
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
