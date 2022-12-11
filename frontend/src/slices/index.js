import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice';
import currentChannelSlice from './currentChannelSlice';
import messagesReducer from './messagesSlice';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    currentChannel: currentChannelSlice,
  },
});
