import React from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentChannel } from '../slices/currentChannelSlice';
// import { selectors } from '../slices/channelsSlice';

const Channel = ({ channel }) => {
  const dispatch = useDispatch();

  const { id: currentChannelId } = useSelector((state) => state.currentChannel);

  const {
    name,
    id,
  } = channel;

  const onClick = () => {
    dispatch(setCurrentChannel(id));
  };

  const btnClass = cn(
    'w-100',
    'rounded-0',
    'text-start',
    'btn',
    { 'btn-secondary': id === currentChannelId },
  );

  return (
    <li className="nav-item w-100">
      <button onClick={onClick} type="button" className={btnClass}>
        <span className="me-1">#</span>
        { name }
      </button>
    </li>
  );
};

export default Channel;
