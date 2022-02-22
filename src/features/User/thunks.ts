import { push } from 'connected-react-router'

import { createAsyncThunk } from '@reduxjs/toolkit'

import { selectReferrer } from '../HistoryReferrer'

import * as API from './api'
import { resolveAuthReferrerPath } from './lib'
import { ILoginFormFields, IUser } from './types'

export const login = createAsyncThunk(
  'user/login',
  async (data: ILoginFormFields, { getState, dispatch }): Promise<IUser> => {
    const state = getState() as AppState
    const user = await API.login(data)

    const ref = selectReferrer(state)
    const returnTo = resolveAuthReferrerPath(ref, user)
    dispatch(push(returnTo))

    return user
  }
)

export const logout = createAsyncThunk('user/logout', async () => {
  await API.logout() // not interested in returning response
})

export const loadUser = createAsyncThunk('user/load', API.getUser)
