import React from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '../slices/messagesSlice';

const Messages = () => {
  const messages = useSelector(selectors.selectAll);
  const { id: currentChannelId } = useSelector((state) => state.currentChannel);
  const { length: messagesCount } = messages;
  console.log(messages, messagesCount, currentChannelId);

  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b># general</b>
        </p>
        <span className="text-muted">0 сообщений</span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5 " />
    </>
  );
};

export default Messages;
