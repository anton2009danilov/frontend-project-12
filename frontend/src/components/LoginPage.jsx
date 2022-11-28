import {
  useState,
  useRef,
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import * as yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik';
import useAuth from '../hooks';

const Login = () => {
  const auth = useAuth();
  const [authError, setAuthError] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validationSchema = yup.object().shape({
    username: yup.string().required().min(3).max(20),
    password: yup.string().required().min(5),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      delete formik.errors.auth;
      setAuthError(false);
      const { username, password } = values;
      console.log(username, password);

      axios.post('/api/v1/login', { username, password }).then((response) => {
        console.log(response.data);
        auth.logIn();
        localStorage.setItem('userId', JSON.stringify(response.data));
        navigate('/');
      })
        .catch((e) => {
          console.log(e);
          formik.setSubmitting(false);
          setAuthError(true);
          inputRef.current.select();
        });
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card>
            <Card.Body>
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Имя пользователя</Form.Label>
                  <Form.Control
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Введите имя пользователя"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    ref={inputRef}
                    required
                  />
                  <Form.Text className="text-danger">
                    {formik.errors.username}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Пароль</Form.Label>
                  <Form.Control
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Введите пароль"
                    onChange={formik.handleChange}
                    required
                  />
                  <Form.Text className="text-danger">
                    {formik.errors.password}
                  </Form.Text>
                  <Form.Text className="text-danger">
                    {authError && 'Ошибка авторизации'}
                  </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>

  );
};

export default Login;
