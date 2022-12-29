/* eslint no-param-reassign: 0 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  defaultChannelId: null,
  currentChannelId: null,
  loadingStatus: 'idle',
  message: '',
};

const userInterfaceSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentChannelId(state, action) {
      state.currentChannelId = action.payload;
    },
    setDefaultChannelId(state, action) {
      state.defaultChannelId = action.payload;
    },
    setLoadingStatus(state, action) {
      state.loadingStatus = action.payload;
    },
    setMessage(state, action) {
      state.message = action.message;
    },
  },
});

export const {
  setCurrentChannelId, setDefaultChannelId, setLoadingStatus, setMessage,
} = userInterfaceSlice.actions;

export default userInterfaceSlice.reducer;
