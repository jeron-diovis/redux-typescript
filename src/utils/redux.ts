import { ActionReducerMapBuilder, AsyncThunk } from '@reduxjs/toolkit'

import { AsyncState } from 'src/types'

/**
 * Shorthand for setting up a set of default reducers for async thunk:
 * set loading state, assign response value or error text.
 *
 * If it doesn't suite your needs (likely, if you have some very special error handling logic) –
 * define reducers manually instead of using this helper.
 *
 * <pre>
 *   createSlice({
 *     ...,
 *
 *     initialState: {
 *       a_data: ...,
 *       b_data: ...,
 *     },
 *
 *     extraReducers(builder => {
 *       addAsyncThunkDefaultReducers(builder, thunkA, (state, payload) => {
 *         state.a_data = doWhateverYouWant(payload)
 *       })
 *
 *       // shorthand for simple assigning response as-is.
 *       addAsyncThunkDefaultReducers(builder, thunkB, 'b_data')
 *     })
 *   })
 * </pre>
 */
export function addAsyncThunkDefaultReducers<State extends AsyncState, Payload>(
  builder: ActionReducerMapBuilder<State>,
  thunk: AsyncThunk<Payload, any, Dict>, // eslint-disable-line @typescript-eslint/no-explicit-any
  handleResponse:
    | ((state: State, result: Payload) => void)
    | FilterKeys<State, Payload>
): ActionReducerMapBuilder<State> {
  builder
    .addCase(thunk.pending, state => {
      state.loading = true
    })
    .addCase(thunk.fulfilled, (state, action) => {
      state.loading = false
      if (typeof handleResponse === 'function') {
        handleResponse(state as State, action.payload)
      } else {
        Object.assign(state, {
          [handleResponse]: action.payload,
        })
      }
    })
    .addCase(thunk.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })

  return builder
}
