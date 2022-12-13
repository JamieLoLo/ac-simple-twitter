import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo: {
    avatar: null,
    cover: null,
    createdAt: null,
    id: null,
    role: null,
    updatedAt: null,
  },
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
  reducers: {
    initialSetUserInfo(state, action) {
      const { avatar, cover, createdAt, id, role, updatedAt } = action.payload
      state.userInfo.avatar = avatar
      state.userInfo.cover = cover
      state.userInfo.createdAt = createdAt
      state.userInfo.id = id
      state.userInfo.role = role
      state.userInfo.updatedAt = updatedAt
    },
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
