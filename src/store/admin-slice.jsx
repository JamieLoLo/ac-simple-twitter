import { createSlice } from '@reduxjs/toolkit'

const initialState = { allUsers: null, allTweets: null }

const adminSlice = createSlice({
  name: 'admin',
  initialState: initialState,
  reducers: {},
})

export const adminActions = adminSlice.actions

export default adminSlice.reducer
