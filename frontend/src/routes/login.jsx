import { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import * as yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik';

const Login = () => {
  const [authError, setAuthError] = useState('');

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
      const { username, password } = values;
      console.log(username, password);

      axios.post('/api/v1/login', { username, password }).then((response) => {
        console.log(response.data);
        window.localStorage.token = response.data.token;
        window.location.replace('/');
      })
        .catch((e) => {
          console.log(e);
          delete window.localStorage.token;
          setAuthError('Ошибка авторизации');
        });
    },
  });

  return (
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
              value={formik.values.email}
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
              {authError}
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Login;
