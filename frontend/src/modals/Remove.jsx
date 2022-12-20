import React, { useEffect } from 'react';
import {
  Modal, Button,
} from 'react-bootstrap';
// import { selectors as channelsSelectors } from '../slices/channelsSlice';
import { useSocket } from '../hooks';

const Remove = (props) => {
  const { socket } = useSocket();
  const { onHide, modalInfo: { item } } = props;

  useEffect(() => {}, []);

  const onClickDeleteBtn = () => {
    socket.emit('removeChannel', { id: item.id });
    onHide();
  };

  return (
    <Modal centered show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button onClick={onHide} variant="secondary" className="me-2">Отменить</Button>
          <Button onClick={onClickDeleteBtn}>Удалить</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
