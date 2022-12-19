import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isTweetUpdate: false,
  profileInfo: [],
  profileTweetsData: [],
  profileReplysData: [],
  profileLikesData: [],
  profileFollowersData: [],
  profileFollowingsData: [],
  likeCount: null,
}

const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    // follow 相關資訊更新訊號
    setIsFollowUpdate(state) {
      state.isFollowUpdate = !state.isFollowUpdate
    },
    // Tweet 相關資訊更新訊號
    setIsTweetUpdate(state) {
      state.isTweetUpdate = !state.isTweetUpdate
    },
    // 非登入者的使用者 profileInfo 內容
    setProfileInfo(state, action) {
      state.profileInfo = action.payload
    },
    // 非登入者的使用者的全部推文
    setProfileTweetsData(state, action) {
      state.profileTweetsData = action.payload
    },
    // 非登入者的使用者的全部回覆
    setProfileReplysData(state, action) {
      state.profileReplysData = action.payload
    },
    // 非登入者的使用者的全部 like 的推文
    setProfileLikesData(state, action) {
      state.profileLikesData = action.payload
    },
    // 非登入者的使用者的 Follower
    setProfileFollowersData(state, action) {
      state.profileFollowersData = action.payload
    },
    // 非登入者的使用者的 Following
    setProfileFollowingsData(state, action) {
      state.profileFollowingsData = action.payload
    },
    changePayload(state, action) {
      state.payload = action.payload.payload
    },
    changeLikeCount(state, action) {
      state.likeCount = action.payload
    },
  },
})

export const profileActions = profileSlice.actions

export default profileSlice.reducer

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
