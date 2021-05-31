import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Location } from 'history'

type ReferrerState = Location | null

export const HistoryReferrerSlice = createSlice({
  name: 'referrer',
  initialState: null as ReferrerState,
  reducers: {
    setReferrer(state, action: PayloadAction<Location>) {
      return action.payload
    },
  },
})

export const selectReferrer = (state: AppState) => state.referrer
