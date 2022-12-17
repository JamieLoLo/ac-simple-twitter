import { createSlice } from '@reduxjs/toolkit'

const adminSlice = createSlice({
  name: 'admin',
  initialState: { isAllTweetsUpdate: false },
  reducers: {
    setIsAllTweetsUpdate(state) {
      state.isAllTweetsUpdate = !state.isAllTweetsUpdate
    },
  },
})

export const adminActions = adminSlice.actions

export default adminSlice.reducer
