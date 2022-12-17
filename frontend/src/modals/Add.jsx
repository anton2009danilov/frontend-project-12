/* eslint func-names: 0, prefer-arrow-callback: 0, functional/no-this-expression: 0 */

import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import {
  Modal, Form, FormGroup, FormControl, Button,
} from 'react-bootstrap';
import cn from 'classnames';
import * as yup from 'yup';
import { useSocket } from '../hooks';

const Add = (props) => {
  const { socket } = useSocket();

  const { show, setShow, channels } = props;

  const inputElement = useRef(null);

  useEffect(() => {
    if (show) {
      inputElement.current.focus();
    }
  });

  const validationSchema = yup.object().shape({
    name: yup.string()
      .required('Обязательное поле')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .test(
        'uniqName',
        'Должно быть уникальным',
        function (value) {
          const { path, createError } = this;

          return !channels.some(({ name }) => name === value)
            ? true
            : createError({ path, message: 'Должно быть уникальным' });
        },
      ),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: ({ name }) => {
      socket.emit('newChannel', { name }, (response) => {
        console.log(response);
      });
      setShow(false);
    },
  });

  const nameFieldClass = cn('mb-2', {
    'is-invalid': formik.errors.name,
  });

  return (
    <Modal centered show={show} onHide={() => setShow(false)}>
      <Modal.Header>
        <Modal.Title>Добавить канал</Modal.Title>
        <Button type="button" onClick={() => setShow(false)} className="btn-close" aria-label="Close" />
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup className="form-group">
            <FormControl
              className={nameFieldClass}
              ref={inputElement}
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              data-testid="input-body"
            />
            <Form.Label className="visually-hidden" htmlFor="name">Имя канала</Form.Label>
            <div className="invalid-feedback">{formik.errors.name}</div>
            <div className="d-flex justify-content-end">
              <Button onClick={() => setShow(false)} variant="secondary" className="me-2">Отменить</Button>
              <Button type="submit">Отправить</Button>
            </div>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
