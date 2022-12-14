import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  account: {
    content: '',
    isValid: false,
    message: '',
    count: '',
  },
  username: {
    content: '',
    isValid: false,
    message: '',
    count: '',
  },
  editUsername: {
    content: '',
    isValid: true,
    message: '',
    count: '',
  },
  email: {
    content: '',
    isValid: false,
    message: '',
  },
  password: {
    content: '',
    isValid: false,
    message: '',
    count: '',
  },
  passwordCheck: {
    content: '',
    isValid: false,
    message: '',
  },
  info: {
    content: '',
    isValid: false,
    message: '',
    count: '',
  },
  editInfo: {
    content: '',
    isValid: true,
    message: '',
    count: '',
  },
  tweet: {
    content: '',
    isValid: false,
    message: '內容不可空白',
    count: '',
  },
  reply: {
    content: '',
    isValid: false,
    message: '內容不可空白',
    count: '',
  },
}

const authInputSlice = createSlice({
  name: 'authInput',
  initialState: initialState,
  reducers: {
    accountAuth(state, action) {
      if (
        action.payload.trim().length < 4 ||
        action.payload.trim().length > 30
      ) {
        state.account.content = action.payload
        state.account.isValid = false
        state.account.message = '帳號請輸入 4 到 30 個字元的英文字母、數字!'
        state.account.count = action.payload.trim().length
      } else {
        state.account.content = action.payload
        state.account.isValid = true
        state.account.message = ''
        state.account.count = ''
      }
    },
    usernameAuth(state, action) {
      if (
        action.payload.trim().length < 1 ||
        action.payload.trim().length > 50
      ) {
        state.username.content = action.payload
        state.username.isValid = false
        state.username.message = '名稱請輸入 1 到 50 個字元'
        state.username.count = action.payload.trim().length
      } else {
        state.username.content = action.payload
        state.username.isValid = true
        state.username.message = ''
        state.username.count = ''
      }
    },
    editUsernameAuth(state, action) {
      if (action.payload.trim().length === 0 || !action.payload.trim().length) {
        state.editUsername.content = action.payload
        state.editUsername.isValid = false
        state.editUsername.message = '名稱請輸入 1 到 50 個字元'
        state.editUsername.count = action.payload.trim().length
      } else if (action.payload.trim().length > 50) {
        state.editUsername.content = action.payload
        state.editUsername.isValid = false
        state.editUsername.message = '名稱請輸入 1 到 50 個字元'
        state.editUsername.count = action.payload.trim().length
      } else {
        state.editUsername.content = action.payload
        state.editUsername.isValid = true
        state.editUsername.message = ''
        state.editUsername.count = ''
      }
    },
    emailAuth(state, action) {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(action.payload)) {
        state.email.content = action.payload
        state.email.isValid = false
        state.email.message = '請輸入有效 Email'
      } else {
        state.email.content = action.payload
        state.email.isValid = true
        state.email.message = ''
      }
    },
    passwordAuth(state, action) {
      if (
        action.payload.trim().length < 4 ||
        action.payload.trim().length > 30
      ) {
        state.password.content = action.payload
        state.password.isValid = false
        state.password.message = '密碼請輸入 4 到 30 個字元的英文字母、數字!'
        state.password.count = action.payload.trim().length
      } else {
        state.password.content = action.payload
        state.password.isValid = true
        state.password.message = ''
        state.password.count = ''
      }
    },
    passwordCheckAuth(state, action) {
      if (action.payload !== state.password.content) {
        state.passwordCheck.content = action.payload
        state.passwordCheck.isValid = false
        state.passwordCheck.message = '與密碼不同，請重新輸入'
      } else {
        state.passwordCheck.content = action.payload
        state.passwordCheck.isValid = true
        state.passwordCheck.message = ''
      }
    },
    infoAuth(state, action) {
      if (
        action.payload.trim().length < 1 ||
        action.payload.trim().length > 160
      ) {
        state.info.content = action.payload
        state.info.isValid = false
        state.info.message = '字數超出上限!'
        state.info.count = action.payload.trim().length
      } else {
        state.info.content = action.payload
        state.info.isValid = true
        state.info.message = ''
        state.info.count = ''
      }
    },
    editInfoAuth(state, action) {
      if (action.payload.trim().length > 160) {
        state.editInfo.content = action.payload
        state.editInfo.isValid = false
        state.editInfo.message = '字數超出上限!'
        state.editInfo.count = action.payload.trim().length
      } else {
        state.editInfo.content = action.payload
        state.editInfo.isValid = true
        state.editInfo.message = ''
        state.editInfo.count = ''
      }
    },
    tweetAuth(state, action) {
      if (action.payload.trim().length === 0 || !action.payload.trim().length) {
        state.tweet.content = action.payload
        state.tweet.isValid = false
        state.tweet.message = '內容不可空白'
        state.tweet.count = action.payload.trim().length
      } else if (
        action.payload.trim().length < 1 ||
        action.payload.trim().length > 140
      ) {
        state.tweet.content = action.payload
        state.tweet.isValid = false
        state.tweet.message = '字數不可超過140字'
        state.tweet.count = action.payload.trim().length
      } else {
        state.tweet.content = action.payload
        state.tweet.isValid = true
        state.tweet.message = ''
        state.tweet.count = ''
      }
    },

    replyAuth(state, action) {
      if (action.payload.trim().length === 0 || !action.payload.trim().length) {
        state.reply.content = action.payload
        state.reply.isValid = false
        state.reply.message = '內容不可空白'
        state.reply.count = action.payload.trim().length
      } else if (
        action.payload.trim().length < 1 ||
        action.payload.trim().length > 140
      ) {
        state.reply.content = action.payload
        state.reply.isValid = false
        state.reply.message = '字數不可超過140字'
        state.reply.count = action.payload.trim().length
      } else {
        state.reply.content = action.payload
        state.reply.isValid = true
        state.reply.message = ''
        state.reply.count = ''
      }
    },
    refreshAuthInput(state) {
      state.account = initialState.account
      state.username = initialState.username
      state.email = initialState.email
      state.password = initialState.password
      state.info = initialState.info
      state.tweet = initialState.tweet
      state.reply = initialState.reply
      state.passwordCheck = initialState.passwordCheck
    },
  },
})

export const authInputActions = authInputSlice.actions

export default authInputSlice.reducer
