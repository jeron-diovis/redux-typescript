import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { logout, selectIsAuthorized } from 'src/features/User'
import routes from 'src/routes'

import styles from './styles.module.scss'

export default function AuthMenu() {
  const dispatch = useDispatch()
  const isAuthorized = useSelector(selectIsAuthorized)
  return (
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
        <Link className={styles.menu_link} to={routes.login}>
          Login
        </Link>
      </Otherwise>
    </Choose>
  )
}
