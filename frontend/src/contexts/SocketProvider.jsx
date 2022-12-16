import { useMemo } from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { actions as messagesActions } from '../slices/messagesSlice';
import { SocketContext } from '.';

const SocketContextProvider = ({ children }) => {
  console.log('socket init');
  const socket = io('ws://localhost:3000');
  const dispatch = useDispatch();

  socket.on('newMessage', (payload) => {
    dispatch(messagesActions.addMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    console.log(payload); // { id: 6, name: "new channel", removable: true }
  });

  return (
    <SocketContext.Provider value={useMemo(() => ({ socket }), [socket])}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
