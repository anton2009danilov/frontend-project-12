import {
  useState,
  useRef,
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import * as yup from 'yup';
import axios from 'axios';
import cn from 'classnames';
import { useFormik } from 'formik';
import { useAuth } from '../hooks';
import loginImage from '../images/login.jfif';

const Login = () => {
  const auth = useAuth();
  const [authError, setAuthError] = useState('');
  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validationSchema = yup.object().shape({
    username: yup.string()
      .required('Обязательное поле')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов'),
    password: yup.string()
      .required('Обязательное поле')
      .min(6, 'Не менее 6 символов'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      setAuthError('');
      const { username, password } = values;
      console.log(username, password);

      axios.post('/api/v1/login', { username, password }).then((response) => {
        console.log(response.data);
        auth.logIn(response.data, username);
        navigate('/');
      })
        .catch((e) => {
          console.log(e);
          formik.setSubmitting(false);
          setAuthError('Ошибка авторизации');
          inputRef.current.select();
        });
    },
  });

  const usernameFieldClass = cn({
    'is-invalid': formik.errors.username,
  });

  const passwordFieldClass = cn({
    'is-invalid': authError || formik.errors.password,
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card>
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={loginImage} className="rounded-circle" alt="Войти" />
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">Войти</h1>
                <Form.Group className="mb-3 form-floating">
                  <Form.Control
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Введите имя пользователя"
                    className={usernameFieldClass}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    ref={inputRef}
                    required
                  />
                  <Form.Label htmlFor="username">Имя пользователя</Form.Label>
                  <Form.Text className="invalid-tooltip">
                    {formik.errors.username}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3 form-floating">
                  <Form.Control
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Введите пароль"
                    className={passwordFieldClass}
                    onChange={formik.handleChange}
                    required
                  />
                  <Form.Label htmlFor="password">Пароль</Form.Label>
                  <Form.Text className="invalid-tooltip">
                    {authError || formik.errors.password}
                  </Form.Text>
                </Form.Group>
                <Button variant="outline-primary" className="w-100 mb-3" type="submit">
                  Войти
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span>
                {' '}
                <a href="/signup">Регистрация</a>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>

  );
};

export default Login;
