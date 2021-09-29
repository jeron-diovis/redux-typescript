import { Link } from 'react-router-dom'

import { ReactComponent as Logo } from 'src/logo.svg'
import routes from 'src/routes'

import AuthMenu from './AuthMenu'

import styles from './styles.module.scss'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo_wrapper}>
        <Link to={routes.home}>
          <Logo width={40} />
        </Link>
      </div>

      <nav>
        <ul className={styles.menu_list}>
          <li className={styles.menu_item}>
            <AuthMenu />
          </li>
        </ul>
      </nav>
    </header>
  )
}
