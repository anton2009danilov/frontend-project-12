import { useMemo } from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { actions as messagesActions } from '../slices/messagesSlice';
import { SocketContext } from '.';

const socket = io();

const SocketContextProvider = ({ children }) => {
  const dispatch = useDispatch();

  socket.on('newMessage', (payload) => {
    dispatch(messagesActions.addMessage(payload));
  });

  return (
    <SocketContext.Provider value={useMemo(() => ({ socket }))}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
