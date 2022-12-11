import { configureStore } from '@reduxjs/toolkit'

import authInputSlice from './authInput-slice'
import adminSlice from './admin-slice'
import userSlice from './user-slice'

const store = configureStore({
  reducer: { authInput: authInputSlice, admin: adminSlice, user: userSlice },
})

export default store
