import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isFollowUpdate: false,
  isTweetUpdate: false,
  isUserInfoUpdate: false,
  userInfo: [],
  oneTweetData: [],
  userTweetsData: [],
  userReplysData: [],
  userLikesData: [],
  likeCount: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    // follow 相關資訊更新訊號
    setIsFollowUpdate(state) {
      state.isFollowUpdate = !state.isFollowUpdate
    },
    // userInfo 相關資訊更新訊號
    setIsUserInfoUpdate(state) {
      state.isUserInfoUpdate = !state.isUserInfoUpdate
    },
    // Tweet 相關資訊更新訊號
    setIsTweetUpdate(state) {
      state.isTweetUpdate = !state.isTweetUpdate
    },
    // userInfo 內容
    setUserInfo(state, action) {
      state.userInfo = action.payload
    },
    // 特定貼文內容
    setOneTweetData(state, action) {
      state.oneTweetData = action.payload
    },
    // 特定 User 的全部推文
    setUserTweetsData(state, action) {
      state.userTweetsData = action.payload
    },
    // 特定 User 的全部回覆
    setUserReplysData(state, action) {
      state.userReplysData = action.payload
    },
    // 特定 User 的全部 like 的推文
    setUserLikesData(state, action) {
      state.userLikesData = action.payload
    },
    changePayload(state, action) {
      state.payload = action.payload.payload
    },
    changeLikeCount(state, action) {
      state.likeCount = action.payload
      console.log(action.payload)
    },
  },
})

export const userActions = userSlice.actions

export default userSlice.reducer

// userInfo 格式
// account: 'user1',
// avatar: 'https://i.imgur.com/zVY2NGW.png',
// cover: 'https://i.imgur.com/HnmNqYb.png',
// email: 'user1@example.com',
// followerCounts: 1,
// followingCounts: 7,
// id: 2,
// introduction: 'test here',
// isFollowed: 0,
// name: 'User1',
// role: 'user',
