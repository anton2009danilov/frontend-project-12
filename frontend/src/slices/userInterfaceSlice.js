/* eslint no-param-reassign: 0 */

import { useContext } from 'react';
import { createSlice } from '@reduxjs/toolkit';
import fetchInitialData from './fetchInitialData';
import { AuthContext } from '../contexts';

const initialState = {
  defaultChannelId: null,
  currentChannelId: null,
  loadingStatus: 'idle',
  error: '',
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
    setError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialData.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchInitialData.fulfilled, (state, action) => {
        state.loadingStatus = 'idle';
        const { currentChannelId } = action.payload;
        state.currentChannelId = currentChannelId;
        state.defaultChannelId = currentChannelId;
        state.error = null;
      })
      .addCase(fetchInitialData.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
        const { logOut } = useContext(AuthContext);
        logOut();
      });
  },
});

export const {
  setCurrentChannelId, setDefaultChannelId, setLoadingStatus, setError,
} = userInterfaceSlice.actions;

export default userInterfaceSlice.reducer;
