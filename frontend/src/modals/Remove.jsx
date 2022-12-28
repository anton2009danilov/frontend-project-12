import React, { useEffect } from 'react';
import {
  Modal, Button,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useSocket } from '../hooks';
import { setLoadingStatus } from '../slices/userInterfaceSlice';

const Remove = (props) => {
  const { socket } = useSocket();
  const dispatch = useDispatch();
  const { loadingStatus } = useSelector((state) => state.ui);
  const { onHide, modalInfo: { item } } = props;

  useEffect(() => {}, []);

  const onClickDeleteBtn = () => {
    dispatch(setLoadingStatus('loading'));
    socket.emit('removeChannel', { id: item.id }, (response) => {
      console.log(response);
      dispatch(setLoadingStatus('idle'));
    });
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
          <Button onClick={onHide} variant="secondary" className="me-2">
            Отменить
          </Button>
          <Button onClick={onClickDeleteBtn} disabled={loadingStatus === 'loading'}>Удалить</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
