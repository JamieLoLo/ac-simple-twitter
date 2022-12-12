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
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
})

export const userActions = userSlice.actions

export default userSlice.reducer
