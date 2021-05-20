import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'

import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'

import { CounterSlice } from './features/counter'
import { history } from './routes'

export const rootReducer = combineReducers({
  router: connectRouter(history),
  counter: CounterSlice.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
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
