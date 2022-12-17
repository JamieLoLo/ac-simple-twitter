import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isFollowUpdate: false,
  isTweetUpdate: false,
  isUserInfoUpdate: false,
  isUpdate: true,
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
  likeCount: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setIsFollowUpdate(state) {
      state.isFollowUpdate = !state.isFollowUpdate
    },
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
    setIsUpdate(state) {
      state.isUpdate = !state.isUpdate
    },
    changePayload(state, action) {
      state.payload = action.payload.payload
    },
    changeIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload.isAuthenticated
    },
    changeLikeCount(state, action) {
      state.likeCount = action.payload
      console.log(action.payload)
    },
  },
})

export const userActions = userSlice.actions

export default userSlice.reducer
