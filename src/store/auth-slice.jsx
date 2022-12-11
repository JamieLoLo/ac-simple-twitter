import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  payload: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    changePayload(state, action) {
      state.payload = action.payload.payload
    },
    changeIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload.isAuthenticated
    },
    logout: (state) => {
      localStorage.removeItem('authToken')
      state.payload = null
      state.isAuthenticated = false
    },
  },
})

export const authActions = authSlice.actions

export default authSlice.reducer
