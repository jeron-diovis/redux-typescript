import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { ReferrerState } from './lib'

const initialState: ReferrerState = {
  ref: null,
  force: false,
}

export const HistoryReferrerSlice = createSlice({
  name: 'referrer',
  initialState,
  reducers: {
    setReferrer(state, action: PayloadAction<ReferrerState>) {
      return action.payload
    },
  },
})

export const selectReferrer = (state: AppState) => state.referrer
