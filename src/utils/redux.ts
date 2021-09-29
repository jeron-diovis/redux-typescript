import { ActionReducerMapBuilder, AsyncThunk, Draft } from '@reduxjs/toolkit'

import { AsyncState } from 'src/types'

// TODO: consider using https://redux-toolkit.js.org/rtk-query/overview

export function addAsyncThunkReducers<State extends AsyncState, Payload>(
  builder: ActionReducerMapBuilder<State>,
  thunk: AsyncThunk<Payload, any, Dict>, // eslint-disable-line @typescript-eslint/no-explicit-any
  handleResponse:
    | ((state: State, result: Payload) => void)
    | FilterKeys<State, Payload>
): ActionReducerMapBuilder<State>

// Overload to support simple one-level nesting of async states
export function addAsyncThunkReducers<
  State extends AsyncState,
  Payload,
  Slice extends FilterKeys<State, AsyncState>
>(
  builder: ActionReducerMapBuilder<State>,
  thunk: AsyncThunk<Payload, any, Dict>, // eslint-disable-line @typescript-eslint/no-explicit-any
  handleResponse:
    | ((state: State[Slice], result: Payload) => void)
    | FilterKeys<State[Slice], Payload>,
  sliceKey: Slice
): ActionReducerMapBuilder<State>

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
export function addAsyncThunkReducers<
  State extends AsyncState,
  Payload,
  Slice extends FilterKeys<State, AsyncState>
>(
  builder: ActionReducerMapBuilder<State>,
  thunk: AsyncThunk<Payload, any, Dict>, // eslint-disable-line @typescript-eslint/no-explicit-any
  handleResponse:
    | ((state: State | State[Slice], result: Payload) => void)
    | FilterKeys<State | State[Slice], Payload>,
  sliceKey?: Slice
): ActionReducerMapBuilder<State> {
  const resolve = (state: Draft<State>) =>
    sliceKey === undefined ? state : (state as State)[sliceKey]

  builder
    .addCase(thunk.pending, state => {
      const slice = resolve(state)
      slice.loading = true
    })
    .addCase(thunk.fulfilled, (state, action) => {
      const slice = resolve(state)

      slice.loading = false
      slice.error = undefined
      if (typeof handleResponse === 'function') {
        handleResponse(slice as State, action.payload)
      } else {
        Object.assign(slice, {
          [handleResponse]: action.payload,
        })
      }
    })
    .addCase(thunk.rejected, (state, action) => {
      const slice = resolve(state)
      slice.loading = false
      slice.error = action.error.message
    })

  return builder
}
