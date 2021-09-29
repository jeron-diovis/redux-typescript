import { GUEST_USER_ID } from './slice'

export const selectUserState = (state: AppState) => state.user
export const selectUser = (state: AppState) => state.user.data
export const selectIsAuthorized = (state: AppState) =>
  selectUser(state).id !== GUEST_USER_ID
