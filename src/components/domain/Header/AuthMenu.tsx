import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import clsx from 'clsx'

import { ExcludeRoute } from 'src/components'
import { logout, selectIsAuthorized, selectUser } from 'src/features/User'
import routes from 'src/routes'

import styles from './styles.module.scss'

export default function AuthMenu() {
  const dispatch = useDispatch()
  const isAuthorized = useSelector(selectIsAuthorized)
  const user = useSelector(selectUser)
  return (
    <ul className={clsx(styles.auth_menu, styles.menu_list)}>
      <If condition={isAuthorized}>
        <li>
          <span>Hi, </span>
          <span className={styles.username}>
            {user.first_name} {user.last_name}
          </span>
        </li>
        <li>|</li>
      </If>

      <li>
        <Choose>
          <When condition={isAuthorized}>
            <span
              className={styles.menu_link}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                dispatch(logout())
              }}
            >
              Logout
            </span>
          </When>

          <Otherwise>
            <ExcludeRoute path={routes.login}>
              <Link className={styles.menu_link} to={routes.login}>
                Login
              </Link>
            </ExcludeRoute>
          </Otherwise>
        </Choose>
      </li>
    </ul>
  )
}
