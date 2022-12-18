import { configureStore } from '@reduxjs/toolkit'

import authInputSlice from './authInput-slice'
import adminSlice from './admin-slice'
import userSlice from './user-slice'
import modalSlice from './modal-slice'
import profileSlice from './profile-slice'

const store = configureStore({
  reducer: {
    authInput: authInputSlice,
    admin: adminSlice,
    user: userSlice,
    modal: modalSlice,
    profile: profileSlice,
  },
})

export default store
