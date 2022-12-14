import { useMemo } from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { actions as messagesActions } from '../slices/messagesSlice';
import { SocketContext } from '.';

const SocketContextProvider = ({ children }) => {
  const socket = io('ws://localhost:3000');
  const dispatch = useDispatch();

  socket.on('newMessage', (payload) => {
    console.log(payload); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
    dispatch(messagesActions.addMessage(payload));
  });

  return (
    <SocketContext.Provider value={useMemo(() => ({ socket }), [socket])}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
