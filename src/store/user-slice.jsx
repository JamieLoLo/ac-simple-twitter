import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  Data: null,
  Tweet: null,
  Reply: null,
  Like: null,
  Follower: null,
  Following: null,
  editProfile: null,
  editAccount: null,
  isAuthenticated: false,
  payload: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    changePayload(state, action) {
      state.payload = action.payload.payload
    },
    changeIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload.isAuthenticated
    },
  },
})

export const userActions = userSlice.actions

export default userSlice.reducer
