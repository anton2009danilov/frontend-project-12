import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '../slices/channelsSlice';
import PlusIcon from '../images/plus-icon.svg';
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
          <button
            type="button"
            className="p-0 text-primary btn btn-group-vertical"
            onClick={() => setShowAddingModal(true)}
          >
            <img src={PlusIcon} alt="Plus Icon" />
            <span className="visually-hidden">+</span>
          </button>
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
