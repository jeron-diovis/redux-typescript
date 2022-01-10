import { useSelector } from 'react-redux'

import { getUserHomePage } from '../lib'
import { selectUser } from '../selectors'

export const useUser = () => useSelector(selectUser)

export const useUserHomepage = () => getUserHomePage(useUser())
