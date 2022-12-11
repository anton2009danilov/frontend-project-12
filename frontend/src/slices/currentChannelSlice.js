/* eslint no-param-reassign: 0 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = { id: null };

const currentChannelSlice = createSlice({
  name: 'currentChannel',
  initialState,
  reducers: {
    setCurrentChannel(state, action) {
      state.id = action.payload;
    },
  },
});

export const { setCurrentChannel } = currentChannelSlice.actions;

export default currentChannelSlice.reducer;
