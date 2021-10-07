import { useDispatch, useSelector } from 'react-redux'
import { Link, Route } from 'react-router-dom'

import clsx from 'clsx'

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
        <li className={styles.menu_item}>
          <span>Hi, </span>
          <span className={styles.username}>
            {user.first_name} {user.last_name}
          </span>
        </li>
        <li>|</li>
      </If>

      <li className={styles.menu_item}>
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
            <Route path={routes.login}>
              {({ match }) => (
                <If condition={!match}>
                  <Link className={styles.menu_link} to={routes.login}>
                    Login
                  </Link>
                </If>
              )}
            </Route>
          </Otherwise>
        </Choose>
      </li>
    </ul>
  )
}
