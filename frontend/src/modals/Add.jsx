/* eslint func-names: 0, prefer-arrow-callback: 0, functional/no-this-expression: 0 */

import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import {
  Modal, Form, FormGroup, FormControl, Button,
} from 'react-bootstrap';
import cn from 'classnames';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import { useSocket } from '../hooks';
import { setLoadingStatus, setCurrentChannelId } from '../slices/userInterfaceSlice';
import { actions as channelsActions, selectors as channelsSelectors } from '../slices/channelsSlice';

const Add = (props) => {
  const { t } = useTranslation();
  const { socket } = useSocket();
  const { onHide } = props;
  const { loadingStatus } = useSelector((state) => state.ui);
  const channels = useSelector(channelsSelectors.selectAll);
  const inputElement = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    inputElement.current.focus();
  }, []);

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
      dispatch(setLoadingStatus('loading'));

      filter.loadDictionary('en');
      const filteredEnglishName = filter.clean(name);
      filter.loadDictionary('ru');
      const filteredRussianName = filter.clean(filteredEnglishName);
      const cleanName = filter.clean(filteredRussianName);

      socket.emit('newChannel', { name: cleanName }, (response) => {
        const { data } = response;
        dispatch(channelsActions.addChannel(data));
        dispatch(setCurrentChannelId(data.id));
        dispatch(setLoadingStatus('idle'));
        toast.success(t('socketMessages.successfulChannelCreation'));
      });

      onHide();
    },
  });

  const nameFieldClass = cn('mb-2', {
    'is-invalid': formik.errors.name,
  });

  return (
    <Modal centered show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              className={nameFieldClass}
              ref={inputElement}
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              data-testid="input-body"
              disabled={loadingStatus === 'loading'}
            />
            <Form.Label className="visually-hidden" htmlFor="name">Имя канала</Form.Label>
            <div className="invalid-feedback">{formik.errors.name}</div>
            <div className="d-flex justify-content-end">
              <Button onClick={onHide} variant="secondary" className="me-2">
                Отменить
              </Button>
              <Button disabled={loadingStatus === 'loading'} type="submit">Отправить</Button>
            </div>
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
