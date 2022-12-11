import React from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';
// import { selectors } from '../slices/channelsSlice';

const Channel = ({ channel }) => {
  // const channels = useSelector(selectors.selectAll);
  // console.log(channels);
  const { id: currentChannelId } = useSelector((state) => state.currentChannel);
  // console.log(currentChannelId);

  const {
    name,
    id,
  } = channel;

  const btnClass = cn(
    'w-100',
    'rounded-0',
    'text-start',
    'btn',
    { 'btn-secondary': id === currentChannelId },
  );

  return (
    <li className="nav-item w-100">
      <button type="button" className={btnClass}>
        <span className="me-1">#</span>
        { name }
      </button>
    </li>
  );
};

export default Channel;
