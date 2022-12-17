import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { selectors } from '../slices/channelsSlice';
import { ReactComponent as PlusIcon } from '../images/plus-icon.svg';
import Channel from './Channel';
import getModal from '../modals/index.js';

const Channels = () => {
  const addingModal = getModal('adding');

  const [showAddingModal, setShowAddingModal] = useState(false);

  const channels = useSelector(selectors.selectAll);

  return (
    <>
      <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
        <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
          <span>Каналы</span>
          <Button
            variant="primary"
            type="button"
            className="p-0 text-primary bg-light border-0 btn-group-vertical"
            onClick={() => setShowAddingModal(true)}
          >
            <PlusIcon className="bg-light m-1" />
            <span className="visually-hidden">+</span>
          </Button>
        </div>
        <ul className="nav flex-column nav-pills nav-fill px-2">
          {channels.map((channel) => <Channel key={channel.id} channel={channel} />)}
        </ul>
      </div>

      {addingModal({
        show: showAddingModal,
        setShow: setShowAddingModal,
        channels,
      })}
    </>
  );
};

export default Channels;
