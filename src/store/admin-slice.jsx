import { createSlice } from '@reduxjs/toolkit'
const initialState = {}

const adminSlice = createSlice({
  name: 'admin',
  initialState: initialState,
  reducers: {

  }
})

export const adminActions = adminSlice.actions

export default adminSlice.reducer