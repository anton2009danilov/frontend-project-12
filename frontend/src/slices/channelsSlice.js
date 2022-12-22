import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState();

export const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    removeChannel: channelsAdapter.removeOne,
    setChannel: channelsAdapter.setOne,
  },
});

export const selectors = channelsAdapter.getSelectors((state) => state.channels);

export const { actions } = channelsSlice;

export default channelsSlice.reducer;
