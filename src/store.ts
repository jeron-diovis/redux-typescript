import { combineReducers } from 'redux'

import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'

import { CounterSlice } from './features/counter'

export const rootReducer = combineReducers({
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
