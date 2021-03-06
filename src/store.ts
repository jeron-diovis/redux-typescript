import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { combineReducers } from 'redux'

import { CounterSlice } from './features/Counter'
import { HistoryReferrerSlice } from './features/HistoryReferrer'
import { UserSlice } from './features/User'
import { history } from './routes'

export const rootReducer = combineReducers({
  router: connectRouter(history),
  referrer: HistoryReferrerSlice.reducer,
  counter: CounterSlice.reducer,
  user: UserSlice.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaults => getDefaults().concat(routerMiddleware(history)),
})

// ---

declare global {
  type AppDispatch = typeof store.dispatch
  type AppState = ReturnType<typeof store.getState>
  type AppSelector<T = unknown> = (state: AppState) => T
  type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action<string>
  >
}

// With this, `useSelector(state => ...)` automatically infers `state` param as `AppState`
declare module 'react-redux' {
  interface DefaultRootState extends AppState {}
}
