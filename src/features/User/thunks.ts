import { push } from 'connected-react-router'

import { createAsyncThunk } from '@reduxjs/toolkit'

import routes from 'src/routes'

import { selectReferrer } from '../HistoryReferrer'

import * as API from './api'
import { ILoginFormFields, IUser } from './types'

export const login = createAsyncThunk(
  'user/login',
  async (data: ILoginFormFields, { getState, dispatch }): Promise<IUser> => {
    const state = getState() as AppState
    const user = await API.login(data)

    const ref = selectReferrer(state)
    if (!ref || ref.pathname === routes.login) {
      dispatch(push(routes.home))
    } else {
      dispatch(push(ref.pathname))
    }

    return user
  }
)

export const logout = createAsyncThunk('user/logout', API.logout)

export const loadUser = createAsyncThunk('user/load', API.getUser)
