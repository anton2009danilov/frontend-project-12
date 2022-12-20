import React from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, ButtonGroup, Dropdown, DropdownButton,
} from 'react-bootstrap';
import { setCurrentChannel } from '../slices/currentChannelSlice';

const Channel = ({
  channel,
  // showModal,
}) => {
  console.log(channel);
  const dispatch = useDispatch();

  const { id: currentChannelId } = useSelector((state) => state.currentChannel);

  const {
    name,
    id,
    // removable,
  } = channel;

  const onClick = () => {
    dispatch(setCurrentChannel(id));
  };

  const btnVariant = id === currentChannelId ? 'secondary' : 'light';

  const btnClass = cn(
    'w-100',
    'rounded-0',
    'text-start',
    'btn',
    'text-truncate',
  );

  return (
    <li className="nav-item w-100">
      <ButtonGroup className="w-100">
        <Button variant={btnVariant} onClick={onClick} type="button" className={btnClass}>
          <span className="me-1">#</span>
          { name }
        </Button>
        <DropdownButton variant={btnVariant} as={ButtonGroup}>
          <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
          <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
        </DropdownButton>
      </ButtonGroup>
    </li>
  );
};

export default Channel;
