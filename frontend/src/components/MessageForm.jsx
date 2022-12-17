import React from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
// import cn from 'classnames';
// import {
//   Form,
// } from 'react-bootstrap';

import { useSocket } from '../hooks';
import ArrowRightIcon from '../images/arrow-right-icon.svg';

const MessageForm = () => {
  const { socket } = useSocket();

  const { id: channelId } = useSelector((state) => state.currentChannel);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async (values, { resetForm }) => {
      const { message: body } = values;
      const username = localStorage.getItem('userName');

      const message = {
        body,
        channelId,
        username,
      };

      socket.emit('newMessage', message, (response) => {
        console.log(response.status);
      });

      resetForm({ message: '' });
    },
  });

  // const formClass = cn('py-1', 'border', 'rounded-2');

  return (
    <div className="mt-auto px-5 py-3">
      <form onSubmit={formik.handleSubmit} noValidate className="py-1 border rounded-2">
        <div className="input-group has-validation">
          <input
            name="message"
            id="message"
            aria-label="Новое сообщение"
            placeholder="Введите сообщение..."
            className="border-0 p-0 ps-2 form-control"
            onChange={formik.handleChange}
            value={formik.values.message}
          />
          <button type="submit" disabled={!formik.values.message} className="btn btn-group-vertical border-0">
            <span className="visually-hidden">Отправить</span>
            <img src={ArrowRightIcon} alt="Plus Icon" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
