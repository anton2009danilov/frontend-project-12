import { useMemo } from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { actions as messagesActions } from '../slices/messagesSlice';
import { actions as channelsActions } from '../slices/channelsSlice';
import { SocketContext } from '.';

const SocketContextProvider = ({ children }) => {
  const socket = io();
  const dispatch = useDispatch();

  socket.on('newMessage', (payload) => {
    dispatch(messagesActions.addMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    dispatch(channelsActions.addChannel(payload));
  });

  socket.on('removeChannel', ({ id }) => {
    dispatch(channelsActions.removeChannel(id));
  });

  socket.on('renameChannel', (payload) => {
    console.log(payload);
    dispatch(channelsActions.setChannel(payload));
  });

  return (
    <SocketContext.Provider value={useMemo(() => ({ socket }), [socket])}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
