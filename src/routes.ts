import { createBrowserHistory } from 'history'

const routes = {
  home: '/',
} as const

export default routes

// ---

const HISTORY_BASENAME = '/'

export const history = createBrowserHistory({
  basename: HISTORY_BASENAME,
})
