import { configureStore } from '@reduxjs/toolkit'

import authInputSlice from './authInput-slice'
import authSlice from './auth-slice'

const store = configureStore({
  reducer: authInputSlice,
  authSlice,
})

export default store
