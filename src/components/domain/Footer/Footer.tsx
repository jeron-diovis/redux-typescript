import styles from './styles.module.scss'

const today = new Date()

export default function Footer() {
  return <footer className={styles.footer}>© {today.getFullYear()}</footer>
}
