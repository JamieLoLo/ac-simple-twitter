import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isReplyModalOpen: false,
  isTweetModalOpen: false,
  isDetailReplyModalOpen: false,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState: initialState,
  reducers: {
    // modal 開啟狀態
    setIsReplyModalOpen(state, action) {
      state.isReplyModalOpen = action.payload
    },
    setIsTweetModalOpen(state, action) {
      state.isTweetModalOpen = action.payload
    },
    setIsDetailReplyModalOpen(state, action) {
      state.isDetailReplyModalOpen = action.payload
    },
  },
})

export const modalActions = modalSlice.actions

export default modalSlice.reducer
