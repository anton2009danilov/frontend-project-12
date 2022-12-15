import React from 'react';
import { useSelector } from 'react-redux';
import { selectors as messagesSelectors } from '../slices/messagesSlice';
import { selectors as channelsSelectors } from '../slices/channelsSlice';
// import { actions as channelsActions } from '../slices/channelsSlice';

const Messages = () => {
  const { id: currentChannelId } = useSelector((state) => state.currentChannel);

  const { name: channelName } = useSelector((state) => channelsSelectors
    .selectById(state, currentChannelId)) ?? '';

  const messages = useSelector(messagesSelectors.selectAll)
    .filter(({ channelId }) => channelId === currentChannelId);

  // const { length: messagesCount } = messages;

  const channelTitle = `# ${channelName}`;
  const messagesCountDisplay = `${messages.length} сообщений`;

  const renderMessages = () => messages.map(({ id, body, username }) => (
    <div key={id} className="text-break mb-2">
      <b>{username}</b>
      :
      {' '}
      {body}
    </div>
  ));

  console.log(messages);

  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>{channelTitle}</b>
        </p>
        <span className="text-muted">{messagesCountDisplay}</span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5 ">
        {renderMessages()}
      </div>
    </>
  );
};

export default Messages;
