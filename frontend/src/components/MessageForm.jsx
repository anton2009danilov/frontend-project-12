import React from 'react';
// import cn from 'classnames';
// import { useDispatch } from 'react-redux';
// import {
//   Form,
// } from 'react-bootstrap';

// import { actions } from '../slices/messagesSlice';
import { useFormik } from 'formik';
import ArrowRightIcon from '../images/arrow-right-icon.svg';

const MessageForm = () => {
  // const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async (values, { resetForm }) => {
      const { message } = values;
      console.log(message);
      resetForm({ message: '' });

      // axios.post('/api/v1/login', { username, password }).then((response) => {
      //   console.log(response.data);
      //   auth.logIn();
      //   localStorage.setItem('userId', JSON.stringify(response.data));
      //   navigate('/');
      // })
      //   .catch((e) => {
      //     console.log(e);
      //     formik.setSubmitting(false);
      //     setAuthError(true);
      //     inputRef.current.select();
      //   });
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

  // return (
  //   <div className="mt-auto px-5 py-3">
  //     <Form onSubmit={onSubmit} className={formClass}>
  //       <Form.Group className="input-group has-validation">
  //         <Form.Control
  //           name="body"
  //           aria-label="Новое сообщение"
  //           placeholder="Введите сообщение..."
  //           className="border-0 p-0 ps-2"
  //           value="aaa"
  //         />
  //         <button disabled type="submit" className="btn btn-group-vertical">
  //           <span className="visually-hidden">Отправить</span>
  //           <img src={ArrowRightIcon} alt="Plus Icon" />
  //         </button>
  //       </Form.Group>
  //     </Form>
  //   </div>
  // );
};

export default MessageForm;
