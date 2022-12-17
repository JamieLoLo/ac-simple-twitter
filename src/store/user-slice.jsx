import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isFollowUpdate: false,
  isTweetUpdate: false,
  isUserInfoUpdate: false,
  userInfo: [],
  allTweetsData: [],
  oneTweetData: [],
  replysForOneTweet: [],
  userTweetsData: [],
  userReplysData: [],
  userLikesData: [],
  userFollowersData: [],
  userFollowingsData: [],
  likeCount: null,
  recommendFollowData: [],
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
    // 全部的推文
    setAllTweetsData(state, action) {
      state.allTweetsData = action.payload
    },
    // 特定推文的回覆們
    setReplysForOneTweet(state, action) {
      state.replysForOneTweet = action.payload
    },
    // 特定 User 的全部 like 的推文
    setUserLikesData(state, action) {
      state.userLikesData = action.payload
    },
    // 特定 User 的 Follower
    setUserFollowersData(state, action) {
      state.userFollowersData = action.payload
    },
    // 特定 User 的 Following
    setUserFollowingsData(state, action) {
      state.userFollowingsData = action.payload
    },
    // 推薦 Follow 
    setRecommendFollowData(state, action) {
      state.recommendFollowData = action.payload
    },
    changePayload(state, action) {
      state.payload = action.payload.payload
    },
    changeLikeCount(state, action) {
      state.likeCount = action.payload
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
