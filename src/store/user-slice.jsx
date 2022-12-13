import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo: {
    account: null,
    avatar: null,
    cover: null,
    id: null,
    email: null,
    introduction: null,
    name: null,
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
      const { avatar, cover, id, email, introduction, name, account } =
        action.payload
      state.userInfo.avatar = avatar
      state.userInfo.cover = cover
      state.userInfo.id = id
      state.userInfo.email = email
      state.userInfo.introduction = introduction
      state.userInfo.name = name
      state.userInfo.account = account
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
