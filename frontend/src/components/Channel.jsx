import React from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, ButtonGroup, Dropdown, DropdownButton,
} from 'react-bootstrap';
import { setCurrentChannelId } from '../slices/userInterfaceSlice';

const Channel = ({ channel, showModal }) => {
  const dispatch = useDispatch();

  const { currentChannelId } = useSelector((state) => state.ui);
  console.log(useSelector((state) => state.ui), currentChannelId);

  const { id, name, removable } = channel;

  const onClick = () => {
    dispatch(setCurrentChannelId(id));
  };

  const btnVariant = id === currentChannelId ? 'secondary' : 'light';

  const btnClass = cn(
    'w-100',
    'rounded-0',
    'text-start',
    'btn',
    'text-truncate',
  );

  const renderDropdown = () => (removable
    ? (
      <DropdownButton title="" variant={btnVariant} as={ButtonGroup}>
        <Dropdown.Item onClick={() => showModal('removing', channel)} eventKey="1">Удалить</Dropdown.Item>
        <Dropdown.Item onClick={() => showModal('renaming', channel)} eventKey="2">Переименовать</Dropdown.Item>
      </DropdownButton>
    )
    : null);

  return (
    <li className="nav-item w-100">
      <ButtonGroup className="w-100">
        <Button variant={btnVariant} onClick={onClick} type="button" className={btnClass}>
          <span className="me-1">#</span>
          { name }
        </Button>
        {renderDropdown()}
      </ButtonGroup>
    </li>
  );
};

export default Channel;
