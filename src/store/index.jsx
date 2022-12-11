import { configureStore } from '@reduxjs/toolkit'

import authInputSlice from './authInput-slice'
import adminSlice from './admin-slice'

const store = configureStore({
  reducer: {authInput: authInputSlice, admin: adminSlice}
})

export default store
