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
import signUpImage from '../images/signup.jpg';

const SignUp = () => {
  const auth = useAuth();
  const [signUpError, setSignUpError] = useState('');
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
    retypePassword: yup.string()
      .required('Пароли должны совпадать')
      .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      retypePassword: '',
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      setSignUpError('');
      const { username, password } = values;
      console.log(username, password);

      axios.post('/api/v1/signup', { username, password }).then((response) => {
        console.log(response.data);
        auth.logIn(response.data, username);
        navigate('/');
      })
        .catch((e) => {
          console.log(e);
          formik.setSubmitting(false);
          setSignUpError('Ошибка регистрации');
          inputRef.current.select();
        });
    },
  });

  const usernameFieldClass = cn({
    'is-invalid': formik.errors.username,
  });

  const passwordFieldClass = cn({
    'is-invalid': formik.errors.password,
  });

  const retypePasswordFieldClass = cn({
    'is-invalid': signUpError || formik.errors.retypePassword,
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card>
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={signUpImage} className="rounded-circle" alt="Войти" />
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">Регистрация</h1>
                <Form.Group className="mb-3 form-floating">
                  <Form.Control
                    id="username"
                    name="username"
                    type="text"
                    placeholder="От 3 до 20 символов"
                    className={usernameFieldClass}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    ref={inputRef}
                    required
                    noValidate
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
                    noValidate
                  />
                  <Form.Label htmlFor="password">Пароль</Form.Label>
                  <Form.Text className="invalid-tooltip">
                    {formik.errors.password}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3 form-floating">
                  <Form.Control
                    id="retypePassword"
                    name="retypePassword"
                    type="password"
                    placeholder="Подтвердите пароль"
                    className={retypePasswordFieldClass}
                    onChange={formik.handleChange}
                    required
                    noValidate
                  />
                  <Form.Label htmlFor="retypePassword">Подтвердите пароль</Form.Label>
                  <Form.Text className="invalid-tooltip">
                    {formik.errors.retypePassword}
                  </Form.Text>
                  <Form.Text className="text-danger">
                    {signUpError}
                  </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Зарегистрироваться
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>

  );
};

export default SignUp;
