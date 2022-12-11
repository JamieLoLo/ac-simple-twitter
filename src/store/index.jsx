import { configureStore } from '@reduxjs/toolkit'

import authInputSlice from './authInput-slice'

const store = configureStore({
  reducer: authInputSlice,
})

export default store
