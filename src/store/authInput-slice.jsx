import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  account: {
    content: '',
    isValid: true,
    message: '',
    count: '',
  },
  username: {
    content: '',
    isValid: true,
    message: '',
    count: '',
  },
  email: {
    content: '',
    isValid: true,
    message: '',
  },
  password: {
    content: '',
    isValid: true,
    message: '',
    count: '',
  },
  passwordCheck: {
    content: '',
    isValid: true,
    message: '',
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
        state.account['content'] = action.payload
        state.account.isValid = false
        state.account.message = '帳號請輸入 4 到 30 個字元的英文字母、數字!'
        state.account.count = action.payload.trim().length
      } else {
        state.account['content'] = action.payload
        state.account.isValid = true
        state.account.message = ''
        state.account.count = ''
      }
    },
    usernameAuth(state, action) {
      if (
        action.payload.trim().length < 4 ||
        action.payload.trim().length > 50
      ) {
        state.username['content'] = action.payload
        state.username.isValid = false
        state.username.message = '名稱請輸入 1 到 50 個字元'
        state.username.count = action.payload.trim().length
      } else {
        state.username['content'] = action.payload
        state.username.isValid = true
        state.username.message = ''
        state.username.count = ''
      }
    },
    emailAuth(state, action) {
      if (!action.payload.includes('@')) {
        state.email.content = action.payload
        state.email.isValid = false
        state.email.message = 'Email 請輸入包含 "@" 字元的正確格式'
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
  },
})

export const authInputActions = authInputSlice.actions

export default authInputSlice
