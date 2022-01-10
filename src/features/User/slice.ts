import { createSlice } from '@reduxjs/toolkit'

import { addAsyncThunkReducers } from 'src/utils'

import * as thunks from './thunks'
import { IUser, IUserState } from './types'

export * from './thunks'

export const GUEST_USER_ID = -1

const GuestUser: IUser = {
  id: GUEST_USER_ID,
  email: '',
  username: 'Guest',
  first_name: '',
  last_name: '',
  roles: [],
}

const initialState: IUserState = {
  loading: false,
  error: undefined,
  data: GuestUser,
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {},

  extraReducers: builder => {
    addAsyncThunkReducers(builder, thunks.login, 'data')
    addAsyncThunkReducers(builder, thunks.loadUser, 'data')
    addAsyncThunkReducers(builder, thunks.logout, state => {
      state.data = GuestUser
    })
  },
})
